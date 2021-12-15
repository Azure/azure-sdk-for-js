# Guide for migrating to the next generation of Azure JavaScript SDK for Management Libraries

This document shows the customers of the JavaScript/TypeScript management libraries on how to migrate their code to use the next-generation libraries.

**For new customers of the JavaScript/TypeScript SDK ([azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js)) please see [quick start for next generation](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/next-generation-quickstart.md).**

## Current status

Currently, we have released GA version of selected services including `@azure/arm-resources`, `@azure/arm-storage`, `@azure/arm-compute`, `@azure/arm-network`. We are actively working on releasing more packages and eventually cover all Azure services. Please find the latest version of those libraries in npmjs.com and have a try.

## Why Switching to the next-generation

Compared to the current management libraries, the next-generation libraries have the following changes:

1. Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
1. Callbacks: Method overloads that use callbacks have been replaced to use Promise instead.
1. You could iterate the result of List operations by using the `PagedAsyncIterableIterator` interface, compared with in previous model, you have to make a new request using the link to the next page.
1. Interface and API change for Long running operations: To check the final result of the Poller object returned by long running operations like `beginCreateOrUpdate`, please use `pollUntilDone` instead of `pollUntilFinished`. To get the final result directly, use the method with the suffix `AndWait` e.g.`beginCreateOrUpdateAndWait`.
1. The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.

If you have an existing application that uses the JavaScript/TypeScript Azure SDK packages and you're interested in updating your application to use the next-generation SDKs, here are the things that you need to do for the migration:

## Authentication

In the next-generation JavaScript/TypeScript packages, we only support using `@azure/identity` to do the Authentication. We have deprecated the authentication methods defined in `@azure/ms-rest-nodeauth` and `@azure/ms-rest-browserauth`. If you are still using them, please follow the below example to do the migration.

Replace `loginWithServicePrincipalSecret` method in `@azure/ms-rest-nodeauth` by `ClientSecretCredential` in `@azure/identity` to get the credential.

change

```typescript
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
const credentials = msRestNodeAuth.loginWithServicePrincipalSecret(
  clientId,
  clientSecret,
  tenantId
);
```

into

```typescript
import { ClientSecretCredential } from "@azure/identity";
const credentials = new ClientSecretCredential(tenantId, clientId, clientSecrat);
```

Refer to [@azure/identity](https://www.npmjs.com/package/@azure/identity) for more details.

## Callbacks

In current libraries. we have some operations that allow customers to use callback such as

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <th>Current Libraries</th>
    <th>Next Generation</th>
  </tr>
  <tr>
    <td>
      <pre lang="typescript">
getInstanceView(
  resourceGroupName: string,
  cloudServiceName: string,
  options?: msRest.RequestOptionsBase
): Promise&lt;Models.CloudServicesGetInstanceViewResponse>
      </pre>
      <pre lang="typescript">
getInstanceView(
  resourceGroupName: string,
  cloudServiceName: string,
  callback: msRest.ServiceCallback&lt;Models.CloudServiceInstanceView>
): void;
      </pre>
      <pre lang="typescript">
getInstanceView(
  resourceGroupName: string,
  cloudServiceName: string,
  options: msRest.RequestOptionsBase,
  callback: msRest.ServiceCallback&lt;Models.CloudServiceInstanceView>
): void;
      </pre>
      <pre lang="typescript">
getInstanceView(
  resourceGroupName: string,
  cloudServiceName: string,
  options?: msRest.RequestOptionsBase |
              msRest.ServiceCallback&lt;Models.CloudServiceInstanceView>,
  callback?: msRest.ServiceCallback&lt;Models.CloudServiceInstanceView>
): Promise&lt;Models.CloudServicesGetInstanceViewResponse>
      </pre>
    </td>
    <td>
      <pre lang="typescript">
getInstanceView(
  resourceGroupName: string,
  cloudServiceName: string,
  options?: CloudServicesGetInstanceViewOptionalParams
): Promise&lt;CloudServicesGetInstanceViewResponse>
      </pre>
    </td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

Now, we have removed these operations that allows callback as a parameter, if you are using something like

```typescript
const callback = function handle(...args) {
  // callback function body
};
getInstanceView(resourceGroupName, cloudServiceName, callback);
```

You may change it into a promise based

```typescript
const callback = function handle(...args) {
  // callback function body
};
getInstanceView(resourceGroupName, cloudServiceName).then(...(args) => handle(...args));
```

## List Operations

List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.  
The below example shows how you could handle the list result in previous version:

```typescript
await client.availabilitySets.list(this.resourceName).then((response) => handle(response));
```

now you will get a iterator, and you need to do the iteration to get the result.

```typescript
const result = client.availabilitySets.list(this.resourceName);
for await (const item of result) {
  handle(item);
}
```

The newly added `PagedAsyncIterableIterator` also allows you to get these items by page if the List operation result is too long.

```typescript
const result = client.availabilitySets.list(this.resourceName);
for await (const item of result.byPage({ maxPageSize: 2 })) {
  handle(item);
}
```

Refer to [@azure/core-paging](https://www.npmjs.com/package/@azure/core-paging) for more details.

## Long Running Operations

Many operations may take a long time to finish before receiving the desired response. The SDK provides two types of methods to interact with such operations. First type is a method that simply returns the result after the operation finishes processing and those methods' names correspond to the name of the API they call. One issue with these methods is that they do not provide a way to check on the current status of the operation or to access any partial results computed so far. The next-generation SDK provides similar methods but with a slightly different name, it has the prefix `begin` and the postfix `AndWait`. The other type of methods is one that returns a poller object which gives you access to the underlying state of the operation. Previously, these methods returned an object of type [`LROPoller`](https://github.com/Azure/ms-rest-azure-js/blob/a9cee4480a8710d5c81890ae7cb7a1dea559ec65/lib/lroPoller.ts#L13), a class that is exported by `@azure/ms-rest-azure-js` but the new operations return an object that implements the [`PollerLike`](https://github.com/Azure/azure-sdk-for-js/blob/35f86a68def5022d4c03a32d4c8c0362a0158772/sdk/core/core-lro/src/poller.ts#L50) interface instead which is exported by `@azure/core-lro`. The name of those methods did not change, both versions use the prefix `begin` with no postfix.

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <td colspan="2">
      <p>
        Operations that return a poller.
      </p>
    </td>
  </tr>
  <tr>
    <th>Current Libraries</th>
    <th>Next Generation</th>
  </tr>
  <tr>
    <td>
      <pre lang="typescript">
  beginCreateOrUpdate(
    resourceGroupName: string,
    cloudServiceName: string,
    options?: Models.CloudServicesBeginCreateOrUpdateOptionalParams
  ): Promise&lt;msRestAzure.LROPoller>
      </pre>
    </td>
    <td>
      <pre lang="typescript">
  async beginCreateOrUpdate(
    resourceGroupName: string,
    cloudServiceName: string,
    options?: CloudServicesCreateOrUpdateOptionalParams
  ): Promise&lt;PollerLike<
        PollOperationState&lt;CloudServicesCreateOrUpdateResponse>,
        CloudServicesCreateOrUpdateResponse
      >
    >
      </pre>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <p>
        Operations that will poll until finish and return the result directly
      </p>
    </td>
  </tr>
  <tr>
    <th>Current Libraries</th>
    <th>Next Generation</th>
  </tr>
  <tr>
    <td>
      <pre lang="typescript">
  createOrUpdate(
    resourceGroupName: string,
    cloudServiceName: string,
    options?: Models.CloudServicesCreateOrUpdateOptionalParams
  ): Promise&lt;Models.CloudServicesCreateOrUpdateResponse>
      </pre>
    </td>
    <td>
      <pre lang="typescript">
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    cloudServiceName: string,
    options?: CloudServicesCreateOrUpdateOptionalParams
  ): Promise&lt;CloudServicesCreateOrUpdateResponse>
      </pre>
    </td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

The following table compares `LROPoller` and `PollerLike`:

| operation                                                                  | `LROPOller`                                  | `PollerLike`                                                                                                                                                                                                    |
| -------------------------------------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| return final results                                                       | `pollUntilFinished()`                        | `pollUntilDone()`                                                                                                                                                                                               |
| poll                                                                       | `poll()`                                     | `poll()`                                                                                                                                                                                                        |
| access the current state after receiving the response of each poll request | N/A                                          | `onProgress()`                                                                                                                                                                                                  |
| check whether the operation finished                                       | `isFinished()` / `isFinalStatusAcceptable()` | `isDone()`                                                                                                                                                                                                      |
| stop polling                                                               | N/A                                          | `stopPolling()`                                                                                                                                                                                                 |
| check if the polling stopped                                               | N/A                                          | `isStopped()`                                                                                                                                                                                                   |
| cancel the operation                                                       | N/A                                          | `cancelOperation()`                                                                                                                                                                                             |
| get the current operation state                                            | `getPollState()`                             | `getOperationState()`                                                                                                                                                                                           |
| access the final result                                                    | `getOperationResponse()`                     | `getResult()`                                                                                                                                                                                                   |
| serialize the poller state                                                 | N/A                                          | `toString()`                                                                                                                                                                                                    |
| get the most recent response                                               | `getMostRecentResponse()`                    | can be accessed using the [`onResponse`](https://github.com/Azure/azure-sdk-for-js/blob/35f86a68def5022d4c03a32d4c8c0362a0158772/sdk/core/core-client/src/interfaces.ts#L115) callback in the operation options |
| get the current operation status                                           | `getOperationStatus()`                       | can be accessed using the [`onResponse`](https://github.com/Azure/azure-sdk-for-js/blob/35f86a68def5022d4c03a32d4c8c0362a0158772/sdk/core/core-client/src/interfaces.ts#L115) callback in the operation options |

And here are examples of how to commonly use one of the `beginCreateOrUpdateAndWait` LROs found in `@azure/compute`:

<!-- markdownlint-disable MD033 -->
<table>
  <tr>
    <td colspan="2">
      <p>
        Operations that returns a poller.
      </p>
    </td>
  </tr>
  <tr>
    <th>Current Libraries</th>
    <th>Next Generation</th>
  </tr>
  <tr>
    <td>
      <pre lang="typescript">
const computeClient = new compute.ComputeManagementClient(credential, subscriptionId);
const poller = await computeClient.dedicatedHosts.beginCreateOrUpdate(
  resourceGroupName,
  hostGroupName,
  hostName,
  parameter
);
console.log(`The current status? ${poller.getPollState().state"}`)
const result = await poller.pollUntilFinished().then((response) => {
  console.log(response);
});
      </pre>
    </td>
    <td>
      <pre lang="typescript">
const computeClient = new compute.ComputeManagementClient(credential, subscriptionId);
const poller = await computeClient.dedicatedHosts.beginCreateOrUpdate(
  resourceGroupName,
  hostGroupName,
  hostName,
  parameter
);
poller.onProgress((state) => {
  console.log(`Are we done yet? ${Boolean(state.isCompleted)});
})
const result = await poller.pollUntilDone().then((response) => {
  console.log(response);
});
      </pre>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <p>
        Operations that will poll until finish and return the result directly
      </p>
    </td>
  </tr>
  <tr>
    <th>Current Libraries</th>
    <th>Next Generation</th>
  </tr>
  <tr>
    <td>
      <pre lang="typescript">
const computeClient = new compute.ComputeManagementClient(credential, subscriptionId);
await computeClient.dedicatedHosts
  .createOrUpdate(resourceGroupName, hostGroupName, hostName, parameter)
  .then((response) => {
    console.log(response);
  });
      </pre>
    </td>
    <td>
      <pre lang="typescript">
const computeClient = new compute.ComputeManagementClient(credential, subscriptionId);
await computeClient.dedicatedHosts
  .beginCreateOrUpdateAndWait(resourceGroupName, hostGroupName, hostName, parameter)
  .then((response) => {
    console.log(response);
  });
      </pre>
    </td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

Please refer to [@azure/core-lro](https://www.npmjs.com/package/@azure/core-lro) for more details.

## Additional Samples

We also provide some samples [here](https://github.com/Azure-Samples/azure-samples-js-management) for customers on how to use the next generation of Azure JavaScript/TypeScript management libraries.

## Need help

If you have encountered an issue during migration, please file an issue via [Github Issues](https://github.com/Azure/azure-sdk-for-js/issues) and make sure you add the 'Preview' label to the issue.
