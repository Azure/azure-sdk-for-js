targetScope = 'subscription'

resource raiPolicy 'Microsoft.CognitiveServices/raiPolicy@2026-07-01' = {
  name: 'rai-policy'
  properties: {
    basePolicyName: 'Microsoft.Default'
    mode: 'Blocking'
  }
}
