import React, {Component} from 'react'
import {Card, Button, Label} from 'semantic-ui-react'
import {connect} from "react-redux";

class FilesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { token } = this.props;
    if (prevProps.token !== token) {
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    fetch('http://localhost:8000/store/files', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        // Authorization: `Token ${"asdasdasd"}`
        Authorization: `Token ${this.props.token}`
      }
    }).then(res => {
      console.log(res);
      return res.json();
    })
      .then((data) => {
        console.log(data);
        this.setState({files: data})
      })
      .catch(err => console.log(err));
  }

  formatDate = (date) => {
    date = date.split('T')[0];
  }

  handleDownload = (key) => {
    const url = `http://localhost:8000/store/file?name=${key}`;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Token ${this.props.token}`
      }
    }).then(res => {
      const contentDisposition = res.headers.get('content-disposition');
      const fileName = contentDisposition.split('; ')[1].split('=')[1];
      res.blob().then(blob => {
        console.log(blob)
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
      })
      return res.json();
    })
      .then((data) => {
        console.log(data);
        this.setState({files: data})
      })
      .catch(err => console.log(err));
  }
  handleDelete = (key) => {
    let formData = new FormData();
    formData.append('filename', key);
    fetch('http://localhost:8000/store/file', {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${this.props.token}`
      },
      body: formData,
    }).then(res => {
      console.log(res);
    })
      .catch(err => console.log(err));
  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  render() {
    const {files} = this.state;
    const containerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '80px',
      padding: '10px'
    };
    return (
      <Card.Group style={{width: '1000px', marginLeft: '60px'}}>
        {files.map(file => (
          <Card fluid color='grey' key={file.Key}>
            <div style={containerStyle}>
              <Card.Content>
                <Card.Header>{file.Key}</Card.Header>
                <Card.Meta>Last update: {file.LastModified}</Card.Meta>
              </Card.Content>
              <Card.Content>
                <Label size='medium' horizontal>
                  Size
                </Label>{this.formatNumber(file.Size)} bytes
              </Card.Content>
              <Card.Content>
                <Button.Group>
                  <Button onClick={() => this.handleDownload(file.Key)} positive>Download</Button>
                  <Button.Or text='or'/>
                  <Button onClick={() => this.handleDelete(file.Key)} negative>Delete</Button>
                </Button.Group>
              </Card.Content>
            </div>
          </Card>
        ))}
      </Card.Group>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, null)(FilesContainer);
