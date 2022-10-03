# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                   | **Description**                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [grantsGetSample.ts][grantsgetsample]                           | Get details for a specific grant linked to the provided billing account and billing profile. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Grant.json                                                                                                                    |
| [grantsListAllSample.ts][grantslistallsample]                   | Get a list of grants that Microsoft has provided. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GrantList.json                                                                                                                                                           |
| [grantsListSample.ts][grantslistsample]                         | Get details for a specific grant linked to the provided billing account and billing profile. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GrantDefaultList.json                                                                                                         |
| [joinRequestsApproveSample.ts][joinrequestsapprovesample]       | Approve student joining the redeemable lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestApproveAndDeny.json                                                                                                                                                  |
| [joinRequestsDenySample.ts][joinrequestsdenysample]             | Deny student joining the redeemable lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestApproveAndDeny.json                                                                                                                                                     |
| [joinRequestsGetSample.ts][joinrequestsgetsample]               | get student join requests x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequest.json                                                                                                                                                                                 |
| [joinRequestsListSample.ts][joinrequestslistsample]             | get student join requests x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestList.json                                                                                                                                                                             |
| [labsCreateOrUpdateSample.ts][labscreateorupdatesample]         | Create a new lab or update a previously created lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/CreateLab.json                                                                                                                                                        |
| [labsDeleteSample.ts][labsdeletesample]                         | Delete a specific lab associated with the provided billing account name, billing profile name, and invoice section name. Note all students must be removed from the lab in order to delete the lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/DeleteLab.json         |
| [labsGenerateInviteCodeSample.ts][labsgenerateinvitecodesample] | Generate invite code for a lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GenerateInviteCode.json                                                                                                                                                                     |
| [labsGetSample.ts][labsgetsample]                               | Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Lab.json                                                                             |
| [labsListAllSample.ts][labslistallsample]                       | Get a list of labs associated with the provided billing account name and billing profile name. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabList.json                                                                                                                |
| [labsListSample.ts][labslistsample]                             | Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabListWithInvoiceSectionName.json                                                   |
| [operationsListSample.ts][operationslistsample]                 | Lists all of the available Microsoft.Education API operations. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GetOperations.json                                                                                                                                          |
| [redeemInvitationCodeSample.ts][redeeminvitationcodesample]     | Redeem invite code to join a redeemable lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/RedeemCode.json                                                                                                                                                                |
| [studentLabsGetSample.ts][studentlabsgetsample]                 | Get the details for a specified lab associated with the student lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentLab.json                                                                                                                                       |
| [studentLabsListAllSample.ts][studentlabslistallsample]         | Get a list of all labs associated with the caller of the API. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentLabList.json                                                                                                                                          |
| [studentsCreateOrUpdateSample.ts][studentscreateorupdatesample] | Create and add a new student to the specified lab or update the details of an existing student in a lab. Note the student must have a valid tenant to accept the lab after they have been added to lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/CreateStudent.json |
| [studentsDeleteSample.ts][studentsdeletesample]                 | Delete the specified student based on the student alias. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/DeleteStudent.json                                                                                                                                                |
| [studentsGetSample.ts][studentsgetsample]                       | Get the details for a specific student in the specified lab by student alias x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Student.json                                                                                                                                  |
| [studentsListSample.ts][studentslistsample]                     | Get a list of details about students that are associated with the specified lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentList.json                                                                                                                          |

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
node dist/grantsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/grantsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[grantsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/grantsGetSample.ts
[grantslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/grantsListAllSample.ts
[grantslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/grantsListSample.ts
[joinrequestsapprovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/joinRequestsApproveSample.ts
[joinrequestsdenysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/joinRequestsDenySample.ts
[joinrequestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/joinRequestsGetSample.ts
[joinrequestslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/joinRequestsListSample.ts
[labscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/labsCreateOrUpdateSample.ts
[labsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/labsDeleteSample.ts
[labsgenerateinvitecodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/labsGenerateInviteCodeSample.ts
[labsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/labsGetSample.ts
[labslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/labsListAllSample.ts
[labslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/labsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/operationsListSample.ts
[redeeminvitationcodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/redeemInvitationCodeSample.ts
[studentlabsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/studentLabsGetSample.ts
[studentlabslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/studentLabsListAllSample.ts
[studentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/studentsCreateOrUpdateSample.ts
[studentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/studentsDeleteSample.ts
[studentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/studentsGetSample.ts
[studentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/studentsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-education?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/education/arm-education/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
