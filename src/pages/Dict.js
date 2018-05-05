import React from 'react';
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-bootstrap";
import { WordDisplay, WordSearchBox } from "../components/Dict";


class Dict extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentWord: ''
    }
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col md={8} lg={6} mdPush={2} lgPush={3}>
            <WordSearchBox />
          </Col>
          {this.state.currentWord && <WordDisplay word={this.state.currentWord} />}
        </Row>
      </Grid>
    );
  }
}

export default connect()(Dict);
