targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversnetworksecuri'
  location: 'eastus'
}

resource networkSecurityPerimeterConfiguration 'Microsoft.Sql/servers/networkSecurityPerimeterConfigurations@2025-01-01' existing = {
  name: 'serversnetworksecuri'
  parent: server
}
