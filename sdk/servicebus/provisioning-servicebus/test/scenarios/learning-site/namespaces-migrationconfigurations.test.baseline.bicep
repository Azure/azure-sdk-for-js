targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' existing = {
  name: 'learn-servicebus'
}

resource migrationConfiguration 'Microsoft.ServiceBus/namespaces/migrationConfigurations@2026-01-01' = {
  name: '$default'
  parent: namespace
  properties: {
    postMigrationName: 'learn-servicebus-standard'
    targetNamespace: '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.ServiceBus/namespaces/learn-servicebus-premium'
  }
}
