targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversprivateendpoi'
  location: 'eastus'
}

resource privateEndpointConnection 'Microsoft.Sql/servers/privateEndpointConnections@2025-01-01' = {
  name: 'serversprivateendpoi'
  parent: server
}
