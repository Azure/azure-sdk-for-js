# Migration from Node.js packages ([azure-sdk-for-node](https://github.com/Azure/azure-sdk-for-node)) to JavaScript packages ([azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js))

Today we are announcing a new set of packages for JavaScript application development for Azure. These new packages are found under the [@azure](https://npmjs.com/packages) organization in NPM and are actively developed in the Azure/azure-sdk-for-js repository in GitHub. Unlike the previous set of NPM packages that could only be run in Node.js, these new set of packages can run in Node.js application as well as applications running in modern browsers.

## Changes required to use the new JavaScript packages ([azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js))

If you have an existing application that uses the older Node.js Azure SDK packages and you're interested in updating your application to use the newer JavaScript Azure SDK packages, then the good news is that there is very little for you to do. For example, here's an application that uses the older Node.js Azure SDK Storage package to list the storage accounts in a subscription:

```TypeScript
// Older Node.js Azure SDK Sample
import * as msRestAzure from "ms-rest-azure";
import { StorageManagementClient, StorageManagementModels } from "azure-arm-storage";

msRestAzure.interactiveLogin().then((credentials: msRestAzure.DeviceTokenCredentials) => {
  const client = new StorageManagementClient(credentials, "<subscription-id>");
  client.storageAccounts.list().then((storageAccounts: StorageManagementModels.StorageAccountListResult) => {
    console.log(`Found ${storageAccounts.length} storage accounts:`);
    for (const storageAccount of storageAccounts) {
      console.log(`  ${storageAccount.id}`);
    }
  });
});
```

And here's an application that uses the newer JavaScript Azure SDK Storage package to list the storage accounts in a subscription:

```TypeScript
// Newer JavaScript Azure SDK Sample
import * as msRestNodeAuth from "ms-rest-nodeauth";
import * as msRestJs from "ms-rest-js";
import { StorageManagementClient, StorageManagementModels } from "@azure/arm-storage";

msRestNodeAuth.interactiveLogin().then((credentials: msRestJs.ServiceClientCredentials) => {
  const client = new StorageManagementClient(credentials, "<subscription-id>");
  client.storageAccounts.list().then((storageAccounts: StorageManagementModels.StorageAccountListResult) => {
    console.log(`Found ${storageAccounts.length} storage accounts:`);
    for (const storageAccount of storageAccounts) {
      console.log(`  ${storageAccount.id}`);
    }
  });
});
```

Can you spot the differences? The truth is that the vast majority of customers will have a tiny amount of code to change to switch over to the newer JavaScript Azure SDKs. Here's the things that have changed with this new set of SDKs:

## Imports

We've split the older `ms-rest` and `ms-rest-azure` packages up into four new packages that each focus on a smaller scenario. This makes for a much better end-user experience because applications will ship with more granular dependencies. This directly translates to shipping fewer bytes to your customers (always a good thing).

```TypeScript
import * as msRest from "ms-rest";
import * as msRestAzure from "ms-rest-azure";
```

changes to:

```TypeScript
import * as msRestJs from "ms-rest-js";
import * as msRestAzureJs from "ms-rest-azure-js"
import * as msRestNodeAuth from "ms-rest-nodeauth";
import * as msRestBrowserAuth from "ms-rest-browserauth";
```

## Browser Support

Have we mentioned that our new set of Azure SDK packages are isomorphic (work in Node.js as well as browsers)? This builds on the work we did with our imports so that now you can choose only the packages you need so that your browser JavaScript application can still be as small as possible.

Speaking of size, we also restructed our SDKs to play more nicely with the common bundlers that exist out there. Some of you have mentioned in the past that our Node.js SDKs didn't work very well with bundlers (such as [here](https://github.com/Azure/azure-sdk-for-node/issues/2398) and [here](https://github.com/Azure/azure-sdk-for-node/issues/1631)). We heard you and put in extra effort to make sure that our packages are 

## Credentials
We've also simplified our credentials type. ServiceClients types can now be passed a [ServiceClientCredentials](https://github.com/Azure/ms-rest-js/blob/master/lib/credentials/serviceClientCredentials.ts) object, which is really anything that implements this simple interface:

```TypeScript
export interface ServiceClientCredentials {
  /**
  * Signs a request with the Authentication header.
  *
  * @param {WebResource} webResource The WebResource/request to be signed.
  * @returns {Promise<WebResource>} The signed request object;
  */
  signRequest(webResource: WebResource): Promise<WebResource>;
}
```

That means that anywhere you used to have this:

```TypeScript
credentials: msRestAzure.DeviceTokenCredentials
```

you can change it to:

```TypeScript
credentials: msRestJs.ServiceClientCredentials
```
