targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversadministrator'
  location: 'eastus'
}

resource administrator 'Microsoft.Sql/servers/administrators@2025-01-01' = {
  name: 'ActiveDirectory'
  parent: server
}
