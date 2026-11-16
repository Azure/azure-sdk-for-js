targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource raiPolicy 'Microsoft.CognitiveServices/accounts/raiPolicies@2026-07-01' existing = {
  name: 'raiPolicy'
  parent: account
}
