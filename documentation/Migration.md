# Migration from Node.js packages ([azure-sdk-for-node](https://github.com/Azure/azure-sdk-for-node)) to JavaScript packages ([azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js))

This repository contains a set of packages for JavaScript/TypeScript application development for Azure. These new packages are found under the `@azure` organization in NPM and are actively developed in the [Azure/azure-sdk-for-js](https://github.com/azure/azure-sdk-for-js) repository in GitHub. Unlike the previous set of NPM packages that could only be run in Node.js, these packages can run in Node.js application as well as applications running in modern browsers.

If you have an existing application that uses the older Node.js Azure SDK packages and you're interested in updating your application to use the newer JavaScript Azure SDK packages, then the good news is that there is very little for you to do. Here's the things that have changed with this new set of SDKs:

## Imports

We've split the older `ms-rest` and `ms-rest-azure` packages up into four new packages that each focus on a smaller scenario. This makes for a much better end-user experience because applications will ship with more granular dependencies. This directly translates to shipping fewer bytes to your customers.

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

Speaking of size, we also restructed our SDKs to play more nicely with the common bundlers that exist out there. Some of you have mentioned in the past that our Node.js SDKs didn't work very well with bundlers (such as [here](https://github.com/Azure/azure-sdk-for-node/issues/2398) and [here](https://github.com/Azure/azure-sdk-for-node/issues/1631)). We heard you and put in extra effort to make sure that our packages are tree-shakeable with both [webpack](https://webpack.js.org/) and [rollup](https://rollupjs.org/guide/en).

## Context Types

Tree-shaking wasn't really possible in our Node.js SDK packages due to the way that we structured our types. For example, the [azure-arm-storage](https://npmjs.com/package/azure-arm-storage) SDK is structured similar to this:

```TypeScript
class StorageManagementClient {
  subscriptionId: string;

  storageAccounts: new StorageAccounts(this);
  blobContainers: new BlobContainers(this);
}

class StorageAccounts {
  client: StorageManagementClient;
}

class BlobContainers {
  client: StorageManagementClient;
}
```

As you can see, the ServiceClient (`StorageManagementClient`) has references to each of its OperationGroups (`StorageAccounts` and `BlobContainers`), and each OperationGroup has a reference back to its ServiceClient. This made it much easier for us to implement certain features and it also was good for discovering the different operations on a ServiceClient, but it completely fails when you want to reduce the size of your application. Tree-shaking algorithms would see that your application uses `BlobContainers` (for example) and would notice that `BlobContainers` relies on `StorageManagementClient`, which relies on `StorageAccounts`, which means that using a single method from `BlobContainers` would end up pulling in the entire package. This didn't matter too much for the Node.js scenario, but in the browser scenario this could potentially mean sending half a megabyte to a client browser, which is completely unacceptable.

We solved this problem by introducing "Context" objects. These "Context" objects contain all of the ServiceClient's properties (`subscriptionId` in the example above), but don't contain the ServiceClient's OperationGroups (`storageAccounts` and `blobContainers`). The example above rewritten using a Context object looks like this:

```TypeScript
class StorageManagementClientContext {
  subscriptionId: string;
}

class StorageManagementClient extends StorageManagementClientContext {
  storageAccounts: new StorageAccounts(this);
  blobContainers: new BlobContainers(this);
}

class StorageAccounts {
  context: StorageManagementClientContext;
}

class BlobContainers {
  context: StorageManagementClientContext;
}
```

This small change means that if your application only uses `BlobContainers`, then you just need to create a `StorageManagementClientContext` object and pass it to the `BlobContainers` constructor. When your application is put through tree-shaking, it will see that your application uses `BlobContainers`, which also requires `StorageManagementClientContext`, and then it will be done. If your application doesn't use `StorageManagementClient` anywhere, then the other OperationGroups will be removed from your final bundle. We've seen this drastically reduce the size of applications that use [@azure/arm-network](https://npmjs.com/package/@azure/arm-network) and [@azure/arm-compute](https://npmjs.com/package/@azure/arm-compute).

## Authentication
We've also improved the way that you authenticate with Azure. Any Node.js-based authentication functions that used to be in [ms-rest-azure](https://npmjs.com/package/ms-rest-azure) have been moved to [ms-rest-nodeauth](https://npmjs.com/package/ms-rest-nodeauth). Since we now support browser applications, we've also added [ms-rest-browserauth](https://npmjs.com/package/ms-rest-browserauth) that you can use to authenticate with Azure from within a browser application. The browser authentication storage is a little more complicated, so we encourage you to [read about how it works](https://github.com/Azure/ms-rest-browserauth/blob/master/README.md) before putting it in your application.