targetScope = 'subscription'

resource quotaTier 'Microsoft.CognitiveServices/quotaTiers@2026-07-01' = {
  name: 'default'
  properties: {
    tierUpgradePolicy: 'OnceUpgradeIsAvailable'
  }
}
