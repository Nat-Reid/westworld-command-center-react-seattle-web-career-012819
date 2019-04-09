import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'


class WestworldMap extends Component {
  renderAreas(){
    return this.props.areas.map(area => {
      let areaHosts = this.props.hosts.filter(host => host.area === area.name)
      return <Area
        area={area}
        key={area.id}
        hosts={areaHosts}
        selectHost={this.props.selectHost}
      />
    });
  }

  render(){
    return (
      <Segment id="map" >
        {this.renderAreas()}
      </Segment>
    )
  }

}

export default WestworldMap
