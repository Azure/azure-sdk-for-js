targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource project 'Microsoft.CognitiveServices/accounts/projects@2026-07-01' existing = {
  name: 'cognitive-project'
  parent: account
}

resource application 'Microsoft.CognitiveServices/accounts/projects/applications@2026-07-01' = {
  name: 'accounts-projects-applications'
  parent: project
  properties: {
    displayName: 'sample application'
    description: 'Cognitive Services application'
  }
}
