targetScope = 'resourceGroup'

resource storageAccount 'Microsoft.Storage/storageAccounts@2026-04-01' existing = {
  name: 'sttest01'
}

resource storageTaskAssignment 'Microsoft.Storage/storageAccounts/storageTaskAssignments@2026-04-01' = {
  name: 'taskassignment1'
  parent: storageAccount
}
