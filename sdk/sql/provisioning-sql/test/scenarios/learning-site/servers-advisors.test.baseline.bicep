targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversadvisorsserve'
  location: 'eastus'
}

resource advisor 'Microsoft.Sql/servers/advisors@2025-01-01' existing = {
  name: 'serversadvisorsserve'
  parent: server
}
