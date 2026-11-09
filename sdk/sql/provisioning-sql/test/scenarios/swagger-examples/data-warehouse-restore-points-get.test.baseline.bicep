targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'testserver'
  location: 'eastus'
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'testDatabase'
  parent: server
  location: 'eastus'
}

resource restorePoint 'Microsoft.Sql/servers/databases/restorePoints@2025-01-01' existing = {
  name: '131546477590000000'
  parent: database
}
