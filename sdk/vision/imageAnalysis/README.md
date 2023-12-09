# Azure AI Vision Image Analysis client library for JavaScript

This project is used as a client library for the Azure AI Vision Image Analysis service. It is intended to help developers work with the Image Analysis service for extracting a wide variety of visual features from images. The latest version of Image Analysis, 4.0, provides new features like synchronous OCR and people detection.

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

Usually, you'd put a shell command for provisioning the necessary Azure services here.

### Install the `@azure/ai-image-analysis` package

Install the Image Analysis client library for JavaScript with `npm`:

```bash
npm install @azure/imageAnalysis
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first, you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

### Further examples

Top-level examples usually include things like creating and authenticating the main Client. If your service supports multiple means of authenticating (e.g. key-based and Azure Active Directory) you can give a separate example of each.

## Key concepts

### ImageAnalysisClient

The `ImageAnalysisClient` is the primary interface for developers interacting with the Image Analysis service. It serves as the gateway from which all interaction with the library will occur.

### Additional Examples

Create a section for each top-level service concept you want to explain.

## Examples

### Authenticate the client

Here's an example of how to create an `ImageAnalysisClient` instance using a key-based authentication and an Azure Active Directory authentication.

#### Key-based authentication

```javascript Snippet:ImageAnalysisAuthKey
const { ImageAnalysisClient, KeyCredential } = require("@azure/ai-image-analysis");

const endpoint = "<your_endpoint>";
const key = "<your_key>";
const credential = new KeyCredential(key);

const client = new ImageAnalysisClient(endpoint, credential);
```

#### Azure Active Directory authentication

```javascript Snippet:ImageAnalysisAuthAAD
const { ImageAnalysisClient } = require("@azure/ai-image-analysis");
const { DefaultAzureCredential } = require("@azure/identity");

const endpoint = "<your_endpoint>";

const client = new ImageAnalysisClient(endpoint, new DefaultAzureCredential());
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

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/rhurey/ia_dev/sdk/ai-image-analysis/ai-image-analysis/samples) directory for detailed examples that demonstrate how to use the client libraries.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

## Key concepts

Once you've initialized an `ImageAnalysisClient`, you need to select one or more visual features to analyze. The options are specified by the enum class `VisualFeatures`. The following features are supported:

1. `VisualFeatures.Caption`: Generate a human-readable sentence that describes the content of an image.
1. `VisualFeatures.Read`: Also known as Optical Character Recognition (OCR). Extract printed or handwritten text from images.
1. `VisualFeatures.DenseCaptions`: Dense Captions provides more details by generating one-sentence captions for up to 10 different regions in the image, including one for the whole image.
1. `VisualFeatures.Tags`: Extract content tags for thousands of recognizable objects, living beings, scenery, and actions that appear in images.
1. `VisualFeatures.Objects`: Object detection. This is similar to tagging, but focused on detecting physical objects in the image and returning their location.
1. `VisualFeatures.SmartCrops`: Used to find a representative sub-region of the image for thumbnail generation, with priority given to include faces.
1. `VisualFeatures.People`: Locate people in the image and return their location.

For more information about these features, see [Image Analysis overview][image_analysis_overview], and the [Concepts][image_analysis_concepts] page.

### Analyze from image buffer or URL

The `ImageAnalysisClient` a method `Analyze` that has two overloads:

- `Analyze (BianryData ...`: Analyze an image from an input object. The client will upload the image to the service as part of the REST request.
- `Analyze (Uri ...)`: Analyze an image from a publicly-accessible URL, via the `Uri` object. The client will send the image URL to the service. The service will download the image.
