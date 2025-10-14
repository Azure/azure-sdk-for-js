
---
page_type: sample
languages:
- typescript
products:
- azure
- azure-computer-vision
name: @azure-rest/ai-vision-image-analysis samples for TypeScript
description: Samples for the @azure-rest/ai-vision-image-analysis client library.
---

# Azure AI Vision Image Analysis client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure AI Vision Image Analysis in some common scenarios.

| **File Name**                                             | **Description**                                                                                |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [analyzeImageFromLocalFile.ts][analyzeImageFromLocalFile] | Analyze an image from a local file using Azure AI Vision Image Analysis service.               |
| [analyzeImageFromUrl.ts][analyzeImageFromUrl]             | Analyze an image from a URL using Azure AI Vision Image Analysis service.                      |
| [caption.ts][caption]                                     | Generate a human-readable phrase that describes the contents of an image.                      |
| [denseCaptions.ts][denseCaptions]                         | Generate detailed descriptions of up to 10 regions of the image.                               |
| [objects.ts][objects]                                     | Detect objects in an image and return their bounding box coordinates.                          |
| [read.ts][read]                                           | Extract printed or handwritten text from images.                                               |
| [tags.ts][tags]                                           | Return content tags for recognizable objects, living beings, scenery, and actions in an image. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Computer Vision][createinstance_azureaivision]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Transpile the TypeScript samples to JavaScript:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node analyzeImageFromLocalFile.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env VISION_ENDPOINT="<Computer Vision endpoint>" VISION_KEY="<your vision key>" node analyzeImageFromLocalFile.js
```

## Next Steps

Take a look at our [API Documentation]<!--TODO: publish refs [apiref]--> for more information about the APIs that are available in the clients.

[analyzeImageFromLocalFile]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vision/ai-vision-image-analysis-rest/samples/typescript/analyzeImageFromLocalFile.ts
[analyzeImageFromUrl]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vision/ai-vision-image-analysis-rest/samples/typescript/analyzeImageFromUrl.ts
[caption]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vision/ai-vision-image-analysis-rest/samples/typescript/caption.ts
[denseCaptions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vision/ai-vision-image-analysis-rest/samples/typescript/denseCaptions.ts
[objects]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vision/ai-vision-image-analysis-rest/samples/typescript/objects.ts
[read]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vision/ai-vision-image-analysis-rest/samples/typescript/read.ts
[tags]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/vision/ai-vision-image-analysis-rest/samples/typescript/tags.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/ai-vision
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureaivision]: https://portal.azure.com/#view/Microsoft_Azure_Marketplace/GalleryItemDetailsBladeNopdl/id/Microsoft.CognitiveServicesComputerVision
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/vision/ai-vision-image-analysis-rest/README.md
