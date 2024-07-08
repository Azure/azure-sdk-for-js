# Azure AI Face client library for JavaScript

The Azure AI Face service provides AI algorithms that detect, recognize, and analyze human faces in images. It includes the following main features:

- Face detection and analysis
- Liveness detection
- Face recognition
  - Face verification ("one-to-one" matching)
  - Face identification ("one-to-many" matching)
- Find similar faces
- Group faces

[Product documentation](https://learn.microsoft.com/azure/ai-services/computer-vision/overview-identity)
| [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest)
| [Package (NPM)](https://www.npmjs.com/package/@azure-rest/ai-vision-face)
| [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest/samples)
| [API reference documentation](https://aka.ms/azsdk-javascript-face-ref)

## Getting started

### Currently supported environments

- LTS versions of Node.js

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/).
- Your Azure account must have a `Cognitive Services Contributor` role assigned in order for you to agree to the responsible AI terms and create a resource. To get this role assigned to your account, follow the steps in the [Assign roles](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-steps) documentation, or contact your administrator.
- Once you have sufficient permissions to control your Azure subscription, you need either
  - an [Azure Face account](https://portal.azure.com/#blade/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/Face) or
  - an [Azure AI services multi-service account](https://portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/AllInOne)

### Create a Face or an Azure AI services multi-service account

Azure AI Face supports both [multi-service](https://learn.microsoft.com/azure/ai-services/multi-service-resource?tabs=windows&pivots=azportal#supported-services-with-a-multi-service-resource) and single-service access. Create an Azure AI services multi-service account if you plan to access multiple Azure AI services under a single endpoint/key. For Face access only, create a Face resource.

- To create a new Face or Azure AI services multi-service account, you can use [Azure Portal](https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesFace), [Azure PowerShell](https://learn.microsoft.com/azure/ai-services/multi-service-resource?tabs=windows&pivots=azpowershell), or [Azure CLI](https://learn.microsoft.com/azure/ai-services/multi-service-resource?tabs=windows&pivots=azcli).

### Install the package

Install the Azure Face REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-vision-face
```

### Authenticate the client

In order to interact with the Face service, you will need to create an instance of a client.
An **endpoint** and **credential** are necessary to instantiate the client object.

Both key credential and Microsoft Entra ID credential are supported to authenticate the client.
For enhanced security, we strongly recommend utilizing Microsoft Entra ID credential for authentication in the production environment, while AzureKeyCredential should be reserved exclusively for the testing environment.

#### Get the endpoint

You can find the endpoint for your Face resource using the Azure Portal or Azure CLI:

```bash
# Get the endpoint for the Face resource
az cognitiveservices account show --name "resource-name" --resource-group "resource-group-name" --query "properties.endpoint"
```

Either a regional endpoint or a custom subdomain can be used for authentication. They are formatted as follows:

```
Regional endpoint: https://<region>.api.cognitive.microsoft.com/
Custom subdomain: https://<resource-name>.cognitiveservices.azure.com/
```

A regional endpoint is the same for every resource in a region. A complete list of supported regional endpoints can be consulted [here](https://azure.microsoft.com/global-infrastructure/services/?products=cognitive-services). Please note that regional endpoints do not support Microsoft Entra ID authentication. If you'd like migrate your resource to use custom subdomain, follow the instructions [here](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains#how-does-this-impact-existing-resources).

A custom subdomain, on the other hand, is a name that is unique to the resource. Once created and linked to a resource, it cannot be modified.

#### Create the client with a Microsoft Entra ID credential

`AzureKeyCredential` authentication is used in the examples in this getting started guide, but you can also authenticate with Microsoft Entra ID using the [@azure/identity](https://learn.microsoft.com/javascript/api/@azure/identity/?view=azure-node-latest) library.
Note that regional endpoints do not support Microsoft Entra ID authentication. Create a [custom subdomain](https://docs.microsoft.com/azure/cognitive-services/authentication#create-a-resource-with-a-custom-subdomain) name for your resource in order to use this type of authentication.

To use the [DefaultAzureCredential](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential?view=azure-node-latest) type shown below, or other credential types provided with the Azure SDK, please install the `@azure/identity` package:

```
npm install --save @azure/identity
```

You will also need to [register a new Microsoft Entra ID application and grant access](https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal) to Face by assigning the `"Cognitive Services User"` role to your service principal.

Once completed, set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as environment variables:
`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```js
/**
 * DefaultAzureCredential will use the values from these environment
 * variables: AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET
 */
import { DefaultAzureCredential } from '@azure/identity';
import createFaceClient from '@azure-rest/ai-vision-face';

const endpoint = process.env['FACE_ENDPOINT'] || '<endpoint>';
const credential = new DefaultAzureCredential();
const client = createFaceClient(endpoint, credential);
```

#### Create the client with AzureKeyCredential

To use an API key as the `credential` parameter, pass the key as a string into an instance of [AzureKeyCredential](https://learn.microsoft.com/javascript/api/@azure/core-auth/azurekeycredential?view=azure-node-latest).
You can get the API key for your Face resource using the [Azure Portal](https://learn.microsoft.com/azure/ai-services/multi-service-resource?tabs=windows&pivots=azportal#get-the-keys-for-your-resource) or [Azure CLI](https://learn.microsoft.com/azure/ai-services/multi-service-resource?tabs=windows&pivots=azcli#get-the-keys-for-your-resource):

```bash
# Get the API keys for the Face resource
az cognitiveservices account keys list --name "<resource-name>" --resource-group "<resource-group-name>"
```

```js
import { AzureKeyCredential } from '@azure/core-auth';
import createFaceClient from '@azure-rest/ai-vision-face';

const endpoint = process.env['FACE_ENDPOINT'] || '<endpoint>';
const apikey = process.env['FACE_APIKEY'] || '<apikey>';
const credential = new AzureKeyCredential(apikey);
const client = createFaceClient(endpoint, credential);
```

## Key concepts

### FaceClient

The `FaceClient` is the primary interface for developers interacting with the Azure AI Face service. It follows the design of [REST client](https://devblogs.microsoft.com/azure-sdk/azure-rest-libraries-for-javascript/) and serves as the gateway from which all interaction with the library will occur.

### Long-running operations

Long-running operations are operations which consist of an initial request sent to the service to start an operation, followed by polling the service at intervals to determine whether the operation has completed or failed, and if it has succeeded, to get the result. For more information, please refer to the "Long-running operations" section in this [blog post](https://devblogs.microsoft.com/azure-sdk/azure-rest-libraries-for-javascript/).

Current long-running face operations:

- Face list operations
  - [Train large face list](https://learn.microsoft.com/rest/api/face/face-list-operations/train-large-face-list?view=rest-face-v1.1-preview.1&tabs=HTTP)
- Person group operations
  - [Train large person group](https://learn.microsoft.com/rest/api/face/person-group-operations/update-large-person-group?view=rest-face-v1.1-preview.1&tabs=HTTP)
  - [Train person group](https://learn.microsoft.com/rest/api/face/person-group-operations/train-person-group?view=rest-face-v1.1-preview.1&tabs=HTTP)
- Person directory operations
  - [Add person face](https://learn.microsoft.com/rest/api/face/person-directory-operations/add-person-face?view=rest-face-v1.1-preview.1&tabs=HTTP)
  - [Add person face from URL](https://learn.microsoft.com/rest/api/face/person-directory-operations/add-person-face-from-url?view=rest-face-v1.1-preview.1&tabs=HTTP)
  - [Create dynamic person group with person](https://learn.microsoft.com/rest/api/face/person-directory-operations/create-dynamic-person-group-with-person?view=rest-face-v1.1-preview.1&tabs=HTTP)
  - [Create person](https://learn.microsoft.com/rest/api/face/person-directory-operations/create-person?view=rest-face-v1.1-preview.1&tabs=HTTP)
  - [Delete dynamic person group](https://learn.microsoft.com/rest/api/face/person-directory-operations/delete-dynamic-person-group?view=rest-face-v1.1-preview.1&tabs=HTTP)
  - [Delete person](https://learn.microsoft.com/rest/api/face/person-directory-operations/delete-person?view=rest-face-v1.1-preview.1&tabs=HTTP)
  - [Delete person face](https://learn.microsoft.com/rest/api/face/person-directory-operations/delete-person-face?view=rest-face-v1.1-preview.1&tabs=HTTP)
  - [Update dynamic person group with person changes](https://learn.microsoft.com/rest/api/face/person-directory-operations/update-dynamic-person-group-with-person-changes?view=rest-face-v1.1-preview.1&tabs=HTTP)

## Examples

The following section provides several code snippets covering some of the most common Face tasks, including:

- [Detecting faces in an image](#face-detection "Face Detection")
- [Identifing the specific face from a LargePersonGroup](#face-recognition-from-largepersongroup "Face Recognition from LargePersonGroup")
- [Determining if a face in an video is real (live) or fake (spoof)](#liveness-detection "Liveness Detection")

### Face Detection

Detect faces and analyze them from an binary data.

```js
import { readFileSync } from 'fs';
import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    isUnexpected,
} from '@azure-rest/ai-vision-face';

const endpoint = process.env['FACE_ENDPOINT'] || '<endpoint>';
const apikey = process.env['FACE_APIKEY'] || '<apikey>';
const credential = new AzureKeyCredential(apikey);
const client = createFaceClient(endpoint, credential);

const response = await client.path('/detect').post({
    contentType: 'application/octet-stream',
    queryParameters: {
        detectionModel: 'detection_03',
        recognitionModel: 'recognition_04',
        returnFaceLandmarks: true,
        returnRecognitionModel: true,
        faceIdTimeToLive: 120,
        returnFaceAttributes: ['headPose', 'mask', 'qualityForRecognition'],
        returnFaceId: false,
    },
    body: readFileSync('path/to/test/image'),
});
if (isUnexpected(response)) {
    throw new Error(response.body.error.message);
}
console.log(response.body);
```

### Face Recognition from LargePersonGroup

Identify a face against a defined LargePersonGroup.

First, we have to create a LargePersonGroup, add a few Persons to it, and then register faces with these Persons.

```js
import { readFileSync } from 'fs';
import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    getLongRunningPoller,
    isUnexpected,
} from '@azure-rest/ai-vision-face';

const endpoint = process.env['FACE_ENDPOINT'] || '<endpoint>';
const apikey = process.env['FACE_APIKEY'] || '<apikey>';
const credential = new AzureKeyCredential(apikey);
const client = createFaceClient(endpoint, credential);

const largePersonGroupId = 'lpg_family';

console.log(`Create a large person group with id: ${largePersonGroupId}`);
const createLargePersonGroupResponse = await client.path('/largepersongroups/{largePersonGroupId}', largePersonGroupId).put({
    body: {
        name: 'My Family',
        recognitionModel: 'recognition_04',
    },
});

console.log('Create a Person Bill and add a face to him.');
const createLargePersonGroupPersonResponse_bill = await client.path('/largepersongroups/{largePersonGroupId}/persons', largePersonGroupId).post({
    body: {
        name: 'Bill',
        userData: 'Dad',
    },
});
if (isUnexpected(createLargePersonGroupPersonResponse_bill)) {
    throw new Error(createLargePersonGroupPersonResponse_bill.body.error.message);
}
const personId_bill = createLargePersonGroupPersonResponse_bill.body.personId;
await client.path('/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces', largePersonGroupId, personId_bill).post({
    queryParameters: {
        userData: 'Dad-0001',
        detectionModel: 'detection_03',
    },
    contentType: 'application/octet-stream',
    body: readFileSync('path/to/bill/image'),
});

console.log('Create a Person Clare and add a face to her.');
const createLargePersonGroupPersonResponse_clare = await client.path('/largepersongroups/{largePersonGroupId}/persons', largePersonGroupId).post({
    body: {
        name: 'Clare',
        userData: 'Mom',
    },
});
if (isUnexpected(createLargePersonGroupPersonResponse_clare)) {
    throw new Error(createLargePersonGroupPersonResponse_clare.body.error.message);
}
const personId_clare = createLargePersonGroupPersonResponse_clare.body.personId;
await client.path('/largepersongroups/{largePersonGroupId}/persons/{personId}/persistedfaces', largePersonGroupId, personId_clare).post({
    queryParameters: {
        userData: 'Mom-0001',
        detectionModel: 'detection_03',
    },
    contentType: 'application/octet-stream',
    body: readFileSync('path/to/clare/image'),
});
```

Before doing the identification, we must train the LargePersonGroup first.

```js
console.log(`Start to train the large person group: ${largePersonGroupId}`);
const trainResponse = await client.path('/largepersongroups/{largePersonGroupId}/train', largePersonGroupId).post();
const trainPoller = await getLongRunningPoller(client, trainResponse);
await trainPoller.pollUntilDone();
// Check if poller.getOperationState().status is 'succeeded'.
```

When the training operation is completed successfully, we can identify the faces in this LargePersonGroup throught.

```js
console.log('Detect faces from the target image.');
const detectResponse = await client.path('/detect').post({
    contentType: 'application/octet-stream',
    queryParameters: {
        detectionModel: 'detection_03',
        recognitionModel: 'recognition_04',
        returnFaceId: true,
    },
    body: readFileSync('path/to/target/image'),
});
if (isUnexpected(detectResponse)) {
    throw new Error(detectResponse.body.error.message);
}
const faceIds = detectResponse.body.map(face => face.faceId as string)

console.log('Identify the faces in the large person group.');
const identifyResponse = await client.path('/identify').post({
    body: { faceIds, largePersonGroupId },
});
if (isUnexpected(identifyResponse)) {
    throw new Error(identifyResponse.body.error.message);
}
console.log(identifyResponse.body);
```

Finally, remove the large person group if you don't need it anymore.

```js
console.log(`Delete the large person group: ${largePersonGroupId}`);
await client.path('/largepersongroups/{largePersonGroupId}', largePersonGroupId).delete();
```

### Liveness detection
Face Liveness detection can be used to determine if a face in an input video stream is real (live) or fake (spoof).
The goal of liveness detection is to ensure that the system is interacting with a physically present live person at
the time of authentication. The whole process of authentication is called a session.

There are two different components in the authentication: a frontend application and an app server/orchestrator.
Before uploading the video stream, the app server has to create a session, and then the frontend client could upload
the payload with a `session authorization token` to call the liveness detection. The app server can query for the
liveness detection result and audit logs anytime until the session is deleted.

The Liveness detection operation can not only confirm if the input is live or spoof, but also verify whether the input
belongs to the expected person's face, which is called **liveness detection with face verification**. For the detail
information, please refer to the [tutorial](https://learn.microsoft.com/azure/ai-services/computer-vision/tutorials/liveness).

This package is only responsible for app server to create, query, delete a session and get audit logs. For how to
integrate the UI and the code into your native frontend application, please follow instructions in the [tutorial](https://learn.microsoft.com/azure/ai-services/computer-vision/tutorials/liveness).

Here is an example to create and get the liveness detection result of a session.

```js
import { randomUUID } from 'crypto';

import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    isUnexpected,
} from '@azure-rest/ai-vision-face';

const endpoint = process.env['FACE_ENDPOINT'] || '<endpoint>';
const apikey = process.env['FACE_APIKEY'] || '<apikey>';
const credential = new AzureKeyCredential(apikey);
const client = createFaceClient(endpoint, credential);

console.log('Create a new liveness session.');
const createLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions').post({
    body: {
        livenessOperationMode: 'Passive',
        deviceCorrelationId: randomUUID(),
        sendResultsToClient: false,
        authTokenTimeToLiveInSeconds: 60,
    },
});
if (isUnexpected(createLivenessSessionResponse)) {
    throw new Error(createLivenessSessionResponse.body.error.message);
}
console.log(createLivenessSessionResponse.body);

const { sessionId } = createLivenessSessionResponse.body;

console.log('Get liveness detection results.');
const getLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).get();
if (isUnexpected(getLivenessSessionResponse)) {
    throw new Error(getLivenessSessionResponse.body.error.message);
}
console.log(getLivenessSessionResponse.body);
```

Here is another example for the liveness detection with face verification.

```js
import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';

import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    isUnexpected,
} from '@azure-rest/ai-vision-face';

const endpoint = process.env['FACE_ENDPOINT'] || '<endpoint>';
const apikey = process.env['FACE_APIKEY'] || '<apikey>';
const credential = new AzureKeyCredential(apikey);
const client = createFaceClient(endpoint, credential);

console.log('Create a new liveness with verify session with verify image.');
const createLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').post({
    contentType: 'multipart/form-data',
    body: [
        {
            name: 'VerifyImage',
            body: readFileSync('path/to/verify/image'),
        },
        {
            name: 'Parameters',
            body: {
                livenessOperationMode: 'Passive',
                sendResultsToClient: false,
                authTokenTimeToLiveInSeconds: 60,
                deviceCorrelationId: randomUUID(),
            },
        },
    ],
});
if (isUnexpected(createLivenessSessionResponse)) {
    throw new Error(createLivenessSessionResponse.body.error.message);
}
console.log(createLivenessSessionResponse.body);

const { sessionId } = createLivenessSessionResponse.body;

console.log('Get the liveness detection and verification result.');
const getLivenessSessionResultResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get();
if (isUnexpected(getLivenessSessionResultResponse)) {
    throw new Error(getLivenessSessionResultResponse.body.error.message);
}
console.log(getLivenessSessionResultResponse.body);
```

## Troubleshooting

### General

Error codes and messages raised by the Face service can be found in the [service documentation](https://aka.ms/face-error-codes-and-messages).

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

### More sample code

See the [Sample README](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest/samples) for several code snippets illustrating common patterns used in the Face JavaScript API.

### Additional documentation

For more extensive documentation on Azure AI Face, see the [Face documentation](https://learn.microsoft.com/azure/ai-services/computer-vision/overview-identity) on learn.microsoft.com.

## Contributing

This project welcomes contributions and suggestions. Most contributions require
you to agree to a Contributor License Agreement (CLA) declaring that you have
the right to, and actually do, grant us the rights to use your contribution.
For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether
you need to provide a CLA and decorate the PR appropriately (e.g., label,
comment). Simply follow the instructions provided by the bot. You will only
need to do this once across all repos using our CLA.

This project has adopted the
[Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information,
see the Code of Conduct FAQ or contact opencode@microsoft.com with any
additional questions or comments.
