targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedInstance'
  location: 'eastus'
}

resource database 'Microsoft.Sql/managedInstances/databases@2025-01-01' = {
  name: 'testdb'
  parent: managedInstance
  location: 'eastus'
}

resource restoreDetail 'Microsoft.Sql/managedInstances/databases/restoreDetails@2025-01-01' existing = {
  name: 'Default'
  parent: database
}
