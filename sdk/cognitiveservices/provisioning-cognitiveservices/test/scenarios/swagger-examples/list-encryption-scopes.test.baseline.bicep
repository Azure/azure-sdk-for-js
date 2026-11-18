targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource encryptionScope 'Microsoft.CognitiveServices/accounts/encryptionScopes@2026-07-01' existing = {
  name: 'encryptionScope'
  parent: account
}
