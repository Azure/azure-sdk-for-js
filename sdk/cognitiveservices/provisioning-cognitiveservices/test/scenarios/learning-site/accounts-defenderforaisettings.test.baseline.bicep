targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource defenderForAISetting 'Microsoft.CognitiveServices/accounts/defenderForAISettings@2026-07-01' = {
  name: 'Default'
  parent: account
  properties: {
    state: 'Enabled'
  }
}
