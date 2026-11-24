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

resource trigger 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/triggers@2026-03-15' = {
  name: 'triggerName'
  parent: container
  properties: {
    resource: {
      id: 'triggerName'
      body: 'body'
    }
    options: {}
  }
}

output resource3Id string = trigger.id
