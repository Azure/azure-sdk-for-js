@minLength(5)
param baseName string = resourceGroup().name
param location string = resourceGroup().location

var anonRegistryName = '${baseName}anon'

// Create Container Registry
resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-11-01-preview' = {
  name: baseName
  location: location
  sku: {
    name: 'Basic'
  }
}

// Create Anonymous Container Registry
resource anonymousContainerRegistry 'Microsoft.ContainerRegistry/registries@2023-11-01-preview' = {
  name: anonRegistryName
  location: location
  sku: {
    name: 'Standard'
  }
  properties: {
    anonymousPullEnabled: true
  }
}

// Outputs
output CONTAINER_REGISTRY_NAME string = baseName
output CONTAINER_REGISTRY_ENDPOINT string = containerRegistry.properties.loginServer
output CONTAINER_REGISTRY_ANONYMOUS_NAME string = anonRegistryName
output CONTAINER_REGISTRY_ANONYMOUS_ENDPOINT string = anonymousContainerRegistry.properties.loginServer
