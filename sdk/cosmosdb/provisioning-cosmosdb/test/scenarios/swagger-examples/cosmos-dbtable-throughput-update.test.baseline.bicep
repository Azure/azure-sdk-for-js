targetScope = 'resourceGroup'

resource databaseAccount 'Microsoft.DocumentDB/databaseAccounts@2026-03-15' existing = {
  name: 'databaseaccount-test'
}

resource table 'Microsoft.DocumentDB/databaseAccounts/tables@2026-03-15' existing = {
  name: 'databaseaccounttable-test'
  parent: databaseAccount
}

resource throughputSetting 'Microsoft.DocumentDB/databaseAccounts/tables/throughputSettings@2026-03-15' = {
  name: 'default'
  parent: table
  location: 'West US'
  properties: {
    resource: {
      throughput: 400
    }
  }
  tags: {}
}

output resource2Id string = throughputSetting.id
