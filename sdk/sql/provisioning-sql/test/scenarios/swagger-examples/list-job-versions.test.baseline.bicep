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

resource job 'Microsoft.Sql/servers/jobAgents/jobs@2025-01-01' = {
  name: 'agent1'
  parent: jobAgent
}

resource version 'Microsoft.Sql/servers/jobAgents/jobs/versions@2025-01-01' existing = {
  name: 1
  parent: job
}
