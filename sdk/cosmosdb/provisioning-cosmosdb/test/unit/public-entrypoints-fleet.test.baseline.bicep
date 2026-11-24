targetScope = 'resourceGroup'

resource fleet 'Microsoft.DocumentDB/fleets@2026-03-15' = {
  name: 'fleet-test'
  location: 'fleet-test'
}

resource fleetspace 'Microsoft.DocumentDB/fleets/fleetspaces@2026-03-15' = {
  name: 'fleetspace-test'
  parent: fleet
}

resource fleetspaceAccount 'Microsoft.DocumentDB/fleets/fleetspaces/fleetspaceAccounts@2026-03-15' = {
  name: 'fleetspaceaccount-test'
  parent: fleetspace
}

output resource0Id string = fleet.id

output resource1Id string = fleetspace.id

output resource2Id string = fleetspaceAccount.id
