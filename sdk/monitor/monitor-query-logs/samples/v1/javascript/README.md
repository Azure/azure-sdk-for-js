# Monitor Query Logs client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Monitor Query Logs in some common scenarios.

| **File Name**                                                 | **Description**                                                                                |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [logsQuery.js][logsquery]                                     | Demonstrates how to run a query against a Log Analytics workspace                              |
| [logsQueryBatch.js][logsquerybatch]                           | Demonstrates how to run a batch query against a Log Analytics workspace                        |
| [logsQueryMultipleWorkspaces.js][logsquerymultipleworkspaces] | Demonstrates how to run a query against a Log Analytics workspace                              |
| [logsResourceCentricQuery.js][logsresourcecentricquery]       | Demonstrates how to run a query against a Log Analytics workspace, using an Azure resource ID. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Monitor][createinstance_azuremonitor]

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
node logsQuery.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env MONITOR_WORKSPACE_ID="<monitor workspace id>" node logsQuery.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[logsquery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-logs/samples/v1/javascript/logsQuery.js
[logsquerybatch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-logs/samples/v1/javascript/logsQueryBatch.js
[logsquerymultipleworkspaces]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-logs/samples/v1/javascript/logsQueryMultipleWorkspaces.js
[logsresourcecentricquery]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-logs/samples/v1/javascript/logsResourceCentricQuery.js
[apiref]: https://learn.microsoft.com/javascript/api/
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremonitor]: https://learn.microsoft.com/azure/azure-monitor/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-query-logs/README.md
