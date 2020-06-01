import PropTypes from "prop-types";
import React, {Component} from "react";
import FileUpload from "../components/FileUpload";
import {Link} from "react-router-dom";
import FilesContainer from "../components/FilesContainer";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import {connect} from "react-redux";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({fixed: false});
  showFixedMenu = () => this.setState({fixed: true});

  render() {
    const {children} = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({sidebarOpened: false});

  handleToggle = () => this.setState({sidebarOpened: true});

  render() {
    const {children} = this.props;
    const {sidebarOpened} = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({children}) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = ({authenticated}) => (
  <ResponsiveContainer>
    {authenticated ? (
      <Segment style={{padding: "8em 0em"}} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={12}>
              <FileUpload/><br/><br/>
              <FilesContainer/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    ) : (
      <Segment style={{padding: "8em 0em"}} vertical>
        <Container text>
          <Header as="h3" style={{fontSize: "2em"}}>
            File storage is just the beginning
          </Header>
          <p style={{fontSize: "1.33em"}}>
            Bring traditional files, cloud content, FileStorage Paper docs, and web shortcuts together in one place—and
            work
            the way that works for you.
          </p>
          <Link to='/signup'>
            <Button as="a" size="large">Start now</Button>
          </Link>
          <Divider
            as="h4"
            className="header"
            horizontal
            style={{margin: "3em 0em", textTransform: "uppercase"}}
          >
            <a href="#">Case Studies</a>
          </Divider>
          <Header as="h3" style={{fontSize: "2em"}}>
            Stay focused
          </Header>
          <p style={{fontSize: "1.33em"}}>
            Personalized suggestions give you files and folders when you need them so you spend less time searching.
          </p>
          <Link to='/signup'>
            <Button as="a" size="large">I'm Still Quite Interested</Button>
          </Link>
        </Container>
      </Segment>
    )}

  </ResponsiveContainer>
);

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps, null)(HomepageLayout);
