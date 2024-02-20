# Azure AI Vision Image Analysis client library for JavaScript

The Image Analysis service provides AI algorithms for processing images and returning information about their content. In a single service call, you can extract one or more visual features from the image simultaneously, including getting a caption for the image, extracting text shown in the image (OCR) and detecting objects. For more information on the service and the supported visual features, see [Image Analysis overview][image_analysis_overview], and the [Concepts][image_analysis_concepts] page.

Use the Image Analysis client library to:
* Authenticate against the service
* Set what features you would like to extract
* Upload an image for analysis, or send an image URL
* Get the analysis result

[Product documentation][image_analysis_overview] 
| [Samples](https://aka.ms/azsdk/image-analysis/samples/js)
| [Vision Studio][vision_studio]
| [API reference documentation](https://aka.ms/azsdk/image-analysis/ref-docs/js)
| [Package (npm)](https://aka.ms/azsdk/image-analysis/package/npm)
| [SDK source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/vision/ai-vision-image-analysis-rest/src)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free).
- A [Computer Vision resource](https://portal.azure.com/#create/Microsoft.CognitiveServicesComputerVision) in your Azure subscription.
  * You will need the key and endpoint from this resource to authenticate against the service.
  * You can use the free pricing tier (`F0`) to try the service, and upgrade later to a paid tier for production.
  * Note that in order to run Image Analysis with the `Caption` or `Dense Captions` features, the Azure resource needs to be from one of the following GPU-supported regions: `East US`, `France Central`, `Korea Central`, `North Europe`, `Southeast Asia`, `West Europe`, or `West US`.

### Install the `@azure-rest/ai-vision-image-analysis` package

Install the Image Analysis client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-vision-image-analysis
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first, you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

Once you've initialized an `ImageAnalysisClient`, you need to select one or more visual features to analyze. The options are specified by the enum class `VisualFeatures`. The following features are supported:

1. `VisualFeatures.Caption`: ([Examples](#analyze-an-image-from-url) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/vision/ai-vision-image-analysis-rest/samples)) Generate a human-readable sentence that describes the content of an image.
1. `VisualFeatures.Read`: ([Examples](#extract-text-from-an-image-url) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/vision/ai-vision-image-analysis-rest/samples)) Also known as Optical Character Recognition (OCR). Extract printed or handwritten text from images.
1. `VisualFeatures.DenseCaptions`: Dense Captions provides more details by generating one-sentence captions for up to 10 different regions in the image, including one for the whole image.
1. `VisualFeatures.Tags`: Extract content tags for thousands of recognizable objects, living beings, scenery, and actions that appear in images.
1. `VisualFeatures.Objects`: Object detection. This is similar to tagging, but focused on detecting physical objects in the image and returning their location.
1. `VisualFeatures.SmartCrops`: Used to find a representative sub-region of the image for thumbnail generation, with priority given to include faces.
1. `VisualFeatures.People`: Locate people in the image and return their location.

For more information about these features, see [Image Analysis overview][image_analysis_overview], and the [Concepts][image_analysis_concepts] page.

### Supported image formats

Image Analysis works on images that meet the following requirements:

* The image must be presented in JPEG, PNG, GIF, BMP, WEBP, ICO, TIFF, or MPO format
* The file size of the image must be less than 20 megabytes (MB)
* The dimensions of the image must be greater than 50 x 50 pixels and less than 16,000 x 16,000 pixels

### ImageAnalysisClient

The `ImageAnalysisClient` is the primary interface for developers interacting with the Image Analysis service. It serves as the gateway from which all interaction with the library will occur.

## Examples

### Authenticate the client

Here's an example of how to create an `ImageAnalysisClient` instance using a key-based authentication and an Azure Active Directory authentication.


```javascript Snippet:ImageAnalysisAuthKey
const { ImageAnalysisClient, KeyCredential } = require("@azure-rest/ai-image-analysis");

const endpoint = "<your_endpoint>";
const key = "<your_key>";
const credential = new KeyCredential(key);

const client = new ImageAnalysisClient(endpoint, credential);
```

### Analyze an image from URL

The following example demonstrates how to analyze an image using the Image Analysis client library for JavaScript.

```javascript Snippet:ImageAnalysisFromUrl
const imageUrl = "https://example.com/image.jpg";
const features = ["Caption", "DenseCaptions", "Objects", "People", "Read", "SmartCrops", "Tags"];

async function analyzeImageFromUrl() {
  const result = await client.path("/imageanalysis:analyze").post({
    body: {
      url: imageUrl,
    },
    queryParameters: {
      features: features,
      "smartCrops-aspect-ratios": [0.9, 1.33],
    },
    contentType: "application/json",
  });

  console.log("Image analysis result:", result.body);
}

analyzeImageFromUrl();
```

### Analyze an image from a local file

In this example, we will analyze an image from a local file using the Image Analysis client library for JavaScript.

```javascript Snippet:ImageAnalysisFromLocalFile
const fs = require("fs");

const imagePath = "./path/to/your/image.jpg";
const features = ["Caption", "DenseCaptions", "Objects", "People", "Read", "SmartCrops", "Tags"];

async function analyzeImageFromFile() {
  const imageBuffer = fs.readFileSync(imagePath);

  const result = await client.path("/imageanalysis:analyze").post({
    body: imageBuffer,
    queryParameters: {
      features: features,
      "smartCrops-aspect-ratios": [0.9, 1.33],
    },
    contentType: "application/octet-stream",
  });

  console.log("Image analysis result:", result.body);
}

analyzeImageFromFile();
```

### Extract text from an image Url
This example demonstrates how to extract printed or hand-written text for the image file [sample.jpg](https://aka.ms/azsdk/image-analysis/sample.jpg) using the ImageAnalysisClient. The method call returns an ImageAnalysisResult object. The ReadResult property on the returned object includes a list of text lines and a bounding polygon surrounding each text line. For each line, it also returns a list of words in the text line and a bounding polygon surrounding each word.
``` javascript Snippet:readmeText
const client: ImageAnalysisClient = createImageAnalysisClient(endpoint, credential);

const features: string[] = [
  'Read'
];

const imageUrl: string = 'https://aka.ms/azsdk/image-analysis/sample.jpg';

client.path('/imageanalysis:analyze').post({
  body: { url: imageUrl },
  queryParameters: { features: features },
  contentType: 'application/json'
}).then(result => {
  const iaResult: ImageAnalysisResultOutput = result.body as ImageAnalysisResultOutput;

  // Process the response
  if (iaResult.readResult && iaResult.readResult.blocks.length > 0) {
    iaResult.readResult.blocks.forEach(block => {
      console.log(`Detected text block: ${JSON.stringify(block)}`);
    });
  } else {
    console.log('No text blocks detected.');
  }
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/vision/ai-vision-image-analysis-rest/samples) directory for detailed examples that demonstrate how to use the client libraries.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[image_analysis_overview]: https://learn.microsoft.com/azure/ai-services/computer-vision/overview-image-analysis?tabs=4-0
[image_analysis_concepts]: https://learn.microsoft.com/azure/ai-services/computer-vision/concept-tag-images-40
[vision_studio]: https://aka.ms/vision-studio/image-analysis
