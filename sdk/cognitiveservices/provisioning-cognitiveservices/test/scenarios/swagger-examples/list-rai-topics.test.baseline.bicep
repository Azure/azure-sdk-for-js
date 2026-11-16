targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource raitopic 'Microsoft.CognitiveServices/accounts/raitopics@2026-07-01' existing = {
  name: 'topic'
  parent: account
}
