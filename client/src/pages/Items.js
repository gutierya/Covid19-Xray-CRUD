import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import { routes } from '../constants';

import { Button } from '@material-ui/core';
import styled from 'styled-components';

import { PatientList, ItemsPlain, PatientTable } from '../pages';

const LinksGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr [col-start]);
  margin-bottom: 1em;
  min-height: 30px;
  padding: 1em;
  width: 100%;
`;

const LinkGridWrapper = styled.div``;

const isCurrentPage = linkPathname => {
  return window.location.pathname === linkPathname;
};

const linkTextColor = linkPathname => {
  return isCurrentPage(linkPathname) ? '#FFFFFF' : 'rgba(255,255,255,.75)';
};

const itemsPageVariants = [
  {

    name: 'Patients',
    toPathname: routes.PATIENTS,
    pageComponent: PatientList,

    name: 'Items',
    toPathname: routes.ITEMS,
    pageComonent: ItemsPlain,



  },
  /*{
    name: 'Items (using react-table-v6)',
    toPathname: `${routes.ITEMS}/react-table-v6`,
    pageComponent: ItemsTable,
  },*/
  /*{
    name: 'Items (with only styled-components)',
    toPathname: `${routes.ITEMS}/items-plain`,
    pageComponent: ItemsPlain,
  },*/
  {
    name: 'Create Patient',
    toPathname: routes.ITEM_INSERT,
  }
];

class Patients extends Component {
  render() {
    // TODO: would be better to dynamically create the routes based on page variations
    const patientsPages = (
      <Switch>
        <Route exact path={routes.PATIENTS} component={PatientList} />
        <Route exact path={`${routes.PATIENTS}/react-table-v6`} component={PatientTable} />
        <Route exact path={`${routes.PATIENTS}/items-plain`} component={ItemsPlain} />
      </Switch>
    );

    return (
      <>
        <LinksGridContainer>
          {itemsPageVariants.map((itemsPageVariant, i) => (
            <LinkGridWrapper
              key={itemsPageVariant.name}
              style={{ gridColumn: `${(i + 2) * 2 - 1} / span 2` }}>
              <Button className="bg-dark" variant="contained">
                <Link
                  style={{ color: linkTextColor(itemsPageVariant.toPathname) }}
                  to={itemsPageVariant.toPathname}>
                  {itemsPageVariant.name}
                </Link>
              </Button>
            </LinkGridWrapper>
          ))}
        </LinksGridContainer>
        {patientsPages}
      </>
    );
  }
}

export default Patients;
