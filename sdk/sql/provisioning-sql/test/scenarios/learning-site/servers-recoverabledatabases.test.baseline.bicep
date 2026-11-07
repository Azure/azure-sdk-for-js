targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversrecoverableda'
  location: 'eastus'
}

resource recoverableDatabase 'Microsoft.Sql/servers/recoverableDatabases@2025-01-01' existing = {
  name: 'serversrecoverableda'
  parent: server
}
