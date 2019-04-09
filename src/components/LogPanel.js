import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'

const LogPanel = (props) => (
  <Segment className="HQComps" id="logPanel">
    <pre>
      {props.logs.map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
    </pre>
    <Button
      fluid
      color={props.areAllActive ? "green" : "red"}
      content={props.areAllActive ? "DECOMMISSION All" : "ACTIVATE ALL"}
      onClick={props.areAllActive ? props.decomissionAll: props.activateAll}
    />
  </Segment>
)

export default LogPanel
