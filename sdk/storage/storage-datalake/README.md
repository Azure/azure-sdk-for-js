## Azure DataLakeStorageClient SDK for JavaScript

This package contains an isomorphic SDK for DataLakeStorageClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/storage-datalake
```

### How to use

#### nodejs - Authentication, client creation and list filesystem as an example written in TypeScript.

##### Sample code
This sample lists the file systems in your storage account.  To know more, refer to the [Azure Documentation on Storage DataLake](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction)


```typescript
import * as msRest from "@azure/ms-rest-js";
import { DataLakeStorageClient } from "@azure/storage-datalake";

const token = "YOUR_STORAGE_TOKEN";
const credentials = new msRest.TokenCredentials(token);
const accountName = "YOUR_STORAGE_ACCOUNTNAME";

const client = new DataLakeStorageClient(credentials, accountName);
client.filesystem
  .list()
  .then(results => {
    results.forEach(result => {
      console.log(`Name: ${result.name}`);
      console.log(`Last Modified: ${result.lastModified}`);
    });
  })
  .catch(ex => {
    console.log(ex);
  });
```

#### browser - Authentication, client creation and list filesystem as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/storage-datalake sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/ms-rest-azure-js/dist/msRestAzure.js"></script>
    <script src="node_modules/@azure/storage-datalake/dist/storage-datalake.js"></script>
    <script type="text/javascript">
      const token = "YOUR_STORAGE_TOKEN";
      const credentials = new msRest.TokenCredentials(token);
      const accountName = "YOUR_STORAGE_ACCOUNTNAME";

      const client = new Azure.StorageDatalake.DataLakeStorageClient(
        credentials,
        accountName
      );

      client.filesystem
        .list()
        .then(results => {
          results.forEach(result => {
            console.log(`Name: ${result.name}`);
            console.log(`Last Modified: ${result.lastModified}`);
          });
        })
        .catch(ex => {
          console.log(ex);
        });
    </script>
  </head>
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/storage/storage-datalake/README.png)
