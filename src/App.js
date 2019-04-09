import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'
import { Log } from './services/Log'

class App extends Component {
  state = {
    hosts: [],
    areas: [],
    logs: [],
    selectedHost: null
  }

  getAreas(){
    fetch("http://localhost:4000/areas")
    .then(response => {
      return response.json()
    })
    .then(json => {
      this.setState({areas: json})
    })
  }

  getHosts(){
    fetch("http://localhost:4000/hosts")
    .then(response => {
      return response.json()
    })
    .then(json => {
      this.setState({hosts: json})
    });
  }

  inactiveHosts(){
    return this.state.hosts.filter(host => !host.active)
  }

  activeHosts(){
    return this.state.hosts.filter(host => host.active)
  }

  componentDidMount(){
    this.getHosts()
    this.getAreas()
  }

  selectHost = (hostId) => {
    let newHosts = [...this.state.hosts]
    newHosts.forEach(host => {
      host.id === hostId? host.selected = !host.selected : host.selected = false; //toggle selected of clicked host,
    })
    let selectedHost = this.state.hosts.find(host => host.id === hostId)
    selectedHost = selectedHost.selected?  selectedHost : null //clears if untoggled
    this.setState({
      hosts: newHosts,
      selectedHost
    })
  }

  comissionHost = (hostId) => {
    let host = this.state.hosts.find(host => host.id === hostId)
    host.active = !host.active
    let log = host.active ? Log.warn(`Activated ${host.firstName}`) : Log.notify(`Decommissioned ${host.firstName}`)
    this.state.logs.unshift(log)
    this.forceUpdate()
  }

  changeArea = (hostId, newAreaName) => {
    let host = this.state.hosts.find(host => host.id === hostId)
    let area = this.state.areas.find(area => area.name === newAreaName)
    if(this.state.hosts.filter(host => host.area === newAreaName).length === area.limit){
      this.state.logs.unshift(Log.error(`Too many hosts. Cannot add ${host.firstName} to ${newAreaName.replace('_',' ')}`))
    }else{
      this.state.logs.unshift(Log.notify(`${host.firstName} set in area ${newAreaName.replace('_',' ')}`))
      host.area = newAreaName;
    }
    this.forceUpdate()
  }

  activateAll = () => {
    this.state.logs.unshift(Log.warn("Activating all hosts!"))
    this.state.hosts.forEach(host => host.active = true)
    this.forceUpdate()
  }

  decomissionAll = () => {
    this.state.logs.unshift(Log.notify("Decomissioning all hosts."))
    this.state.hosts.forEach(host => host.active = false)
    this.forceUpdate()
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap
          hosts={this.activeHosts()}
          selectHost={this.selectHost}
          areas={this.state.areas}
        />
        <Headquarters
          hosts={this.inactiveHosts()}
          selectedHost={this.state.selectedHost}
          selectHost={this.selectHost}
          comissionHost={this.comissionHost}
          activateAll={this.activateAll}
          decomissionAll={this.decomissionAll}
          areas={this.state.areas}
          changeArea={this.changeArea}
          logs={this.state.logs}
        />
      </Segment>
    )
  }
}

export default App;
