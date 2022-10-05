import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// textArea style
const taStyle = {
  width: "100%",
  height: "calc(50vh - 52.5px)",
  fontFamily: "monospace, monospace"
};

// toolbar style
const tbStyle = {
  float: "right",
  marginBottom: "5px",
  marginTop: "15px"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.toClipboard = this.toClipboard.bind(this);
    this.toClipboardTSV = this.toClipboardTSV.bind(this);
    this.resetInput = this.resetInput.bind(this);

    this.state = { inputValue: '', csvData: '' };
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
    this.setState({ csvData: this.toCSV(e.target.value) });
  }

  toCSV(input, delimiter=',') {
    const regex = /\s+\|\s+/g;
    const lines = []
    for (const line of input.split('\n')) {
      if (!line.startsWith('|')) {
        continue
      }
      lines.push(line.substring(2).substring(0, line.length - 4).trim().replace(regex, delimiter))
    }
    return lines.join('\n').trim()
  }

  toClipboard() {
    navigator.clipboard.writeText(this.toCSV(this.state.inputValue))
  }

  toClipboardTSV() {
    navigator.clipboard.writeText(this.toCSV(this.state.inputValue, '\t'))
  }

  resetInput() {
    this.setState({ inputValue: '', csvData: '' });
  }

  render() {
    return (
      <div className="MySQLtoCSV mx-2">
        <label className="bold">Paste MySQL SELECT Output Here</label>
        <textarea
          id="input-content"
          style={taStyle}
          onChange={this.handleChange}
          value={this.state.inputValue}
        />
        <div style={tbStyle}>
          <button type="button" className="btn btn-primary" onClick={this.resetInput}>Clear Input</button>
          <button type="button" className="btn btn-primary ms-2" onClick={this.toClipboardTSV}>Copy Output as TSV</button>
          <button type="button" className="btn btn-primary ms-2" onClick={this.toClipboard}>Copy Output as CSV</button>
        </div>
        <textarea
          id="csv-content"
          style={taStyle}
          value={this.state.csvData}
          readOnly={true}
        />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
