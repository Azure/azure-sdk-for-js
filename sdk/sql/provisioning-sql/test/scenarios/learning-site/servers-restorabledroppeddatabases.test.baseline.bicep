targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversrestorabledro'
  location: 'eastus'
}

resource restorableDroppedDatabase 'Microsoft.Sql/servers/restorableDroppedDatabases@2025-01-01' existing = {
  name: 'serversrestorabledro'
  parent: server
}
