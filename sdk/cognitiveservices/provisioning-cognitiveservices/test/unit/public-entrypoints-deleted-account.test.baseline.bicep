targetScope = 'subscription'

resource deletedAccount 'Microsoft.CognitiveServices/locations/resourceGroups/deletedAccounts@2026-07-01' existing = {
  name: 'eastus/rg-cdk-package-test/deleted-account'
}
