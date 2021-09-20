## An isomorphic javascript sdk for - ServiceFabricClient

This package contains an isomorphic SDK for ServiceFabricClient.

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### How to Install

```bash
npm install @azure/servicefabric
```

### How to use

#### nodejs - Authentication, client creation and getClusterManifest as an example written in TypeScript.

##### Install @azure/ms-rest-nodeauth

- Please install minimum version of `"@azure/ms-rest-nodeauth": "^3.0.0"`.

```bash
npm install @azure/ms-rest-nodeauth@"^3.0.0"
```

##### Sample code

[Service Fabric cluster security scenarios](https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-security)

```typescript
import { ServiceFabricClient } from "@azure/servicefabric";
const baseUri = "<ServiceFabricURL>:<connection-port>";
const client = new ServiceFabricClient({
  baseUri
});
client
  .getClusterManifest()
  .then((result) => {
    console.log(result.manifest);
  })
  .catch(console.error);
```

#### browser - Authentication, client creation and getClusterManifest as an example written in JavaScript.

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
    <title>@azure/servicefabric sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/servicefabric/dist/servicefabric.js"></script>
    <script type="text/javascript">
      var baseUri = "<ServiceFabricURL>:<connection-port>";
      var client = new Azure.Servicefabric.ServiceFabricClient({
        baseUri
      });
      client
        .getClusterManifest()
        .then((result) => {
          console.log("The result is:");
          console.log(result);
        })
        .catch((err) => {
          console.log("An error occurred:");
          console.error(err);
        });
    </script>
  </head>
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/servicefabric/servicefabric/README.png)
