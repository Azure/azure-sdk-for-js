# @azure/web-pubsub-chat client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/web-pubsub-chat in some common scenarios.

| **File Name**                                                         | **Description**                                                                                                                                                                                     |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [createOrReplaceRoleSample.ts][createorreplacerolesample]             | create or replace a role. x-ms-original-file: 2026-02-01-preview/CreateOrReplaceRole.json                                                                                                           |
| [createOrReplaceRoomMemberSample.ts][createorreplaceroommembersample] | create or replace a room member. x-ms-original-file: 2026-02-01-preview/CreateOrReplaceRoomMember.json                                                                                              |
| [createOrReplaceRoomSample.ts][createorreplaceroomsample]             | create or replace a room with a client-specified ID. x-ms-original-file: 2026-02-01-preview/CreateOrReplaceRoom.json                                                                                |
| [createOrReplaceUserSample.ts][createorreplaceusersample]             | create or replace a user. The request body is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator. x-ms-original-file: 2026-02-01-preview/CreateOrReplaceUser.json |
| [deleteMessageSample.ts][deletemessagesample]                         | delete a message. x-ms-original-file: 2026-02-01-preview/DeleteMessage.json                                                                                                                         |
| [deleteRoleSample.ts][deleterolesample]                               | delete a role. x-ms-original-file: 2026-02-01-preview/DeleteRole.json                                                                                                                               |
| [deleteRoomMemberSample.ts][deleteroommembersample]                   | delete a room member. x-ms-original-file: 2026-02-01-preview/DeleteRoomMember.json                                                                                                                  |
| [deleteRoomSample.ts][deleteroomsample]                               | delete a room. x-ms-original-file: 2026-02-01-preview/DeleteRoom.json                                                                                                                               |
| [deleteUserSample.ts][deleteusersample]                               | delete a user. x-ms-original-file: 2026-02-01-preview/DeleteUser.json                                                                                                                               |
| [getConversationSample.ts][getconversationsample]                     | get conversation information. x-ms-original-file: 2026-02-01-preview/GetConversation.json                                                                                                           |
| [getRoleSample.ts][getrolesample]                                     | get role information. x-ms-original-file: 2026-02-01-preview/GetRole.json                                                                                                                           |
| [getRoomSample.ts][getroomsample]                                     | get room information. x-ms-original-file: 2026-02-01-preview/GetRoom.json                                                                                                                           |
| [getUserSample.ts][getusersample]                                     | get a user's profile. The response is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator. x-ms-original-file: 2026-02-01-preview/GetUser.json                     |
| [listMessagesSample.ts][listmessagessample]                           | query messages in a conversation from latest to earliest. x-ms-original-file: 2026-02-01-preview/ListMessages.json                                                                                  |
| [listRolesSample.ts][listrolessample]                                 | query roles in a hub. x-ms-original-file: 2026-02-01-preview/ListRoles.json                                                                                                                         |
| [listRoomMembersSample.ts][listroommemberssample]                     | get room members. x-ms-original-file: 2026-02-01-preview/ListRoomMembers.json                                                                                                                       |
| [updateMessageSample.ts][updatemessagesample]                         | update a message. x-ms-original-file: 2026-02-01-preview/UpdateMessage.json                                                                                                                         |

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
node dist/createOrReplaceRoleSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env WEB_PUB_SUB_CHAT_SERVICE_ENDPOINT="<web pub sub chat service endpoint>" WEB_PUB_SUB_CHAT_HUB="<web pub sub chat hub>" node dist/createOrReplaceRoleSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createorreplacerolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/createOrReplaceRoleSample.ts
[createorreplaceroommembersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/createOrReplaceRoomMemberSample.ts
[createorreplaceroomsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/createOrReplaceRoomSample.ts
[createorreplaceusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/createOrReplaceUserSample.ts
[deletemessagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/deleteMessageSample.ts
[deleterolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/deleteRoleSample.ts
[deleteroommembersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/deleteRoomMemberSample.ts
[deleteroomsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/deleteRoomSample.ts
[deleteusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/deleteUserSample.ts
[getconversationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/getConversationSample.ts
[getrolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/getRoleSample.ts
[getroomsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/getRoomSample.ts
[getusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/getUserSample.ts
[listmessagessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/listMessagesSample.ts
[listrolessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/listRolesSample.ts
[listroommemberssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/listRoomMembersSample.ts
[updatemessagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1-beta/typescript/src/updateMessageSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/web-pubsub-chat?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/web-pubsub/web-pubsub-chat/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
