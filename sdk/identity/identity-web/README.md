## Azure Identity Plugin for Web Environments

This package provides a new credential for the Azure Identity library for JavaScript ([`@azure/identity`](https://npmjs.com/package/@azure/identity)) called `WebRedirectCredential`, that simplifies the development experience of web servers deployed to the Azure cloud.

The `WebRedirectCredential` uses the [Authorization Code Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) to authenticate server-side applications with browser user interaction.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity-web) | [Samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity-web/samples-dev)

## Getting started

```javascript
const { WebRedirectCredential } = require("@azure/identity-web");
const { KeyClient } = require("@azure/keyvault-keys");

// Within a server route, like `app.get("/azureLogin"`:
const credential = new WebRedirectCredential(
  tenantId,
  clientId,
  redirectUri
);

// This credential works well with a `state` property that ties
// the resulting token with the source of the redirection:
const state = session.username; // or ID

// Make sure to redirect to this URI to trigger the Authentication Code Flow:
const authorizeUrl = credential.getRedirectUri(scope, {
  state,
});

// On the route that is targetted by the redirect endpoint
// we get the "code" from the parameters:
const authorizationCode = req.query["code"];

// We can also read the state if we configured one:
const username = req.query["state"];

// The credential can be re-created with the same parameters
// or retrieved from memory, and then:
const authenticationRecord = await credential.authenticate(scope, authorizationCode);

// The authenticationRecord can be stored and re-used later:
const credential2 = new WebRedirectCredential(
  tenantId,
  clientId,
  redirectUri,
  { authenticationRecord }
);
 
// After `authenticate` has been called, the credential can be used:
const client = new KeyClient(vaultUrl, credential);
```

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/).
- An app registration configured with a redirect endpoint of the type `web`.

To configure the Azure App Registration through the Azure Portal:

- Go to the Active Directory.
- Create a new App Registration, or open an existing one.
- Go to the "Authentication" page of the App Registration.
- Under "Supported Account Types", select `Accounts in any organizational directory (Any Azure AD directory - Multitenant)`.
- Under "Platform Configurations":
  - Users would need to add a platform and select "Web".
  - Users then would add a specific URI to their server.
  - If they're working with a localhost server, they may put something similar to `http://localhost:8080/path` as the redirect URI.
  - Users would finally click "Configure".

### Install the package

```sh
$ npm install --save-dev @azure/identity-web
```

#### Supported Environments

Azure Identity plugins for JavaScript support stable (even numbered) versions of Node.js starting from v12. While the plugins may run in other Node versions, no support is guaranteed. `@azure/identity-web` **does not** support browser environments.

## Key concepts

If this is your first time using `@azure/identity` or the Microsoft identity platform (Azure Active Directory), we recommend that you read [Using `@azure/identity` with Microsoft Identity Platform](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/using-azure-identity.md) first. This document will give you a deeper understanding of the platform and how to configure your Azure account correctly.

## Examples

```javascript
import { WebRedirectCredential } from "@azure/identity-web";

app.get(
  "/azureLogin",
  async (req: express.Request, res: express.Response) => {
    // Here we authenticate...
    
    // Then we make the credential.
    const credential = new WebRedirectCredential(
      tenantId,
      clientId,
      redirectUri
    );

    // We save the credential in an in-memory cache, or not...
    // The sample will elaborate with recommended approaches.

    // We set something that can identify the user as the state parameter.
    const state = session.username; // or ID

    // We get the authorize URL.
    const authorizeUrl = credential.getRedirectUri(scope, {
      state,
    });

    // We redirect to it.
    res.redirect(authorizeUrl);
  }
);
```

Authenticates with `authenticate()`, and uses the `authenticationRecord` to quickly store serialized info that can be used to retrieve the account from the cache:

```javascript
app.get(
  "/azureResponse",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const authorizationCode = req.query["code"];
    if (!authorizationCode) {
      // throw...
    }

    const username = req.query["state"];

    // Check that we're logged in, and that the state is valid...

    // Either retrieve the credential from in-memory cache, or:
    const credential = new WebRedirectCredential(
      tenantId,
      clientId,
      redirectUri
    );

    const authenticationRecord = await credential.authenticate(scope, authorizationCode);
    // save the authenticationRecord in a database or in-memory cache...

    // Go to home, or acknowledge the authentication has completed...
  }
);

// A separate endpoint that uses the Azure API:
app.get(
  "/me",
  async (req: express.Request, res: express.Response): Promise<void> => {
    // Check that we're logged in, and that we have authenticated before...

    // Retrieve the authentication record...
    // const authenticationRecord = //...

    const credential = new WebRedirectCredential(
      tenantId,
      clientId,
      redirectUri,
      { authenticationRecord }
    );

    // use the credential...
  }
);
```
 
## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

### Provide Feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

[azaccountext]: https://marketplace.visualstudio.com/items?itemName=ms-web.azure-account

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fidentity%2Fidentity%2FREADME.png)
