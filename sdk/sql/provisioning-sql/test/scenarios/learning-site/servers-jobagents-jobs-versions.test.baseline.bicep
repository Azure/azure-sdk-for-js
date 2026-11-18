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

resource version 'Microsoft.Sql/servers/jobAgents/jobs/versions@2025-01-01' existing = {
  name: 1
  parent: job
}
