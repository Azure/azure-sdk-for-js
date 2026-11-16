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

resource execution 'Microsoft.Sql/servers/jobAgents/jobs/executions@2025-01-01' = {
  name: 'getjobexecutionstepe'
  parent: job
}
