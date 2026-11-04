targetScope = 'resourceGroup'

resource raiExternalSafetyProvider 'Microsoft.CognitiveServices/raiExternalSafetyProviders@2026-07-01' existing = {
  name: 'safetyProvider'
}
