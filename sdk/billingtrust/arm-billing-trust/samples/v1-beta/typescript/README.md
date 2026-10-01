# @azure/arm-billing-trust client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-billing-trust in some common scenarios.

| **File Name**                                                           | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [assessmentsCreateOrUpdateSample.ts][assessmentscreateorupdatesample]   | create or update an Assessment. Long-running operation — returns 200 (replace) or 201 (create) with the `Azure-AsyncOperation` polling header on both responses. x-ms-original-file: 2026-03-17-preview/Assessments_CreateOrUpdate.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [assessmentsDeleteSample.ts][assessmentsdeletesample]                   | delete an assessment. Long-running operation — returns 202 + 204 + default with `Azure-AsyncOperation` (preferred) and `Location` polling headers. x-ms-original-file: 2026-03-17-preview/Assessments_Delete.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [assessmentsGetSample.ts][assessmentsgetsample]                         | get a Assessment x-ms-original-file: 2026-03-17-preview/Assessments_Get.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [assessmentsListSample.ts][assessmentslistsample]                       | list Assessment resources by parent x-ms-original-file: 2026-03-17-preview/Assessments_List.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [assessmentsListUploadTokenSample.ts][assessmentslistuploadtokensample] | request a time-bound, principal-bound upload token for supplemental document uploads. x-ms-original-file: 2026-03-17-preview/Assessments_ListUploadToken.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [operationsListSample.ts][operationslistsample]                         | list the operations for the provider x-ms-original-file: 2026-03-17-preview/Operations_List.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [rulesCreateOrUpdateSample.ts][rulescreateorupdatesample]               | create or update a Rule. **This operation is required for RPaaS tracked-resource cache population and MUST remain in the public spec.** Rules are created by the service when the parent assessment is created; they are not directly creatable by end users. All customer PUT calls are rejected at runtime with `OperationNotAllowed` via the RPaaS ResourceCreationValidate extension. Use PATCH to modify rule fields that the customer is authorized to change. Peer RPs with the same topology (extension singleton parent + proxy child) declare an identical public PUT for the same RPaaS cache-population reason: Microsoft.ScVmm/virtualMachineInstances/guestAgents, Microsoft.ConnectedVMwarevSphere/virtualMachineInstances/guestAgents. x-ms-original-file: 2026-03-17-preview/Rules_CreateOrUpdate.json |
| [rulesGetSample.ts][rulesgetsample]                                     | get a Rule x-ms-original-file: 2026-03-17-preview/Rules_Get.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [rulesListSample.ts][ruleslistsample]                                   | list Rule resources by Assessment x-ms-original-file: 2026-03-17-preview/Rules_List.json                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [rulesUpdateSample.ts][rulesupdatesample]                               | update a Rule. The PATCH body is discriminated by `kind` and must match the existing rule's kind. For `eduQualification` rules, only `supplementalDocuments` is patchable, and only when `evaluationState == actionRequired`. For `businessVerification` rules, the patchable fields are `supplementalDocuments` and `externalId`, and only when `evaluationState` is `pending` or `actionRequired`. All other field/state combinations are rejected with 400 InvalidParameterValue or 409 RuleNotActionable. x-ms-original-file: 2026-03-17-preview/Rules_Update.json                                                                                                                                                                                                                                                  |

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
node dist/assessmentsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/assessmentsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[assessmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingtrust/arm-billing-trust/samples/v1-beta/typescript/src/assessmentsCreateOrUpdateSample.ts
[assessmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingtrust/arm-billing-trust/samples/v1-beta/typescript/src/assessmentsDeleteSample.ts
[assessmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingtrust/arm-billing-trust/samples/v1-beta/typescript/src/assessmentsGetSample.ts
[assessmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingtrust/arm-billing-trust/samples/v1-beta/typescript/src/assessmentsListSample.ts
[assessmentslistuploadtokensample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingtrust/arm-billing-trust/samples/v1-beta/typescript/src/assessmentsListUploadTokenSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingtrust/arm-billing-trust/samples/v1-beta/typescript/src/operationsListSample.ts
[rulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingtrust/arm-billing-trust/samples/v1-beta/typescript/src/rulesCreateOrUpdateSample.ts
[rulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingtrust/arm-billing-trust/samples/v1-beta/typescript/src/rulesGetSample.ts
[ruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingtrust/arm-billing-trust/samples/v1-beta/typescript/src/rulesListSample.ts
[rulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/billingtrust/arm-billing-trust/samples/v1-beta/typescript/src/rulesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-billing-trust?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/billingtrust/arm-billing-trust/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
