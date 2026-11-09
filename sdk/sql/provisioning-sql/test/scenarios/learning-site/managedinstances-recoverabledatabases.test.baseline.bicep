targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesreco'
  location: 'eastus'
}

resource recoverableDatabase 'Microsoft.Sql/managedInstances/recoverableDatabases@2025-01-01' existing = {
  name: 'managedinstancesreco'
  parent: managedInstance
}
