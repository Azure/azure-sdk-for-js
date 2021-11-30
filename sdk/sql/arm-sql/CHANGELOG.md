## 9.0.0-beta.2 (2021-11-30)
    
**Features**

  - Added operation ServerConnectionPolicies.beginCreateOrUpdate
  - Added operation ServerConnectionPolicies.beginCreateOrUpdateAndWait
  - Added operation ServerConnectionPolicies.listByServer
  - Added operation TransparentDataEncryptions.listByDatabase
  - Added Interface DatabaseAutomaticTuningGetOptionalParams
  - Added Interface DatabaseAutomaticTuningUpdateOptionalParams
  - Added Interface DatabaseExtensionsCreateOrUpdateOptionalParams
  - Added Interface DatabaseExtensionsGetOptionalParams
  - Added Interface DatabaseExtensionsListByDatabaseNextOptionalParams
  - Added Interface DatabaseExtensionsListByDatabaseOptionalParams
  - Added Interface DatabaseIdentity
  - Added Interface DatabaseUserIdentity
  - Added Interface DataWarehouseUserActivitiesGetOptionalParams
  - Added Interface DataWarehouseUserActivitiesListByDatabaseNextOptionalParams
  - Added Interface DataWarehouseUserActivitiesListByDatabaseOptionalParams
  - Added Interface Delegation
  - Added Interface LedgerDigestUploadsCreateOrUpdateOptionalParams
  - Added Interface LedgerDigestUploadsDisableOptionalParams
  - Added Interface LedgerDigestUploadsGetOptionalParams
  - Added Interface LedgerDigestUploadsListByDatabaseNextOptionalParams
  - Added Interface LedgerDigestUploadsListByDatabaseOptionalParams
  - Added Interface LogicalDatabaseTransparentDataEncryptionListResult
  - Added Interface MaintenanceWindowOptionsGetOptionalParams
  - Added Interface MaintenanceWindowsCreateOrUpdateOptionalParams
  - Added Interface MaintenanceWindowsGetOptionalParams
  - Added Interface OperationsHealthListByLocationNextOptionalParams
  - Added Interface OperationsHealthListByLocationOptionalParams
  - Added Interface ServerAutomaticTuningGetOptionalParams
  - Added Interface ServerAutomaticTuningUpdateOptionalParams
  - Added Interface ServerConnectionPoliciesListByServerNextOptionalParams
  - Added Interface ServerConnectionPoliciesListByServerOptionalParams
  - Added Interface ServerConnectionPolicyListResult
  - Added Interface ServicePrincipal
  - Added Interface TransparentDataEncryptionsListByDatabaseNextOptionalParams
  - Added Interface TransparentDataEncryptionsListByDatabaseOptionalParams
  - Added Type Alias DatabaseAutomaticTuningGetResponse
  - Added Type Alias DatabaseAutomaticTuningUpdateResponse
  - Added Type Alias DatabaseExtensionsCreateOrUpdateResponse
  - Added Type Alias DatabaseExtensionsListByDatabaseNextResponse
  - Added Type Alias DatabaseExtensionsListByDatabaseResponse
  - Added Type Alias DatabaseIdentityType
  - Added Type Alias DataWarehouseUserActivitiesGetResponse
  - Added Type Alias DataWarehouseUserActivitiesListByDatabaseNextResponse
  - Added Type Alias DataWarehouseUserActivitiesListByDatabaseResponse
  - Added Type Alias Enum60
  - Added Type Alias LedgerDigestUploadsCreateOrUpdateResponse
  - Added Type Alias LedgerDigestUploadsDisableResponse
  - Added Type Alias LedgerDigestUploadsGetResponse
  - Added Type Alias LedgerDigestUploadsListByDatabaseNextResponse
  - Added Type Alias LedgerDigestUploadsListByDatabaseResponse
  - Added Type Alias LogicalDatabaseTransparentDataEncryption
  - Added Type Alias MaintenanceWindowOptionsGetResponse
  - Added Type Alias MaintenanceWindowsGetResponse
  - Added Type Alias OperationsHealthListByLocationNextResponse
  - Added Type Alias OperationsHealthListByLocationResponse
  - Added Type Alias ServerAutomaticTuningGetResponse
  - Added Type Alias ServerAutomaticTuningUpdateResponse
  - Added Type Alias ServerConnectionPoliciesListByServerNextResponse
  - Added Type Alias ServerConnectionPoliciesListByServerResponse
  - Added Type Alias ServicePrincipalType
  - Added Type Alias TransparentDataEncryptionsListByDatabaseNextResponse
  - Added Type Alias TransparentDataEncryptionsListByDatabaseResponse
  - Interface DatabaseUpdate has a new optional parameter federatedClientId
  - Interface DatabaseUpdate has a new optional parameter identity
  - Interface DatabaseUpdate has a new optional parameter primaryDelegatedIdentityClientId
  - Interface ManagedInstanceUpdate has a new optional parameter currentBackupStorageRedundancy
  - Interface ManagedInstanceUpdate has a new optional parameter requestedBackupStorageRedundancy
  - Interface ManagedInstanceUpdate has a new optional parameter servicePrincipal
  - Interface ServerConnectionPoliciesCreateOrUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface ServerConnectionPoliciesCreateOrUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Class SqlManagementClient has a new parameter $host
  - Class SqlManagementClient has a new parameter subscriptionId
  - Type Alias Database has a new parameter identity
  - Type Alias Database has a new parameter federatedClientId
  - Type Alias Database has a new parameter primaryDelegatedIdentityClientId
  - Type Alias ManagedInstance has a new parameter currentBackupStorageRedundancy
  - Type Alias ManagedInstance has a new parameter requestedBackupStorageRedundancy
  - Type Alias ManagedInstance has a new parameter servicePrincipal
  - Added Enum KnownDatabaseIdentityType
  - Added Enum KnownEnum60
  - Added Enum KnownServerConnectionType
  - Added Enum KnownServicePrincipalType
  - Enum KnownBackupStorageRedundancy has a new value GeoZone
  - Enum KnownDatabaseStatus has a new value Starting
  - Enum KnownDatabaseStatus has a new value Stopped
  - Enum KnownDatabaseStatus has a new value Stopping
  - Enum KnownManagedInstancePropertiesProvisioningState has a new value Accepted
  - Enum KnownManagedInstancePropertiesProvisioningState has a new value Canceled
  - Enum KnownManagedInstancePropertiesProvisioningState has a new value Created
  - Enum KnownManagedInstancePropertiesProvisioningState has a new value Deleted
  - Enum KnownManagedInstancePropertiesProvisioningState has a new value NotSpecified
  - Enum KnownManagedInstancePropertiesProvisioningState has a new value Registering
  - Enum KnownManagedInstancePropertiesProvisioningState has a new value Running
  - Enum KnownManagedInstancePropertiesProvisioningState has a new value TimedOut
  - Enum KnownManagedInstancePropertiesProvisioningState has a new value Unrecognized

**Breaking Changes**

  - Removed operation group TransparentDataEncryptionActivities
  - Removed operation ServerConnectionPolicies.createOrUpdate
  - Operation DatabaseAutomaticTuningOperations.get has a new signature
  - Operation DatabaseAutomaticTuningOperations.update has a new signature
  - Operation DatabaseExtensionsOperations.beginCreateOrUpdate has a new signature
  - Operation DatabaseExtensionsOperations.beginCreateOrUpdateAndWait has a new signature
  - Operation DatabaseExtensionsOperations.get has a new signature
  - Operation DatabaseExtensionsOperations.listByDatabase has a new signature
  - Operation DataWarehouseUserActivitiesOperations.get has a new signature
  - Operation DataWarehouseUserActivitiesOperations.listByDatabase has a new signature
  - Operation LedgerDigestUploadsOperations.beginCreateOrUpdate has a new signature
  - Operation LedgerDigestUploadsOperations.beginCreateOrUpdateAndWait has a new signature
  - Operation LedgerDigestUploadsOperations.beginDisable has a new signature
  - Operation LedgerDigestUploadsOperations.beginDisableAndWait has a new signature
  - Operation LedgerDigestUploadsOperations.get has a new signature
  - Operation LedgerDigestUploadsOperations.listByDatabase has a new signature
  - Operation MaintenanceWindowOptionsOperations.get has a new signature
  - Operation MaintenanceWindowsOperations.createOrUpdate has a new signature
  - Operation MaintenanceWindowsOperations.get has a new signature
  - Operation OperationsHealthOperations.listByLocation has a new signature
  - Operation ServerAutomaticTuningOperations.get has a new signature
  - Operation ServerAutomaticTuningOperations.update has a new signature
  - Operation SyncGroups.listLogs has a new signature
  - Operation TransparentDataEncryptions.createOrUpdate has a new signature
  - Interface ManagedInstanceUpdate no longer has parameter storageAccountType
  - Class SqlManagementClient no longer has parameter transparentDataEncryptionActivities
  - Type Alias ManagedInstance no longer has parameter storageAccountType
  - Type Alias RestorableDroppedDatabase no longer has parameter elasticPoolId
  - Removed Enum KnownCurrentBackupStorageRedundancy
  - Removed Enum KnownEnum76
  - Removed Enum KnownRequestedBackupStorageRedundancy
  - Removed Enum KnownRestorableDroppedDatabasePropertiesBackupStorageRedundancy
  - Removed Enum KnownStorageAccountType
  - Removed Enum KnownTargetBackupStorageRedundancy
  - Removed Enum KnownTransparentDataEncryptionActivityStatus
    
# Release History

## 9.0.0-beta.1 (2021-10-09)

This is the first preview for the new version of the `@azure/arm-sql` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
