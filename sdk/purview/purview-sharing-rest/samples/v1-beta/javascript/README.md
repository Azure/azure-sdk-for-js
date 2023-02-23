# Purview Sharing client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Purview Sharing in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                  |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [activateTenantEmailRegistrationSample.js][activatetenantemailregistrationsample] | Activates the email registration for current tenant                                              |
| [createOrReplaceReceivedShareSample.js][createorreplacereceivedsharesample]       | Update changes to a received share                                                               |
| [createOrReplaceSentShareSample.js][createorreplacesentsharesample]               | Create or replace a sent share                                                                   |
| [createSentShareInvitationSample.js][createsentshareinvitationsample]             | Create a recipient for a given sent share                                                        |
| [deleteReceivedShareSample.js][deletereceivedsharesample]                         | Delete a received share                                                                          |
| [deleteSentShareInvitationSample.js][deletesentshareinvitationsample]             | Delete a sent share invitation                                                                   |
| [deleteSentShareSample.js][deletesentsharesample]                                 | Delete a sent share                                                                              |
| [getAllAttachedReceivedSharesSample.js][getallattachedreceivedsharessample]       | List attached received shares                                                                    |
| [getAllDetachedReceivedSharesSample.js][getalldetachedreceivedsharessample]       | List detached received shares                                                                    |
| [getAllSentShareInvitationsSample.js][getallsentshareinvitationssample]           | List sent share recipients                                                                       |
| [getAllSentSharesSample.js][getallsentsharessample]                               | List sent shares                                                                                 |
| [getReceivedShareSample.js][getreceivedsharesample]                               | Get a received share                                                                             |
| [getSentShareInvitationSample.js][getsentshareinvitationsample]                   | Get recipient for a given sent share                                                             |
| [getSentShareSample.js][getsentsharesample]                                       | Get a sent share                                                                                 |
| [notifyUserSentShareInvitationSample.js][notifyusersentshareinvitationsample]     | Notifies the user recipient of the sent share invitation, does not apply to service invitations. |
| [tenantEmailRegistrationSample.js][tenantemailregistrationsample]                 | Register an email for the current tenant                                                         |

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
node activateTenantEmailRegistrationSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" ACTIVATION_CODE="<activation code>" node activateTenantEmailRegistrationSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[activatetenantemailregistrationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/activateTenantEmailRegistrationSample.js
[createorreplacereceivedsharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/createOrReplaceReceivedShareSample.js
[createorreplacesentsharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/createOrReplaceSentShareSample.js
[createsentshareinvitationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/createSentShareInvitationSample.js
[deletereceivedsharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/deleteReceivedShareSample.js
[deletesentshareinvitationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/deleteSentShareInvitationSample.js
[deletesentsharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/deleteSentShareSample.js
[getallattachedreceivedsharessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/getAllAttachedReceivedSharesSample.js
[getalldetachedreceivedsharessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/getAllDetachedReceivedSharesSample.js
[getallsentshareinvitationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/getAllSentShareInvitationsSample.js
[getallsentsharessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/getAllSentSharesSample.js
[getreceivedsharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/getReceivedShareSample.js
[getsentshareinvitationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/getSentShareInvitationSample.js
[getsentsharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/getSentShareSample.js
[notifyusersentshareinvitationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/notifyUserSentShareInvitationSample.js
[tenantemailregistrationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/javascript/tenantEmailRegistrationSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure-rest/purview-sharing?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/purview-sharing-rest/README.md
