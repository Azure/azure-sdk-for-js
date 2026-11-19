targetScope = 'subscription'

resource raiExternalSafetyProvider 'Microsoft.CognitiveServices/raiExternalSafetyProviders@2026-07-01' = {
  name: 'rai-external-safety-provider'
  properties: {
    providerName: 'safetyProviderName'
    mode: 'sync'
    url: 'https://example-safety-provider.contoso.com/webhook'
  }
}
