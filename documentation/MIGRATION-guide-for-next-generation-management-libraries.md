## Guide for migrating to the next generation of Azure JavaScript SDK for Management Libraries

This document is intended to help users migrate Javascript/Typescript SDK for management libraries to the next-generation.

**For users new to the Javascript/Typescript SDK ([azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js)) please see [quick start for next generation](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/next-generation-quickstart.md).**

## Why switch to the next-generation

Compared to the current management libraries, the next-generation has the following changes: 

1. Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice
1. Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead
1. List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
1. Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
1. The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.

If you have an existing application that uses the Javascript/Typescript Azure SDK packages and you're interested in updating your application to use the next-generation JavaScript/Typescript Azure SDK packages, then the good news is that there is very little for you to do. Here's the things that have changed with this new set of SDKs:

## Current status
Currently, we have previewed several packages such as `azure/arm-resources`, `@azure/arm-storage`, `@azure/arm-compute`, `@azure/arm-network` for next-generation. See more from npmjs.com and find the latest version under `next` tag and have a try.  

## Authentication

In the next-generation Javescript/Typescript packages, we only support using `@azure/identity` to do the Authentication. And we have deprecated the authentication methods defined `@azure/ms-rest-nodeauth` and `@azure/ms-rest-browserauth`. If you are using them, please change it accordingly.  
For example, if you are using `loginWithServicePrincipalSecret` method in `@azure/ms-rest-nodeauth` to get the credential, you may replace it with `ClientSecretCredential` in `@azure/identity`.  

change
```typescript
import * as msRestNodeAuth  from '@azure/ms-rest-nodeauth';
const credentials = msRestNodeAuth.loginWithServicePrincipalSecret(clientId, clientSecret, tenantId);
```
into
```typescript
import { ClientSecretCredential }  from '@azure/identity';
const credentials = new ClientSecretCredential(tenantId, clientId, clientSecrat);
```
Refer to [@azure/identity](https://www.npmjs.com/package/@azure/identity) for more details.


## Callbacks

In current libraries. we have some operations that allow users to use callback like 

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
}
getInstanceView(resourceGroupName, cloudServiceName, callback);
```
You may change it into a promise based 
```typescript
const callback = function handle(...args) {
    // callback function body
}
getInstanceView(resourceGroupName, cloudServiceName)
  .then(...args => handle(...args))
```

## List Operations

List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.  
The below example shows how you could handle the list result in previous version:
```typescript
await client.availabilitySets.list(this.resourceName).then(
    response => handle(response)
)
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
for await (const item of result.byPage({maxPageSize:2})) {
    handle(item);
}
```
Refer to [@azure/core-paging](https://www.npmjs.com/package/@azure/core-paging) for more details.

## Long Running Operations

Javascript/Typescript SDK provide two operations with the same signature for Long Running Operations for our customers. One operation returns a LROPoller whose name starts with `begin` prefix, the other will poll until finished and return the final result to our customer that shares the same name with the rest api operationId.  
In next-generation, we keep this feature except 
1. we change those operations names with a `begin` prefix and `AndWait` suffix which will poll until finshed and return the result directly.  
1. we change the poller type of the response

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

**There are also some changes inside the Poller's usages. In general,**
1. we change `pollUntilFinished` into `pollUntilDone` and change `isFinished` into `isDone`.
1. We add `isStopped`, `stopPolling`, `cancelOperation`, `onProgress` to give users a better control of the Long Running Operation. 

Refer to [@azure/core-lro](https://www.npmjs.com/package/@azure/core-lro) for more details.

## Additional Samples

We also provide some samples [here](https://github.com/Azure-Samples/azure-samples-js-management) for customers on how to use the next generation of Azure Javascript/Typescript management libraries.

## Need help

If you have encountered an issue during migration, please file an issue via `Github Issues <https://github.com/Azure/azure-sdk-for-js/issues>`and make sure you add the "Preview" label to the issue
