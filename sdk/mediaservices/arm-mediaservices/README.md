## Azure AzureMediaServices SDK for JavaScript

This package contains an isomorphic SDK for AzureMediaServices.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/arm-mediaservices
```

### How to use

#### nodejs - Authentication, client creation and list all Assets as an example written in TypeScript.
This sample shows how to use Service Principal authentication with details obtained from the Azure Portal's API Access page in your Azure Media Services account. 
It also demonstrates how to create the Media Services client and do a simple listing of all assets in the account. If no Assets have been created yet, the list will just return empty. 

More detailed examples are available at the following Samples repository. Contributions are encouraged!
- [Azure Media Services v3 Node samples](https://github.com/Azure-Samples/media-services-v3-node-tutorials)

##### Install @azure/ms-rest-nodeauth

- Please install minimum version of `"@azure/ms-rest-nodeauth": "^3.0.0"`.
```bash
npm install @azure/ms-rest-nodeauth@"^3.0.0"
```

##### Sample code

```typescript
import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
import { AzureMediaServices, AzureMediaServicesModels, AzureMediaServicesMappers } from "@azure/arm-mediaservices";

export async function main() {
    // Go to the Azure Portal and copy the values obtained 
    // from your Media Services account's API Access page into the constants
    const clientId = "<<Enter the AadClientId value from the Azure Portal>>";
    const secret = "<<Enter the AadSecret value from the Azure Portal>>";
    const tenantDomain = "<<Enter the AadTenantDomain value from the Azure portal>>";
    const subscriptionId = "<<Enter the SubscriptionId value from the Azure portal>>";
    const resourceGroup = "<<Enter the ResourceGroup value from the Azure portal>>";
    const accountName = "<<Enter the AccountName value from the Azure portal>>";


    const creds = await msRestNodeAuth.loginWithServicePrincipalSecret(clientId, secret, tenantDomain);
    const mediaClient = new AzureMediaServices(creds, subscriptionId);

    // List Assets in Account
    console.log("Listing Assets Names in account:")
    var assets = await mediaClient.assets.list(resourceGroup, accountName);

    assets.forEach(asset => {
        console.log(asset.name);    
    });

}

main().catch((err) => {
    console.error("Error running sample:", err.message);
});
```

#### browser - Authentication, client creation and list accountFilters as an example written in JavaScript.

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
    <title>@azure/arm-mediaservices sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/ms-rest-browserauth/dist/msAuth.js"></script>
    <script src="node_modules/@azure/arm-mediaservices/dist/arm-mediaservices.js"></script>
    <script type="text/javascript">
      const subscriptionId = "<Subscription_Id>";
      const authManager = new msAuth.AuthManager({
        clientId: "<client id for your Azure AD app>",
        tenant: "<optional tenant for your organization>"
      });
      authManager.finalizeLogin().then((res) => {
        if (!res.isLoggedIn) {
          // may cause redirects
          authManager.login();
        }
        const client = new Azure.ArmMediaservices.AzureMediaServices(res.creds, subscriptionId);
        const resourceGroupName = "testresourceGroupName";
        const accountName = "testaccountName";
        client.assets.list(resourceGroupName, accountName).then((result) => {
          console.log("The result is:");
          console.log(result);
        }).catch((err) => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/mediaservices/arm-mediaservices/README.png)
