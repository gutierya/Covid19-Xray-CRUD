import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DeleteButton } from '../components/buttons';
import api from '../api';

import styled from 'styled-components';

const generateRandomImageWidth = () => {
  // between 40-69, with default of 42
  const randomNumberAsString = Math.random()
    .toString()
    .match(/[4-6]\d/) || ['42'];
  return parseInt(randomNumberAsString) * 10;
};

const generateRandomImageHeight = () => {
  // between 30-59, with default of 36
  const randomNumberAsString = Math.random()
    .toString()
    .match(/[3-5]\d/) || ['36'];
  return parseInt(randomNumberAsString) * 10;
};

const generateRandomCat = () =>
  `https://placekitten.com/${generateRandomImageWidth()}/${generateRandomImageHeight()}`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 40px 40px 40px;

  @media screen and (max-width: 420px) {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
`;

const ItemContainer = styled.div`
  align-items: flex-start;
  border: 2px #899499 solid;
  border-radius: 5%;
  display: inline-flex;
  flex-direction: column;
  margin: 1em 2.5% 2em;
  max-width: 20%;
  padding: 1em;
  text-align: left;
  width: 25vw;
`;

const ItemImage = styled.img`
  margin: auto;
  max-height: 22em;
  object-fit: contain;
  max-width: 80%;
`;

const NameHeader = styled.h1`
  font-size: 2rem;
  width: 100%;
`;

const DetailParagraph = styled.p`
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

class ItemsPlain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: {},
    };
  }

  componentDidMount() {
    console.log('PatientList: props');
    console.log(this.props);
    // if (((this.props.itemData || {}).items || []).length) return;

    this.fetchAllPatients();
  }

  fetchAllPatients = () => {
    api
      .getAllPatients()
      .then(resp => {
        const { patients } = resp.data;
        console.log('getAllPatients: resp');
        console.log(patients);
        this.setState({ patients });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllPatients': ${err}`);
        console.error(err);
        return err;
      });
  };

  deleteSinglePatient = patientId => {
    return api
      .deletePatientById(patientId)
      .then(resp => {
        console.log('deletePatientById: resp');
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'deleteSinglePatient': ${err}`);
        console.error(err);
        return err;
      });
  };

  handleRemovePatient = data => {
    const patientId = data;

    this.deleteSinglePatient(patientId).then(resp => {
      console.log('handleRemovePatient: resp');
      console.log(resp);
      this.fetchAllPatients();
    });
  };

  render() {
    const patients = this.state.patients || {};
    console.log(patients);

    return (
      <Wrapper>
        {(patients || []).length > 0
          ? patients.map(patient => (
              <ItemContainer key={patient._id}>
                <ItemImage src={generateRandomCat()}></ItemImage>
                <NameHeader>{patient.name}</NameHeader>
                <DetailParagraph>ID: {patient._id}</DetailParagraph>
                <DetailParagraph>Priority: {patient.priority}</DetailParagraph>
                <ButtonsWrapper>
                  <Link data-update-id={patient._id} to={`/patient/update/${patient._id}`}>
                    Update Patient
                  </Link>
                  <DeleteButton id={patient._id} onDelete={this.handleRemovePatient} />
                </ButtonsWrapper>
              </ItemContainer>
            ))
          : `No patients to render... :(`}
      </Wrapper>
    );
  }
}

export default ItemsPlain;
