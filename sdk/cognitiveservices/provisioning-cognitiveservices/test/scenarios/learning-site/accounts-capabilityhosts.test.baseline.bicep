targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource capabilityHost 'Microsoft.CognitiveServices/accounts/capabilityHosts@2026-07-01' = {
  name: 'accounts-capabilityhosts'
  parent: account
  properties: {
    capabilityHostKind: 'Agents'
    enablePublicHostingEnvironment: true
  }
}
