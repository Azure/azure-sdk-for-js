targetScope = 'resourceGroup'

resource namespace 'Microsoft.ServiceBus/namespaces@2026-01-01' existing = {
  name: 'learn-servicebus'
}

resource networkSecurityPerimeterConfiguration 'Microsoft.ServiceBus/namespaces/networkSecurityPerimeterConfigurations@2026-01-01' existing = {
  name: 'learn-association'
  parent: namespace
}
