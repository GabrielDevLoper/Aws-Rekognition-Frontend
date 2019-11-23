import React, { Component } from 'react';
import Webcam from 'react-webcam';
import './app.css';


const videoConstraints = {
  width: 350,
  height: 1080,
  facingMode: "user"
};

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      takingPicture: false
    }
    this.image = null;
    this.fullFaceDescriptions = null;
    this.webcam = React.createRef();
  }

  capture = () => {
    const imageSrc = this.webcam.current.getScreenshot();
    console.log(imageSrc);
  };

  render() {
    return (
      <React.Fragment>
        <Webcam
          audio={false}
          height={1080}
          ref={this.webcam}
          screenshotFormat="image/jpeg"
          width={720}
          videoConstraints={videoConstraints}
        />
        <button type="submit" className="btnEnviar" onClick={this.capture}>Tirar Foto</button>
      </React.Fragment>
    );
  }
}