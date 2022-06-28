# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                   | **Description**                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [grantsGetSample.js][grantsgetsample]                           | Get details for a specific grant linked to the provided billing account and billing profile. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Grant.json                                                                                                                    |
| [grantsListAllSample.js][grantslistallsample]                   | Get a list of grants that Microsoft has provided. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GrantList.json                                                                                                                                                           |
| [grantsListSample.js][grantslistsample]                         | Get details for a specific grant linked to the provided billing account and billing profile. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GrantDefaultList.json                                                                                                         |
| [joinRequestsApproveSample.js][joinrequestsapprovesample]       | Approve student joining the redeemable lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestApproveAndDeny.json                                                                                                                                                  |
| [joinRequestsDenySample.js][joinrequestsdenysample]             | Deny student joining the redeemable lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestApproveAndDeny.json                                                                                                                                                     |
| [joinRequestsGetSample.js][joinrequestsgetsample]               | get student join requests x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequest.json                                                                                                                                                                                 |
| [joinRequestsListSample.js][joinrequestslistsample]             | get student join requests x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestList.json                                                                                                                                                                             |
| [labsCreateOrUpdateSample.js][labscreateorupdatesample]         | Create a new lab or update a previously created lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/CreateLab.json                                                                                                                                                        |
| [labsDeleteSample.js][labsdeletesample]                         | Delete a specific lab associated with the provided billing account name, billing profile name, and invoice section name. Note all students must be removed from the lab in order to delete the lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/DeleteLab.json         |
| [labsGenerateInviteCodeSample.js][labsgenerateinvitecodesample] | Generate invite code for a lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GenerateInviteCode.json                                                                                                                                                                     |
| [labsGetSample.js][labsgetsample]                               | Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Lab.json                                                                             |
| [labsListAllSample.js][labslistallsample]                       | Get a list of labs associated with the provided billing account name and billing profile name. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabList.json                                                                                                                |
| [labsListSample.js][labslistsample]                             | Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabListWithInvoiceSectionName.json                                                   |
| [operationsListSample.js][operationslistsample]                 | Lists all of the available Microsoft.Education API operations. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GetOperations.json                                                                                                                                          |
| [redeemInvitationCodeSample.js][redeeminvitationcodesample]     | Redeem invite code to join a redeemable lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/RedeemCode.json                                                                                                                                                                |
| [studentLabsGetSample.js][studentlabsgetsample]                 | Get the details for a specified lab associated with the student lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentLab.json                                                                                                                                       |
| [studentLabsListAllSample.js][studentlabslistallsample]         | Get a list of all labs associated with the caller of the API. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentLabList.json                                                                                                                                          |
| [studentsCreateOrUpdateSample.js][studentscreateorupdatesample] | Create and add a new student to the specified lab or update the details of an existing student in a lab. Note the student must have a valid tenant to accept the lab after they have been added to lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/CreateStudent.json |
| [studentsDeleteSample.js][studentsdeletesample]                 | Delete the specified student based on the student alias. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/DeleteStudent.json                                                                                                                                                |
| [studentsGetSample.js][studentsgetsample]                       | Get the details for a specific student in the specified lab by student alias x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Student.json                                                                                                                                  |
| [studentsListSample.js][studentslistsample]                     | Get a list of details about students that are associated with the specified lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentList.json                                                                                                                          |

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
node grantsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node grantsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[grantsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/grantsGetSample.js
[grantslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/grantsListAllSample.js
[grantslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/grantsListSample.js
[joinrequestsapprovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/joinRequestsApproveSample.js
[joinrequestsdenysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/joinRequestsDenySample.js
[joinrequestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/joinRequestsGetSample.js
[joinrequestslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/joinRequestsListSample.js
[labscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/labsCreateOrUpdateSample.js
[labsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/labsDeleteSample.js
[labsgenerateinvitecodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/labsGenerateInviteCodeSample.js
[labsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/labsGetSample.js
[labslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/labsListAllSample.js
[labslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/labsListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/operationsListSample.js
[redeeminvitationcodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/redeemInvitationCodeSample.js
[studentlabsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/studentLabsGetSample.js
[studentlabslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/studentLabsListAllSample.js
[studentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/studentsCreateOrUpdateSample.js
[studentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/studentsDeleteSample.js
[studentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/studentsGetSample.js
[studentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/studentsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-education?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/education/arm-education/README.md
