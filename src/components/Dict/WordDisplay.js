import React from 'react';
import { Panel, Col } from 'react-bootstrap';

const WordDisplay = props => {
  return (
    <Col md={8} lg={6} mdPush={2} lgPush={3}>
      <Col sm={6}>
        <Panel bsStyle='primary'>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Tiếng Anh</Panel.Title>
          </Panel.Heading>
          <Panel.Body>{props.currentWord.Anh}</Panel.Body>
        </Panel>
      </Col>
      <Col sm={6}>
        <Panel  bsStyle='primary'>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Tiếng Việt</Panel.Title>
          </Panel.Heading>
          <Panel.Body>{props.currentWord.Viet}</Panel.Body>
        </Panel>
      </Col>
      <Col sm={6}>
        <Panel bsStyle='primary'>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Tiếng Pháp</Panel.Title>
          </Panel.Heading>
          <Panel.Body>{props.currentWord.Phap}</Panel.Body>
        </Panel>
      </Col>
      <Col sm={6}>
        <Panel bsStyle='primary'>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Tiếng Latin</Panel.Title>
          </Panel.Heading>
          <Panel.Body>{props.currentWord.Latin}</Panel.Body>
        </Panel>
      </Col>
    </Col>
  );
};

export default WordDisplay;