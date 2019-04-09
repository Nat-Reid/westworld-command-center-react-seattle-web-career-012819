import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {

  return(
    <Card
      className={props.host.selected ? "host selected" : "host"}
      onClick={() => props.handleClick(props.host.id)}
      draggable="true"
      onDrop={() => console.log("dropped", props.host.firstName)}
      image={props.host.imageUrl}
      raised
    />
  )
}

export default Host
