targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'encryptionprotectorc'
  location: 'eastus'
}

resource encryptionProtector 'Microsoft.Sql/managedInstances/encryptionProtector@2025-01-01' = {
  name: 'current'
  parent: managedInstance
  properties: {
    autoRotationEnabled: false
    serverKeyName: 'someVault_someKey_01234567890123456789012345678901'
    serverKeyType: 'AzureKeyVault'
  }
}
