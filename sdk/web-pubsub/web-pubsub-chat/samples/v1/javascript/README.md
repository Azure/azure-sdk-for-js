# @azure/web-pubsub-chat client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/web-pubsub-chat in some common scenarios.

| **File Name**                                                         | **Description**                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------- |
| [createOrReplaceRoleSample.js][createorreplacerolesample]             | create or replace a role.                                 |
| [createOrReplaceRoomMemberSample.js][createorreplaceroommembersample] | create or replace a room member.                          |
| [createOrReplaceRoomSample.js][createorreplaceroomsample]             | create or replace a room with a client-specified ID.      |
| [createOrReplaceTopicSample.js][createorreplacetopicsample]           | Create a room topic with an ifNoneMatch precondition.     |
| [createOrReplaceUserSample.js][createorreplaceusersample]             | create or replace a user.                                 |
| [deleteMessageSample.js][deletemessagesample]                         | delete a message.                                         |
| [deleteRoleSample.js][deleterolesample]                               | delete a role.                                            |
| [deleteRoomMemberSample.js][deleteroommembersample]                   | delete a room member.                                     |
| [deleteRoomSample.js][deleteroomsample]                               | delete a room.                                            |
| [deleteTopicSample.js][deletetopicsample]                             | Soft delete a room topic.                                 |
| [deleteUserSample.js][deleteusersample]                               | delete a user.                                            |
| [getConversationSample.js][getconversationsample]                     | get conversation information.                             |
| [getRoleSample.js][getrolesample]                                     | get role information.                                     |
| [getRoomSample.js][getroomsample]                                     | get room information.                                     |
| [getTopicSample.js][gettopicsample]                                   | Get a room topic.                                         |
| [getUserSample.js][getusersample]                                     | get a user's profile.                                     |
| [listMessagesSample.js][listmessagessample]                           | query messages in a conversation from latest to earliest. |
| [listRolesSample.js][listrolessample]                                 | query roles in a hub.                                     |
| [listRoomMembersSample.js][listroommemberssample]                     | get room members.                                         |
| [listRoomsForUserSample.js][listroomsforusersample]                   | List a user's rooms with pagination.                      |
| [listRoomsSample.js][listroomssample]                                 | List rooms in a hub.                                      |
| [listTopicsSample.js][listtopicssample]                               | List room topics.                                         |
| [listUsersSample.js][listuserssample]                                 | List users in a hub.                                      |
| [manageRolesSample.js][managerolessample]                             | manage chat roles.                                        |
| [manageRoomsSample.js][manageroomssample]                             | manage chat rooms.                                        |
| [manageUsersSample.js][manageuserssample]                             | manage chat users.                                        |
| [updateMessageSample.js][updatemessagesample]                         | update a message.                                         |
| [updateTopicSample.js][updatetopicsample]                             | Partially update a topic's state.                         |

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
npx cross-env WPS_CHAT_ENDPOINT="<wps chat endpoint>" WPS_CHAT_HUB="<wps chat hub>" node createOrReplaceRoleSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createorreplacerolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/createOrReplaceRoleSample.js
[createorreplaceroommembersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/createOrReplaceRoomMemberSample.js
[createorreplaceroomsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/createOrReplaceRoomSample.js
[createorreplacetopicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/createOrReplaceTopicSample.js
[createorreplaceusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/createOrReplaceUserSample.js
[deletemessagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/deleteMessageSample.js
[deleterolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/deleteRoleSample.js
[deleteroommembersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/deleteRoomMemberSample.js
[deleteroomsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/deleteRoomSample.js
[deletetopicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/deleteTopicSample.js
[deleteusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/deleteUserSample.js
[getconversationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/getConversationSample.js
[getrolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/getRoleSample.js
[getroomsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/getRoomSample.js
[gettopicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/getTopicSample.js
[getusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/getUserSample.js
[listmessagessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/listMessagesSample.js
[listrolessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/listRolesSample.js
[listroommemberssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/listRoomMembersSample.js
[listroomsforusersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/listRoomsForUserSample.js
[listroomssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/listRoomsSample.js
[listtopicssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/listTopicsSample.js
[listuserssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/listUsersSample.js
[managerolessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/manageRolesSample.js
[manageroomssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/manageRoomsSample.js
[manageuserssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/manageUsersSample.js
[updatemessagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/updateMessageSample.js
[updatetopicsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/web-pubsub-chat/samples/v1/javascript/updateTopicSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/web-pubsub-chat
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/web-pubsub/web-pubsub-chat/README.md
