import React, {Component} from 'react';
import {connect} from "react-redux";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: null,
    };
    this.inpuElement = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({profilePic: e.target.files[0]});
  }

  handleSubmit() {
    let formData = new FormData();
    formData.append('profile_pic', this.state.profilePic);
    fetch('http://localhost:8000/store/file', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        // Authorization: `Token ${"asdasdasd"}`
        Authorization: `Token ${this.props.token}`
        // 'content-type': 'multipart/form-data',
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
    return (
      <div>
        <input
          type="file"
          multiple={false}
          ref={(input) => {
            this.inpuElement = input;
          }}
          // accept=".jpg,.jpeg,.png"
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps, null)(FileUpload);
