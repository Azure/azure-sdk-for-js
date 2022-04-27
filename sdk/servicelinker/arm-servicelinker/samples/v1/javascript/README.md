# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                       | **Description**                                                                                                                                                                                |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [linkerCreateOrUpdateSample.js][linkercreateorupdatesample]         | Create or update linker resource. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/PutLink.json                             |
| [linkerDeleteSample.js][linkerdeletesample]                         | Delete a link. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/DeleteLink.json                                             |
| [linkerGetSample.js][linkergetsample]                               | Returns Linker resource for a given name. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/Link.json                        |
| [linkerListConfigurationsSample.js][linkerlistconfigurationssample] | list source configurations for a linker. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/GetConfigurations.json            |
| [linkerListSample.js][linkerlistsample]                             | Returns list of Linkers which connects to the resource. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/LinkList.json      |
| [linkerUpdateSample.js][linkerupdatesample]                         | Operation to update an existing link. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/PatchLink.json                       |
| [linkerValidateSample.js][linkervalidatesample]                     | Validate a link. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/ValidateLinkSuccess.json                                  |
| [operationsListSample.js][operationslistsample]                     | Lists the available ServiceLinker REST API operations. x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/stable/2022-05-01/examples/OperationsList.json |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node linkerCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node linkerCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[linkercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v1/javascript/linkerCreateOrUpdateSample.js
[linkerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v1/javascript/linkerDeleteSample.js
[linkergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v1/javascript/linkerGetSample.js
[linkerlistconfigurationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v1/javascript/linkerListConfigurationsSample.js
[linkerlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v1/javascript/linkerListSample.js
[linkerupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v1/javascript/linkerUpdateSample.js
[linkervalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v1/javascript/linkerValidateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicelinker/arm-servicelinker/samples/v1/javascript/operationsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-servicelinker?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicelinker/arm-servicelinker/README.md
