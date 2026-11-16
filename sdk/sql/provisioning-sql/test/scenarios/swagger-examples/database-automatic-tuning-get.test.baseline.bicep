targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'testsvr11'
  location: 'eastus'
}

resource automaticTuning 'Microsoft.Sql/servers/automaticTuning@2025-01-01' existing = {
  name: 'current'
  parent: server
}
