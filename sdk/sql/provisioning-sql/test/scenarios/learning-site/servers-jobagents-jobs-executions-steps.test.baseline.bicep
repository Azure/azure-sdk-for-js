targetScope = 'resourceGroup'

resource server 'Microsoft.Sql/servers@2025-01-01' = {
  name: 'serversjobagentsjobs'
  location: 'eastus'
}

resource jobAgent 'Microsoft.Sql/servers/jobAgents@2025-01-01' = {
  name: 'serversjobagentsjobs'
  parent: server
  location: 'eastus'
}

resource job 'Microsoft.Sql/servers/jobAgents/jobs@2025-01-01' = {
  name: 'serversjobagentsjobs'
  parent: jobAgent
}

resource execution 'Microsoft.Sql/servers/jobAgents/jobs/executions@2025-01-01' = {
  name: 'serversjobagentsjobs'
  parent: job
}

resource step 'Microsoft.Sql/servers/jobAgents/jobs/executions/steps@2025-01-01' existing = {
  name: 'serversjobagentsjobs'
  parent: execution
}
