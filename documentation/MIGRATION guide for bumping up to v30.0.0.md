## Guide for bumping Javascript/Typescript SDK to version 30.0.0+

This document is intended to help users bump Javascript/Typescript SDK version to version 30.0.0+ as there are some significant changes since version 30.0.0.

**For users new to the Javascript/Typescript SDK ([azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js)) please see [how to use](./how-to-use.md).**

## Why switch to version 30.0.0+?

Compared to libraries under version 30.0.0, the newer version has the following changes: 

1. Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice
1. Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead
1. List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
1. Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
1. The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.

If you have an existing application that uses the Javascript/Typescript Azure SDK packages and you're interested in updating your application to use the newer JavaScript/Typescript Azure SDK packages, then the good news is that there is very little for you to do. Here's the things that have changed with this new set of SDKs:

## Current status
Currently, we have previewed several packages to version 30.0.0+. See the below list and have a try.  
1. [@azure/arm-resources](https://www.npmjs.com/package/@azure/arm-resources/v/30.0.0-beta.1)
1. [@azure/arm-features](https://www.npmjs.com/package/@azure/arm-features/v/30.0.0-beta.2)
1. [@azure/arm-locks](https://www.npmjs.com/package/@azure/arm-locks/v/30.0.0-beta.1)
1. [@azure/arm-links](https://www.npmjs.com/package/@azure/arm-links/v/30.0.0-beta.1)
1. [@azure/arm-policy](https://www.npmjs.com/package/@azure/arm-policy/v/30.0.0-beta.1)
1. [@azure/arm-managedapplications](https://www.npmjs.com/package/@azure/arm-managedapplications/v/30.0.0-beta.1)

## Authentication

In version 30.0.0+ Javescript/Typescript packages, we only `@azure/identity` to do the Authentication. And we have deprecated the authentication method of `@azure/ms-rest-nodeauth` and `@azure/ms-rest-browserauth`. If you are using them, you may change it accordingly.  
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

In version below 30.0.0. we have some operations that allow users to use callback like :

```typeScript
getInstanceView(
  resourceGroupName: string,
  cloudServiceName: string,
  callback: msRest.ServiceCallback<Models.CloudServiceInstanceView>
): void;

getInstanceView(
  resourceGroupName: string,
  cloudServiceName: string,
  options: msRest.RequestOptionsBase,
  callback: msRest.ServiceCallback<Models.CloudServiceInstanceView>
): void;

getInstanceView(
  resourceGroupName: string,
  cloudServiceName: string,
  options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.CloudServiceInstanceView>,
  callback?: msRest.ServiceCallback<Models.CloudServiceInstanceView>
): Promise<Models.CloudServicesGetInstanceViewResponse> 
```

Now, we have removed them, if you are using something like 
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
which means previously, you can get the list result directly like
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
In version 30.0.0+, we keep this feature except 
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
    <td>
      <pre lang="typescript">
  beginCreateOrUpdate(
    resourceGroupName: string,
    cloudServiceName: string,
    options?: Models.CloudServicesBeginCreateOrUpdateOptionalParams
  ): Promise<
       msRestAzure.LROPoller
     >
      </pre>
    </td>
    <td>
      <pre lang="typescript">
  async beginCreateOrUpdate(
    resourceGroupName: string,
    cloudServiceName: string,
    options?: CloudServicesCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<
        CloudServicesCreateOrUpdateResponse
      >,
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
    <td>
      <pre lang="typescript">
  createOrUpdate(
    resourceGroupName: string,
    cloudServiceName: string,
    options?: Models.CloudServicesCreateOrUpdateOptionalParams
  ): Promise<
       Models.CloudServicesCreateOrUpdateResponse
     >
      </pre>
    </td>
    <td>
      <pre lang="typescript">
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    cloudServiceName: string,
    options?: CloudServicesCreateOrUpdateOptionalParams
  ): Promise<
       CloudServicesCreateOrUpdateResponse
     >
      </pre>
    </td>
  </tr>
</table>
<!-- markdownlint-enable MD033 -->

**There are also some changes inside the Poller's usages. In general,**
1. we change `pollUntilFinished` into `pollUntilDone` and change `isFinished` into `isDone`.
1. We add `isStopped`, `stopPolling`, `cancelOperation`, `onProgress` to give users a better control of the Long Running Operation. 

Refer to [@azure/core-lro](https://www.npmjs.com/package/@azure/core-lro) for more details.
