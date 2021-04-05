---
page_type: sample
languages:
  - javascript
products:
  - azure
urlFragment: communication-chat-javascript
---

# Azure Communication Service Communication Chat client library sample for JavaScript

These sample programs show how to use the TypeScript client libraries for Azure Communication Service Communication Chat to create chat threads and send messages.

| **File Name**                                        | **Description**                                       |
| ---------------------------------------------------- | ----------------------------------------------------- |
| [threadOperations.js][thread-operations]             | create, retrieve, update and delete a chat thread     |
| [messageOperations.js][message-operations]           | send, list, update and delete chat messages           |
| [participantsOperations.js][participants-operations] | add, list, and remove participants from a chat thread |

## Prerequisites

The sample is compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and [an Azure Communication Service Instance][azcomsvc] to run these sample program.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the sample using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like:

```bash
node threadOperations.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env COMMUNICATION_CONNECTION_STRING="<connection string>" node threadOperations.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[thread-operations]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-chat/samples/javascript/threadOperations.js
[participants-operations]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-chat/samples/javascript/participantsOperations.js
[message-operations]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-chat/samples/javascript/messageOperations.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/communication-chat
[azcomsvc]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource?tabs=windows&pivots=platform-azp
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-chat/README.md
