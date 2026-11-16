targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancessqla'
  location: 'eastus'
}

resource sqlAgent 'Microsoft.Sql/managedInstances/sqlAgent@2025-01-01' = {
  name: 'current'
  parent: managedInstance
}
