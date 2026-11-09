targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource encryptionScope 'Microsoft.CognitiveServices/accounts/encryptionScopes@2026-07-01' = {
  name: 'accounts-encryptionscopes'
  parent: account
  properties: {
    state: 'Enabled'
    keySource: 'Microsoft.CognitiveServices'
  }
}
