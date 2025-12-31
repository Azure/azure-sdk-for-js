# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [serversCheckNameAvailabilitySample.js][serverschecknameavailabilitysample] | Check the name availability in the target location. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/checkNameAvailability.json                                           |
| [serversCreateSample.js][serverscreatesample]                               | Provisions the specified Analysis Services server based on the configuration specified in the request. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/createServer.json |
| [serversDeleteSample.js][serversdeletesample]                               | Deletes the specified Analysis Services server. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/deleteServer.json                                                        |
| [serversDissociateGatewaySample.js][serversdissociategatewaysample]         | Dissociates a Unified Gateway associated with the server. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/dissociateGateway.json                                         |
| [serversGetDetailsSample.js][serversgetdetailssample]                       | Gets details about the specified Analysis Services server. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/getServer.json                                                |
| [serversListByResourceGroupSample.js][serverslistbyresourcegroupsample]     | Gets all the Analysis Services servers for the given resource group. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/listServersInResourceGroup.json                     |
| [serversListGatewayStatusSample.js][serverslistgatewaystatussample]         | Return the gateway status of the specified Analysis Services server instance. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/listGatewayStatus.json                     |
| [serversListOperationResultsSample.js][serverslistoperationresultssample]   | List the result of the specified operation. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/operationResults.json                                                        |
| [serversListOperationStatusesSample.js][serverslistoperationstatusessample] | List the status of operation. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/operationStatuses.json                                                                     |
| [serversListSample.js][serverslistsample]                                   | Lists all the Analysis Services servers for the given subscription. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/listServers.json                                     |
| [serversListSkusForExistingSample.js][serverslistskusforexistingsample]     | Lists eligible SKUs for an Analysis Services resource. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/listSkusForExisting.json                                          |
| [serversListSkusForNewSample.js][serverslistskusfornewsample]               | Lists eligible SKUs for Analysis Services resource provider. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/listSkusForNew.json                                         |
| [serversResumeSample.js][serversresumesample]                               | Resumes operation of the specified Analysis Services server instance. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/resumeServer.json                                  |
| [serversSuspendSample.js][serverssuspendsample]                             | Suspends operation of the specified Analysis Services server instance. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/suspendServer.json                                |
| [serversUpdateSample.js][serversupdatesample]                               | Updates the current state of the specified Analysis Services server. x-ms-original-file: specification/analysisservices/resource-manager/Microsoft.AnalysisServices/stable/2017-08-01/examples/updateServer.json                                   |

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
node serversCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node serversCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[serverschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversCheckNameAvailabilitySample.js
[serverscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversCreateSample.js
[serversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversDeleteSample.js
[serversdissociategatewaysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversDissociateGatewaySample.js
[serversgetdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversGetDetailsSample.js
[serverslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversListByResourceGroupSample.js
[serverslistgatewaystatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversListGatewayStatusSample.js
[serverslistoperationresultssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversListOperationResultsSample.js
[serverslistoperationstatusessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversListOperationStatusesSample.js
[serverslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversListSample.js
[serverslistskusforexistingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversListSkusForExistingSample.js
[serverslistskusfornewsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversListSkusForNewSample.js
[serversresumesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversResumeSample.js
[serverssuspendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversSuspendSample.js
[serversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/analysisservices/arm-analysisservices/samples/v4/javascript/serversUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-analysisservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/analysisservices/arm-analysisservices/README.md
