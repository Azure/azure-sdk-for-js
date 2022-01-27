# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                           | **Description**                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [createExportJob.ts][createexportjob]                                   | Creates a new job or updates an existing job in the specified subscription. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/CreateExportJob.json                                                                                                                                                                                   |
| [createImportJob.ts][createimportjob]                                   | Creates a new job or updates an existing job in the specified subscription. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/CreateJob.json                                                                                                                                                                                         |
| [deleteJob.ts][deletejob]                                               | Deletes an existing job. Only jobs in the Creating or Completed states can be deleted. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/DeleteJob.json                                                                                                                                                                              |
| [getExportJob.ts][getexportjob]                                         | Gets information about an existing job. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/GetExportJob.json                                                                                                                                                                                                                          |
| [getImportJob.ts][getimportjob]                                         | Gets information about an existing job. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/GetJob.json                                                                                                                                                                                                                                |
| [getLocations.ts][getlocations]                                         | Returns the details about a location to which you can ship the disks associated with an import or export job. A location is an Azure region. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/GetLocation.json                                                                                                                      |
| [listAvailableOperations.ts][listavailableoperations]                   | Returns the list of operations supported by the import/export resource provider. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListOperations.json                                                                                                                                                                               |
| [listBitLockerKeysForDrivesInAJob.ts][listbitlockerkeysfordrivesinajob] | Returns the BitLocker Keys for all drives in the specified job. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListBitLockerKeys.json                                                                                                                                                                                             |
| [listJobsInAResourceGroup.ts][listjobsinaresourcegroup]                 | Returns all active and completed jobs in a resource group. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListJobsInResourceGroup.json                                                                                                                                                                                            |
| [listJobsInASubscription.ts][listjobsinasubscription]                   | Returns all active and completed jobs in a subscription. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListJobsInSubscription.json                                                                                                                                                                                               |
| [listLocations.ts][listlocations]                                       | Returns a list of locations to which you can ship the disks associated with an import or export job. A location is a Microsoft data center region. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListLocations.json                                                                                                              |
| [updateExportJob.ts][updateexportjob]                                   | Updates specific properties of a job. You can call this operation to notify the Import/Export service that the hard drives comprising the import or export job have been shipped to the Microsoft data center. It can also be used to cancel an existing job. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/UpdateExportJob.json |
| [updateImportJob.ts][updateimportjob]                                   | Updates specific properties of a job. You can call this operation to notify the Import/Export service that the hard drives comprising the import or export job have been shipped to the Microsoft data center. It can also be used to cancel an existing job. x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/UpdateJob.json       |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/createExportJob.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/createExportJob.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createexportjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/createExportJob.ts
[createimportjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/createImportJob.ts
[deletejob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/deleteJob.ts
[getexportjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/getExportJob.ts
[getimportjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/getImportJob.ts
[getlocations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/getLocations.ts
[listavailableoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/listAvailableOperations.ts
[listbitlockerkeysfordrivesinajob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/listBitLockerKeysForDrivesInAJob.ts
[listjobsinaresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/listJobsInAResourceGroup.ts
[listjobsinasubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/listJobsInASubscription.ts
[listlocations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/listLocations.ts
[updateexportjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/updateExportJob.ts
[updateimportjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storageimportexport/arm-storageimportexport/samples/v2/typescript/src/updateImportJob.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-storageimportexport?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storageimportexport/arm-storageimportexport/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
