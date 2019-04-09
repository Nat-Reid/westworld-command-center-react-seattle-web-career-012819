import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'


class HostList extends Component {
  renderHosts(){
    if (this.props.hosts){
      return this.props.hosts.map(host => {
       return <Host
               host={host} key={host.id}
               handleClick={this.props.selectHost}
               comissionHost={this.props.comissionHost}
              />
      });
    }
  }

  render(){
    return(
      <Card.Group itemsPerRow={6}>
        {this.renderHosts()}
      </Card.Group>
    )
  }
}

export default HostList
