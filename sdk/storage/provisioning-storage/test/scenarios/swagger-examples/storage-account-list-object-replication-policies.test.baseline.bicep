targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
}

resource objectReplicationPolicy 'Microsoft.Storage/storageAccounts/objectReplicationPolicies@2026-04-01' = {
  name: 'objectreplicationpolicy1'
  parent: storageAccount
}
