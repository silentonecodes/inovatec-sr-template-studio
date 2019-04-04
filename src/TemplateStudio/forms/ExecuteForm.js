/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CtoInput from '../inputs/CtoInput';
import { Form, Divider, Grid, Button, Tab, Icon } from 'semantic-ui-react';

class ExecuteForm extends Form {
  constructor(props) {
    super(props);
    this.handleRequestChange = this.handleRequestChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleResponseChange = this.handleResponseChange.bind(this);
    this.handleEmitChange = this.handleEmitChange.bind(this);
    this.handleRunLogic = this.handleRunLogic.bind(this);
    this.handleInitLogic = this.handleInitLogic.bind(this);
  }

  handleRequestChange(text) {
    this.props.handleRequestChange(text);
  }

  handleStateChange(text) {
    this.props.handleStateChange(text);
  }

  handleResponseChange(text) {
    this.props.handleResponseChange(text);
  }

  handleEmitChange(text) {
    this.props.handleEmitChange(text);
  }

  handleRunLogic(text) {
    this.props.handleRunLogic(text);
  }

  handleInitLogic(text) {
    this.props.handleInitLogic(text);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response !== this.props.response) {
      this.handleResponseChange(nextProps.response);
    }
    if (nextProps.cstate !== this.props.cstate) {
      this.handleStateChange(nextProps.cstate);
    }
    if (nextProps.emit !== this.props.emit) {
      this.handleEmitChange(nextProps.emit);
    }
  }

  render() {
    const { request, cstate, response, emit, model } = this.props;
    const obligations = JSON.parse(emit).map((obligation, index) =>
      (<div key={index}>
        <CtoInput
          json={JSON.stringify(obligation)}
          model={model[0].content}
          handleJSONChange={this.handleEmitChange}
          readOnly
        />
        <Divider />
      </div>),
    );
    return (
      <Tab.Pane>
        <Button size="small" type="submit" color="blue" onClick={this.handleRunLogic} compact><Icon name="send" /> Send Request</Button>
        <Button size="small" type="submit" color="blue" onClick={this.handleInitLogic} compact><Icon name="redo" flipped="horizontally" /> Reset Contract</Button>
        <Grid>
          <Divider hidden />
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Field>
                <label>Request</label>
              </Form.Field>
              <CtoInput
                json={request}
                model={model[0].content}
                handleJSONChange={this.handleRequestChange}
                showSelect
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Response</label>
              </Form.Field>
              <CtoInput
                json={response}
                model={model[0].content}
                handleJSONChange={this.handleResponseChange}
                readOnly
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Field>
                <label>Contract State</label>
              </Form.Field>
              <CtoInput
                json={cstate}
                model={model[0].content}
                handleJSONChange={this.handleStateChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Obligations</label>
              </Form.Field>
              {obligations}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    );
  }
}

ExecuteForm.propTypes = {
  handleRequestChange: PropTypes.func.isRequired,
  handleStateChange: PropTypes.func.isRequired,
  handleResponseChange: PropTypes.func.isRequired,
  handleEmitChange: PropTypes.func.isRequired,
  handleRunLogic: PropTypes.func.isRequired,
  handleInitLogic: PropTypes.func.isRequired,
  request: PropTypes.string.isRequired,
  cstate: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired,
  emit: PropTypes.string.isRequired,
};

export default ExecuteForm;
