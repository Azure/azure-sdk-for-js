# Azure Web PubSub Chat client library for JavaScript

The Azure Web PubSub Chat client library enables server applications to manage chat roles, users, rooms, topics, room membership, conversations, and messages in an Azure Web PubSub Chat hub. Use it to organize discussions into room topics, discover users and their rooms, and manage chat resources from your server application.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/web-pubsub/web-pubsub-chat)
- [Package (NPM)](https://www.npmjs.com/package/@azure/web-pubsub-chat)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/web-pubsub-chat?view=azure-node-preview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/web-pubsub/web-pubsub-chat/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Azure Web PubSub resource.
- A hub configured with Chat enabled and persistent storage.

### Install the `@azure/web-pubsub-chat` package

Install the Azure WebPubSubChatService client library for JavaScript with `npm`:

```bash
npm install @azure/web-pubsub-chat
```

### Configure TypeScript

This package includes TypeScript declarations. For Node.js applications written in TypeScript, install the Node.js type definitions:

```bash
npm install --save-dev @types/node
```

No additional package-specific compiler settings are required.

### Create and authenticate a `WebPubSubChatServiceClient`

The `WebPubSubChatServiceClient` supports authentication with a connection string, a Microsoft Entra credential, or an `AzureKeyCredential`.

#### Authenticate with a connection string

You can find the connection string for your Azure Web PubSub resource in the [Azure Portal][azure_portal]. Because the connection string contains an access key, store it securely and do not include it in source code.

#### Authenticate with Microsoft Entra ID

To authenticate with Microsoft Entra ID, you will need the `endpoint` of your Azure Web PubSub resource and a credential. You can find the endpoint in the [Azure Portal][azure_portal].

You can authenticate with Microsoft Entra ID using a credential from the [@azure/identity][azure_identity] library or [an existing Microsoft Entra token](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

`DefaultAzureCredential` supports several Microsoft Entra identities. During local development, it can use a developer identity signed in through a supported development tool. In Azure, it can use a managed identity. It can also authenticate a service principal or workload identity when configured for the environment.

Whichever identity you use must be assigned an appropriate Azure Web PubSub data-plane role. Azure resource-management roles such as `Owner` do not grant data-plane permissions.

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

### Hub

A hub is a logical collection of WebSocket connections. A chat hub adds built-in rooms, member management, message persistence, and chat-specific APIs.

This SDK applies only to chat hubs. Chat must be enabled on the target hub before the SDK can manage roles, users, rooms, members, conversations, or messages.

### Role and permission

A role is a named collection of Chat permissions. User role names start with `user.`, and room role names start with `room.`. Do not combine user and room permissions in one role.

User roles control operations such as creating rooms. Room roles control what a member can do in a particular room, such as publishing messages or reading message history.

### User

A user represents an identity participating in chat, such as a human end user or an application. Client access credentials associate WebSocket connections with a user ID.

### Room

A room groups users together and is the primary organizational unit for chat interactions. Every room has an automatically created default conversation.

### Room member

A room member represents a user added to a room. Membership controls which users can receive and send messages in the room. In the service API, each room member is assigned a room role.

### Conversation and message history

A conversation is an ordered message stream within a room. Every room has a default conversation, and additional named conversations can be created through topics.

Messages sent to a conversation are delivered in real time to the room's connected members. The chat service manages ordering and persistence, allowing members to load message history after reconnecting or joining later. The service client can list, update, and delete persisted messages.

### Topic

A topic represents a named conversation within a room. Topics can be created, renamed, archived, and soft deleted independently of the room's default conversation.

## Examples

### Set up roles, a user, and a room

Create user and room roles, create a human user and a room, and then add the user to the room.

```ts snippet:ReadmeSampleSetUpChatResources
import { WebPubSubChatServiceClient, KnownChatPermission } from "@azure/web-pubsub-chat";
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
  permissions: [KnownChatPermission.UserCreateRoom],
});
await client.createOrReplaceRole(roomRoleName, {
  permissions: [KnownChatPermission.RoomPublishMessage, KnownChatPermission.RoomHistory],
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

### Use built-in roles and known permissions

Use `BuiltInChatRoles` when assigning a service-defined role and `KnownChatPermission` when creating a custom role. Permission strings outside the known values are also accepted for forward compatibility.

```ts snippet:ReadmeSampleUseBuiltInRolesAndKnownPermissions
import {
  WebPubSubChatServiceClient,
  BuiltInChatRoles,
  KnownChatPermission,
} from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
await client.createOrReplaceUser("alice", {
  kind: "Human",
  nickname: "Alice",
  roleName: BuiltInChatRoles.UserNormal,
});
await client.createOrReplaceRole("room.moderator", {
  permissions: [
    KnownChatPermission.RoomHistory,
    KnownChatPermission.RoomRemoveUser,
    KnownChatPermission.RoomPublishMessage,
  ],
});
```

### Manage roles

Create a custom role, retrieve it, list the roles in the hub, and delete the custom role when finished.

```ts snippet:ReadmeSampleManageRoles
import { WebPubSubChatServiceClient, KnownChatPermission } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
const roleName = "user.contoso_member";
try {
  const role = await client.createOrReplaceRole(roleName, {
    permissions: [KnownChatPermission.UserCreateRoom, KnownChatPermission.UserFetchAllRooms],
  });
  console.log(`Created role: ${role.name}`);
  const fetchedRole = await client.getRole(roleName);
  console.log(`Fetched role: ${fetchedRole.name}`);
  for await (const listedRole of client.listRoles()) {
    console.log(`Role: ${listedRole.name}`);
  }
} finally {
  await client.deleteRole(roleName);
}
```

### Manage a room

Create a room, retrieve its current state, and delete it.

```ts snippet:ReadmeSampleManageRoom
import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
const roomId = "general";
const room = await client.createOrReplaceRoom(roomId, { title: "General" });
console.log(`Created room ${room.id} with conversation ${room.defaultConversation}`);
const fetchedRoom = await client.getRoom(roomId);
console.log(`Fetched room: ${fetchedRoom.id}, title: ${fetchedRoom.title}`);
await client.deleteRoom(roomId);
```

### Manage a user

Create a user with a built-in role, retrieve the profile, and delete it.
The request accepts `HumanChatUserCreateOrReplace`, which requires `kind: "Human"`,
`nickname`, and `roleName`. Returned profiles retain the resource fields and can
represent unknown user kinds.

```ts snippet:ReadmeSampleManageUser
import { WebPubSubChatServiceClient, BuiltInChatRoles } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
const userId = "alice";
const user = await client.createOrReplaceUser(userId, {
  kind: "Human",
  nickname: "Alice",
  roleName: BuiltInChatRoles.UserNormal,
});
console.log(`Created user: ${user.id}, nickname: ${user.nickname}`);
const fetchedUser = await client.getUser(userId);
console.log(`Fetched user: ${fetchedUser.id}, nickname: ${fetchedUser.nickname}`);
await client.deleteUser(userId);
```

### Update a message

When updating a message, `ChatMessageUpdate.createdBy` and `content` are optional.
Supply only the fields to change; omitted fields retain their current values.

### List messages in a conversation

Use asynchronous iteration to read messages from a conversation across all result pages,
from latest to earliest. Message IDs are pagination cursors: the iterator follows the
service's `nextLink`, which contains the next message ID cursor. To resume later, save
a page's `continuationToken` and pass it to `byPage({ continuationToken })`; use the
returned token unchanged rather than passing a bare message ID.

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
```

### List rooms in a hub

```ts snippet:ReadmeSampleListRooms
import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
for await (const room of client.listRooms({ maxPageSize: 20 })) {
  console.log(`${room.id}: ${room.title}`);
}
```

### List users in a hub

```ts snippet:ReadmeSampleListUsers
import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
for await (const user of client.listUsers({ maxPageSize: 20 })) {
  console.log(`${user.id}: ${user.nickname}`);
}
```

### List a user's rooms

```ts snippet:ReadmeSampleListRoomsForUser
import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
for await (const room of client.listRoomsForUser("alice", { maxPageSize: 20 })) {
  console.log(`${room.id}: ${room.title}`);
}
```

### Create a topic

Create a topic in an existing room. The service creates its associated conversation.

```ts snippet:ReadmeSampleCreateTopic
import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
const topic = await client.createOrReplaceTopic(
  "general",
  "announcements",
  {
    title: "Announcements",
  },
  { ifNoneMatch: "*" },
);
console.log(`Topic conversation: ${topic.conversationId}`);
```

### Get a topic

```ts snippet:ReadmeSampleGetTopic
import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
const topic = await client.getTopic("general", "announcements");
console.log(`${topic.title}: ${topic.state}, ETag: ${topic.etag}`);
```

### Update a topic

Archive an existing topic without changing its title. Replace `<etag>` with its current entity tag.

```ts snippet:ReadmeSampleUpdateTopic
import { WebPubSubChatServiceClient, KnownChatTopicState } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
const topic = await client.updateTopic(
  "general",
  "announcements",
  {
    state: KnownChatTopicState.Archived,
  },
  { ifMatch: "<etag>" },
);
console.log(`Topic state: ${topic.state}`);
```

### List topics in a room

```ts snippet:ReadmeSampleListTopics
import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
for await (const topic of client.listTopics("general", { maxPageSize: 20 })) {
  console.log(`${topic.id}: ${topic.title} (${topic.state})`);
}
```

### Resume topic pagination

```ts snippet:ReadmeSampleTopicPages
import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
const pages = client.listTopics("general", { maxPageSize: 20 }).byPage();
const firstPage = await pages.next();
if (!firstPage.done) {
  console.log(firstPage.value);
  const continuationToken = firstPage.value.continuationToken;
  if (continuationToken) {
    const resumedPages = client
      .listTopics("general", { maxPageSize: 20 })
      .byPage({ continuationToken });
    const nextPage = await resumedPages.next();
    console.log(nextPage.value);
  }
}
```

### Delete a topic

Soft delete an existing topic. Replace `<etag>` with its current entity tag.

```ts snippet:ReadmeSampleDeleteTopic
import { WebPubSubChatServiceClient } from "@azure/web-pubsub-chat";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubChatServiceClient(
  "<endpoint>",
  new DefaultAzureCredential(),
  "<hubName>",
);
await client.deleteTopic("general", "announcements", { ifMatch: "<etag>" });
```

## Troubleshooting

### Service errors and conditional requests

Service failures throw `RestError` with a `statusCode`. HTTP 404 indicates a missing resource, including a deleted topic. HTTP 412 indicates that an `ifMatch` or `ifNoneMatch` precondition failed. Retrieve the current resource and review its entity tag before retrying a conditional write. Use `ifNoneMatch: "*"` when creating a resource only if it does not already exist.

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Explore the [JavaScript and TypeScript samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/web-pubsub/web-pubsub-chat/samples) and the [API reference](https://learn.microsoft.com/javascript/api/@azure/web-pubsub-chat?view=azure-node-preview).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
