# @azure/web-pubsub-chat client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/web-pubsub-chat in some common scenarios.

| **File Name**                                                         | **Description**                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------- |
| [createOrReplaceRoleSample.ts][createorreplacerolesample]             | create or replace a role.                                 |
| [createOrReplaceRoomMemberSample.ts][createorreplaceroommembersample] | create or replace a room member.                          |
| [createOrReplaceRoomSample.ts][createorreplaceroomsample]             | create or replace a room with a client-specified ID.      |
| [createOrReplaceTopicSample.ts][createorreplacetopicsample]           | Create a room topic with an ifNoneMatch precondition.     |
| [createOrReplaceUserSample.ts][createorreplaceusersample]             | create or replace a user.                                 |
| [deleteMessageSample.ts][deletemessagesample]                         | delete a message.                                         |
| [deleteRoleSample.ts][deleterolesample]                               | delete a role.                                            |
| [deleteRoomMemberSample.ts][deleteroommembersample]                   | delete a room member.                                     |
| [deleteRoomSample.ts][deleteroomsample]                               | delete a room.                                            |
| [deleteTopicSample.ts][deletetopicsample]                             | Soft delete a room topic.                                 |
| [deleteUserSample.ts][deleteusersample]                               | delete a user.                                            |
| [getConversationSample.ts][getconversationsample]                     | get conversation information.                             |
| [getRoleSample.ts][getrolesample]                                     | get role information.                                     |
| [getRoomSample.ts][getroomsample]                                     | get room information.                                     |
| [getTopicSample.ts][gettopicsample]                                   | Get a room topic.                                         |
| [getUserSample.ts][getusersample]                                     | get a user's profile.                                     |
| [listMessagesSample.ts][listmessagessample]                           | query messages in a conversation from latest to earliest. |
| [listRolesSample.ts][listrolessample]                                 | query roles in a hub.                                     |
| [listRoomMembersSample.ts][listroommemberssample]                     | get room members.                                         |
| [listRoomsForUserSample.ts][listroomsforusersample]                   | List a user's rooms with pagination.                      |
| [listRoomsSample.ts][listroomssample]                                 | List rooms in a hub.                                      |
| [listTopicsSample.ts][listtopicssample]                               | List room topics.                                         |
| [listUsersSample.ts][listuserssample]                                 | List users in a hub.                                      |
| [manageRolesSample.ts][managerolessample]                             | manage chat roles.                                        |
| [manageRoomsSample.ts][manageroomssample]                             | manage chat rooms.                                        |
| [manageUsersSample.ts][manageuserssample]                             | manage chat users.                                        |
| [updateMessageSample.ts][updatemessagesample]                         | update a message.                                         |
| [updateTopicSample.ts][updatetopicsample]                             | Partially update a topic's state.                         |

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
npx cross-env WPS_CHAT_ENDPOINT="<wps chat endpoint>" WPS_CHAT_HUB="<wps chat hub>" node dist/createOrReplaceRoleSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createorreplacerolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/createOrReplaceRoleSample.ts
[createorreplaceroommembersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/createOrReplaceRoomMemberSample.ts
[createorreplaceroomsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/createOrReplaceRoomSample.ts
[createorreplacetopicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/createOrReplaceTopicSample.ts
[createorreplaceusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/createOrReplaceUserSample.ts
[deletemessagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/deleteMessageSample.ts
[deleterolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/deleteRoleSample.ts
[deleteroommembersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/deleteRoomMemberSample.ts
[deleteroomsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/deleteRoomSample.ts
[deletetopicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/deleteTopicSample.ts
[deleteusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/deleteUserSample.ts
[getconversationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/getConversationSample.ts
[getrolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/getRoleSample.ts
[getroomsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/getRoomSample.ts
[gettopicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/getTopicSample.ts
[getusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/getUserSample.ts
[listmessagessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/listMessagesSample.ts
[listrolessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/listRolesSample.ts
[listroommemberssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/listRoomMembersSample.ts
[listroomsforusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/listRoomsForUserSample.ts
[listroomssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/listRoomsSample.ts
[listtopicssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/listTopicsSample.ts
[listuserssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/listUsersSample.ts
[managerolessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/manageRolesSample.ts
[manageroomssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/manageRoomsSample.ts
[manageuserssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/manageUsersSample.ts
[updatemessagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/updateMessageSample.ts
[updatetopicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/typescript/src/updateTopicSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/web-pubsub-chat
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/web-pubsub/web-pubsub-chat/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
