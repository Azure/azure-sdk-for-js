# Interactive Browser Credential

The `InteractiveBrowserCredential` uses [Authorization Code Flow][AuthCodeFlow], which uses [Proof Key for Code Exchange (PKCE)](https://tools.ietf.org/html/rfc7636) both on the browser and on Node.js. Under the hood it uses [@azure/msal-node](https://www.npmjs.com/package/@azure/msal-node) for Node.js and [@azure/msal-browser](https://www.npmjs.com/package/@azure/msal-browser) in browsers.

`InteractiveBrowserCredential` can be used both in Node and in browsers. For each case, there are some important considerations that must be taken.

## For Node.js

For Node.js, if a `clientId` is provided, the Azure Active Directory application will need to be configured to have a "Mobile and desktop applications" redirect endpoint. Follow our guide on [setting up Redirect URIs for Desktop apps that calls to web APIs](https://docs.microsoft.com/azure/active-directory/develop/scenario-desktop-app-registration#redirect-uris).

When using `InteractiveBrowserCredential` on Node, you may specify a `clientId` and `tenantId`, but otherwise we try to authenticate using a public client that's available for all Azure accounts and the default tenant of your account. For Node, this credential uses a web server to fulfill the redirection. This web server tries to use the port `80` by default. A `redirectUri` can be provided to determine the proper redirection URI with the adequate port, as follows:

```ts
const credential = new InteractiveBrowserCredential({
  // You may provide a client ID if you have an application configured.
  clientId: "my-client-id",
  // You may provide a tenant ID based on the resource you are trying to access.
  tenantId: "my-tenant-id",
  // You may provide a redirectUri based on the redirectUri configured in your AAD application:
  redirectUri: "http://localhost:8080/"
});
```

## For browsers

Follow the instructions for [creating and configuring an Azure Active Directory application to authenticate a single-page application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#redirect-uri-msaljs-20-with-auth-code-flow) to correctly mark your redirect URI as enabled for CORS.

When using `InteractiveBrowserCredential` in the browser, you will be required to pass a `clientId` in the constructor parameters, such as:

```ts
const credential = new InteractiveBrowserCredential({
  // You MUST provide a client ID if you have an application configured.
  clientId: "my-client-id",
  // You may provide a tenant ID based on the resource you are trying to access.
  tenantId: "my-tenant-id",
  // You may provide a redirectUri based on the redirectUri configured in your AAD application:
  redirectUri: "http://localhost:8080/"
});
```

Azure Active Directory enterprise applications configured with redirect URIs for `Web` environments are no longer supported by the Authorization Code Flow. You will have to configure your AAD application to use Single Page Application redirect URis (type `spa`).

### CORS error

If you attempt to use the Authorization Code Flow and you get an error similar to this one:

```
access to XMLHttpRequest at 'https://login.microsoftonline.com/common/v2.0/oauth2/token' from origin 'yourApp.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

Then you need to visit your app registration and update the redirect URI you're using to the type `spa` (for "single page application").

## Sample code

You can see a sample project that uses `InteractiveBrowserCredential` here: [link to the sample project](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity/test/manual).

[AuthCodeFlow]: https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow
