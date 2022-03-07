import React, { Component } from 'react';
import { shared } from '../constants';
import api from '../api';

import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin-top: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
  max-width: 30%;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 30%;
  text-align: center;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const Fieldset = styled.fieldset.attrs({
  className: 'form-control',
})`
  background-color: transparent;
  border-color: transparent;
  margin: 1em auto 0.5em;
  max-width: 50%;
  min-height: 6em;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

class ExamInsert extends Component{
    constructor(props){
        super(props);
        this.state = {
            PatientKey: '',
            HoursSinceAdmission: 0,
            BrixiaScore:'', 
            key_findings:'',
            xRayLink:'',

        }
    }

    handleChangeInputPatientKey = async event => {
        const PatientKey = event.target.value;
        this.setState({ PatientKey });
      };

    handleChangeHours = async event => {
        const HoursSinceAdmission = event.target.validity.valid ? event.target.value : this.state.HoursSinceAdmission;
        this.setState({ HoursSinceAdmission });
      };

    
    handleChangeBrixiaScore = async event =>{
      const BrixiaScore = event.target.value;
      this.setState({ BrixiaScore })
    };

    handleChangeKeyFindings = async event =>{
        const key_findings = event.target.value;
        this.setState({ key_findings})
    };

    handleChangeXray = async event => {
        const xRayLink = event.target.value;
        this.setState({ xRayLink })
    };

    insertSingleItem = item => {
        return api
          .insertItem(item)
          .then(resp => {
            console.log('insertItem: resp');
            console.log(resp);
            if ((resp.data || {}).success) {
              const newItem = JSON.parse(resp.config.data);
              console.log('insertItem: newItem', newItem);
            }
            return resp;
          })
          .catch(err => {
            console.error(`ERROR in 'insertSingleItem': ${err}`);
            console.error(err);
            return err;
          });
      };

      handleInsertItem = event => {
        event.preventDefault();
    };

    render() {
        const { PatientKey, HoursSinceAdmission,  BrixiaScore, key_findings, xRayLink } = this.state;
    
    
        return (
          <Wrapper>
            <Title>Exam</Title>
    
            <Label>Patient Key: </Label>
            <InputText type="text" value={PatientKey} onChange={this.handleChangeInputPatientKey} />
    
            <Label> Hours Since Admission: </Label>
            <InputText
            type="number"
            step="0.1"
            lang="en-US"
            min="0"
            max="1000"
            pattern="[0-9]+([,\.][0-9]+)?"
            value={HoursSinceAdmission}
            onChange={this.handleChangeHours}
            />
    
            <Label>BrixiaScore: </Label>
               <InputText type="textarea" value={ BrixiaScore } onChange={this.handleChangeBrixiaScore} />
      

            <Label> XRay Link: </Label> 
            <InputText type="textarea" value={xRayLink} onChange={this.handleChangeXray} />
    
            <Label>Key Findings: </Label> {/* This used to be content */} 
            <InputText type="textarea" value={key_findings} onChange={this.handleChangeKeyFindings} />
    
            <Button onClick={this.handleInsertItem}>Add Exam</Button>
            <CancelButton href={'/items'}>Cancel</CancelButton>
          </Wrapper>
        );
      }
    }
    
    export default ExamInsert;
