import React,{ Component } from 'react';
import './App.css';
import * as faceapi from 'face-api.js';
const Webcam = require('./components/webCam');

//const video = document.getElementById('video');

const MODEL_URL = '/models'
const minConfidence = 0.6

export default class App extends Component{
  constructor(props){
    super(props);
    this.fullFaceDescriptions = null;
    this.canvas = React.createRef();
    this.canvasPicWebCam = React.createRef();
  }


  async componentDidMount(){
    await this.loadModels();
    const testImageHTML = document.getElementById('test');
    this.drawHTMLImage(this.canvas.current,testImageHTML,296,296);
    await this.getFullFaceDescription(this.canvas.current);
    this.drawDescription(this.canvas.current);
  }

  async loadModels(){
    await faceapi.loadFaceDetectionModel(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
  }

  /*
  async startVideo(){
   await navigator.getUserMedia({ video: {} },
      stream => video.srcObject = stream,
      err => console.error(err));
    
  }
  */
 getFullFaceDescription = async (canvas) => {
  console.log(canvas);
  this.fullFaceDescriptions = await faceapi.allFaces(canvas, minConfidence);
  console.log(this.fullFaceDescriptions);
  }

  drawDescription = (canvas) => {
    this.fullFaceDescriptions.forEach((fd, i) => {
      faceapi.drawLandmarks(canvas, fd.landmarks, { drawLines: true })
    });
  }

  drawHTMLImage(canvas,image,width,height){
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image,0,0,width,height);
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
      <div className="container">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
            <canvas ref={this.canvas} width={296} height={296} />
          </div>
          <Webcam landmarkPicture={this.landmarkWebCamPicture} />
          <canvas ref={this.canvasPicWebCam} width={350} height={350} /> 
      </div>
    );
  }
}


 



