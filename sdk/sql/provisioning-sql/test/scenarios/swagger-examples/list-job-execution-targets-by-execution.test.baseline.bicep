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
  name: 'listjobexecutiontarg'
  parent: job
}

resource step 'Microsoft.Sql/servers/jobAgents/jobs/executions/steps@2025-01-01' existing = {
  name: 'listjobexecutiontarg'
  parent: execution
}

resource target 'Microsoft.Sql/servers/jobAgents/jobs/executions/steps/targets@2025-01-01' existing = {
  name: 'listjobexecutiontarg'
  parent: step
}
