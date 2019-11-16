import React, { Component } from 'react';
import './App.css';
import * as faceapi from 'face-api.js';
import WebCamPicture from './components/WebCamPicture.js';

const MODEL_URL = '/models'
const minConfidence = 0.6


export default class App extends Component {

  constructor(props){
    super(props);
    this.fullFaceDescriptions = null;
    this.canvasPicWebCam = React.createRef();
  }

  async componentDidMount() {
    await this.loadModels();
   
   
  }

  async loadModels () {
    //await faceapi.loadModels(MODEL_URL)
    await faceapi.loadFaceDetectionModel(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)
  }

  getFullFaceDescription = async (canvas) => {
    console.log(canvas);
    this.fullFaceDescriptions = await faceapi.allFaces(canvas, minConfidence);
    console.log(this.fullFaceDescriptions);
  }

  drawDescription = (canvas) => {
    this.fullFaceDescriptions.forEach((fd, i) => {
      faceapi.drawLandmarks(canvas, fd.landmarks, { drawLines: false })
    })
  }

  landmarkWebCamPicture = (picture) => {
    const ctx = this.canvasPicWebCam.current.getContext("2d");
    var image = new Image();
    image.onload = async () => {
      ctx.drawImage(image,0,0);
      await this.getFullFaceDescription(this.canvasPicWebCam.current);
      this.drawDescription(this.canvasPicWebCam.current);
    };
    image.src = picture;
  }

  render() {
    return (
      <div className="App" >
        <WebCamPicture landmarkPicture={this.landmarkWebCamPicture}/>
        <canvas ref={this.canvasPicWebCam} width={350} height={500} />
      </div>
    );
  }
}
