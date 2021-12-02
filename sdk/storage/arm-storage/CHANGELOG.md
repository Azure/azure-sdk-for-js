## 17.0.0-beta.2 (2021-12-02)
    
**Features**

  - Added operation StorageAccounts.beginAbortHierarchicalNamespaceMigration
  - Added operation StorageAccounts.beginAbortHierarchicalNamespaceMigrationAndWait
  - Added operation StorageAccounts.beginHierarchicalNamespaceMigration
  - Added operation StorageAccounts.beginHierarchicalNamespaceMigrationAndWait
  - Added Interface AccountImmutabilityPolicyProperties
  - Added Interface ImmutableStorageAccount
  - Added Interface ObjectReplicationPoliciesCreateOrUpdateOptionalParams
  - Added Interface ObjectReplicationPoliciesDeleteOptionalParams
  - Added Interface ObjectReplicationPoliciesGetOptionalParams
  - Added Interface ObjectReplicationPoliciesListOptionalParams
  - Added Interface ProtectedAppendWritesHistory
  - Added Interface StorageAccountsAbortHierarchicalNamespaceMigrationOptionalParams
  - Added Interface StorageAccountsHierarchicalNamespaceMigrationOptionalParams
  - Added Interface TableCreateOptionalParams
  - Added Interface TableDeleteOptionalParams
  - Added Interface TableGetOptionalParams
  - Added Interface TableListNextOptionalParams
  - Added Interface TableListOptionalParams
  - Added Interface TableUpdateOptionalParams
  - Added Type Alias AccountImmutabilityPolicyState
  - Added Type Alias ObjectReplicationPoliciesCreateOrUpdateResponse
  - Added Type Alias ObjectReplicationPoliciesGetResponse
  - Added Type Alias ObjectReplicationPoliciesListResponse
  - Added Type Alias PublicNetworkAccess
  - Added Type Alias TableCreateResponse
  - Added Type Alias TableGetResponse
  - Added Type Alias TableListNextResponse
  - Added Type Alias TableListResponse
  - Added Type Alias TableUpdateResponse
  - Interface ImmutabilityPolicyProperties has a new optional parameter allowProtectedAppendWritesAll
  - Interface LegalHold has a new optional parameter allowProtectedAppendWritesAll
  - Interface LegalHoldProperties has a new optional parameter protectedAppendWritesHistory
  - Interface StorageAccountCreateParameters has a new optional parameter defaultToOAuthAuthentication
  - Interface StorageAccountCreateParameters has a new optional parameter immutableStorageWithVersioning
  - Interface StorageAccountCreateParameters has a new optional parameter publicNetworkAccess
  - Interface StorageAccountUpdateParameters has a new optional parameter defaultToOAuthAuthentication
  - Interface StorageAccountUpdateParameters has a new optional parameter immutableStorageWithVersioning
  - Interface StorageAccountUpdateParameters has a new optional parameter publicNetworkAccess
  - Interface UpdateHistoryProperty has a new optional parameter allowProtectedAppendWrites
  - Interface UpdateHistoryProperty has a new optional parameter allowProtectedAppendWritesAll
  - Class StorageManagementClient has a new parameter $host
  - Class StorageManagementClient has a new parameter apiVersion
  - Class StorageManagementClient has a new parameter subscriptionId
  - Type Alias BlobContainer has a new parameter enableNfsV3RootSquash
  - Type Alias BlobContainer has a new parameter enableNfsV3AllSquash
  - Type Alias ImmutabilityPolicy has a new parameter allowProtectedAppendWritesAll
  - Type Alias ListContainerItem has a new parameter enableNfsV3RootSquash
  - Type Alias ListContainerItem has a new parameter enableNfsV3AllSquash
  - Type Alias StorageAccount has a new parameter defaultToOAuthAuthentication
  - Type Alias StorageAccount has a new parameter publicNetworkAccess
  - Type Alias StorageAccount has a new parameter immutableStorageWithVersioning
  - Added Enum KnownAccountImmutabilityPolicyState
  - Added Enum KnownPublicNetworkAccess

**Breaking Changes**

  - Operation ObjectReplicationPoliciesOperations.createOrUpdate has a new signature
  - Operation ObjectReplicationPoliciesOperations.delete has a new signature
  - Operation ObjectReplicationPoliciesOperations.get has a new signature
  - Operation ObjectReplicationPoliciesOperations.list has a new signature
  - Operation TableOperations.create has a new signature
  - Operation TableOperations.delete has a new signature
  - Operation TableOperations.get has a new signature
  - Operation TableOperations.list has a new signature
  - Operation TableOperations.update has a new signature
  - Enum KnownDefaultSharePermission no longer has value StorageFileDataSmbShareOwner
    
# Release History

## 17.0.0-beta.1 (2021-10-09)

This is the first preview for the new version of the `@azure/arm-storage` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
