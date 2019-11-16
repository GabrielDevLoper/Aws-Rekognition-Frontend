import React, {Component } from 'react';
import Webcam from 'react-webcam';


const videoConstraints = {
    width: 720,
    height:500,
    facingMode: "user"
};

export default class WebcamPicture extends Component{
    constructor(props){
        super(props);
        this.state = {
            takingPicture: false
        }
        this.image = null;
        this.webcam = React.createRef();
    }

    capture = () => {
        const imageSrc = this.webcam.current.getScreenshot();
        this.props.landmarkPicture(imageSrc);
    }

    render(){
        return(
            <div className="App" style={{display: 'flex' , flexDirection:'column' , alignItems:'center'}} >
                <Webcam 
                    audio = {false}
                    height = {500}
                    ref={this.webcam}
                    screenshotFormat="image/jpeg"
                    width={720}
                    videoConstraints={videoConstraints}
                />
                <img src="/img/cameraIcon.png" alt="Take Pic" height={100}
                    onClick={this.capture}
                />
            </div>



        );
    }
}