targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversdatabasesauto'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversdatabasesauto'
  parent: server
  location: 'eastus'
}

resource automaticTuning 'Microsoft.Sql/servers/databases/automaticTuning@2025-01-01' existing = {
  name: 'current'
  parent: database
}
