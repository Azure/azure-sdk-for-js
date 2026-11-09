targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesdata'
  location: 'eastus'
}

resource database 'Microsoft.Sql/managedInstances/databases@2025-01-01' = {
  name: 'managedinstancesdata'
  parent: managedInstance
  location: 'eastus'
}

resource transparentDataEncryption 'Microsoft.Sql/managedInstances/databases/transparentDataEncryption@2025-01-01' = {
  name: 'current'
  parent: database
}
