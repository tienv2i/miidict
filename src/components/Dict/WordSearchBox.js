import React from 'react';
import Jss from 'react-jss';
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { FormControl, Col } from 'react-bootstrap';

const style = {
  tahContainer: {

  },
  show: {
    display: 'block'
  },
  noPaddingLeft: {
    paddingLeft: 0
  },
  noPaddingRight: {
    paddingRight: 0
  },
  noBorderLeft: {
    borderLeft: 'none'
  }
};

class WordSearchBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchLang: 'Anh',
      isLoading: false,
      options: []
    };
    this.handdleLangChange = this.handdleLangChange.bind(this);
    this.handdleChange = this.handdleChange.bind(this);
    this.handdleSearch = this.handdleSearch.bind(this);
  }
  handdleChange (selected) {
    this.props.setCurrentWord(selected[0]);
  }
  handdleSearch (query) {
    this.setState({
      isLoading: true
    });
    this.props.fetchHints(query, this.inputLang.value).then(() => {
      this.setState({
        isLoading: false,
        options: this.props.hints
      })
    });
  }
  handdleLangChange (event) {
    this.setState({
      searchLang: event.target.value
    });
    this.typeahead.getInstance().focus();
  }
  render () {
    return (
      <Col md={8} lg={6} mdPush={2} lgPush={3}>
        <Col xs={8} sm={10} className={this.props.classes.noPaddingRight}>
          <AsyncTypeahead
            isLoading={this.state.isLoading}
            options={this.state.options}
            labelKey={this.state.searchLang}
            onSearch={this.handdleSearch}
            onChange={this.handdleChange}
            menuId='typehead-dropdown-001'
            useCache={false}
            placeholder='Type to search ...'
            ref={(typeahead) => this.typeahead = typeahead}
          />
        </Col>
        <Col xs={4} sm={2} className={this.props.classes.noPaddingLeft}>
          <FormControl componentClass='select' placeholder='Language'
            defaultValue='Anh'
            inputRef={node => this.inputLang = node}
            className={this.props.classes.noBorderLeft}
            onChange={this.handdleLangChange}
          >
            <option value='Anh'>Anh</option>
            <option value='Viet'>Việt</option>
            <option value='Phap'>Pháp</option>
            <option value='Latin'>Latin</option>
          </FormControl>
        </Col>
      </Col>
    );
  }
}

export default Jss(style)(WordSearchBox);