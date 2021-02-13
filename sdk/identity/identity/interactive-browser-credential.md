# Interactive Browser Credential

The `InteractiveBrowserCredential` uses [Auth Code Flow][AuthCodeFlow], which uses [Proof Key for Code Exchange (PKCE)](https://tools.ietf.org/html/rfc7636), uses [MSAL v2.x](https://github.com/AzureAD/microsoft-authentication-library-for-js), and is enabled by default. It also allows switching back to the [Implicit Grant Flow][ImplicitGrantFlow] by passing the `flow` property with the value `implicit-grant` through to the constructor of the `InteractiveBrowserCredential`.

Follow the instructions for [creating your single-page application](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#redirect-uri-msaljs-20-with-auth-code-flow) to correctly mark your redirect URI as enabled for CORS.

If you attempt to use the authorization code flow and see this error:

```
access to XMLHttpRequest at 'https://login.microsoftonline.com/common/v2.0/oauth2/token' from origin 'yourApp.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

Then you need to visit your app registration and update the redirect URI for your app to type `spa` (for "single page application").

You can see a sample project that uses `InteractiveBrowserCredential` with both [Auth Code Flow][AuthCodeFlow] and [Implicit Grant Flow][ImplicitGrantFlow] here: [link to the sample project](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity/test/manual).

[AuthCodeFlow]: https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow
[ImplicitGrantFlow]: https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow
