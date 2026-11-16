targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
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
