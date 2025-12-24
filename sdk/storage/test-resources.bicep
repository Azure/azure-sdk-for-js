@minLength(4)
param baseName string
param testApplicationOid string
param supportsSafeSecretStandard bool = false
param enableVersioning bool = true
@description('Whether to create the Object Replication policy. Disable if your subscription enforces Network Security Perimeter/SecuredByPerimeter which blocks OR policies.')
param enableObjectReplicationPolicy bool = false

var location = resourceGroup().location
var accountName = baseName
var datalakeAccountName = 'dl${baseName}'
var datalakeSoftDeleteAccountName = 'dls${baseName}'
var fullAccountName = 'f${baseName}'
var premiumFileAccountName = 'pf${baseName}'
var replicationDestAccountName = 'or${baseName}'
var grsAccountName = 'grs${baseName}'
var blobDataContributorRoleId = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'
var fileDataContributorRoleId = '0c867c2a-1d8c-454a-a3db-ab2ea1bdc8bb'
var blobOwnerRoleId = 'b7e6dc6d-f1e8-4753-8033-0f276bb0955b'
var encryption = {
  services: {
    file: {
      enabled: true
    }
    blob: {
      enabled: true
    }
  }
  keySource: 'Microsoft.Storage'
}
var networkAcls = {
  bypass: 'AzureServices'
  virtualNetworkRules: []
  ipRules: []
  defaultAction: 'Allow'
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: accountName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    publicNetworkAccess: 'Enabled'
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    allowSharedKeyAccess: !supportsSafeSecretStandard
  }
}

// Encryption scopes for test scenarios
// testscope1: Microsoft-managed key (default)
// testscope2: additional scope (also Microsoft-managed) to allow tests that switch scopes
resource encryptionScope1 'Microsoft.Storage/storageAccounts/encryptionScopes@2023-05-01' = {
  parent: storageAccount
  name: 'testscope1'
  properties: {
    source: 'Microsoft.Storage'
    state: 'Enabled'
  }
}

resource encryptionScope2 'Microsoft.Storage/storageAccounts/encryptionScopes@2023-05-01' = {
  parent: storageAccount
  name: 'testscope2'
  properties: {
    source: 'Microsoft.Storage'
    state: 'Enabled'
  }
}

resource storageAccountBlobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    isVersioningEnabled: enableVersioning
    changeFeed: {
      enabled: true
    }
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT', 'PATCH']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
    lastAccessTimeTrackingPolicy: {
      enable: true
      name: 'AccessTimeTracking'
      trackingGranularityInDays: 1
      blobType: ['blockBlob']
    }
  }
}

// Containers used for object replication (source side)
resource orSourceContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccountBlobService
  name: 'or-src'
  properties: {}
}

// Immutable container for immutability policy tests
resource immutableContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: storageAccountBlobService
  name: 'immutable'
  properties: {
    immutableStorageWithVersioning: {
      enabled: true
      // allowProtectedAppendWritesAll: true // enable if tests need write-once append semantics
    }
  }
}
resource storageAccountFileService 'Microsoft.Storage/storageAccounts/fileServices@2023-05-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}

resource storageAccountQueueService 'Microsoft.Storage/storageAccounts/queueServices@2023-05-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT', 'PATCH']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}

resource datalakeAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: datalakeAccountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    isHnsEnabled: true
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    allowSharedKeyAccess: !supportsSafeSecretStandard
  }
}

resource datalakeAccountBlobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: datalakeAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT', 'PATCH']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}

resource datalakeSoftDeleteAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: datalakeSoftDeleteAccountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    isHnsEnabled: true
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    allowSharedKeyAccess: !supportsSafeSecretStandard
  }
}

resource datalakeSoftDeleteAccountBlobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: datalakeSoftDeleteAccount
  name: 'default'
  properties: {
    containerDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT', 'PATCH']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}

resource fullStorageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: fullAccountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    allowSharedKeyAccess: !supportsSafeSecretStandard
  }
}

resource fullStorageAccountBlobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: fullStorageAccount
  name: 'default'
  properties: {
    restorePolicy: {
      enabled: true
      days: 6
    }
    deleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    containerDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    changeFeed: {
      enabled: true
    }
    isVersioningEnabled: true
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT', 'PATCH']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}
resource fullStorageAccountFileService 'Microsoft.Storage/storageAccounts/fileServices@2023-05-01' = {
  parent: fullStorageAccount
  name: 'default'
  properties: {
    shareDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}

resource premiumFileAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: premiumFileAccountName
  location: location
  sku: {
    name: 'Premium_LRS'
  }
  kind: 'FileStorage'
  properties: {
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    allowSharedKeyAccess: !supportsSafeSecretStandard
  }
}

resource premiumFileAccountFileService 'Microsoft.Storage/storageAccounts/fileServices@2023-05-01' = {
  parent: premiumFileAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}

// GRS (Geo-Redundant Storage) account
resource grsStorageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: grsAccountName
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    allowSharedKeyAccess: !supportsSafeSecretStandard
  }
}

resource grsStorageAccountBlobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: grsStorageAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT', 'PATCH']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}

// Destination storage account for object replication
resource replicationStorageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: replicationDestAccountName
  identity: {
    type: 'SystemAssigned'
  }
  location: location
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  properties: {
    publicNetworkAccess: 'Enabled'
    networkAcls: networkAcls
    supportsHttpsTrafficOnly: true
    encryption: encryption
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    allowSharedKeyAccess: !supportsSafeSecretStandard
  }
}

resource replicationStorageAccountBlobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: replicationStorageAccount
  name: 'default'
  properties: {
    isVersioningEnabled: true
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['DELETE', 'GET', 'HEAD', 'MERGE', 'POST', 'OPTIONS', 'PUT', 'PATCH']
          maxAgeInSeconds: 86400
          exposedHeaders: ['*']
          allowedHeaders: ['*']
        }
      ]
    }
  }
}

// Destination container for object replication
resource orDestContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: replicationStorageAccountBlobService
  name: 'or-dst'
  properties: {}
}

// Object Replication Policy on destination, using ACCOUNT_NAME as source
resource orPolicy 'Microsoft.Storage/storageAccounts/objectReplicationPolicies@2023-01-01' = if (enableObjectReplicationPolicy) {
  parent: replicationStorageAccount
  // Use the singleton policy name expected by the service
  name: 'default'
  properties: {
    // API requires full resource IDs for source and destination accounts
    sourceAccount: storageAccount.id
    destinationAccount: replicationStorageAccount.id
    rules: [
      {
        sourceContainer: 'or-src'
        destinationContainer: 'or-dst'
      }
    ]
  }
  // Ensure versioning + containers exist before applying OR policy
  dependsOn: [
    storageAccountBlobService
    replicationStorageAccountBlobService
    orSourceContainer
    orDestContainer
    replication_contributor
  ]
}

resource sa_blobContributor 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(storageAccount.id, blobDataContributorRoleId, testApplicationOid)
  scope: storageAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource replication_contributor 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(replicationStorageAccount.id, blobDataContributorRoleId)
  scope: storageAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobDataContributorRoleId)
    principalId: replicationStorageAccount.identity.principalId
  }
}

resource dl_blobContributor 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(datalakeAccount.id, blobDataContributorRoleId, testApplicationOid)
  scope: datalakeAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource dls_blobContributor 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(datalakeSoftDeleteAccount.id, blobDataContributorRoleId, testApplicationOid)
  scope: datalakeSoftDeleteAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource full_blobContributor 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(fullStorageAccount.id, blobDataContributorRoleId, testApplicationOid)
  scope: fullStorageAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource full_fileSmbContributor 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(fullStorageAccount.id, fileDataContributorRoleId, testApplicationOid)
  scope: fullStorageAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', fileDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource pf_fileSmbContributor 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(premiumFileAccount.id, fileDataContributorRoleId, testApplicationOid)
  scope: premiumFileAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', fileDataContributorRoleId)
    principalId: testApplicationOid
  }
}

// Role assignments for GRS storage account
resource grs_blobContributor 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(grsStorageAccount.id, blobDataContributorRoleId, testApplicationOid)
  scope: grsStorageAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource grs_owner 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(grsStorageAccount.id, blobOwnerRoleId, testApplicationOid)
  scope: grsStorageAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobOwnerRoleId)
    principalId: testApplicationOid
  }
}

// Role assignments for replication destination account
resource or_blobContributor 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(replicationStorageAccount.id, blobDataContributorRoleId, testApplicationOid)
  scope: replicationStorageAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobDataContributorRoleId)
    principalId: testApplicationOid
  }
}

resource or_owner 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(replicationStorageAccount.id, blobOwnerRoleId, testApplicationOid)
  scope: replicationStorageAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobOwnerRoleId)
    principalId: testApplicationOid
  }
}

// Grant Owner role to the test principal on all storage accounts
resource sa_owner 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(storageAccount.id, blobOwnerRoleId, testApplicationOid)
  scope: storageAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobOwnerRoleId)
    principalId: testApplicationOid
  }
}

resource dl_owner 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(datalakeAccount.id, blobOwnerRoleId, testApplicationOid)
  scope: datalakeAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobOwnerRoleId)
    principalId: testApplicationOid
  }
}

resource dls_owner 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(datalakeSoftDeleteAccount.id, blobOwnerRoleId, testApplicationOid)
  scope: datalakeSoftDeleteAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobOwnerRoleId)
    principalId: testApplicationOid
  }
}

resource full_owner 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(fullStorageAccount.id, blobOwnerRoleId, testApplicationOid)
  scope: fullStorageAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobOwnerRoleId)
    principalId: testApplicationOid
  }
}

resource pf_owner 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(premiumFileAccount.id, blobOwnerRoleId, testApplicationOid)
  scope: premiumFileAccount
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobOwnerRoleId)
    principalId: testApplicationOid
  }
}

output SUBSCRIPTION_ID string = subscription().subscriptionId
output RESOURCE_GROUP string = resourceGroup().name
output ACCOUNT_NAME string = accountName
output DFS_ACCOUNT_NAME string = datalakeAccount.name
output DFS_SOFT_DELETE_ACCOUNT_NAME string = datalakeSoftDeleteAccount.name
output FULL_ACCOUNT_NAME string = fullStorageAccount.name
output SOFT_DELETE_ACCOUNT_NAME string = fullStorageAccount.name
output PREMIUM_FILE_ACCOUNT_NAME string = premiumFileAccount.name
output GRS_ACCOUNT_NAME string = grsStorageAccount.name
output OR_DEST_ACCOUNT_NAME string = replicationStorageAccount.name
output OR_SOURCE_CONTAINER_NAME string = orSourceContainer.name
output OR_DEST_CONTAINER_NAME string = orDestContainer.name
output IMMUTABLE_CONTAINER_NAME string = immutableContainer.name
output ENCRYPTION_SCOPE_1 string = encryptionScope1.name
output ENCRYPTION_SCOPE_2 string = encryptionScope2.name
