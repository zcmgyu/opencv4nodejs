import { Mat } from '@u4/opencv4nodejs';
import { cv, getDataFilePath } from '../utils';
import { runVideoFaceDetection } from './commons';
if (cv.version.minor === 4) {
  console.log('Warning: It seems like opencv 3.4 does not run the opencl version of detectMultiScale.');
}

const videoFile = getDataFilePath('people.mp4');

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

function detectFaces(img: Mat) {
  const options = {
    scaleFactor: 1.1,
    minNeighbors: 10
  };
  return classifier.detectMultiScaleGpu(img.bgrToGray(), options);// .objects;
}

runVideoFaceDetection(videoFile, detectFaces);
