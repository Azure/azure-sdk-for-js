targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversconnectionpol'
  location: 'eastus'
}

resource connectionPolicy 'Microsoft.Sql/servers/connectionPolicies@2025-01-01' = {
  name: 'default'
  parent: server
}
