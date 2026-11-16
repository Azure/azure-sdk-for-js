targetScope = 'resourceGroup'

resource fleet 'Microsoft.DocumentDB/fleets@2026-03-15' existing = {
  name: 'fleet-test'
}

resource fleetspace 'Microsoft.DocumentDB/fleets/fleetspaces@2026-03-15' existing = {
  name: 'fleetspace-test'
  parent: fleet
}

resource fleetspaceAccount 'Microsoft.DocumentDB/fleets/fleetspaces/fleetspaceAccounts@2026-03-15' = {
  name: 'fleetspaceaccount-test'
  parent: fleetspace
  properties: {
    globalDatabaseAccountProperties: {
      armLocation: 'West US'
      resourceId: '/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/providers/Microsoft.DocumentDB/resourceGroup/rg1/databaseAccounts/db1'
    }
  }
}

output resource2Id string = fleetspaceAccount.id
