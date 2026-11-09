targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'testinstance'
  location: 'eastus'
}

resource dtc 'Microsoft.Sql/managedInstances/dtc@2025-01-01' = {
  name: 'current'
  parent: managedInstance
}
