@minLength(6)
@maxLength(23)
@description('The base resource name.')
param baseName string = resourceGroup().name

@description('The location of the resource. By default, this is the same as the resource group.')
param location string = resourceGroup().location

@description('The client OID to grant access to test resources.')
param testApplicationOid string

@description('The client OID to grant access to test resources.')
param testApplicationId string

@description('The tenant ID to grant access to test resources.')
param tenantId string

@minLength(5)
@maxLength(50)
@description('Provide a globally unique name of the Azure Container Registry')
param acrName string = 'acr${uniqueString(resourceGroup().id)}'

@description('The latest AKS version available in the region.')
param latestAksVersion string

@description('The SSH public key to use for the Linux VMs.')
param sshPubKey string

@description('The admin user name for the Linux VMs.')
param adminUserName string = 'azureuser'

@description('The user type - ServicePrincipal in CI, User locally')
param principalUserType string = 'User'

// https://learn.microsoft.com/azure/role-based-access-control/built-in-roles
var blobContributor = subscriptionResourceId('Microsoft.Authorization/roleDefinitions','ba92f5b4-2d11-453d-a403-e96b0029c9fe') // Storage Blob Data Contributor
var serviceOwner = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '17d1049b-9a84-46fb-8f53-869881c3d3ab')
var acrPull = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d') // ACR Pull
var websiteContributor = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'de139f84-1756-47ae-9be6-808fbbe84772') // Website Contributor

// Cluster parameters
var kubernetesVersion = latestAksVersion

resource userAssignedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2018-11-30' = {
  name: baseName
  location: location
}

resource blobRoleWeb 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: storageAccount
  name: guid(resourceGroup().id, blobContributor)
  properties: {
    principalId: web.identity.principalId
    roleDefinitionId: blobContributor
    principalType: 'ServicePrincipal'
  }
}

resource blobRoleFunc 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: storageAccount
  name: guid(resourceGroup().id, blobContributor, 'azureFunction')
  properties: {
    principalId: azureFunction.identity.principalId
    roleDefinitionId: blobContributor
    principalType: 'ServicePrincipal'
  }
}

resource blobRoleCluster 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: storageAccount
  name: guid(resourceGroup().id, blobContributor, 'kubernetes')
  properties: {
    principalId: kubernetesCluster.identity.principalId
    roleDefinitionId: serviceOwner
    principalType: 'ServicePrincipal'
  }
}

resource blobRole2 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: storageAccountUserAssigned
  name: guid(resourceGroup().id, blobContributor, userAssignedIdentity.id)
  properties: {
    principalId: userAssignedIdentity.properties.principalId
    roleDefinitionId: serviceOwner
    principalType: 'ServicePrincipal'
  }
}

resource webRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: web
  name: guid(resourceGroup().id, websiteContributor, 'web')
  properties: {
    principalId: testApplicationOid
    roleDefinitionId: websiteContributor
    principalType: principalUserType
  }
}

resource webRole2 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: azureFunction
  name: guid(resourceGroup().id, websiteContributor, 'azureFunction')
  properties: {
    principalId: testApplicationOid
    roleDefinitionId: websiteContributor
    principalType: principalUserType
  }
}

resource acrPullContainerInstance 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: acrResource
  name: guid(resourceGroup().id, acrPull, 'containerInstance')
  properties: {
    principalId: userAssignedIdentity.properties.principalId
    roleDefinitionId: acrPull
    principalType: 'ServicePrincipal'
  }
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-08-01' = {
  name: uniqueString(resourceGroup().id)
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}

resource storageAccountUserAssigned 'Microsoft.Storage/storageAccounts@2021-08-01' = {
  name: '${uniqueString(resourceGroup().id)}2'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}

resource farm 'Microsoft.Web/serverfarms@2021-03-01' = {
  name: '${baseName}_farm'
  location: location
  sku: {
    name: 'B1'
    tier: 'Basic'
    size: 'B1'
    family: 'B'
    capacity: 1
  }
  properties: {
    reserved: true
  }
  kind: 'app,linux'
}

resource web 'Microsoft.Web/sites@2022-09-01' = {
  name: '${baseName}webapp'
  location: location
  kind: 'app'
  identity: {
    type: 'SystemAssigned, UserAssigned'
    userAssignedIdentities: {
      '${userAssignedIdentity.id}': {}
    }
  }
  properties: {
    enabled: true
    serverFarmId: farm.id
    httpsOnly: true
    keyVaultReferenceIdentity: 'SystemAssigned'
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
      http20Enabled: true
      minTlsVersion: '1.2'
      appSettings: [
        {
          name: 'AZURE_REGIONAL_AUTHORITY_NAME'
          value: 'eastus'
        }
        {
          name: 'IDENTITY_STORAGE_NAME_1'
          value: storageAccount.name
        }
        {
          name: 'IDENTITY_STORAGE_NAME_USER_ASSIGNED'
          value: storageAccountUserAssigned.name
        }
        {
          name: 'IDENTITY_USER_DEFINED_CLIENT_ID'
          value: userAssignedIdentity.properties.clientId
        }
        {
          name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
          value: 'true'
        }
      ]
    }
  }
}

resource azureFunction 'Microsoft.Web/sites@2022-09-01' = {
  name: '${baseName}func'
  location: location
  kind: 'functionapp'
  identity: {
    type: 'SystemAssigned, UserAssigned'
    userAssignedIdentities: {
      '${userAssignedIdentity.id}': {}
    }
  }
  properties: {
    enabled: true
    serverFarmId: farm.id
    httpsOnly: true
    keyVaultReferenceIdentity: 'SystemAssigned'
    siteConfig: {
      alwaysOn: true
      http20Enabled: true
      minTlsVersion: '1.2'
      appSettings: [
        {
          name: 'IDENTITY_STORAGE_NAME_1'
          value: storageAccount.name
        }
        {
          name: 'IDENTITY_STORAGE_NAME_USER_ASSIGNED'
          value: storageAccountUserAssigned.name
        }
        {
          name: 'IDENTITY_USER_DEFINED_CLIENT_ID'
          value: userAssignedIdentity.properties.clientId
        }
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }
        {
          name: 'WEBSITE_CONTENTAZUREFILECONNECTIONSTRING'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }
        {
          name: 'WEBSITE_CONTENTSHARE'
          value: toLower('${baseName}-func')
        }
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '~4'
        }
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: 'node'
        }
        {
          name: 'DOCKER_CUSTOM_IMAGE_NAME'
          value: 'mcr.microsoft.com/azure-functions/node:4-node18-appservice-stage3'
        }
      ]
    }
  }
}

resource publishPolicyWeb 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2022-09-01' = {
  kind: 'app'
  parent: web
  name: 'scm'
  properties: {
    allow: true
  }
}

resource publishPolicyFunction 'Microsoft.Web/sites/basicPublishingCredentialsPolicies@2022-09-01' = {
  kind: 'functionapp'
  parent: azureFunction
  name: 'scm'
  properties: {
    allow: true
  }
}

resource acrResource 'Microsoft.ContainerRegistry/registries@2023-01-01-preview' = {
  name: acrName
  location: location
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: true
  }
}

resource kubernetesCluster 'Microsoft.ContainerService/managedClusters@2023-06-01' = {
  name: baseName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    kubernetesVersion: kubernetesVersion
    enableRBAC: true
    dnsPrefix: 'identitytest'
    agentPoolProfiles: [
      {
        name: 'agentpool'
        count: 1
        vmSize: 'Standard_D2s_v3'
        osDiskSizeGB: 128
        osDiskType: 'Managed'
        kubeletDiskType: 'OS'
        type: 'VirtualMachineScaleSets'
        enableAutoScaling: false
        orchestratorVersion: kubernetesVersion
        mode: 'System'
        osType: 'Linux'
        osSKU: 'Ubuntu'
      }
    ]
    linuxProfile: {
      adminUsername: adminUserName
      ssh: {
        publicKeys: [
          {
            keyData: sshPubKey
          }
        ]
      }
    }
    oidcIssuerProfile: {
      enabled: true
    }
    securityProfile: {
      workloadIdentity: {
        enabled: true
      }
    }
  }
}


resource publicIP 'Microsoft.Network/publicIPAddresses@2023-05-01' = {
  name: '${baseName}PublicIP'
  location: location
  sku: {
    name: 'Standard'
  }
  properties: {
    publicIPAllocationMethod: 'Static'
  }
}

resource nsg 'Microsoft.Network/networkSecurityGroups@2024-07-01' = {
  name: '${baseName}NSG'
  location: location
  properties: {
    securityRules: [
      {
        name: 'AllowHTTP'
        properties: {
          description: 'Allow HTTP traffic on port 80'
          protocol: 'Tcp'
          sourcePortRange: '*'
          destinationPortRange: '80'
          sourceAddressPrefix: '*'
          destinationAddressPrefix: '*'
          access: 'Allow'
          priority: 1000
          direction: 'Inbound'
        }
      }
    ]
  }
}

resource vnet 'Microsoft.Network/virtualNetworks@2024-07-01' = {
  name: '${baseName}vnet'
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [
        '10.0.0.0/16'
      ]
    }
    subnets: [
      {
        name: '${baseName}subnet'
        properties: {
          addressPrefix: '10.0.0.0/24'
          defaultOutboundAccess: false
          networkSecurityGroup: {
            id: nsg.id
          }
        }
      }
    ]
  }
}

resource networkInterface 'Microsoft.Network/networkInterfaces@2024-07-01' = {
  name: '${baseName}NIC'
  location: location
  properties: {
    ipConfigurations: [
      {
        name: 'myIPConfig'
        properties: {
          privateIPAllocationMethod: 'Dynamic'
          subnet: {
            id: vnet.properties.subnets[0].id
          }
          publicIPAddress: {
            id: publicIP.id
          }
        }
      }
    ]
  }
}

resource virtualMachine 'Microsoft.Compute/virtualMachines@2024-07-01' = {
  name: '${baseName}vm'
  location: location
  identity: {
    type: 'SystemAssigned, UserAssigned'
    userAssignedIdentities: {
      '${userAssignedIdentity.id}': {}
    }
  }
  properties: {
    hardwareProfile: {
      vmSize: 'Standard_DS1_v2'
    }
    osProfile: {
      computerName: '${baseName}vm'
      adminUsername: adminUserName
      customData: base64('''
#cloud-config
package_update: true
packages:
  - docker.io
runcmd:
  - curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
  - az login --identity --allow-no-subscriptions
''')
      linuxConfiguration: {
        disablePasswordAuthentication: true
        ssh: {
          publicKeys: [
            {
              path: '/home/${adminUserName}/.ssh/authorized_keys'
              keyData: sshPubKey
            }
          ]
        }
      }
    }
    storageProfile: {
      imageReference: {
        publisher: 'Canonical'
        offer: 'ubuntu-24_04-lts'
        sku: 'server'
        version: 'latest'
      }
      osDisk: {
          createOption: 'FromImage'
      }
    }
    networkProfile: {
      networkInterfaces: [{
          id: networkInterface.id
      }]
    }
  }
}

output IdentityWebAppName string = web.name
output IdentityWebAppPlan string = farm.name
output IdentityUserDefinedIdentity string = userAssignedIdentity.id
output IdentityUserDefinedClientId string = userAssignedIdentity.properties.clientId
output IdentityUserDefinedObjectId string = userAssignedIdentity.properties.principalId
output IdentityUserDefinedIdentityName string = userAssignedIdentity.name
output IdentityStorageName1 string = storageAccount.name
output IdentityStorageNameUserAssigned string = storageAccountUserAssigned.name
output IdentityStorageId1 string = storageAccount.id
output IdentityStorageIdUserAssigned string = storageAccountUserAssigned.id
output IdentityFunctionName string = azureFunction.name
output IdentityAksClusterName string = kubernetesCluster.name
output IdentityAksPodName string = 'javascript-test-app'
output IdentityContainerInstanceName string = 'javascript-container-app'
output IdentityAcrName string = acrResource.name
output IdentityAcrLoginServer string = acrResource.properties.loginServer
output IdentityTenantID string = tenantId
output IdentityClientID string = testApplicationId
output IdentityFunctionsCustomHandlerPort string = '80'
output IdentityVMName string = virtualMachine.name
output IdentityVMPublicIP string = publicIP.properties.ipAddress
