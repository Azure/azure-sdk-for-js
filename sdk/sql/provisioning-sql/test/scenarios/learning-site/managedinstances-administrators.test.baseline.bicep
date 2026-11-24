targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancesadmi'
  location: 'eastus'
}

resource administrator 'Microsoft.Sql/managedInstances/administrators@2025-01-01' = {
  name: 'ActiveDirectory'
  parent: managedInstance
}
