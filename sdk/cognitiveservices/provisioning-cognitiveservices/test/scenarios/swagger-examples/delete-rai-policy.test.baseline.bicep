targetScope = 'resourceGroup'

resource raiPolicy 'Microsoft.CognitiveServices/raiPolicy@2026-07-01' existing = {
  name: 'raiPolicyName'
}
