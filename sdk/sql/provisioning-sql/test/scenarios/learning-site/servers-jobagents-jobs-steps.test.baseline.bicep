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

resource credential 'Microsoft.Sql/servers/jobAgents/credentials@2025-01-01' = {
  name: 'serversjobagentsjobs'
  parent: jobAgent
}

resource job 'Microsoft.Sql/servers/jobAgents/jobs@2025-01-01' = {
  name: 'serversjobagentsjobs'
  parent: jobAgent
}

resource step 'Microsoft.Sql/servers/jobAgents/jobs/steps@2025-01-01' = {
  name: 'serversjobagentsjobs'
  parent: job
}

resource targetGroup 'Microsoft.Sql/servers/jobAgents/targetGroups@2025-01-01' = {
  name: 'serversjobagentsjobs'
  parent: jobAgent
}

resource database 'Microsoft.Sql/servers/databases@2025-01-01' = {
  name: 'serversjobagentsjobs'
  parent: server
  location: 'eastus'
}
