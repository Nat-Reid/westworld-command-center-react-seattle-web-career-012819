import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'


const Details = (props) => {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  const renderSomething = () => {
    if(props.selectedHost){
      return <HostInfo
        host={props.selectedHost}
        comissionHost={props.comissionHost}
        changeArea={props.changeArea}
        areaNames={props.areaNames}
      />
    }else{
      return <Image size='medium' src={Images.westworldLogo}/>
    }
  }

  return(
    <Segment id="details" className="HQComps">
      {renderSomething()}
    </Segment>
  )
}

export default Details
