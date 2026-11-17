targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'server1'
  location: 'eastus'
}

resource jobAgent 'Microsoft.Sql/servers/jobAgents@2025-01-01' = {
  name: 'agent1'
  parent: server
  location: 'eastus'
}

resource credential 'Microsoft.Sql/servers/jobAgents/credentials@2025-01-01' = {
  name: 'listjobcredentialsby'
  parent: jobAgent
}
