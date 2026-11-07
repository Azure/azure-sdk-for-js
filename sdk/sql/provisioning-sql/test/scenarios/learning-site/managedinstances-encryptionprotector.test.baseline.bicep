targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesencr'
  location: 'eastus'
}

resource encryptionProtector 'Microsoft.Sql/managedInstances/encryptionProtector@2025-01-01' = {
  name: 'current'
  parent: managedInstance
}
