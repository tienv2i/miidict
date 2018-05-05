import React from 'react';
import { Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { WordSearchBox, WordDisplay } from "../components/Dict";
import { setCurrentWord, fetchHints } from '../actions/dict';

class Dict extends React.Component {
  render() {
    return (
      <Grid>
        <Row className='mb-15'>
          <WordSearchBox 
            fetchHints={this.props.fetchHints}
            setCurrentWord={this.props.setCurrentWord}
            hints={this.props.dict.hints}
          />
        </Row>
        <Row className='mb-15'>
          { this.props.dict.currentWord && <WordDisplay currentWord={this.props.dict.currentWord} /> }
        </Row>
      </Grid>
    );
  }
}
function mapDispatchToProps(dispatch){
  return {
    fetchHints: (query, lang) => dispatch(fetchHints(query,lang)),
    setCurrentWord: (word) => dispatch(setCurrentWord(word))
  }
}
function mapStateToProps(state) {
  return {
    dict: state.dict
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dict);
