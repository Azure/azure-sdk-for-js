targetScope = 'resourceGroup'

resource account 'Microsoft.CognitiveServices/accounts@2026-07-01' existing = {
  name: 'cognitive-account'
}

resource testRaiExternalSafetyProvider 'Microsoft.CognitiveServices/accounts/testRaiExternalSafetyProvider@2026-07-01' = {
  name: 'accounts-testraiexternalsafetyprovider'
  parent: account
  properties: {
    keyVaultUri: 'https://contoso-vault.vault.azure.net/'
    managedIdentity: 'f3b9c2e7-4aad-4b1f-9d9c-9e9b1e9b1f9b'
    mode: 'sync'
    providerId: '00000000-0000-0000-0000-000000000000'
    providerName: 'safetyProviderName'
    secretName: 'safety-provider-secret'
    url: 'https://example-safety-provider.contoso.com/webhook'
  }
}
