## Azure GraphRbacManagementClient SDK for JavaScript

> **Warning**: This package is used to work with the Azure Active Directory Graph API which is deprecated and has been replaced by the [Microsoft Graph API](https://developer.microsoft.com/graph). Beginning on June 30th, 2022, apps using Azure AD Graph will no longer receive responses from the Azure Active Directory Graph endpoint.

Helpful links:

- [Update your applications to use Microsoft Authentication Library and Microsoft Graph API](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/update-your-applications-to-use-microsoft-authentication-library/ba-p/1257363)
- [App migration checklist](https://docs.microsoft.com/graph/migrate-azure-ad-graph-planning-checklist)
- [@microsoft/microsoft-graph-client package](https://www.npmjs.com/package/@microsoft/microsoft-graph-client) for the newer Microsoft Graph API

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

### How to Install

```
npm install @azure/graph
```

### How to use

#### nodejs - Authentication, client creation and get signedInUser as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```ts
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import {
  GraphRbacManagementClient,
  GraphRbacManagementModels,
  GraphRbacManagementMappers
} from "@azure/graph";
const tenantId = "<Tenant_Id>";

msRestNodeAuth
  .interactiveLogin({
    tokenAudience: "https://graph.windows.net",
    domain: tenantId
  })
  .then((creds) => {
    const client = new GraphRbacManagementClient(creds, tenantId, {
      baseUri: "https://graph.windows.net"
    });
    client.signedInUser.get().then((result) => {
      console.log("The result is:");
      console.log(result);
    });
  })
  .catch((err) => {
    console.error(err);
  });
```

#### browser - Authentication, client creation and get signedInUser as an example written in JavaScript.

##### Install @azure/ms-rest-browserauth

```
npm install @azure/ms-rest-browserauth
```

##### Sample code

See https://github.com/Azure/ms-rest-browserauth to learn how to authenticate to Azure in the browser.

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/graph sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/graph/dist/graph.js"></script>
    <script type="text/javascript">
      const tenantId = "<Tenant_Id>";
      const authManager = new msAuth.AuthManager({
        clientId: "<client id for your Azure AD app>",
        tenant: "<optional tenant for your organization>"
      });
      authManager.finalizeLogin().then((res) => {
        if (!res.isLoggedIn) {
          // may cause redirects
          authManager.login();
        }
        const client = new Azure.Graph.GraphRbacManagementClient(res.creds, tenantId, {
          baseUri: "https://graph.windows.net"
        });
        client.signedInUser
          .get()
          .then((result) => {
            console.log("The result is:");
            console.log(result);
          })
          .catch((err) => {
            console.log("An error occurred:");
            console.error(err);
          });
      });
    </script>
  </head>
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fgraphrbac%2Fgraph%2FREADME.png)
