---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-communication-services
urlFragment: communication-rooms-javascript-beta
---

# Azure Communication Services - Rooms client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Communication Services - Rooms in some common scenarios.

| **File Name**                                     | **Description**                                       |
| ------------------------------------------------- | ----------------------------------------------------- |
| [participantOperations.js][participantoperations] | Perform participant operations using the RoomsClient. |
| [roomOperations.js][roomoperations]               | Perform room operations using the RoomsClient.        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Communication Services account][createinstance_azurecommunicationservicesaccount]

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
node participantOperations.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env COMMUNICATION_CONNECTION_STRING="<communication connection string>" node participantOperations.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[participantoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-rooms/samples/v1-beta/javascript/participantOperations.js
[roomoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-rooms/samples/v1-beta/javascript/roomOperations.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/communication-rooms
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecommunicationservicesaccount]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-rooms/README.md
