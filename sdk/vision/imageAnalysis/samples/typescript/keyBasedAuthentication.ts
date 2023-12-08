import createImageAnalysisClient, { ImageAnalysisClient, ImageAnalysisResultOutput } from '@azure/imageAnalysis';
import { AzureKeyCredential } from '@azure/core-auth';

const endpoint: string = process.env['VISION_ENDPOINT'] || '<cognitive services endpoint>';
const key: string = process.env['VISION_KEY'] || '<cognitive services key>';
const credential = new AzureKeyCredential(key);

const client: ImageAnalysisClient = createImageAnalysisClient(endpoint, credential);
