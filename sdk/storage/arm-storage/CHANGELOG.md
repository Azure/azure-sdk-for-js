# Release History

## 17.2.1 (2022-06-15)

**Features**

- Bug fix

## 17.2.0 (2022-03-30)

**Features**

- Added Interface StorageAccountSkuConversionStatus
- Added Interface TableAccessPolicy
- Added Interface TableSignedIdentifier
- Added Type Alias DnsEndpointType
- Added Type Alias SkuConversionStatus
- Interface BlobInventoryPolicyFilter has a new optional parameter excludePrefix
- Interface BlobInventoryPolicyFilter has a new optional parameter includeDeleted
- Interface BlobInventoryPolicySchema has a new optional parameter destination
- Interface DateAfterCreation has a new optional parameter daysAfterLastTierChangeGreaterThan
- Interface DateAfterModification has a new optional parameter daysAfterCreationGreaterThan
- Interface DateAfterModification has a new optional parameter daysAfterLastTierChangeGreaterThan
- Interface DeleteRetentionPolicy has a new optional parameter allowPermanentDelete
- Interface KeyVaultProperties has a new optional parameter currentVersionedKeyExpirationTimestamp
- Interface StorageAccountCreateParameters has a new optional parameter dnsEndpointType
- Interface StorageAccountUpdateParameters has a new optional parameter dnsEndpointType
- Interface TableCreateOptionalParams has a new optional parameter parameters
- Interface TableUpdateOptionalParams has a new optional parameter parameters
- Type Alias StorageAccount has a new parameter storageAccountSkuConversionStatus
- Type Alias StorageAccount has a new parameter dnsEndpointType
- Type Alias Table has a new parameter signedIdentifiers
- Added Enum KnownDnsEndpointType
- Added Enum KnownSkuConversionStatus
- Enum KnownCorsRuleAllowedMethodsItem has a new value Patch

## 17.1.0 (2022-02-14)

**Features**

- Added operation group LocalUsersOperations
- Added Interface LocalUserKeys
- Added Interface LocalUserRegeneratePasswordResult
- Added Interface LocalUsers
- Added Interface LocalUsersCreateOrUpdateOptionalParams
- Added Interface LocalUsersDeleteOptionalParams
- Added Interface LocalUsersGetOptionalParams
- Added Interface LocalUsersListKeysOptionalParams
- Added Interface LocalUsersListOptionalParams
- Added Interface LocalUsersRegeneratePasswordOptionalParams
- Added Interface PermissionScope
- Added Interface SshPublicKey
- Added Type Alias ActiveDirectoryPropertiesAccountType
- Added Type Alias AllowedCopyScope
- Added Type Alias LocalUser
- Added Type Alias LocalUsersCreateOrUpdateResponse
- Added Type Alias LocalUsersGetResponse
- Added Type Alias LocalUsersListKeysResponse
- Added Type Alias LocalUsersListResponse
- Added Type Alias LocalUsersRegeneratePasswordResponse
- Interface ActiveDirectoryProperties has a new optional parameter accountType
- Interface ActiveDirectoryProperties has a new optional parameter samAccountName
- Interface EncryptionIdentity has a new optional parameter encryptionFederatedIdentityClientId
- Interface StorageAccountCreateParameters has a new optional parameter allowedCopyScope
- Interface StorageAccountCreateParameters has a new optional parameter isLocalUserEnabled
- Interface StorageAccountCreateParameters has a new optional parameter isSftpEnabled
- Interface StorageAccountUpdateParameters has a new optional parameter allowedCopyScope
- Interface StorageAccountUpdateParameters has a new optional parameter isLocalUserEnabled
- Interface StorageAccountUpdateParameters has a new optional parameter isSftpEnabled
- Class StorageManagementClient has a new parameter localUsersOperations
- Type Alias StorageAccount has a new parameter isSftpEnabled
- Type Alias StorageAccount has a new parameter isLocalUserEnabled
- Type Alias StorageAccount has a new parameter allowedCopyScope
- Added Enum KnownActiveDirectoryPropertiesAccountType
- Added Enum KnownAllowedCopyScope

## 17.0.0 (2021-12-06)

The package of @azure/arm-storage is using our next generation design principles since version 17.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
