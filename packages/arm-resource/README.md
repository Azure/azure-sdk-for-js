# Microsoft Azure SDK for JavaScript - Resource Management

This project provides a JavaScript package that makes it easy to manage Azure resources.

## How to Install

```bash
npm install arm-resource
```

## How to Use

### Authentication, client creation and listing resources as an example

 ```typescript
import * as msRestNodeAuth from "ms-rest-nodeauth";
import * as resourceManagement from "azure-arm-resource";

// Interactive Login
msRestNodeAuth.interactiveLogin()
  .then((credentials: msRestNodeAuth.DeviceTokenCredentials) => {
    const client = new resourceManagement.ResourceManagementClient(credentials, 'your-subscription-id');
    return client.resources.list();
  })
  .then((result: resourceManagement.Models.ResourceListResult) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  });
 ```

## Creating a Resource Group

```typescript
import * as util from "util";
const groupName = "testGroup1";
const groupParameters: resourceManagement.Models.ResourceGroup = {
  location: 'West US',
  tags: {
    tag1: 'val1',
    tag2: 'val2'
  }
};
client.resourceGroups.createOrUpdate(groupName, groupParameters)
  .then((result: resourceManagement.Models.ResourceGroupsCreateOrUpdateResponse) => {
    console.log(`Result: ${util.inspect(result, {depth: null})}`);
  })
  .catch((err: Error) => {
    console.log(err);
    /*err has reference to the actual request and response, so you can see what was sent and received on the wire.
      The structure of err looks like this:
      err: {
        code: 'Error Code',
        message: 'Error Message',
        body: 'The response body if any',
        request: reference to a stripped version of http request
        response: reference to a stripped version of the response
      }
    */
  });
```

## Create a Generic Resource in a Resource Group

```typescript
const groupName = "testGroup1";
const resourceName = "autorestsite102";
const params: resourceManagement.Models.GenericResource = {
  "location": "West US",
  "properties" : {
    "SiteMode": "Limited",
    "ComputeMode": "Shared"
  },
  "Name": resourceName
};
const resourceType = "sites";
const parentResourcePath = "";
const resourceProviderNamespace = "Microsoft.Web";
const apiVersion = "2014-04-01";
client.resources.createOrUpdate(groupName, resourceProviderNamespace, parentResourcePath, resourceType, resourceName , apiVersion, params)
  .then((result: resourceManagement.Models.ResourcesCreateOrUpdateResponse) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  });
```

## Get a Generic Resource in a Resource Group

```typescript
const groupName = "testGroup1";
const resourceName = "autorestsite102";
const resourceType = "sites";
const parentResourcePath = "";
const resourceProviderNamespace = "Microsoft.Web";
const apiVersion = "2014-04-01";
client.resources.get(groupName, resourceProviderNamespace, parentResourcePath, resourceType, resourceName, apiVersion)
  .then((result) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  })
```

## Listing all resources in your subscription

```typescript
client.resources.list()
  .then((result) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  });
```

## Deleting a Generic Resource in a Resource Group

```typescript
const groupName = "testGroup1";
const resourceName = "autorestsite102";
const resourceType = "sites";
const parentResourcePath = "";
const resourceProviderNamespace = "Microsoft.Web";
const apiVersion = "2014-04-01";
client.resources.deleteMethod(groupName, resourceProviderNamespace, parentResourcePath, resourceType, resourceName, apiVersion)
  .then((result) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  });
```

## Deleting the Resource Group

```typescript
const groupName = "testGroup1";
client.resourceGroups.deleteMethod(groupName)
  .then((result) => {
    console.log(`Result: ${result}`);
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  });
```

## Related projects

- [Microsoft Azure SDK for JavaScript - All-up](https://github.com/Azure/azure-sdk-for-js)
