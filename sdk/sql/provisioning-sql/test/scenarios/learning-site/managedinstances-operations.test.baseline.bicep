targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesoper'
  location: 'eastus'
}

resource operation 'Microsoft.Sql/managedInstances/operations@2025-01-01' existing = {
  name: 'managedinstancesoper'
  parent: managedInstance
}
