# Monitor Ingestion client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Monitor Ingestion in some common scenarios.

| **File Name**                                       | **Description**                                                                                                                                                                                  |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [defaultConcurrency.js][defaultconcurrency]         | Demonstrates uploading a large number of logs where the logs are split into multiple batches and log batches are uploaded concurrently.                                                          |
| [earlyAborting.js][earlyaborting]                   | Demonstrates aborting additional processing early if user handles the error and decides that continuing further is hopeless.                                                                     |
| [logsIngestionClient.js][logsingestionclient]       | Demonstrates how to upload logs to a Monitor Resource (Log Analytics workspace). The user can track failed log entries and the associated error message via the AggregateUploadLogsError Object  |
| [uploadCustomLogs.js][uploadcustomlogs]             | Demonstrates how to upload logs to a Monitor Resource (Log Analytics workspace). The user can track failed log entries and the associated error message via the AggregateUploadLogsError Object. |
| [userDefinedConcurrency.js][userdefinedconcurrency] | Demonstrates how to control the number of concurrent requests using the maxConcurrency option.                                                                                                   |
| [userErrorHandling.js][usererrorhandling]           | Demonstrates error handling via a user defined error handler. User can track failed log entries with each error handler.                                                                         |

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
node defaultConcurrency.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env LOGS_INGESTION_ENDPOINT="<logs ingestion endpoint>" DATA_COLLECTION_RULE_ID="<data collection rule id>" STREAM_NAME="<stream name>" node defaultConcurrency.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[defaultconcurrency]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-ingestion/samples/v1-beta/javascript/defaultConcurrency.js
[earlyaborting]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-ingestion/samples/v1-beta/javascript/earlyAborting.js
[logsingestionclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-ingestion/samples/v1-beta/javascript/logsIngestionClient.js
[uploadcustomlogs]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-ingestion/samples/v1-beta/javascript/uploadCustomLogs.js
[userdefinedconcurrency]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-ingestion/samples/v1-beta/javascript/userDefinedConcurrency.js
[usererrorhandling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-ingestion/samples/v1-beta/javascript/userErrorHandling.js
[apiref]: https://docs.microsoft.com/javascript/api/
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuremonitor]: https://docs.microsoft.com/azure/azure-monitor/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-ingestion/README.md
