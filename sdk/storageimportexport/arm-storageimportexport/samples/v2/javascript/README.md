# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                           | **Description**                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [createExportJob.js][createexportjob]                                   | Creates a new job or updates an existing job in the specified subscription. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/CreateExportJob.json                                                                                                                                                                                   |
| [createImportJob.js][createimportjob]                                   | Creates a new job or updates an existing job in the specified subscription. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/CreateJob.json                                                                                                                                                                                         |
| [deleteJob.js][deletejob]                                               | Deletes an existing job. Only jobs in the Creating or Completed states can be deleted. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/DeleteJob.json                                                                                                                                                                              |
| [getExportJob.js][getexportjob]                                         | Gets information about an existing job. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/GetExportJob.json                                                                                                                                                                                                                          |
| [getImportJob.js][getimportjob]                                         | Gets information about an existing job. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/GetJob.json                                                                                                                                                                                                                                |
| [getLocations.js][getlocations]                                         | Returns the details about a location to which you can ship the disks associated with an import or export job. A location is an Azure region. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/GetLocation.json                                                                                                                      |
| [listAvailableOperations.js][listavailableoperations]                   | Returns the list of operations supported by the import/export resource provider. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListOperations.json                                                                                                                                                                               |
| [listBitLockerKeysForDrivesInAJob.js][listbitlockerkeysfordrivesinajob] | Returns the BitLocker Keys for all drives in the specified job. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListBitLockerKeys.json                                                                                                                                                                                             |
| [listJobsInAResourceGroup.js][listjobsinaresourcegroup]                 | Returns all active and completed jobs in a resource group. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListJobsInResourceGroup.json                                                                                                                                                                                            |
| [listJobsInASubscription.js][listjobsinasubscription]                   | Returns all active and completed jobs in a subscription. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListJobsInSubscription.json                                                                                                                                                                                               |
| [listLocations.js][listlocations]                                       | Returns a list of locations to which you can ship the disks associated with an import or export job. A location is a Microsoft data center region. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListLocations.json                                                                                                              |
| [updateExportJob.js][updateexportjob]                                   | Updates specific properties of a job. You can call this operation to notify the Import/Export service that the hard drives comprising the import or export job have been shipped to the Microsoft data center. It can also be used to cancel an existing job. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/UpdateExportJob.json |
| [updateImportJob.js][updateimportjob]                                   | Updates specific properties of a job. You can call this operation to notify the Import/Export service that the hard drives comprising the import or export job have been shipped to the Microsoft data center. It can also be used to cancel an existing job. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/UpdateJob.json       |

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
node createExportJob.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node createExportJob.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createexportjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/createExportJob.js
[createimportjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/createImportJob.js
[deletejob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/deleteJob.js
[getexportjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/getExportJob.js
[getimportjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/getImportJob.js
[getlocations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/getLocations.js
[listavailableoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/listAvailableOperations.js
[listbitlockerkeysfordrivesinajob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/listBitLockerKeysForDrivesInAJob.js
[listjobsinaresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/listJobsInAResourceGroup.js
[listjobsinasubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/listJobsInASubscription.js
[listlocations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/listLocations.js
[updateexportjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/updateExportJob.js
[updateimportjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/javascript/updateImportJob.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-storageimportexport?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storageimportexport/arm-storageimportexport/README.md
