targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource raiBlocklist 'Microsoft.CognitiveServices/accounts/raiBlocklists@2026-07-01' = {
  name: 'accounts-raiblocklists'
  parent: account
  properties: {
    description: 'Source-backed blocklist coverage'
  }
}
