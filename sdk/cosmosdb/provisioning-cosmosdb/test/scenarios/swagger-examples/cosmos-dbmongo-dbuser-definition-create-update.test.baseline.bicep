targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource mongodbUserDefinition 'Microsoft.DocumentDB/databaseAccounts/mongodbUserDefinitions@2026-03-15' = {
  name: 'mongouserdefinitiong-test'
  parent: databaseAccount
  properties: {
    userName: 'myUserName'
    password: 'myPassword'
    databaseName: 'sales'
    customData: 'My custom data'
    roles: [
      {
        role: 'myReadRole'
        db: 'sales'
      }
    ]
    mechanisms: 'SCRAM-SHA-256'
  }
}

output resource1Id string = mongodbUserDefinition.id
