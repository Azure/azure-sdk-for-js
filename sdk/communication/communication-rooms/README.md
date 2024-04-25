# Azure RoomsApi client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure RoomsApi client.

Communication Rooms Client

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-rooms) |
[Package (NPM)](https://www.npmjs.com/package/@azure/communication-rooms) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-rooms/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

### Installing

```bash
npm install @azure/communication-rooms
```

## Key concepts

### RoomsApiClient

`RoomsClient` is the primary interface for developers using the Azure RoomsApi client library. Explore the methods on this client object to understand the different features of the Azure RoomsApi service that you can access.

## Examples

## Authentication

You can get a key and/or connection string from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key, you can authenticate the `RoomsClient` with any of the following methods:

### Create `KeyCredential` with `AzureKeyCredential` before initializing the client

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { RoomsClient } from "@azure/communication-rooms";

const credential = new AzureKeyCredential(KEY);
const client = new RoomsClient(ENDPOINT, credential);
```

### Using a connection string

```typescript
import { RoomsClient } from "@azure/communication-rooms";

const connectionString = `endpoint=ENDPOINT;accessKey=KEY`;
const client = new RoomsClient(connectionString);
```

### Using a `TokenCredential`

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { RoomsClient } from "@azure/communication-rooms";

const credential = new DefaultAzureCredential();
const client = new RoomsClient(ENDPOINT, credential);
```

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal].

## Usage

### Create a room

To create a room, call the `createRoom` method. All settings are optional.

If `validFrom` is not provided, it is defaulted to the current datetime. If `validUntil` is not provided, the default is `validFrom + 180 days`.

When defining `participants`, if `role` is not specified, then it will be `attendee` by default.

Starting in 1.1.0 release, `PstnDialOutEnabled` property is added to enable or disable PSTN Dial-Out feature in a room. The `PstnDialOutEnabled` is an optional property. If `PstnDialOutEnabled` is not provided, then the default for `PstnDialOutEnabled` is false.

```js
// create users with CommunicationIdentityClient
const identityClient = new CommunicationIdentityClient(connectionString);
const user1 = await identityClient.createUserAndToken(["voip"]);

// create RoomsClient
const roomsClient: RoomsClient = new RoomsClient(CONNECTION_STRING);

const validFrom = new Date(Date.now());
let validForDays = 10;
let validUntil = new Date(validFrom.getTime());
validUntil.setDate(validFrom.getDate() + validForDays);
let pstnDialOutEnabled = true;

// options payload to create a room
const createRoomOptions: CreateRoomOptions = {
  validFrom,
  validUntil,
  pstnDialOutEnabled,
  participants: [
    {
      id: user1.user,
      role: "Attendee",
    },
  ],
};

// create room
const room = await roomsClient.createRoom(createRoomOptions);
```

[Find CommunicationIdentityClient here](https://github.com/Azure/azure-sdk-for-js/edit/main/sdk/communication/communication-identity)

### Update a room

To update the `validFrom` and `validUntil` settings of a room use the `updateRoom` method.

Starting in 1.1.0 release, `PstnDialOutEnabled` property is added to enable or disable PSTN Dial-Out feature in a room.

```js
validForDays = 60;
validUntil.setDate(validFrom.getDate() + validForDays);
pstnDialOutEnabled = false;

const updateRoomOptions: UpdateRoomOptions = {
  validFrom,
  validUntil,
  pstnDialOutEnabled,
};

// update the room using the room id from the creation operation
const updatedRoom = await roomsClient.updateRoom(room.id, updateRoomOptions);
```

### Get a room

To get a room use the `getRoom` method.

```js
const roomId = "ROOM_ID";
room = await roomsClient.getRoom(roomId);
```

### List rooms

List all rooms using the `listRooms` method.

```js
const roomsList = await roomsClient.listRooms();
for await (const currentRoom of roomsList) {
  // access room data
  console.log(`The room id is ${currentRoom.id}.`);
}
```

### Add or update participants

To add new participants, or update existing participants, use the `addOrUpdateParticipants` method.

```js
const user2 = await identityClient.createUserAndToken(["voip"]);
const updateParticipantsList = [
  {
    id: user1.user,
    role: "Presenter",
  },
  {
    id: user2.user,
  },
];

// run addOrUpdate operation
await roomsClient.addOrUpdateParticipants(room.id, updateParticipantsList);
```

### Remove participants

To remove participants call the `removeParticipants` method.

```js
const participantsToRemove = [user1.user, user2.user];
await roomsClient.removeParticipants(room.id, participantsToRemove);
```

### Get participants in a room

To list all the participants in a room call the `listParticipants` method.

```js
const participantsList = await roomsClient.listParticipants(room.id);
for await (const participant of participantsList) {
  // access participant data
  console.log(`The participant's role is ${participant.role}.`);
}
```

### Delete a room

Use the `deleteRoom` method to delete a room.

```js
await roomsClient.deleteRoom(room.id);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-rooms/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-rooms%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[communication_identity]: https://github.com/Azure/azure-sdk-for-js/edit/main/sdk/communication/communication-identity
