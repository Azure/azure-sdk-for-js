targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'sqlcrudtest-7398'
  location: 'eastus'
}

resource networkSecurityPerimeterConfiguration 'Microsoft.Sql/servers/networkSecurityPerimeterConfigurations@2025-01-01' existing = {
  name: 'networksecurityperim'
  parent: server
}
