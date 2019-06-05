## Azure GraphRbacManagementClient SDK for JavaScript

This package contains an isomorphic SDK for GraphRbacManagementClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/graph
```

### How to use

#### nodejs - Authentication, client creation and get signedInUser as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

```bash
npm install @azure/ms-rest-nodeauth
```

##### Sample code

```typescript
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { GraphRbacManagementClient } from "@azure/graph";
const tenantId = process.env["TENANT_ID"] || "";

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

```bash
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
      const tenantId = "<optional tenant for your organization>";
      const authManager = new msAuth.AuthManager({
        clientId: "<client id for your Azure AD app>",
        tenant: tenantId
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/graphrbac/graph/README.png)
