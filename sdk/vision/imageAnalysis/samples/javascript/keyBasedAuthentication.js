const { ImageAnalysisClient } = require('@azure/ai-image-analysis');
const { AzureKeyCredential } = require('@azure/core-auth');

const endpoint = process.env['VISION_ENDPOINT'] || '<cognitive services endpoint>';
const key = process.env['VISION_KEY'] || '<cognitive services key>';
const credential = new AzureKeyCredential(key);

const client = new ImageAnalysisClient(endpoint, credential);
