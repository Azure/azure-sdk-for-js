## 5.0.0-beta.2 (2021-12-01)
    
**Features**

  - Added Interface TagsCreateOrUpdateAtScopeOptionalParams
  - Added Interface TagsCreateOrUpdateOptionalParams
  - Added Interface TagsCreateOrUpdateValueOptionalParams
  - Added Interface TagsDeleteAtScopeOptionalParams
  - Added Interface TagsDeleteOptionalParams
  - Added Interface TagsDeleteValueOptionalParams
  - Added Interface TagsGetAtScopeOptionalParams
  - Added Interface TagsListNextOptionalParams
  - Added Interface TagsListOptionalParams
  - Added Interface TagsUpdateAtScopeOptionalParams
  - Added Type Alias TagsCreateOrUpdateAtScopeResponse
  - Added Type Alias TagsCreateOrUpdateResponse
  - Added Type Alias TagsCreateOrUpdateValueResponse
  - Added Type Alias TagsGetAtScopeResponse
  - Added Type Alias TagsListNextResponse
  - Added Type Alias TagsListResponse
  - Added Type Alias TagsUpdateAtScopeResponse
  - Class ResourceManagementClient has a new parameter $host
  - Class ResourceManagementClient has a new parameter apiVersion
  - Class ResourceManagementClient has a new parameter subscriptionId

**Breaking Changes**

  - Removed operation DeploymentOperations.listAtManagementGroupScopeNext
  - Removed operation DeploymentOperations.listAtScopeNext
  - Removed operation DeploymentOperations.listAtSubscriptionScopeNext
  - Removed operation DeploymentOperations.listAtTenantScopeNext
  - Removed operation DeploymentOperations.listNext
  - Removed operation Deployments.listAtManagementGroupScopeNext
  - Removed operation Deployments.listAtScopeNext
  - Removed operation Deployments.listAtSubscriptionScopeNext
  - Removed operation Deployments.listAtTenantScopeNext
  - Removed operation Deployments.listByResourceGroupNext
  - Removed operation Operations.listNext
  - Removed operation Providers.listAtTenantScopeNext
  - Removed operation Providers.listNext
  - Removed operation ResourceGroups.listNext
  - Removed operation Resources.listByResourceGroupNext
  - Removed operation Resources.listNext
  - Removed operation TagsOperations.listNext
  - Operation TagsOperations.createOrUpdate has a new signature
  - Operation TagsOperations.createOrUpdateAtScope has a new signature
  - Operation TagsOperations.createOrUpdateValue has a new signature
  - Operation TagsOperations.delete has a new signature
  - Operation TagsOperations.deleteAtScope has a new signature
  - Operation TagsOperations.deleteValue has a new signature
  - Operation TagsOperations.getAtScope has a new signature
  - Operation TagsOperations.list has a new signature
  - Operation TagsOperations.updateAtScope has a new signature
  - Interface ProvidersListAtTenantScopeNextOptionalParams no longer has parameter top
  - Interface ProvidersListAtTenantScopeOptionalParams no longer has parameter top
  - Interface ProvidersListNextOptionalParams no longer has parameter top
  - Interface ProvidersListOptionalParams no longer has parameter top
    
# Release History

## 5.0.0-beta.1 (2021-10-09)

This is the first preview for the new version of the `@azure/arm-resources` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
