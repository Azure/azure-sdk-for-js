# Purview Sharing client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Purview Sharing in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                  |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [activateTenantEmailRegistrationSample.ts][activatetenantemailregistrationsample] | Activates the email registration for current tenant                                              |
| [createOrReplaceReceivedShareSample.ts][createorreplacereceivedsharesample]       | Update changes to a received share                                                               |
| [createOrReplaceSentShareSample.ts][createorreplacesentsharesample]               | Create or replace a sent share                                                                   |
| [createSentShareInvitationSample.ts][createsentshareinvitationsample]             | Create a recipient for a given sent share                                                        |
| [deleteReceivedShareSample.ts][deletereceivedsharesample]                         | Delete a received share                                                                          |
| [deleteSentShareInvitationSample.ts][deletesentshareinvitationsample]             | Delete a sent share invitation                                                                   |
| [deleteSentShareSample.ts][deletesentsharesample]                                 | Delete a sent share                                                                              |
| [getAllAttachedReceivedSharesSample.ts][getallattachedreceivedsharessample]       | List attached received shares                                                                    |
| [getAllDetachedReceivedSharesSample.ts][getalldetachedreceivedsharessample]       | List detached received shares                                                                    |
| [getAllSentShareInvitationsSample.ts][getallsentshareinvitationssample]           | List sent share recipients                                                                       |
| [getAllSentSharesSample.ts][getallsentsharessample]                               | List sent shares                                                                                 |
| [getReceivedShareSample.ts][getreceivedsharesample]                               | Get a received share                                                                             |
| [getSentShareInvitationSample.ts][getsentshareinvitationsample]                   | Get recipient for a given sent share                                                             |
| [getSentShareSample.ts][getsentsharesample]                                       | Get a sent share                                                                                 |
| [notifyUserSentShareInvitationSample.ts][notifyusersentshareinvitationsample]     | Notifies the user recipient of the sent share invitation, does not apply to service invitations. |
| [tenantEmailRegistrationSample.ts][tenantemailregistrationsample]                 | Register an email for the current tenant                                                         |

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
node dist/activateTenantEmailRegistrationSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" ACTIVATION_CODE="<activation code>" node dist/activateTenantEmailRegistrationSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[activatetenantemailregistrationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/activateTenantEmailRegistrationSample.ts
[createorreplacereceivedsharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/createOrReplaceReceivedShareSample.ts
[createorreplacesentsharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/createOrReplaceSentShareSample.ts
[createsentshareinvitationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/createSentShareInvitationSample.ts
[deletereceivedsharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/deleteReceivedShareSample.ts
[deletesentshareinvitationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/deleteSentShareInvitationSample.ts
[deletesentsharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/deleteSentShareSample.ts
[getallattachedreceivedsharessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/getAllAttachedReceivedSharesSample.ts
[getalldetachedreceivedsharessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/getAllDetachedReceivedSharesSample.ts
[getallsentshareinvitationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/getAllSentShareInvitationsSample.ts
[getallsentsharessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/getAllSentSharesSample.ts
[getreceivedsharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/getReceivedShareSample.ts
[getsentshareinvitationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/getSentShareInvitationSample.ts
[getsentsharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/getSentShareSample.ts
[notifyusersentshareinvitationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/notifyUserSentShareInvitationSample.ts
[tenantemailregistrationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-sharing-rest/samples/v1-beta/typescript/src/tenantEmailRegistrationSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure-rest/purview-sharing?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/purview-sharing-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
