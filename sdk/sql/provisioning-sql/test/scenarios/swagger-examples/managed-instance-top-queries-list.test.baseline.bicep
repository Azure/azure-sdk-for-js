targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'sqlcrudtest-4645'
  location: 'eastus'
}

resource database 'Microsoft.Sql/managedInstances/databases@2025-01-01' = {
  name: 'managedinstancetopqu'
  parent: managedInstance
  location: 'eastus'
}

resource query 'Microsoft.Sql/managedInstances/databases/queries@2025-01-01' existing = {
  name: 'managedinstancetopqu'
  parent: database
}
