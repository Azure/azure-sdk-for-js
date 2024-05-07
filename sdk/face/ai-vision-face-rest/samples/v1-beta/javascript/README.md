# Face API client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Face API in some common scenarios.

| **File Name**                                                 | **Description**                      |
| ------------------------------------------------------------- | ------------------------------------ |
| [aadAuth.js][aadauth]                                         | creates a liveness detection session |
| [detect.js][detect]                                           | creates a liveness detection session |
| [findSimilars.js][findsimilars]                               | creates a liveness detection session |
| [grouping.js][grouping]                                       | creates a liveness detection session |
| [liveness.js][liveness]                                       | creates a liveness detection session |
| [livenessWithVerify.js][livenesswithverify]                   | creates a liveness detection session |
| [livenessWithVerifyWithImage.js][livenesswithverifywithimage] | creates a liveness detection session |
| [personDirectory.js][persondirectory]                         | creates a liveness detection session |
| [personGroup.js][persongroup]                                 | creates a liveness detection session |
| [verify.js][verify]                                           | creates a liveness detection session |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node aadAuth.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env FACE_ENDPOINT="<face endpoint>" node aadAuth.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[aadauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/face/ai-vision-face-rest/samples/v1-beta/javascript/aadAuth.js
[detect]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/face/ai-vision-face-rest/samples/v1-beta/javascript/detect.js
[findsimilars]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/face/ai-vision-face-rest/samples/v1-beta/javascript/findSimilars.js
[grouping]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/face/ai-vision-face-rest/samples/v1-beta/javascript/grouping.js
[liveness]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/face/ai-vision-face-rest/samples/v1-beta/javascript/liveness.js
[livenesswithverify]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/face/ai-vision-face-rest/samples/v1-beta/javascript/livenessWithVerify.js
[livenesswithverifywithimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/face/ai-vision-face-rest/samples/v1-beta/javascript/livenessWithVerifyWithImage.js
[persondirectory]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/face/ai-vision-face-rest/samples/v1-beta/javascript/personDirectory.js
[persongroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/face/ai-vision-face-rest/samples/v1-beta/javascript/personGroup.js
[verify]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/face/ai-vision-face-rest/samples/v1-beta/javascript/verify.js
[apiref]: https://aka.ms/azsdk-javascript-face-ref
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest/README.md
