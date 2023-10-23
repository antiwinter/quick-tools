// Create a preact function that returns a card with a beautiful style
// that accepts a file by clicking or dragging
// when the file is accepted, file name and size will be displayed in the card,
// in a human readable format
// then the encoding of the file will be detected automatically  (without human review)
// then decode it with iconv in the detected encoding (if not detected, use GBK).
// if the file cannot be decoded, show an error message in red color under the card.
// if the file can be decoded,
// a tune action will start directly, this action will remove all ASCII characters except space and return from the decoded text
// then a summary is displayed under the card with the information
// showing how many occurrences of each character were removed, in the format like below:
//   _: 18
//   <: 23
//   a: 1
// the tuned text will be encoded back to the original encoding
// and a button will appear under the summary, saying "Download Tuned File"
// when the button is clicked, the file will be downloaded with the name `${original_name}-tuned`
// additional requirements:
// use dropzone to accept file by dragging
// use jschardet to detect encoding
// use text-encoding to encode and decode
import { h, Component } from 'preact'
import { useDropzone } from 'react-dropzone'
import * as jschardet from 'jschardet'
import { TextEncoder, TextDecoder } from 'text-encoding'

export class Main extends Component {
  state = {
    fileDetails: null,
    decodedText: '',
    characterStats: {},
    error: null,
    encodedText: null
  }

  onDrop = files => {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = async e => {
      this.state.characterStats = {}
      const content = e.target.result
      const detected = jschardet.detect(content)
      const encoding = detected.encoding || 'GBK'
      try {
        const decoder = new TextDecoder(encoding)
        const decodedText = decoder.decode(content)

        const tunedText = decodedText.replace(/[\x21-\x7d]+/g, match => {
          let k = `${match}`
          if (k.length < 4 && !isNaN(parseInt(k))) return k
          this.state.characterStats[k] = (this.state.characterStats[k] || 0) + 1
          return ''
        })

        const encoder = new TextEncoder(encoding)
        const encodedText = encoder.encode(tunedText)

        this.setState({
          fileDetails: {
            name: file.name,
            size: file.size
          },
          decodedText: tunedText,
          encodedText
        })
      } catch (error) {
        this.setState({
          error: 'Error decoding the file.'
        })
      }
    }
    reader.readAsArrayBuffer(file)
  }

  downloadFile = () => {
    const blob = new Blob([this.state.encodedText])
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${this.state.fileDetails.name}-tuned`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  render() {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: this.onDrop
    })

    const dropzoneStyle = {
      border: '2px dashed #ccc',
      padding: '20px',
      width: '300px',
      textAlign: 'center'
    }

    const characterStatsStyle = {
      width: '300px',
      padding: '10px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '5px',
      marginTop: '15px'
    }

    const characterBoxStyle = {
      backgroundColor: '#ddd',
      padding: '2px 5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '85px',
      height: '15px',
      color: '#44a',
      'border-radius': '5px'
    }

    const charStyle = {
      fontSize: 'small'
    }

    const countStyle = {
      fontWeight: 'bold'
    }

    return (
      <>
        <div style={dropzoneStyle} {...getRootProps()}>
          <input {...getInputProps()} />
          Drag & drop a file or click to select one
          {this.state.fileDetails && (
            <div>
              <p>
                {this.state.fileDetails.name} (
                {(this.state.fileDetails.size / 1024).toFixed(2)} KB)
              </p>
            </div>
          )}
        </div>{' '}
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
        <div style={characterStatsStyle}>
          {Object.entries(this.state.characterStats)
            .sort((a, b) => b[1] - a[1])
            .map(([char, count]) => (
              <div key={char} style={characterBoxStyle}>
                <span style={charStyle}>
                  {char === ' ' ? '_' : char.slice(0, 9)}
                </span>
                <span style={countStyle}>{count}</span>
              </div>
            ))}
        </div>
        {this.state.encodedText && (
          <button onClick={this.downloadFile}>Download Tuned File</button>
        )}
      </>
    )
  }
}
