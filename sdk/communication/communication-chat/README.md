# Azure Communication Chat client library for JavaScript

Azure Communication Services for Chat lets developers add chat capabilities to their app. Use this client library to manage chat threads and their users, and send and receive chat messages.

Read more about Azure Communication Services [here](https://docs.microsoft.com/azure/communication-services/overview)

## Getting started

## Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].
- [Node.js](https://nodejs.org)

### Installing

```bash
npm install @azure/communication-chat
```

## Key concepts

A chat conversation is represented by a thread. Each user in the thread is called a thread member. Thread members can chat with one another privately in a 1:1 chat or huddle up in a 1:N group chat. Users also get near-real time updates for when others are typing and when they have read the messages.

### ChatClient

`ChatClient` is the primary interface for developers using this client library. It provides asynchronous methods to create and delete a thread.

### ChatThreadClient

`ChatThreadClient` provides asynchronous methods to do the message and chat thread members operations within the chat thread.

## Examples

### Initialize ChatClient

Use resource url and user access token to initialize chat client.

```JavaScript
import { ChatClient } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from "@azure/communication-common";

// Your unique Azure Communication service endpoint
let endpointUrl = '<ENDPOINT>';
let userAccessToken = '<USER_ACCESS_TOKEN>';
let tokenCredential = new AzureCommunicationTokenCredential(userAccessToken);
let chatClient = new ChatClient(endpointUrl, tokenCredential);

```

### Create a thread with two users

Use the `createThread` method to create a chat thread.

`createThreadRequest` is used to describe the thread request:

- Use `topic` to give a thread topic;
- Use `members` to list the thread members to be added to the thread;

`createThreadResult` is the response returned from creating a thread. It contains a `chatThread` which is the thread that was created, as well as an `errors` property which will contain information about invalid participants if they failed to be added to the thread.

```Javascript
let createThreadRequest =
{
    topic: 'Preparation for London conference',
    members:
        [
            {
                user: { communicationUserId: '<USER_ID_FOR_JACK>' },
                displayName: 'Jack'
            },
            {
                user: { communicationUserId: '<USER_ID_FOR_GEETA>' },
                displayName: 'Geeta'
            }
        ]
};
let chatThreadResult = await chatClient.createChatThread(createThreadRequest);
let threadId = chatThreadResult.chatThread.id;
```

### Send a message to the thread

Use `sendMessage` method to sends a message to a thread identified by threadId.

`sendMessageRequest` is used to describe the message request:

- Use `content` to provide the chat message content;

`sendMessageOptions` is used to describe the operation optional params:

- Use `priority` to specify the message priority level, such as 'Normal' or 'High' ;
- Use `senderDisplayName` to specify the display name of the sender;

`sendChatMessageResult` is the response returned from sending a message, it contains an ID, which is the unique ID of the message.

```JavaScript
let sendMessageRequest =
{
    content: 'Hello Geeta! Can you share the deck for the conference?'
};
let sendMessageOptions =
{
    priority: 'Normal',
    senderDisplayName : 'Jack'
};
let sendChatMessageResult = await chatThreadClient.sendMessage(sendMessageRequest, sendMessageOptions);
let messageId = sendChatMessageResult.id;
```

### Receive messages from a thread

With real-time signaling, you can subscribe to listen for new incoming messages and update the current messages in memory accordingly.

```JavaScript

// open notifications channel
await chatClient.startRealtimeNotifications();
// subscribe to new notification
chatClient.on("chatMessageReceived", (e) => {
    console.log("Notification chatMessageReceived!");
    // your code here
});

```

Alternatively you can retrieve chat messages by polling the `listMessages` method at specified intervals.

```JavaScript
for await (const chatMessage of chatThreadClient.listMessages()) {
   // your code here
}
```

### Add Users to a thread

Once a thread is created, you can then add and remove users from that thread. By adding users, you give them access to be able to send messages to the thread.
You will need to start by getting a new access token and identity for that user. The user will need that access token in order to initialize their chat client.
More information on tokens here: [Authenticate to Azure Communication Services](https://docs.microsoft.com/azure/communication-services/concepts/authentication?tabs=javascript)

```JavaScript
// Get a new token created for the user. The token response will contain a token and an identity for the user.
let userTokenResponse = await myTokenFunction();

let addMembersRequest =
{
    members: [
        {
            user: { communicationUserId: userTokenResponse.identity },
            displayName: '<NAME>',
            shareHistoryTime: '<TIME>'
        }
    ]
};

await chatThreadClient.addMembers(addMembersRequest);

```

### Remove Users from a thread

Similar to above, you can also remove users from a thread. In order to remove, you will need to track the IDs of the members you have added.

```JavaScript

await chatThreadClient.removeMember({ communicationUserId: '<MEMBER_ID>' });

```

## Troubleshooting

## Next steps

In this quickstart you learned how to:

- Create a chat client
- Create a thread with 2 users
- Send a message to the thread
- Receive messages from a thread
- Remove Users from a thread

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
