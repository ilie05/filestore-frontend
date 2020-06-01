import React, {Component} from 'react'
import {Card, Button, Label, Loader, Message} from 'semantic-ui-react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadFile, getFiles, downloadFile, deleteFile} from "../store/actions/fileManage";

class FilesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    }
  }

  componentDidMount() {
    this.handleSubmit()
  }

  componentDidUpdate(prevProps, prevState) {
    const {token} = this.props;
    if (prevProps.token !== token) {
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    this.props.getFiles(this.props.token);
  }

  formatDate = (date) => {
    date = date.split('T')[0];
  }

  handleDownload = (filename) => {
    const {downloadFile, token} = this.props;
    downloadFile(filename, token)
  }
  handleDelete = (filename) => {
    const {deleteFile, getFiles, token} = this.props;
    deleteFile(filename, token)
      .then(res => {
        console.log(res);
        getFiles(token);
      })
  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  render() {
    const {loadingGetFiles, files} = this.props;
    const containerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '80px',
      padding: '10px'
    };
    return (
      <Card.Group style={{width: '1000px', marginLeft: '60px'}}>
        <div style={{marginLeft: '465px'}}>
          <Loader active={loadingGetFiles} size='small' inline='centered'>Loading files</Loader>
        </div>
        {files.length > 0 ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : (
          <React.Fragment>
            { !loadingGetFiles && (
              <Message icon='inbox' header="No data" style={{marginLeft: '10px'}}/>
            )}
          </React.Fragment>
        )}
      </Card.Group>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    token: state.auth.token,
    loadingGetFiles: state.file.loadingGetFiles,
    files: state.file.files
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({loadFile, getFiles, downloadFile, deleteFile}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilesContainer);
