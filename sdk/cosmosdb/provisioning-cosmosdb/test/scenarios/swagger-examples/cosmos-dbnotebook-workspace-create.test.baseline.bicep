targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource notebookWorkspace 'Microsoft.DocumentDB/databaseAccounts/notebookWorkspaces@2026-03-15' = {
  name: 'default'
  parent: databaseAccount
}

output resource1Id string = notebookWorkspace.id
