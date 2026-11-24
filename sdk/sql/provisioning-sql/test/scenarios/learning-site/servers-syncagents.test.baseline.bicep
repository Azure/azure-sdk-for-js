targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serverssyncagentsser'
  location: 'eastus'
}

resource syncAgent 'Microsoft.Sql/servers/syncAgents@2025-01-01' = {
  name: 'serverssyncagentssyn'
  parent: server
}
