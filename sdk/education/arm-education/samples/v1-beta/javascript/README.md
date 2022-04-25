# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                           | **Description**                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [approveInviteSample.js][approveinvitesample]           | Approve student joining the redeemable lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestApproveAndDeny.json                                                                                                                                                  |
| [createLabSample.js][createlabsample]                   | Create a new lab or update a previously created lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/CreateLab.json                                                                                                                                                        |
| [createStudentSample.js][createstudentsample]           | Create and add a new student to the specified lab or update the details of an existing student in a lab. Note the student must have a valid tenant to accept the lab after they have been added to lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/CreateStudent.json |
| [deleteLabSample.js][deletelabsample]                   | Delete a specific lab associated with the provided billing account name, billing profile name, and invoice section name. Note all students must be removed from the lab in order to delete the lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/DeleteLab.json         |
| [deleteStudentSample.js][deletestudentsample]           | Delete the specified student based on the student alias. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/DeleteStudent.json                                                                                                                                                |
| [denyInviteSample.js][denyinvitesample]                 | Deny student joining the redeemable lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestApproveAndDeny.json                                                                                                                                                     |
| [generateInviteCodeSample.js][generateinvitecodesample] | Generate invite code for a lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GenerateInviteCode.json                                                                                                                                                                     |
| [getGrantSample.js][getgrantsample]                     | Get details for a specific grant linked to the provided billing account and billing profile. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Grant.json                                                                                                                    |
| [getLabSample.js][getlabsample]                         | Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Lab.json                                                                             |
| [getStudentLabSample.js][getstudentlabsample]           | Get the details for a specified lab associated with the student lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentLab.json                                                                                                                                       |
| [getStudentSample.js][getstudentsample]                 | Get the details for a specific student in the specified lab by student alias x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Student.json                                                                                                                                  |
| [grantListSample.js][grantlistsample]                   | Get details for a specific grant linked to the provided billing account and billing profile. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GrantDefaultList.json                                                                                                         |
| [grantsListSample.js][grantslistsample]                 | Get a list of grants that Microsoft has provided. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GrantList.json                                                                                                                                                           |
| [joinRequestGetSample.js][joinrequestgetsample]         | get student join requests x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequest.json                                                                                                                                                                                 |
| [joinRequestsListSample.js][joinrequestslistsample]     | get student join requests x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/JoinRequestList.json                                                                                                                                                                             |
| [labListSample.js][lablistsample]                       | Get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabListWithInvoiceSectionName.json                                                   |
| [labsListSample.js][labslistsample]                     | Get a list of labs associated with the provided billing account name and billing profile name. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/LabList.json                                                                                                                |
| [operationsListSample.js][operationslistsample]         | Lists all of the available Microsoft.Education API operations. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GetOperations.json                                                                                                                                          |
| [redeemInviteSample.js][redeeminvitesample]             | Redeem invite code to join a redeemable lab x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/RedeemCode.json                                                                                                                                                                |
| [studentLabsListSample.js][studentlabslistsample]       | Get a list of all labs associated with the caller of the API. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentLabList.json                                                                                                                                          |
| [studentsListSample.js][studentslistsample]             | Get a list of details about students that are associated with the specified lab. x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/StudentList.json                                                                                                                          |

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
node approveInviteSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node approveInviteSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[approveinvitesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/approveInviteSample.js
[createlabsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/createLabSample.js
[createstudentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/createStudentSample.js
[deletelabsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/deleteLabSample.js
[deletestudentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/deleteStudentSample.js
[denyinvitesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/denyInviteSample.js
[generateinvitecodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/generateInviteCodeSample.js
[getgrantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/getGrantSample.js
[getlabsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/getLabSample.js
[getstudentlabsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/getStudentLabSample.js
[getstudentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/getStudentSample.js
[grantlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/grantListSample.js
[grantslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/grantsListSample.js
[joinrequestgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/joinRequestGetSample.js
[joinrequestslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/joinRequestsListSample.js
[lablistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/labListSample.js
[labslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/labsListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/operationsListSample.js
[redeeminvitesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/redeemInviteSample.js
[studentlabslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/studentLabsListSample.js
[studentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/education/arm-education/samples/v1-beta/javascript/studentsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-education?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/education/arm-education/README.md
