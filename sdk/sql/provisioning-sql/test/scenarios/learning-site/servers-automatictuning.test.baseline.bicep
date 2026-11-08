targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversautomatictuni'
  location: 'eastus'
}

resource automaticTuning 'Microsoft.Sql/servers/automaticTuning@2025-01-01' existing = {
  name: 'current'
  parent: server
}
