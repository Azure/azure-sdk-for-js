# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                           | **Description**                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [approveInviteSample.ts][approveinvitesample]           | Approve student joining the redeemable lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestApproveAndDeny.json                                                                                                                                                  |
| [createLabSample.ts][createlabsample]                   | Create a new lab or update a previously created lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/CreateLab.json                                                                                                                                                        |
| [createStudentSample.ts][createstudentsample]           | Create and add a new student to the specified lab or update the details of an existing student in a lab. Note the student must have a valid tenant to accept the lab after they have been added to lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/CreateStudent.json |
| [deleteLabSample.ts][deletelabsample]                   | Delete a specific lab associated with the provided billing account name, billing profile name, and invoice section name. Note all students must be removed from the lab in order to delete the lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/DeleteLab.json         |
| [deleteStudentSample.ts][deletestudentsample]           | Delete the specified student based on the student alias. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/DeleteStudent.json                                                                                                                                                |
| [denyInviteSample.ts][denyinvitesample]                 | Deny student joining the redeemable lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestApproveAndDeny.json                                                                                                                                                     |
| [generateInviteCodeSample.ts][generateinvitecodesample] | Generate invite code for a lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GenerateInviteCode.json                                                                                                                                                                     |
| [getGrantSample.ts][getgrantsample]                     | Get details for a specific grant linked to the provided billing account and billing profile. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Grant.json                                                                                                                    |
| [getLabSample.ts][getlabsample]                         | Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Lab.json                                                                             |
| [getStudentLabSample.ts][getstudentlabsample]           | Get the details for a specified lab associated with the student lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentLab.json                                                                                                                                       |
| [getStudentSample.ts][getstudentsample]                 | Get the details for a specific student in the specified lab by student alias x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Student.json                                                                                                                                  |
| [grantListSample.ts][grantlistsample]                   | Get details for a specific grant linked to the provided billing account and billing profile. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GrantDefaultList.json                                                                                                         |
| [grantsListSample.ts][grantslistsample]                 | Get a list of grants that Microsoft has provided. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GrantList.json                                                                                                                                                           |
| [joinRequestGetSample.ts][joinrequestgetsample]         | get student join requests x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequest.json                                                                                                                                                                                 |
| [joinRequestsListSample.ts][joinrequestslistsample]     | get student join requests x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestList.json                                                                                                                                                                             |
| [labListSample.ts][lablistsample]                       | Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabListWithInvoiceSectionName.json                                                   |
| [labsListSample.ts][labslistsample]                     | Get a list of labs associated with the provided billing account name and billing profile name. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabList.json                                                                                                                |
| [operationsListSample.ts][operationslistsample]         | Lists all of the available Microsoft.Education API operations. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GetOperations.json                                                                                                                                          |
| [redeemInviteSample.ts][redeeminvitesample]             | Redeem invite code to join a redeemable lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/RedeemCode.json                                                                                                                                                                |
| [studentLabsListSample.ts][studentlabslistsample]       | Get a list of all labs associated with the caller of the API. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentLabList.json                                                                                                                                          |
| [studentsListSample.ts][studentslistsample]             | Get a list of details about students that are associated with the specified lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentList.json                                                                                                                          |

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
node dist/approveInviteSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/approveInviteSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[approveinvitesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/approveInviteSample.ts
[createlabsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/createLabSample.ts
[createstudentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/createStudentSample.ts
[deletelabsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/deleteLabSample.ts
[deletestudentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/deleteStudentSample.ts
[denyinvitesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/denyInviteSample.ts
[generateinvitecodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/generateInviteCodeSample.ts
[getgrantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/getGrantSample.ts
[getlabsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/getLabSample.ts
[getstudentlabsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/getStudentLabSample.ts
[getstudentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/getStudentSample.ts
[grantlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/grantListSample.ts
[grantslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/grantsListSample.ts
[joinrequestgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/joinRequestGetSample.ts
[joinrequestslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/joinRequestsListSample.ts
[lablistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/labListSample.ts
[labslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/labsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/operationsListSample.ts
[redeeminvitesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/redeemInviteSample.ts
[studentlabslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/studentLabsListSample.ts
[studentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/typescript/src/studentsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-education?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/education/arm-education/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
