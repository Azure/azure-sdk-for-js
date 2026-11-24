targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource project 'Microsoft.CognitiveServices/accounts/projects@2026-07-01' existing = {
  name: 'cognitive-project'
  parent: account
}

resource capabilityHost 'Microsoft.CognitiveServices/accounts/projects/capabilityHosts@2026-07-01' = {
  name: 'accounts-projects-capabilityhosts'
  parent: project
  properties: {
    aiServicesConnections: []
    storageConnections: []
  }
}
