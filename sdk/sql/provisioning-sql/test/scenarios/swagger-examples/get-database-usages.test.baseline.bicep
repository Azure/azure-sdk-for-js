targetScope = 'subscription'

resource usage 'Microsoft.Sql/locations/usages@2025-01-01' existing = {
  name: 'eastus/getdatabaseusagesusa'
}
