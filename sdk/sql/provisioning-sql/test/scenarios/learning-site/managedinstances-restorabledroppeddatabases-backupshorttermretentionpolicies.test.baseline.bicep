targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesrest'
  location: 'eastus'
}

resource restorableDroppedDatabase 'Microsoft.Sql/managedInstances/restorableDroppedDatabases@2025-01-01' existing = {
  name: 'managedinstancesrest'
  parent: managedInstance
}

resource backupShortTermRetentionPolicy 'Microsoft.Sql/managedInstances/restorableDroppedDatabases/backupShortTermRetentionPolicies@2025-01-01' = {
  name: 'default'
  parent: restorableDroppedDatabase
}
