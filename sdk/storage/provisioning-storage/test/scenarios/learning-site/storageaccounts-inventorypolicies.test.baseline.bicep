targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
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
