@description('The base resource name.')
param baseName string

@description('The tenant ID to which the application and resources belong.')
param tenantId string = '72f988bf-86f1-41af-91ab-2d7cd011db47'

@description('The application client ID used to run tests.')
param testApplicationId string

@description('The application client secret used to run tests.')
param testApplicationSecret string

@description('DNS Label for the Public IP. Must be lowercase. It should match with the following regular expression: ^[a-z][a-z0-9-]{1,61}[a-z0-9]$ or it will raise an error.')
param dnsLabelPrefix string = baseName

@description('Address Prefix')
param vnetAddressPrefix string = '10.0.0.0/16'

@description('Subnet prefix')
param subnetPrefix string = '10.0.0.0/24'

@description('Type of public IP address')
@allowed([
  'Dynamic'
  'Static'
])
param publicIPAddressType string = 'Dynamic'

@description('Location for all resources.')
param location string = resourceGroup().location

var virtualNetworkName = 'virtualNetwork1'
var publicIPAddressName = 'publicIp1'
var subnetName = 'subnet1'
var nicName = 'networkInterface1'
var subnetRef = resourceId('Microsoft.Network/virtualNetworks/subnets', virtualNetworkName, subnetName)

resource publicIPAddress 'Microsoft.Network/publicIPAddresses@2020-05-01' = {
  name: publicIPAddressName
  location: location
  properties: {
    publicIPAllocationMethod: publicIPAddressType
    dnsSettings: {
      domainNameLabel: dnsLabelPrefix
    }
  }
}

resource virtualNetwork 'Microsoft.Network/virtualNetworks@2020-05-01' = {
  name: virtualNetworkName
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [
        vnetAddressPrefix
      ]
    }
    subnets: [
      {
        name: subnetName
        properties: {
          addressPrefix: subnetPrefix
        }
      }
    ]
  }
}

resource nic 'Microsoft.Network/networkInterfaces@2020-05-01' = [for i in range(0, 10000): {
  name:  '${nicName}--${i}'
  location: location
  properties: {
    ipConfigurations: [
      {
        name: 'ipconfig1--${i}'
        properties: {
          privateIPAllocationMethod: 'Dynamic'
          subnet: {
            id: subnetRef
          }
        }
      }
    ]
  }
  dependsOn: [
    virtualNetwork
  ]
}]

output AZURE_RESOURCE_GROUP string = resourceGroup().name
output AZURE_SUBSCRIPTION_ID string = subscription().subscriptionId
output AZURE_TENANT_ID string = tenantId
output AZURE_CLIENT_ID string = testApplicationId
output AZURE_CLIENT_SECRET string = testApplicationSecret
