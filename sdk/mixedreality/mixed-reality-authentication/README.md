# Azure Mixed Reality Authentication client library for JavaScript

Mixed Reality services, like Azure Spatial Anchors, Azure Remote Rendering, and others, use the Mixed Reality security
token service (STS) for authentication. This package supports exchanging Mixed Reality account credentials for an access
token from the STS that can be used to access Mixed Reality services.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/mixed-reality-authentication/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/mixed-reality-authentication)
- [API reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/mixed-reality-authentication-readme)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mixedreality/mixed-reality-authentication/samples)

![Mixed Reality service authentication diagram](https://learn.microsoft.com/azure/spatial-anchors/concepts/media/spatial-anchors-authentication-overview.png)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

### Prerequisites

- An [Azure subscription][azure_sub].
- You must have an account with an [Azure Mixed Reality service](https://azure.microsoft.com/topic/mixed-reality/):
  - [Azure Remote Rendering](https://learn.microsoft.com/azure/remote-rendering/)
  - [Azure Spatial Anchors](https://learn.microsoft.com/azure/spatial-anchors/)
- Familiarity with the authentication and credential concepts from the [Azure Identity library][azure_identity].

### Install the `@azure/mixed-reality-authentication` package

Install the Azure Mixed Reality Authentication client library for JavaScript with `npm`:

```bash
npm install @azure/mixed-reality-authentication
```

### Create and authenticate a `MixedRealityStsClient`

To create a client object to request an access token for a Mixed Reality service, you will need the `account identifier`
and `account domain` of your Mixed Reality service resource and a `credential`.

Mixed Reality services support a few different forms of authentication:

- Account Key authentication
  - Account keys enable you to get started quickly with using Mixed Reality services. But before you deploy your application
    to production, we recommend that you update your app to use Azure AD authentication.
- Azure Active Directory (AD) token authentication
  - If you're building an enterprise application and your company is using Azure AD as its identity system, you can use
    user-based Azure AD authentication in your app. You then grant access to your Mixed Reality accounts by using your
    existing Azure AD security groups. You can also grant access directly to users in your organization.
  - Otherwise, we recommend that you obtain Azure AD tokens from a web service that supports your app. We recommend this
    method for production applications because it allows you to avoid embedding the credentials for access to a Mixed
    Reality service in your client application.

See [here](https://learn.microsoft.com/azure/spatial-anchors/concepts/authentication) for detailed instructions and information.

#### Using account key authentication

Use the [Azure Portal][azure_portal] to browse to your Mixed Reality service resource and retrieve an `account key`.

Once you have an account key, you can use the `AzureKeyCredential` class to authenticate the client as follows:

```ts snippet:ReadmeSampleCreateClient_KeyCredential
import { MixedRealityStsClient } from "@azure/mixed-reality-authentication";
import { AzureKeyCredential } from "@azure/core-auth";

const accountId = "<ACCOUNTD ID>";
const accountDomain = "<ACCOUNT_DOMAIN>";
const accountKey = "<ACCOUNT_KEY>";

const client = new MixedRealityStsClient(
  accountId,
  accountDomain,
  new AzureKeyCredential(accountKey),
);
```

> Note: Account key authentication is **not recommended** for production applications.

#### Using an Azure Active Directory Credential

Account key authentication is used in most of the examples, but you can also authenticate with Azure Active Directory
using the [Azure Identity library][azure_identity]. This is the recommended method for production applications. To use
the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with
the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to [register a new AAD application][register_aad_app] and grant access to your Mixed Reality resource
by assigning the appropriate role for your Mixed Reality service to your service principal.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```ts snippet:ReadmeSampleCreateClient_TokenCredential
import { MixedRealityStsClient } from "@azure/mixed-reality-authentication";
import { DefaultAzureCredential } from "@azure/identity";

const accountId = "<ACCOUNTD ID>";
const accountDomain = "<ACCOUNT_DOMAIN>";

const client = new MixedRealityStsClient(accountId, accountDomain, new DefaultAzureCredential());
```

## Key concepts

### MixedRealityStsClient

The `MixedRealityStsClient` is the client library used to access the Mixed Reality STS to get an access token.

Tokens obtained from the Mixed Reality STS have a lifetime of **24 hours**.

### Return Value

The return value for a successful call to `getToken` is an `GetTokenResponse`, which is an `AccessToken` from
[@azure/core-http](https://www.npmjs.com/package/@azure/core-http).

## Examples

### Retrieve an access token

```ts snippet:ReadmeSampleGetToken
import { MixedRealityStsClient } from "@azure/mixed-reality-authentication";
import { DefaultAzureCredential } from "@azure/identity";

const accountId = "<ACCOUNTD ID>";
const accountDomain = "<ACCOUNT_DOMAIN>";

const client = new MixedRealityStsClient(accountId, accountDomain, new DefaultAzureCredential());

const token = await client.getToken();
```

See the authentication examples [above](#authenticate-the-client) or [Azure Identity][azure_identity] for more complex
authentication scenarios.

#### Using the access token in a Mixed Reality client library

Some Mixed Reality client libraries might accept an access token in place of a credential. For example:

```ts snippet:ReadmeSampleCreateClient_WithToken
import { RemoteRenderingClient } from "@azure/mixed-reality-remote-rendering";

const accountId = "<ACCOUNTD ID>";

async function getAccessToken() {
  // Make calls to get an access token from some service
  return {
    token: "<ACCESS_TOKEN>",
    expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
  };
}

const accessToken = await getAccessToken();

const remoteRenderingClient = new RemoteRenderingClient(
  "<serviceEndpoint>",
  accountId,
  accessToken,
);
```

Note: The `RemoteRenderingClient` usage above is hypothetical and may not reflect the actual library. Consult the
documentation for the client library you're using to determine if and how this might be supported.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mixedreality/mixed-reality-authentication/samples)
directory for detailed examples on how to use this library.

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

If you'd like to contribute to this library, please read the
[contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to
build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://learn.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[register_aad_app]: https://learn.microsoft.com/azure/spatial-anchors/concepts/authentication
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
