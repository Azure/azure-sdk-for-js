# Interactive Browser Credential

The `InteractiveBrowserCredential` uses [Authorization Code Flow][AuthCodeFlow], which uses [Proof Key for Code Exchange (PKCE)](https://tools.ietf.org/html/rfc7636) both on the browser and on NodeJS. Under the hood it uses [@azure/msal-node](https://www.npmjs.com/package/@azure/msal-node) for NodeJS. For the browser it uses [MSAL v2.x](https://github.com/AzureAD/microsoft-authentication-library-for-js) by default (which also uses Authorization Code Flow), while it also allows switching back to the older [Implicit Grant Flow][ImplicitGrantFlow] by passing the `flow` property with the value `implicit-grant` through to the constructor of the `InteractiveBrowserCredential`, as follows:

```ts
const credential = new InteractiveBrowserCredential({
  // Authorization Code Flow is recommended and used by default.
  // But you can switch batch to the Implicit Grant Flow if you need to:
  flow: "implicit-grant",
});
```

Follow the instructions for [creating your single-page application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#redirect-uri-msaljs-20-with-auth-code-flow) to correctly mark your redirect URI as enabled for CORS.

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

When using `InteractiveBrowserCredential` on the browser, you will be required to pass a `clientId` in the constructor parameters, such as:

```ts
// If you've bundled Identity for the browser...

const credential = new InteractiveBrowserCredential({
  // You MUST provide a client ID if you have an application configured.
  clientId: "my-client-id",
  // You may provide a tenant ID based on the resource you are trying to access.
  tenantId: "my-tenant-id",
  // You may provide a redirectUri based on the redirectUri configured in your AAD application:
  redirectUri: "http://localhost:8080/"
});
```

Azure Active Directory enterprise applications configured with redirect URIs for `Web` environments are no longer supported by the Authorization Code Flow. You can either configure your AAD application to use Single Page Application redirect URis (type `spa`), or switch to the `implicit-grant` flow.

## CORS error

If you attempt to use the Authorization Code Flow and you get an error similar to this one:

```
access to XMLHttpRequest at 'https://login.microsoftonline.com/common/v2.0/oauth2/token' from origin 'yourApp.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

Then you need to visit your app registration and update the redirect URI you're using to the type `spa` (for "single page application").

## Sample code

You can see a sample project that uses `InteractiveBrowserCredential` with both [Authorization Code Flow][AuthCodeFlow] and [Implicit Grant Flow][ImplicitGrantFlow] here: [link to the sample project](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity/test/manual).

[AuthCodeFlow]: https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow
[ImplicitGrantFlow]: https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow
