targetScope = 'resourceGroup'

resource fleet 'Microsoft.DocumentDB/fleets@2026-03-15' existing = {
  name: 'fleet-test'
}

resource fleetspace 'Microsoft.DocumentDB/fleets/fleetspaces@2026-03-15' = {
  name: 'fleetspace1'
  parent: fleet
  properties: {
    fleetspaceApiKind: 'NoSQL'
    serviceTier: 'GeneralPurpose'
    dataRegions: [
      'westus2'
    ]
    throughputPoolConfiguration: {
      minThroughput: 100000
      maxThroughput: 500000
    }
  }
}

output resource1Id string = fleetspace.id
