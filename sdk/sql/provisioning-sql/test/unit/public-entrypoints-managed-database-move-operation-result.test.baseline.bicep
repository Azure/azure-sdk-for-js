targetScope = 'resourceGroup'

resource managedDatabaseMoveOperationResult 'Microsoft.Sql/locations/managedDatabaseMoveOperationResults@2025-01-01' existing = {
  name: 'eastus/publicentrypointsman'
}
