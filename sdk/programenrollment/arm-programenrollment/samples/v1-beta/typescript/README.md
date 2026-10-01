# @azure/arm-programenrollment client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-programenrollment in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                               |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [eduEnrollmentsCreateOrUpdateSample.ts][eduenrollmentscreateorupdatesample]           | creates or updates the specified edu enrollment. x-ms-original-file: 2026-03-01-preview/EduEnrollments_CreateOrUpdate.json    |
| [eduEnrollmentsDeleteSample.ts][eduenrollmentsdeletesample]                           | deletes the specified edu enrollment. x-ms-original-file: 2026-03-01-preview/EduEnrollments_Delete.json                       |
| [eduEnrollmentsGetSample.ts][eduenrollmentsgetsample]                                 | gets the specified edu enrollment. x-ms-original-file: 2026-03-01-preview/EduEnrollments_Get.json                             |
| [eduEnrollmentsListByResourceGroupSample.ts][eduenrollmentslistbyresourcegroupsample] | lists the edu enrollments in a resource group. x-ms-original-file: 2026-03-01-preview/EduEnrollments_ListByResourceGroup.json |
| [eduEnrollmentsListBySubscriptionSample.ts][eduenrollmentslistbysubscriptionsample]   | lists the edu enrollments in a subscription. x-ms-original-file: 2026-03-01-preview/EduEnrollments_ListBySubscription.json    |
| [eduEnrollmentsUpdateSample.ts][eduenrollmentsupdatesample]                           | updates the specified edu enrollment. x-ms-original-file: 2026-03-01-preview/EduEnrollments_Update.json                       |
| [operationsListSample.ts][operationslistsample]                                       | list the operations for the provider x-ms-original-file: 2026-03-01-preview/Operations_List.json                              |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node dist/eduEnrollmentsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/eduEnrollmentsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[eduenrollmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programenrollment/arm-programenrollment/samples/v1-beta/typescript/src/eduEnrollmentsCreateOrUpdateSample.ts
[eduenrollmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programenrollment/arm-programenrollment/samples/v1-beta/typescript/src/eduEnrollmentsDeleteSample.ts
[eduenrollmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programenrollment/arm-programenrollment/samples/v1-beta/typescript/src/eduEnrollmentsGetSample.ts
[eduenrollmentslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programenrollment/arm-programenrollment/samples/v1-beta/typescript/src/eduEnrollmentsListByResourceGroupSample.ts
[eduenrollmentslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programenrollment/arm-programenrollment/samples/v1-beta/typescript/src/eduEnrollmentsListBySubscriptionSample.ts
[eduenrollmentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programenrollment/arm-programenrollment/samples/v1-beta/typescript/src/eduEnrollmentsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programenrollment/arm-programenrollment/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-programenrollment?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/programenrollment/arm-programenrollment/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
