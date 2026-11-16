targetScope = 'resourceGroup'

resource instanceFailoverGroup 'Microsoft.Sql/locations/instanceFailoverGroups@2025-01-01' = {
  name: 'eastus/locationsinstancefai'
}
