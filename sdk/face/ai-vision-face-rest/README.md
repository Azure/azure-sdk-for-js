# Azure Ai Vision Face client library for JavaScript

The Azure AI Face service provides AI algorithms that detect, recognize, and analyze human faces in images. It includes the following main features:

- Face detection and analyzsis
- Liveness detection
- Face recognition
  - Face verification ("one-to-one" matching)
  - Face identification ("one-to-many" matching)
- Find similar faces
- Group faces
[Product documentation](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-identity)
| [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest)
| [Package (NPM)](https://www.npmjs.com/package/@azure-rest/ai-vision-face)
| [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest/samples)
| [API reference documentation](https://aka.ms/azsdk-javascript-face-ref)

## Getting started

### Currently supported environments

- LTS versions of Node.js

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- You need an [Azure subscription](https://azure.microsoft.com/free/) to use this package and either
  - an [Azure Face account](https://portal.azure.com/#blade/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/Face) or
  - an [Azure Cognitive Service account](https://portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/AllInOne)
- Your Azure account must have a `Cognitive Services Contributor` role assigned in order for you to agree to the responsible AI terms and create a resource. To get this role assigned to your account, follow the steps in the [Assign roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-steps) documentation, or contact your administrator.

### Create a Face or a Cognitive Services resource

Azure AI Face supports both [multi-service](https://learn.microsoft.com/en-us/azure/ai-services/multi-service-resource?tabs=windows&pivots=azportal#supported-services-with-a-multi-service-resource) and single-service access. Create a Cognitive Services resource if you plan to access multiple cognitive services under a single endpoint/key. For Face access only, create a Face resource. Please note that you will need a single-service resource if you intend to use [Azure Active Directory authentication](#create-the-client-with-an-azure-active-directory-credential).

- To create a new Face or Cognitive Services account, you can use [Azure Portal](https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesFace), [Azure PowerShell](https://learn.microsoft.com/en-us/azure/ai-services/multi-service-resource?tabs=windows&pivots=azpowershell), or [Azure CLI](https://learn.microsoft.com/en-us/azure/ai-services/multi-service-resource?tabs=windows&pivots=azcli).

### Install the package

Install the Azure Face REST client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-vision-face
```

### Authenticate the client

In order to interact with the Face service, you will need to create an instance of a client.
An **endpoint** and **credential** are necessary to instantiate the client object.

#### Get the endpoint and API keys

You can find the endpoint and keys for your Face resource using the [Azure Portal](https://learn.microsoft.com/en-us/azure/ai-services/multi-service-resource?tabs=windows&pivots=azportal#get-the-keys-for-your-resource) or [Azure CLI](https://learn.microsoft.com/en-us/azure/ai-services/multi-service-resource?tabs=windows&pivots=azcli#get-the-keys-for-your-resource):

```bash
# Get the endpoint for the Face resource
az cognitiveservices account show --name "resource-name" --resource-group "resource-group-name" --query "properties.endpoint"
```

Either a regional endpoint or a custom subdomain can be used for authentication. They are formatted as follows:

```
Regional endpoint: https://<region>.api.cognitive.microsoft.com/
Custom subdomain: https://<resource-name>.cognitiveservices.azure.com/
```

A regional endpoint is the same for every resource in a region. A complete list of supported regional endpoints can be consulted [here](https://azure.microsoft.com/global-infrastructure/services/?products=cognitive-services). Please note that regional endpoints do not support AAD authentication.

A custom subdomain, on the other hand, is a name that is unique to the Face resource. They can only be used by [single-service resources](https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesFace).

```bash
# Get the API keys for the Face resource
az cognitiveservices account keys list --name "<resource-name>" --resource-group "<resource-group-name>"
```

#### Create the client with AzureKeyCredential

To use an API key as the `credential` parameter, pass the key as a string into an instance of [AzureKeyCredential](https://learn.microsoft.com/en-us/javascript/api/@azure/core-auth/azurekeycredential?view=azure-node-latest).

```js
import { AzureKeyCredential } from '@azure/core-auth';
import createFaceClient from '@azure-rest/ai-vision-face';

const endpoint = process.env['FACE_ENDPOINT'] || '<endpoint>';
const apikey = process.env['FACE_APIKEY'] || '<apikey>';
const credential = new AzureKeyCredential(apikey);
const client = createFaceClient(endpoint, credential);
```

#### Create the client with an Azure Active Directory credential

`AzureKeyCredential` authentication is used in the examples in this getting started guide, but you can also authenticate with Azure Active Directory using the [@azure/identity](https://learn.microsoft.com/en-us/javascript/api/@azure/identity/?view=azure-node-latest) library.
Note that regional endpoints do not support AAD authentication. Create a [custom subdomain](https://docs.microsoft.com/azure/cognitive-services/authentication#create-a-resource-with-a-custom-subdomain) name for your resource in order to use this type of authentication.

To use the [DefaultAzureCredential](https://learn.microsoft.com/en-us/javascript/api/@azure/identity/defaultazurecredential?view=azure-node-latest) type shown below, or other credential types provided with the Azure SDK, please install the `@azure/identity` package:

```
npm install --save @azure/identity
```

You will also need to [register a new AAD application and grant access](https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal) to Face by assigning the `"Cognitive Services User"` role to your service principal.

Once completed, set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
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

## Key concepts

### FaceClient

The `FaceClient` is the primary interface for developers interacting with the Azure AI Face service. It serves as the gateway from which all interaction with the library will occur.

### Long-running operations

Long-running operations are operations which consist of an initial request sent to the service to start an operation,
followed by polling the service at intervals to determine whether the operation has completed or failed, and if it has
succeeded, to get the result.

Methods that train a group (LargeFaceList, PersonGroup or LargePersonGroup), create/delete a Person/DynamicPersonGroup, 
add a face or delete a face from a Person are modeled as long-running operations.

The client exposes a `getLongRunningPoller` method that returns a poller object from the initial HTTP 202 response.
Callers should wait for the operation to complete by calling `pollUntilDone()` on the poller object. Sample code snippets
are provided to illustrate using long-running operations [below](#examples "Examples").

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
    Detect200Response,
    FaceAttributeTypeDetection03,
    FaceAttributeTypeRecognition04,
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
        returnFaceAttributes: [FaceAttributeTypeDetection03.HEAD_POSE, FaceAttributeTypeDetection03.MASK, FaceAttributeTypeRecognition04.QUALITY_FOR_RECOGNITION],
        returnFaceId: false,
    },
    body: readFileSync('path/to/test/image'),
}) as Detect200Response;
console.log(response.body);
```

### Face Recognition from LargePersonGroup

Identify a face against a defined LargePersonGroup.

First, we have to create a LargePersonGroup, add a few Persons to it, and then register faces with these Persons.

```js
import { readFileSync } from 'fs';
import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    CreateLargePersonGroupPerson200Response,
    Detect200Response,
    IdentifyFromLargePersonGroup200Response,
    getLongRunningPoller,
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
}) as CreateLargePersonGroupPerson200Response;
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
}) as CreateLargePersonGroupPerson200Response;
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
}) as Detect200Response;
const faceIds = detectResponse.body.map(face => face.faceId as string)

console.log('Identify the faces in the large person group.');
const identifyResponse = await client.path('/identify').post({
    body: { faceIds, largePersonGroupId },
}) as IdentifyFromLargePersonGroup200Response;
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

There're two different components in the authentication: a mobile application and an app server/orchestrator.
Before uploading the video stream, the app server has to create a session, and then the mobile client could upload
the payload with a `session authorization token` to call the liveness detection. The app server can query for the
liveness detection result and audit logs anytime untill the session is deleted.

The Liveness detection operation can not only confirm if the input is live or spoof, but also verify whether the input
belongs to the expected person's face, which is called **liveness detection with face verification**. For the detail
information, please refer to the [tutorial](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/tutorials/liveness).

We'll only demonstrates how to create, query, delete a session and get the audit logs here. For how to perform a
liveness detection, please see the sample of [mobile applications](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/tutorials/liveness#integrate-liveness-into-mobile-application).

Here is an example to create and get the liveness detection result of a session.

```js
import { randomUUID } from 'crypto';

import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    CreateLivenessSession200Response,
    GetLivenessSessionResult200Response,
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
}) as CreateLivenessSession200Response;
console.log(createLivenessSessionResponse.body);

const { sessionId } = createLivenessSessionResponse.body;

console.log('Get liveness detection results.');
const getLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).get() as GetLivenessSessionResult200Response;
console.log(getLivenessSessionResponse.body);
```

Here is another example for the liveness detection with face verification.

```js
import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';

import { AzureKeyCredential } from '@azure/core-auth';

import createFaceClient, {
    CreateLivenessWithVerifySession200Response,
    GetLivenessWithVerifySessionResult200Response,
    CreateLivenessWithVerifySessionContentParametersPartDescriptor,
    CreateLivenessWithVerifySessionContentVerifyImagePartDescriptor,
} from '@azure-rest/ai-vision-face';

const endpoint = process.env['FACE_ENDPOINT'] || '<endpoint>';
const apikey = process.env['FACE_APIKEY'] || '<apikey>';
const credential = new AzureKeyCredential(apikey);
const client = createFaceClient(endpoint, credential);

console.log('Create a new liveness with verify session with verify image.');
const createLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').post({
    contentType: 'multipart/form-data',
    body: [
        new CreateLivenessWithVerifySessionContentVerifyImagePartDescriptor({
            name: 'VerifyImage',
            body: readFileSync('path/to/verify/image'),
        }),
        new CreateLivenessWithVerifySessionContentParametersPartDescriptor({
            name: 'Parameters',
            body: {
                livenessOperationMode: 'Passive',
                sendResultsToClient: false,
                authTokenTimeToLiveInSeconds: 60,
                deviceCorrelationId: randomUUID(),
            },
        }),
    ],
}) as CreateLivenessWithVerifySession200Response;
console.log(createLivenessSessionResponse.body);

const { sessionId } = createLivenessSessionResponse.body;

console.log('Get the liveness detection and verification result.');
const getLivenessSessionResultResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get() as GetLivenessWithVerifySessionResult200Response;
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

For more extensive documentation on Azure AI Face, see the [Face documentation](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-identity) on learn.microsoft.com.

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
