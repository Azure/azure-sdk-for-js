targetScope = 'resourceGroup'

resource fleet 'Microsoft.DocumentDB/fleets@2026-03-15' = {
  name: 'fleet1'
  location: 'West US'
  tags: {
    Dept: 'Finance'
    Environment: 'Production'
  }
}

output resource0Id string = fleet.id
