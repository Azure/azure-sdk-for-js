# @azure/web-pubsub-chat client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/web-pubsub-chat in some common scenarios.

| **File Name**                                                         | **Description**                                                                                                                                                                                     |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [createOrReplaceRoleSample.js][createorreplacerolesample]             | create or replace a role. x-ms-original-file: 2026-02-01-preview/CreateOrReplaceRole.json                                                                                                           |
| [createOrReplaceRoomMemberSample.js][createorreplaceroommembersample] | create or replace a room member. x-ms-original-file: 2026-02-01-preview/CreateOrReplaceRoomMember.json                                                                                              |
| [createOrReplaceRoomSample.js][createorreplaceroomsample]             | create or replace a room with a client-specified ID. x-ms-original-file: 2026-02-01-preview/CreateOrReplaceRoom.json                                                                                |
| [createOrReplaceUserSample.js][createorreplaceusersample]             | create or replace a user. The request body is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator. x-ms-original-file: 2026-02-01-preview/CreateOrReplaceUser.json |
| [deleteMessageSample.js][deletemessagesample]                         | delete a message. x-ms-original-file: 2026-02-01-preview/DeleteMessage.json                                                                                                                         |
| [deleteRoleSample.js][deleterolesample]                               | delete a role. x-ms-original-file: 2026-02-01-preview/DeleteRole.json                                                                                                                               |
| [deleteRoomMemberSample.js][deleteroommembersample]                   | delete a room member. x-ms-original-file: 2026-02-01-preview/DeleteRoomMember.json                                                                                                                  |
| [deleteRoomSample.js][deleteroomsample]                               | delete a room. x-ms-original-file: 2026-02-01-preview/DeleteRoom.json                                                                                                                               |
| [deleteUserSample.js][deleteusersample]                               | delete a user. x-ms-original-file: 2026-02-01-preview/DeleteUser.json                                                                                                                               |
| [getConversationSample.js][getconversationsample]                     | get conversation information. x-ms-original-file: 2026-02-01-preview/GetConversation.json                                                                                                           |
| [getRoleSample.js][getrolesample]                                     | get role information. x-ms-original-file: 2026-02-01-preview/GetRole.json                                                                                                                           |
| [getRoomSample.js][getroomsample]                                     | get room information. x-ms-original-file: 2026-02-01-preview/GetRoom.json                                                                                                                           |
| [getUserSample.js][getusersample]                                     | get a user's profile. The response is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator. x-ms-original-file: 2026-02-01-preview/GetUser.json                     |
| [listMessagesSample.js][listmessagessample]                           | query messages in a conversation from latest to earliest. x-ms-original-file: 2026-02-01-preview/ListMessages.json                                                                                  |
| [listRolesSample.js][listrolessample]                                 | query roles in a hub. x-ms-original-file: 2026-02-01-preview/ListRoles.json                                                                                                                         |
| [listRoomMembersSample.js][listroommemberssample]                     | get room members. x-ms-original-file: 2026-02-01-preview/ListRoomMembers.json                                                                                                                       |
| [updateMessageSample.js][updatemessagesample]                         | update a message. x-ms-original-file: 2026-02-01-preview/UpdateMessage.json                                                                                                                         |

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
node createOrReplaceRoleSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT="<web pub sub chat service endpoint>" WEB_PUB_SUB_CHAT_HUB="<web pub sub chat hub>" node createOrReplaceRoleSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createorreplacerolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/createOrReplaceRoleSample.js
[createorreplaceroommembersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/createOrReplaceRoomMemberSample.js
[createorreplaceroomsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/createOrReplaceRoomSample.js
[createorreplaceusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/createOrReplaceUserSample.js
[deletemessagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/deleteMessageSample.js
[deleterolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/deleteRoleSample.js
[deleteroommembersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/deleteRoomMemberSample.js
[deleteroomsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/deleteRoomSample.js
[deleteusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/deleteUserSample.js
[getconversationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/getConversationSample.js
[getrolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/getRoleSample.js
[getroomsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/getRoomSample.js
[getusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/getUserSample.js
[listmessagessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/listMessagesSample.js
[listrolessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/listRolesSample.js
[listroommemberssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/listRoomMembersSample.js
[updatemessagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/javascript/updateMessageSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/web-pubsub-chat?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/web-pubsub/web-pubsub-chat/README.md
