# Azure Communication Identity client library for JavaScript

The identity library is used for managing users and tokens for Azure Communication Services.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the[Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure/communication-identity
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### Clients

The `CommunicationIdentityClient` provides methods to manage users and their tokens.

## Examples

## Authentication

You can get a key and/or connection string from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key, you can authenticate the `CommunicationIdentityClient` with any of the following methods:

### Create `KeyCredential` with `AzureKeyCredential` before initializing the client

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const credential = new AzureKeyCredential(KEY);
const client = new CommunicationIdentityClient(ENDPOINT, credential);
```

### Using a connection string

```typescript
import { CommunicationIdentityClient } from "@azure/communication-identity";

const connectionString = `endpoint=ENDPOINT;accessKey=KEY`;
const client = new CommunicationIdentityClient(connectionString);
```

### Using a `TokenCredential`

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient(ENDPOINT, credential);
```

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal].

## Usage

### Creating an instance of CommunicationIdentityClient

```typescript
import { CommunicationIdentityClient } from "@azure/communication-identity";

const client = new CommunicationIdentityClient(CONNECTION_STRING);
```

### Creating a new user

Use the `createUser` method to create a new user.

```typescript
const user = await client.createUser();
```

### Creating and refreshing a user token

Use the `getToken` method to issue or refresh a token for an existing user. The method also takes in a list of communication token scopes. Scope options include:

- `chat` (Chat)
- `voip` (Voice over IP)

```typescript
let { token } = await client.getToken(user, ["chat"]);
```

To refresh the user token, issue another token with the same user.

```typescript
{ token } = await client.getToken(user, ["chat"]);
```

### Creating a user and a token in a single request

For convenience, use `createUserAndToken` to create a new user and issue a token with one function call. This translates into a single web request as opposed to creating a user first and then issuing a token.

```typescript
let { user, token } = await client.createUserWithToken(["chat"]);
```

### Revoking tokens for a user

Use the `revokeTokens` method to revoke all issued tokens for a user.

```typescript
await client.revokeTokens(user);
```

### Deleting a user

Use the `deleteUser` method to delete a user.

```typescript
await client.deleteUser(user);
```

## Troubleshooting

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-identity/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-identity%2FREADME.png)
