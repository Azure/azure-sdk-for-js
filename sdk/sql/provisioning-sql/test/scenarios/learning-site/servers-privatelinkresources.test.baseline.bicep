targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversprivatelinkre'
  location: 'eastus'
}

resource privateLinkResource 'Microsoft.Sql/servers/privateLinkResources@2025-01-01' existing = {
  name: 'serversprivatelinkre'
  parent: server
}
