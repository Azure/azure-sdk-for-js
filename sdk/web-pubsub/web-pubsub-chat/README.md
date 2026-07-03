# Azure Web PubSub Chat client library for JavaScript

The Azure Web PubSub Chat client library enables server applications to manage chat roles, users, rooms, room membership, conversations, and messages in an Azure Web PubSub Chat hub.

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Azure Web PubSub resource.
- A hub name for the chat application.

### Install the `@azure/web-pubsub-chat` package

Install the Azure WebPubSubChatService client library for JavaScript with `npm`:

```bash
npm install @azure/web-pubsub-chat
```

### Create and authenticate a `WebPubSubChatServiceClient`

To create a client object to access the Azure WebPubSubChatService API, you will need the `endpoint` of your Azure WebPubSubChatService resource and a `credential`. The Azure WebPubSubChatService client can use Microsoft Entra credentials to authenticate.
You can find the endpoint for your Azure WebPubSubChatService resource in the [Azure Portal][azure_portal].

You can authenticate with Microsoft Entra ID using a credential from the [@azure/identity][azure_identity] library or [an existing Microsoft Entra token](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new Microsoft Entra application and grant access to Azure WebPubSubChatService** by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).

For more information about how to create a Microsoft Entra application check out [this guide](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal).

Create the client with a connection string, a Microsoft Entra credential such as `DefaultAzureCredential`, or an `AzureKeyCredential`.

```ts snippet:ReadmeSampleCreateClient
import { WebPubSubChatServiceClient, AzureKeyCredential } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const connectionStringClient = new WebPubSubChatServiceClient("<connectionString>", "<hubName>");
const tokenCredentialClient = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
const keyCredentialClient = new WebPubSubChatServiceClient(
  "<endpoint>",
  new AzureKeyCredential("<accessKey>"),
  "<hubName>",
);
```

## Key concepts

### WebPubSubChatServiceClient

`WebPubSubChatServiceClient` is the primary interface for managing chat resources in a Web PubSub hub.

### Hub

A hub is the logical boundary for a chat application. Roles, users, rooms, conversations, and messages managed by a client all belong to the hub supplied to the client constructor.

### Roles and permissions

A user role controls hub-level actions such as creating rooms. A room role controls actions within a room, such as publishing messages, reading message history, or inviting users.

### Rooms, members, and conversations

A room contains members and has a default conversation. Add a user to a room by assigning the user a room role. Messages are published by connected chat clients and can be listed, updated, or deleted through the service client.

### Entity tags

Chat resources include an `etag` value. Pass that value through an operation's `ifMatch` option to perform a conditional update or delete and prevent overwriting a newer resource version.

## Examples

### Set up roles, a user, and a room

Create user and room roles, create a human user and a room, and then add the user to the room.

```ts snippet:ReadmeSampleSetUpChatResources
import { WebPubSubChatServiceClient, ChatPermissions } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
const userRoleName = "user.contoso_member";
const roomRoleName = "room.contoso_member";
const userId = "alice";
const roomId = "general";
await client.createOrReplaceRole(userRoleName, {
  permissions: [ChatPermissions.UserCreateRoom],
});
await client.createOrReplaceRole(roomRoleName, {
  permissions: [ChatPermissions.RoomPublishMessage, ChatPermissions.RoomHistory],
});
await client.createOrReplaceUser(userId, {
  kind: "Human",
  nickname: "Alice",
  roleName: userRoleName,
});
const room = await client.createOrReplaceRoom(roomId, { title: "General" });
await client.createOrReplaceRoomMember(roomId, userId, { roleName: roomRoleName });
console.log(`Created room ${room.id} with conversation ${room.defaultConversation}`);
```

### List messages in a conversation

Use asynchronous iteration to read messages from a conversation across all result pages.

```ts snippet:ReadmeSampleListMessages
import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
for await (const message of client.listMessages("<conversationId>")) {
  console.log(`${message.createdBy}: ${message.content.text}`);
}
```

### Generate a client access token

Generate a URL that a chat client can use to connect to the Web PubSub service as a specific user.

```ts snippet:ReadmeSampleGetClientAccessToken
import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
const accessToken = await client.getClientAccessToken({ userId: "alice" });
console.log(accessToken.url);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).


## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
