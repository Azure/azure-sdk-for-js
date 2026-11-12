targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource raiToolLabel 'Microsoft.CognitiveServices/accounts/raiToolLabels@2026-07-01' = {
  name: 'accounts-raitoollabels'
  parent: account
  properties: {
    toolConnectionName: 'Web_Search'
  }
}
