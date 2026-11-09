targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'listrestorabledroppe'
  location: 'eastus'
}

resource restorableDroppedDatabase 'Microsoft.Sql/managedInstances/restorableDroppedDatabases@2025-01-01' existing = {
  name: 'listrestorabledroppe'
  parent: managedInstance
}
