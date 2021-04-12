# Interactive Browser Credential

The `InteractiveBrowserCredential` uses [Authorization Code Flow][AuthCodeFlow], which uses [Proof Key for Code Exchange (PKCE)](https://tools.ietf.org/html/rfc7636). Under the hood it uses [@azure/msal-node](https://www.npmjs.com/package/@azure/msal-node).

When using `InteractiveBrowserCredential`, you may specify a `clientId` and `tenantId`, but otherwise we try to authenticate using a public client that's available for all Azure accounts and the default tenant of your account. This credential uses a web server to fulfill the redirection. This web server tries to use the port `80` by default. A `redirectUri` can be provided to determine the proper redirection URI with the adequate port, as follows:

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
