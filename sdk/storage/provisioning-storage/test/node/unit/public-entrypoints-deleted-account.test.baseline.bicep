targetScope = 'resourceGroup'

resource deletedAccount 'Microsoft.Storage/locations/deletedAccounts@2026-04-01' existing = {
  name: 'eastus/sttest01'
  scope: subscription()
}
