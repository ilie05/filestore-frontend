import React, {Component} from 'react';
import {connect} from "react-redux";
import './FileUploadStyle.css';
import {Button} from "semantic-ui-react";
import {bindActionCreators} from 'redux';
import {loadFile, getFiles} from "../store/actions/fileManage";

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
    const {loadFile, getFiles, token} = this.props;
    if (!fileContent) return;
    loadFile(fileContent, token)
      .then((data) => {
        console.log(data);
        getFiles(token);
      })
  }

  render() {
    const {loadingUpload} = this.props;
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
        <Button onClick={this.handleSubmit} size="huge" inverted color='grey' disabled={loadingUpload}
                loading={loadingUpload}>Upload file</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loadingUpload: state.file.loadingUpload
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({loadFile, getFiles}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
