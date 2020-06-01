import React, {Component} from 'react';
import {connect} from "react-redux";
import './FileUploadStyle.css';
import {Button} from "semantic-ui-react";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileContent: null,
    };
  }

  handleChange = (e) => {
    this.setState({fileContent: e.target.files[0]});
  }

  handleSubmit = () => {
    const {fileContent} = this.state;
    if(!fileContent) return;
    let formData = new FormData();
    formData.append('file_content', this.state.fileContent);
    fetch('http://localhost:8000/store/file', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Token ${this.props.token}`
      },
      body: formData,
    }).then(res => {
      console.log(res);
      return res.json();
    })
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  render() {
    const {loading} = this.props;
    return (
      <div className="wrapper">
        <div className="file-upload">
          <input
            type="file"
            multiple={false}
            onChange={this.handleChange}
          />
          <i className="fa fa-arrow-up"/>
        </div>
        <Button onClick={this.handleSubmit} size="huge" inverted color='grey' loading={loading}>Upload file</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    token: state.auth.token,
    loading: false
  };
};

export default connect(mapStateToProps, null)(FileUpload);
