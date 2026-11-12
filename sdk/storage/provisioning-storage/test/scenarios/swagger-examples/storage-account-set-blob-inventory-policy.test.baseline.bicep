targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' = {
  name: 'sttest01'
  kind: 'StorageV2'
  location: 'eastus'
  sku: {
    name: 'Standard_LRS'
  }
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
