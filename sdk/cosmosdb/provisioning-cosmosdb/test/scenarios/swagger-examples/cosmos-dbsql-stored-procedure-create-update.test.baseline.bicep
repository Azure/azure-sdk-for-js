targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource sqlDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2026-03-15' existing = {
  name: 'sqldatabase-test'
  parent: databaseAccount
}

resource container 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2026-03-15' existing = {
  name: 'container-test'
  parent: sqlDatabase
}

resource storedProcedure 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/storedProcedures@2026-03-15' = {
  name: 'storedprocedure-test'
  parent: container
  properties: {
    resource: {
      id: 'storedProcedureName'
      body: 'body'
    }
    options: {}
  }
}

output resource3Id string = storedProcedure.id
