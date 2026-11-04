targetScope = 'resourceGroup'

resource raiPolicy 'Microsoft.CognitiveServices/raiPolicy@2026-07-01' = {
  name: 'raipolicy'
  properties: {
    basePolicyName: 'Microsoft.Default'
    mode: 'Blocking'
  }
}
