targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serverskeysserver1'
  location: 'eastus'
}

resource key 'Microsoft.Sql/servers/keys@2025-01-01' = {
  name: 'serverskeysserverkey'
  parent: server
}
