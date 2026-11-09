targetScope = 'resourceGroup'

resource managedInstance 'Microsoft.Sql/managedInstances@2025-01-01' = {
  name: 'managedinstancespriv'
  location: 'eastus'
}

resource privateEndpointConnection 'Microsoft.Sql/managedInstances/privateEndpointConnections@2025-01-01' = {
  name: 'managedinstancespriv'
  parent: managedInstance
}
