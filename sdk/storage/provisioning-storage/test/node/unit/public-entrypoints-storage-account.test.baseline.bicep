targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' = {
  name: 'sttest01'
  kind: 'StorageV2'
  location: 'eastus'
  sku: {
    name: 'Standard_LRS'
  }
}

resource accountMigration 'Microsoft.Storage/storageAccounts/accountMigrations@2026-04-01' existing = {
  name: 'default'
  parent: storageAccount
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2026-04-01' = {
  name: 'default'
  parent: storageAccount
}

resource container 'Microsoft.Storage/storageAccounts/blobServices/containers@2026-04-01' = {
  name: 'container1'
  parent: blobService
}

resource immutabilityPolicy 'Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies@2026-04-01' = {
  name: 'default'
  parent: container
  properties: {
    allowProtectedAppendWrites: false
    immutabilityPeriodSinceCreationInDays: 4
  }
}

resource connector 'Microsoft.Storage/storageAccounts/connectors@2026-04-01' = {
  name: 'connector1'
  parent: storageAccount
  location: 'eastus'
  properties: {
    description: 'Example connector'
    dataSourceType: 'Azure_DataShare'
    source: {
      authProperties: {
        type: 'ManagedIdentity'
      }
      connection: {
        dataShareUri: 'azds://eastus:demo-share:demo-source'
        type: 'DataShare'
      }
      type: 'DataShare'
    }
  }
}

resource dataShare 'Microsoft.Storage/storageAccounts/dataShares@2026-04-01' = {
  name: 'datashare1'
  parent: storageAccount
  location: 'eastus'
  properties: {
    description: 'Dummy data share'
    accessPolicies: [
      {
        principalId: '00000000-0000-0000-0000-000000000000'
        tenantId: '00000000-0000-0000-0000-000000000000'
        permission: 'Read'
      }
    ]
    assets: [
      {
        assetPath: '/container/folder/foo'
        displayName: 'virtualFoo'
      }
    ]
  }
}

resource encryptionScope 'Microsoft.Storage/storageAccounts/encryptionScopes@2026-04-01' = {
  name: 'encryptionscope1'
  parent: storageAccount
}

resource fileService 'Microsoft.Storage/storageAccounts/fileServices@2026-04-01' = {
  name: 'default'
  parent: storageAccount
}

resource share 'Microsoft.Storage/storageAccounts/fileServices/shares@2026-04-01' = {
  name: 'share1'
  parent: fileService
}

resource usage 'Microsoft.Storage/storageAccounts/fileServices/usages@2026-04-01' existing = {
  name: 'default'
  parent: fileService
}

resource inventoryPolicy 'Microsoft.Storage/storageAccounts/inventoryPolicies@2026-04-01' = {
  name: 'default'
  parent: storageAccount
  properties: {
    policy: {
      type: 'Inventory'
      enabled: true
      rules: [
        {
          name: 'inventoryPolicyRule1'
          definition: {
            format: 'Csv'
            objectType: 'Blob'
            schedule: 'Daily'
            schemaFields: [
              'Name'
              'Creation-Time'
            ]
            filters: {
              blobTypes: [
                'blockBlob'
              ]
            }
          }
          destination: 'container1'
          enabled: true
        }
      ]
    }
  }
}

resource localUser 'Microsoft.Storage/storageAccounts/localUsers@2026-04-01' = {
  name: 'localuser1'
  parent: storageAccount
}

resource managementPolicy 'Microsoft.Storage/storageAccounts/managementPolicies@2026-04-01' = {
  name: 'default'
  parent: storageAccount
}

resource networkSecurityPerimeterConfiguration 'Microsoft.Storage/storageAccounts/networkSecurityPerimeterConfigurations@2026-04-01' existing = {
  name: 'nspconfig1'
  parent: storageAccount
}

resource objectReplicationPolicy 'Microsoft.Storage/storageAccounts/objectReplicationPolicies@2026-04-01' = {
  name: 'objectreplicationpolicy1'
  parent: storageAccount
}

resource privateEndpointConnection 'Microsoft.Storage/storageAccounts/privateEndpointConnections@2026-04-01' = {
  name: 'privateendpointconnection1'
  parent: storageAccount
}

resource queueService 'Microsoft.Storage/storageAccounts/queueServices@2026-04-01' = {
  name: 'default'
  parent: storageAccount
}

resource queue 'Microsoft.Storage/storageAccounts/queueServices/queues@2026-04-01' = {
  name: 'queue1'
  parent: queueService
}

resource storageTaskAssignment 'Microsoft.Storage/storageAccounts/storageTaskAssignments@2026-04-01' = {
  name: 'taskassignment1'
  parent: storageAccount
}

resource tableService 'Microsoft.Storage/storageAccounts/tableServices@2026-04-01' = {
  name: 'default'
  parent: storageAccount
}

resource table 'Microsoft.Storage/storageAccounts/tableServices/tables@2026-04-01' = {
  name: 'table1'
  parent: tableService
}
