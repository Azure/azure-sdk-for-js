targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversjobagentspriv'
  location: 'eastus'
}

resource jobAgent 'Microsoft.Sql/servers/jobAgents@2025-01-01' = {
  name: 'serversjobagentspriv'
  parent: server
  location: 'eastus'
}

resource privateEndpoint 'Microsoft.Sql/servers/jobAgents/privateEndpoints@2025-01-01' = {
  name: 'serversjobagentspriv'
  parent: jobAgent
}
