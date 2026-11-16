targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource project 'Microsoft.CognitiveServices/accounts/projects@2026-07-01' existing = {
  name: 'cognitive-project'
  parent: account
}

resource application 'Microsoft.CognitiveServices/accounts/projects/applications@2026-07-01' existing = {
  name: 'agent-application'
  parent: project
}

resource agentDeployment 'Microsoft.CognitiveServices/accounts/projects/applications/agentDeployments@2026-07-01' = {
  name: 'accounts-projects-applications-agentdeployments'
  parent: application
  properties: {
    deploymentType: 'Hosted'
    displayName: 'sample deployment'
    maxReplicas: 1
    minReplicas: 1
  }
}
