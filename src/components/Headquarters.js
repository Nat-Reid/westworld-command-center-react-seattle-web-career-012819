import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import ColdStorage from './ColdStorage'
import Details from './Details'
import LogPanel from './LogPanel'


const Headquarters = (props) => {
  return(
    <Grid celled='internally'>
      <Grid.Column width={8}>
        <ColdStorage
          hosts={props.hosts}
          selectHost={props.selectHost}
          comissionHost={props.comissionHost}
          />
      </Grid.Column>
      <Grid.Column width={5}>
        <Details
          selectedHost={props.selectedHost}
          comissionHost={props.comissionHost}
          changeArea={props.changeArea}
          areaNames={props.areas.map(area => {
            return {key: area.name,
                    value: area.name,
                    text: area.name.replace('_',' ')}
          })}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel
          activateAll={props.activateAll}
          decomissionAll={props.decomissionAll}
          areAllActive={props.hosts && props.hosts.length === 0}
          logs={props.logs}
        />
      </Grid.Column>
    </Grid>
  )
}

export default Headquarters;
