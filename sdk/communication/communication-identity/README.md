# Azure Communication Identity client library for JavaScript

The identity library is used for managing users and tokens for Azure Communication Services.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

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

```ts snippet:ReadmeSampleCreateClient_KeyCredential
import { AzureKeyCredential } from "@azure/core-auth";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const key = "<some-key>";
const endpoint = "https://contoso.eastus.communications.azure.net";

const credential = new AzureKeyCredential(key);
const client = new CommunicationIdentityClient(endpoint, credential);
```

### Using a connection string

```ts snippet:ReadmeSampleCreateClient_ConnectionString
import { CommunicationIdentityClient } from "@azure/communication-identity";

// Example connection string
const connectionString =
  "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";

const client = new CommunicationIdentityClient(connectionString);
```

### Using a `TokenCredential`

```ts snippet:ReadmeSampleCreateClient_TokenCredential
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const endpoint = "https://contoso.eastus.communications.azure.net";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient(endpoint, credential);
```

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal].

## Usage

### Creating a new user

Use the `createUser` method to create a new user.

```ts snippet:ReadmeSampleCreateUser
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const endpoint = "https://contoso.eastus.communications.azure.net";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient(endpoint, credential);

const user = await client.createUser();
```

### Creating a new user with customId and get user

Use the `createUser` method to create a new user with `customId`. This `customId` can be used to map your application's user identities with Azure Communication Services identities. If you call the `CreateUser` method again with the same `customId`, it will return the same `user.Id`. Therefore, you do not need to store this mapping yourself.

```ts snippet:ReadmeSampleCreateUser_CustomId
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const endpoint = "https://contoso.eastus.communications.azure.net";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient(endpoint, credential);

const user = await client.createUser({ customId: "alice@contoso.com" });
const getResult = await client.getUser(user);
```

### Creating and refreshing a user token

Use the `getToken` method to issue or refresh a token for an existing user. The method also takes in a list of communication token scopes. Scope options include:

- `chat` (Use this for full access to Chat APIs)
- `voip` (Use this for full access to Calling APIs)
- `chat.join` (Access to Chat APIs but without the authorization to create, delete or update chat threads)
- `chat.join.limited` (A more limited version of chat.join that doesn't allow to add or remove participants)
- `voip.join` (Access to Calling APIs but without the authorization to start new calls)

```ts snippet:ReadmeSampleCreateToken
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const endpoint = "https://contoso.eastus.communications.azure.net";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient(endpoint, credential);

const user = await client.createUser();

const { token } = await client.getToken(user, ["chat"]);
```

To refresh the user token, issue another token with the same user.

```ts snippet:ReadmeSampleRefreshToken
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const endpoint = "https://contoso.eastus.communications.azure.net";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient(endpoint, credential);

const user = await client.createUser();

let { token } = await client.getToken(user, ["chat"]);

// Refresh the token again
({ token } = await client.getToken(user, ["chat"]));
```

### Creating a user token with custom expiration

It's also possible to create a Communication Identity access token by customizing the expiration time. Validity period of the token must be within [60,1440] minutes range. If not provided, the default value of 1440 minutes (24 hours) will be used.

```ts snippet:ReadmeSampleCreateTokenWithOptions
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const endpoint = "https://contoso.eastus.communications.azure.net";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient(endpoint, credential);

const user = await client.createUser();

const tokenOptions = { tokenExpiresInMinutes: 60 };
const { token } = await client.getToken(user, ["chat"], tokenOptions);
```

### Creating a user and a token in a single request

For convenience, use `createUserAndToken` to create a new user and issue a token with one function call. This translates into a single web request as opposed to creating a user first and then issuing a token.

```ts snippet:ReadmeSampleCreateUserAndToken
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const endpoint = "https://contoso.eastus.communications.azure.net";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient(endpoint, credential);

const { user, token } = await client.createUserAndToken(["chat"]);
```

### Creating a user and a token with custom expiration in a single request

It's also possible to create a Communication Identity access token by customizing the expiration time. Validity period of the token must be within [60,1440] minutes range. If not provided, the default value of 1440 minutes (24 hours) will be used.

```ts snippet:ReadmeSampleCreateUserAndTokenWithOptions
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const endpoint = "https://contoso.eastus.communications.azure.net";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient(endpoint, credential);

const userAndTokenOptions = { tokenExpiresInMinutes: 60 };
const { user, token } = await client.createUserAndToken(["chat"], userAndTokenOptions);
```

### Revoking tokens for a user

Use the `revokeTokens` method to revoke all issued tokens for a user.

```ts snippet:ReadmeSampleRevokeTokens
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const endpoint = "https://contoso.eastus.communications.azure.net";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient(endpoint, credential);

// Create user
const user = await client.createUser();

// Later when you want to revoke the user's tokens
await client.revokeTokens(user);
```

### Deleting a user

Use the `deleteUser` method to delete a user.

```ts snippet:ReadmeSampleDeleteUser
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const endpoint = "https://contoso.eastus.communications.azure.net";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient(endpoint, credential);

// Create user
const user = await client.createUser();

// Later when you want to delete the user
await client.deleteUser(user);
```

### Exchanging Azure AD access token of a Teams User for a Communication access token

Use `getTokenForTeamsUser` method to exchange an Azure AD access token of a Teams user for a new `CommunicationAccessToken` with a matching expiration time.

```ts snippet:ReadmeSampleGetTokenForTeamsUser
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const endpoint = "https://contoso.eastus.communications.azure.net";

const credential = new DefaultAzureCredential();
const client = new CommunicationIdentityClient(endpoint, credential);

const { token, expiresOn } = await client.getTokenForTeamsUser({
  teamsUserAadToken: "<aad-access-token-of-a-teams-user>",
  clientId: "<cliend-id-of-an-aad-application>",
  userObjectId: "<aad-object-id-of-a-teams-user>",
});
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-identity/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://learn.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://learn.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
