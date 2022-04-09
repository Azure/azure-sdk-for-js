## Azure Identity Plugin for Single Page Applications

This package provides two new credentials for the Azure Identity library for JavaScript ([`@azure/identity`](https://npmjs.com/package/@azure/identity)) called `RedirectCredential` and `PopupCredential`. Both credentials simplify the browser development experience of applications working with Azure services.

Both the `RedirectCredential` and the `PopupCredential` use the [Authorization Code Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) to authenticate server-side applications with browser user interaction.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity-spa) | [Samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity-spa/samples-dev)

## Getting started

An example using the `RedirectCredential`:

```javascript
const { RedirectCredential } = require("@azure/identity-spa");
const { ServiceBusClient } = require("@azure/service-bus");

const serviceBusEndpoint = process.env.SERVICE_BUS_ENDPOINT;
const queueName = process.env.QUEUE_NAME;
const messageBody = process.env.MESSAGE_BODY;

async function main() {
  // Within a browser application...
  const credential = new RedirectCredential({
    clientId,
    redirectUri
  });

	// Activates the credential if a redirection has already been fulfilled.
  await credential.onPageLoad();

  const client = new ServiceBusClient(serviceBusEndpoint, credential);

	// Service clients should expose their scopes.
	const scopes = client.scopes;

  try {
    // If the redirection has already happened, client authentication will work.
		const sender = client.createSender(queueName);
    await sender.sendMessages({ body: messageBody });
  } catch(e) {
    // If the redirection needs to happen,
		// getToken will throw an `AuthenticationRequiredError` error.
    if (e.name === "AuthenticationRequiredError") {
      // Interactive authentication will happen via redirection once the authenticate() method is called.
      await credential.authenticate(scopes);
    }
  }
}

main();
```

An example using the `PopupCredential`:

```javascript
const { PopupCredential } = require("@azure/identity-spa");
const { ServiceBusClient } = require("@azure/service-bus");

const serviceBusEndpoint = process.env.SERVICE_BUS_ENDPOINT;
const queueName = process.env.QUEUE_NAME;
const messageBody = process.env.MESSAGE_BODY;
 
async function main() {
  // Within a web page...
  const credential = new PopupCredential({
    clientId,
    redirectUri
  });

  const client = new ServiceBusClient(serviceBusEndpoint, credential);

	// Service clients should expose their scopes.
	const scopes = client.scopes;
 
  try {
    // Popup does not redirect, but most browsers will block popups by default.
		const sender = client.createSender(queueName);
    await sender.sendMessages({ body: messageBody });
  } catch(e) {
    // If the popup authentication needs to happen, `getToken` will throw an `AuthenticationRequiredError` error.
    if (e.name === "AuthenticationRequiredError") {
      // Interactive authentication will happen via a popup window that will appear when the authenticate() method is called.
      await credential.authenticate(scopes);
    }
  }
}

main();
```
 
### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/).
- An app registration configured with a redirect endpoint of the type `spa`.

To configure the Azure App Registration through the Azure Portal:

- [Register a single page application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration) in the Microsoft identity platform
- Configure the app registration with a redirect URI to specify where the Microsoft identity platform should redirect the client along with any security tokens.
  - Follow the instructions at [Redirect URI: MSAL.js 2.0 with auth code flow](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#redirect-uri-msaljs-20-with-auth-code-flow)
- Ensure that your application has the correct permission for the APIs it intends to use.
  - In your app registration in the Azure portal, go to `API Permissions`
  - Click on `Add a permission`
  - Select the API you want to use. For example, if you're using any of our management/control plane packages (the ones whose name starts with `@azure/arm-`), you should select **Azure Service Management**.
- Ensure that your AAD Application has enabled public authentication flows:
  - Go to Azure Active Directory in the Azure portal and find your app registration.
  - Navigate to the **Authentication** section.
  - Under **Advanced settings**, select **yes** on the option **Allow public client flows**.

### Install the package

```sh
$ npm install --save-dev @azure/identity-spa
```

#### Supported Environments

Azure Identity plugins for JavaScript support stable (even numbered) versions of Node.js starting from v12. While the plugins may run in other Node versions, no support is guaranteed. `@azure/identity-spa` **does not** support browser environments.

## Key concepts

If this is your first time using `@azure/identity` or the Microsoft identity platform (Azure Active Directory), we recommend that you read [Using `@azure/identity` with Microsoft Identity Platform](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/using-azure-identity.md) first. This document will give you a deeper understanding of the platform and how to configure your Azure account correctly.

## Examples

An example using the `RedirectCredential`:

```javascript
const { RedirectCredential } = require("@azure/identity-spa");
const { ServiceBusClient } = require("@azure/service-bus");

const serviceBusEndpoint = process.env.SERVICE_BUS_ENDPOINT;
const queueName = process.env.QUEUE_NAME;
const messageBody = process.env.MESSAGE_BODY;
 
async function main() {
  // Within a web page...
  const credential = new RedirectCredential({
    clientId,
    redirectUri
  });

  // To log out a previously authenticated user...
  let authenticationRecord = window.localStorage.authenticationRecord;
  if (authenticationRecord) {
    await credential.logout(JSON.parse(authenticationRecord));
  }

  // A browser application can keep track of its own state and resume after authenticating.
  let state = {
    application: "state"
  };

  // On page load, developers can retrieve the state of the previous authentication.
  const pageLoadResult = await credential.onPageLoad();
  if (pageLoadResult) {
    state = JSON.parse(pageLoadResult.state);
  }

  const client = new ServiceBusClient(serviceBusEndpoint, credential);

	// Service clients should expose their scopes.
	const scopes = client.scopes;
 
  try {
    // If the redirection has already happened, client authentication will work.
		const sender = client.createSender(queueName);
    await sender.sendMessages({ body: messageBody });
  } catch(e) {
    // If the redirection needs to happen, getToken will throw an `AuthenticationRequiredError` error.
    if (e.name === "AuthenticationRequiredError") {
      // Interactive authentication will happen via redirection once the authenticate() method is called.
      await credential.authenticate(scopes, {
        // The authenticate() method supports sending the browser application state.
        state: JSON.stringify(state)
      });
    }
  }

  // One authentication record can be retrieved per credential based on the last authenticated user
  // and the credential constructor parameters.
  const newAuthenticationRecord = await credential.authenticate(scope);
  window.localStorage.authenticationRecord = JSON.stringify(newAuthenticationRecord)
}

main();
```

An example using the `PopupCredential`:

```javascript
const { PopupCredential } = require("@azure/identity-spa");
const { KeyClient } = require("@azure/keyvault-keys");

async function main() {
  // Within a web page...
  const credential = new PopupCredential({
    clientId,
    redirectUri
  });

  // To log out a previously authenticated user...
  let authenticationRecord = window.localStorage.authenticationRecord;
  if (authenticationRecord) {
    await credential.logout(JSON.parse(authenticationRecord));
  }

  // A browser application can keep track of its own state and resume after authenticating.
  let state = {
    application: "state"
  };

  const client = new ServiceBusClient(serviceBusEndpoint, credential);

	// Service clients should expose their scopes.
	const scopes = client.scopes;
 
  try {
    // If the redirection has already happened, client authentication will work.
		const sender = client.createSender(queueName);
    await sender.sendMessages({ body: messageBody });
  } catch(e) {
    // If the popup authentication needs to happen, getToken will throw an `AuthenticationRequiredError` error.
    if (e.name === "AuthenticationRequiredError") {
      // Interactive authentication will happen via a popup window that will appear when the authenticate() method is called.
      await credential.authenticate(scopes, {
        // The authenticate() method supports sending the browser application state.
        state: JSON.stringify(state)
      });
    }
  }

  // One authentication record can be retrieved per credential based on the last authenticated user
  // and the credential constructor parameters.
  const newAuthenticationRecord = await credential.authenticate(scope);
  window.localStorage.authenticationRecord = JSON.stringify(newAuthenticationRecord)
}

main();
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
