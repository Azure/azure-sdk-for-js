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

resource userDefinedFunction 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions@2026-03-15' = {
  name: 'userdefinedfunction-test'
  parent: container
  properties: {
    resource: {
      id: 'userDefinedFunctionName'
      body: 'body'
    }
    options: {}
  }
}

output resource3Id string = userDefinedFunction.id
