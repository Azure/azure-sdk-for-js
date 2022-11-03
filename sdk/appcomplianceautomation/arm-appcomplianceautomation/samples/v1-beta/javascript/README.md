# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                               | **Description**                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.js][operationslistsample]             | Lists all of the available REST API operations of the Microsoft.AppComplianceAutomation provider. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/preview/2022-11-16-preview/examples/Operations_List.json              |
| [reportCreateOrUpdateSample.js][reportcreateorupdatesample] | Create a new AppComplianceAutomation report or update an exiting AppComplianceAutomation report. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/preview/2022-11-16-preview/examples/Report_CreateOrUpdate.json         |
| [reportDeleteSample.js][reportdeletesample]                 | Delete an AppComplianceAutomation report. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/preview/2022-11-16-preview/examples/Report_Delete.json                                                                        |
| [reportGetSample.js][reportgetsample]                       | Get the AppComplianceAutomation report and its properties. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/preview/2022-11-16-preview/examples/Report_Get.json                                                          |
| [reportUpdateSample.js][reportupdatesample]                 | Update an exiting AppComplianceAutomation report. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/preview/2022-11-16-preview/examples/Report_Update.json                                                                |
| [reportsListSample.js][reportslistsample]                   | Get the AppComplianceAutomation report list for the tenant. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/preview/2022-11-16-preview/examples/Reports_List.json                                                       |
| [snapshotDownloadSample.js][snapshotdownloadsample]         | Download compliance needs from snapshot, like: Compliance Report, Resource List. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/preview/2022-11-16-preview/examples/Snapshot_ComplianceDetailedPdfReport_Download.json |
| [snapshotGetSample.js][snapshotgetsample]                   | Get the AppComplianceAutomation snapshot and its properties. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/preview/2022-11-16-preview/examples/Snapshot_Get.json                                                      |
| [snapshotsListSample.js][snapshotslistsample]               | Get the AppComplianceAutomation snapshot list. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/preview/2022-11-16-preview/examples/Snapshots_List.json                                                                  |

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
node operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1-beta/javascript/operationsListSample.js
[reportcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1-beta/javascript/reportCreateOrUpdateSample.js
[reportdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1-beta/javascript/reportDeleteSample.js
[reportgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1-beta/javascript/reportGetSample.js
[reportupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1-beta/javascript/reportUpdateSample.js
[reportslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1-beta/javascript/reportsListSample.js
[snapshotdownloadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1-beta/javascript/snapshotDownloadSample.js
[snapshotgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1-beta/javascript/snapshotGetSample.js
[snapshotslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1-beta/javascript/snapshotsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-appcomplianceautomation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/README.md
