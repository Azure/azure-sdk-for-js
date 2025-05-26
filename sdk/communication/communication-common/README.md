# Azure Communication Common client library for JavaScript

This package contains common code for Azure Communication Service libraries.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].
- Having the  @azure/identity package installed.

### Installing

```bash
npm install @azure/communication-common
```

```bash
npm install @azure/identity
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### CommunicationTokenCredential and AzureCommunicationTokenCredential

The `CommunicationTokenCredential` is an interface used to authenticate a user with Communication Services, such as Chat or Calling.

The `AzureCommunicationTokenCredential` offers a convenient way to create a credential implementing the said interface and allows you to take advantage of the built-in auto-refresh logic.

Depending on your scenario, you may want to initialize the `AzureCommunicationTokenCredential` with:

- a static token (suitable for short-lived clients used to e.g. send one-off Chat messages) or
- a callback function that ensures a continuous authentication state during communications (ideal e.g. for long Calling sessions).
- a token credential capable of obtaining an Entra user token. You can provide any implementation of [TokenCredential interface](https://learn.microsoft.com/es-mx/javascript/api/@azure/core-auth/tokencredential?view=azure-node-latest). It is suitable for scenarios where Entra user access tokens are needed to authenticate with Communication Services.

The tokens supplied to the `AzureCommunicationTokenCredential` either through the constructor or via the token refresher callback can be obtained using the Azure Communication Identity library.

## Examples

### Create a credential with a static token

For a short-lived clients, refreshing the token upon expiry is not necessary and the `AzureCommunicationTokenCredential` may be instantiated with a static token.

```ts snippet:ReadmeSampleCredentialStaticToken
import { AzureCommunicationTokenCredential } from "@azure/communication-common";

const tokenCredential = new AzureCommunicationTokenCredential(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM2MDB9.adM-ddBZZlQ1WlN3pdPBOF5G4Wh9iZpxNP_fSvpF4cWs",
);
```

### Create a credential with a callback

Here we assume that we have a function `fetchTokenFromMyServerForUser` that makes a network request to retrieve a JWT token string for a user. We pass it into the credential to fetch a token for Bob from our own server. Our server would use the Azure Communication Identity library to issue tokens. It's necessary that the `fetchTokenFromMyServerForUser` function returns a valid token (with an expiration date set in the future) at all times.

```ts snippet:ReadmeSampleCredentialCallback
import { AzureCommunicationTokenCredential } from "@azure/communication-common";

function fetchTokenFromMyServerForUser(user: string): Promise<string> {
  // Your custom implementation to fetch a token for the user
  return Promise.resolve("some-unique-token-for-" + user);
}

const tokenCredential = new AzureCommunicationTokenCredential({
  tokenRefresher: async () => fetchTokenFromMyServerForUser("bob@contoso.com"),
});
```

### Create a credential with proactive refreshing

Setting `refreshProactively` to true will call your `tokenRefresher` function when the token is close to expiry.

```ts snippet:ReadmeSampleCredentialProactiveRefresh
import { AzureCommunicationTokenCredential } from "@azure/communication-common";

function fetchTokenFromMyServerForUser(user: string): Promise<string> {
  // Your custom implementation to fetch a token for the user
  return Promise.resolve("some-unique-token-for-" + user);
}

const tokenCredential = new AzureCommunicationTokenCredential({
  tokenRefresher: async () => fetchTokenFromMyServerForUser("bob@contoso.com"),
  refreshProactively: true,
});
```

### Create a credential with proactive refreshing and an initial token

Passing `initialToken` is an optional optimization to skip the first call to `tokenRefresher`. You can use this to separate the boot from your application from subsequent token refresh cycles.

```ts snippet:ReadmeSampleCredentialProactiveRefreshWithInitialToken
import { AzureCommunicationTokenCredential } from "@azure/communication-common";

function fetchTokenFromMyServerForUser(user: string): Promise<string> {
  // Your custom implementation to fetch a token for the user
  return Promise.resolve("some-unique-token-for-" + user);
}

const tokenCredential = new AzureCommunicationTokenCredential({
  tokenRefresher: async () => fetchTokenFromMyServerForUser("bob@contoso.com"),
  refreshProactively: true,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM2MDB9.adM-ddBZZlQ1WlN3pdPBOF5G4Wh9iZpxNP_fSvpF4cWs",
});
```

### Create a credential with a token credential capable of obtaining an Entra user token

For scenarios where an Entra user can be used with Communication Services, you need to initialize any implementation of [TokenCredential interface](https://learn.microsoft.com/es-mx/javascript/api/@azure/core-auth/tokencredential?view=azure-node-latest) and provide it to the ``EntraCommunicationTokenCredentialOptions``.
Along with this, you must provide the URI of the Azure Communication Services resource and the scopes required for the Entra user token. These scopes determine the permissions granted to the token.

This approach needs to be used for authorizing an Entra user with a Teams license to use Teams Phone Extensibility features through your Azure Communication Services resource.
This requires providing the `https://auth.msft.communication.azure.com/TeamsExtension.ManageCalls` scope.

```ts snippet:ReadmeSampleCredentialEntraUserTeamsPhoneExtensibility 
import { InteractiveBrowserCredential } from "@azure/identity";
import {
  EntraCommunicationTokenCredentialOptions,
  AzureCommunicationTokenCredential,
} from "@azure/communication-common";

const options = {
  tenantId: "<your-tenant-id>",
  clientId: "<your-client-id>",
  redirectUri: "<your-redirect-uri>",
};
const entraTokenCredential = new InteractiveBrowserCredential(options);

const entraTokenCredentialOptions: EntraCommunicationTokenCredentialOptions = {
  resourceEndpoint: "https://<your-resource>.communication.azure.com",
  tokenCredential: entraTokenCredential,
  scopes: ["https://auth.msft.communication.azure.com/TeamsExtension.ManageCalls"],
};

const credential = new AzureCommunicationTokenCredential(entraTokenCredentialOptions);
```

Other scenarios for Entra users to utilize Azure Communication Services are currently in the **preview stage only and should not be used in production**.
The scopes for these scenarios follow the format `https://communication.azure.com/clients/<ACS Scope>`. If specific scopes are not provided, the default scopes will be set to `https://communication.azure.com/clients/.default`.

```ts snippet:ReadmeSampleCredentialEntraUser 
import { InteractiveBrowserCredential } from "@azure/identity";
import {
  EntraCommunicationTokenCredentialOptions,
  AzureCommunicationTokenCredential,
} from "@azure/communication-common";

const options = {
  tenantId: "<your-tenant-id>",
  clientId: "<your-client-id>",
  redirectUri: "<your-redirect-uri>",
};
const entraTokenCredential = new InteractiveBrowserCredential(options);

const entraTokenCredentialOptions: EntraCommunicationTokenCredentialOptions = {
  resourceEndpoint: "https://<your-resource>.communication.azure.com",
  tokenCredential: entraTokenCredential,
  scopes: ["https://communication.azure.com/clients/VoIP"],
};

const credential = new AzureCommunicationTokenCredential(entraTokenCredentialOptions);
```

## Troubleshooting

- **Invalid token specified**: Make sure the token you are passing to the `AzureCommunicationTokenCredential` constructor or to the `tokenRefresher` callback is a bare JWT token string. E.g. if you're using the [Azure Communication Identity library][invalid_token_sdk] or [REST API][invalid_token_rest] to obtain the token, make sure you're passing just the `token` part of the response object.

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

- [Read more about Communication user access tokens](https://learn.microsoft.com/azure/communication-services/concepts/authentication?tabs=javascript)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://learn.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://learn.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
[invalid_token_sdk]: https://learn.microsoft.com/javascript/api/@azure/communication-identity/communicationaccesstoken#@azure-communication-identity-communicationaccesstoken-token
[invalid_token_rest]: https://learn.microsoft.com/rest/api/communication/communication-identity/issue-access-token#communicationidentityaccesstoken
