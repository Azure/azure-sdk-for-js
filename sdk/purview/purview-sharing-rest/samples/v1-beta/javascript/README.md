# Purview Sharing client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Purview Sharing in some common scenarios.

| **File Name**                                           | **Description**                |
| ------------------------------------------------------- | ------------------------------ |
| [manageSharesSample.js][managesharessample]             | Get a sent share               |
| [receiverOperationsSample.js][receiveroperationssample] | List detached received shares  |
| [senderOperationsSample.js][senderoperationssample]     | Create or replace a sent share |

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
node manageSharesSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" SENDER_STORAGE_ACCOUNT_RESOURCE_ID="<sender storage account resource id>" RECEIVER_STORAGE_ACCOUNT_RESOURCE_ID="<receiver storage account resource id>" node manageSharesSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[managesharessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/manageSharesSample.js
[receiveroperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/receiverOperationsSample.js
[senderoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/senderOperationsSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure-rest/purview-sharing?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/purview-sharing-rest/README.md
