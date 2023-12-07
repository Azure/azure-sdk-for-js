const { ComputerVisionClient, AzureKeyCredential } = require('@azure/cognitiveservices-computervision');
const { DefaultAzureCredential } = require('@azure/identity');

let key = '<your_Azure_Cognitive_Services_key>';
let endpoint = '<your_endpoint>';

const computerVisionClient = new ComputerVisionClient(new AzureKeyCredential(key), endpoint);

async function analyzeImageForTags(url) {
  const result = await computerVisionClient.analyzeImage(url, { visualFeatures: ['Tags'] });

  console.log(`Tags: ${result.tags.map(tag => `${tag.name} (${tag.confidence})`).join(', ')});
}

analyzeImageForTags('https://example.com/image.jpg');