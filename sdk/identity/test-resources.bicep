@minLength(6)
@maxLength(23)
@description('The base resource name.')
param baseName string = resourceGroup().name

@description('The location of the resource. By default, this is the same as the resource group.')
param location string = resourceGroup().location

@description('The client OID to grant access to test resources.')
param testApplicationOid string

@minLength(5)
@maxLength(50)
@description('Provide a globally unique name of the Azure Container Registry')
param acrName string = 'acr${uniqueString(resourceGroup().id)}'

@description('The latest AKS version available in the region.')
param latestAksVersion string = '1.27.7'

@description('The SSH public key to use for the Linux VMs.')
param sshPubKey string

@description('The admin user name for the Linux VMs.')
param adminUserName string = 'azureuser'

@description('The user type - ServicePrincipal in CI, User locally')
param principalUserType string = 'User'

module managedIdentityModule 'test-resources-msi.bicep' = {
    name: 'managedIdentityModule'
    params: {
        baseName: baseName
        location: location
        testApplicationOid: testApplicationOid
        acrName: acrName
        latestAksVersion: latestAksVersion
        sshPubKey: sshPubKey
        adminUserName: adminUserName
        principalUserType: principalUserType
    }
}


output IDENTITY_WEBAPP_NAME string = web.name
output IDENTITY_WEBAPP_PLAN string = farm.name
output IDENTITY_USER_DEFINED_IDENTITY string = userAssignedIdentity.id
output IDENTITY_USER_DEFINED_CLIENT_ID string = userAssignedIdentity.properties.clientId
output IDENTITY_USER_DEFINED_IDENTITY_NAME string = userAssignedIdentity.name
output IDENTITY_STORAGE_NAME_1 string = storageAccount.name
output IDENTITY_STORAGE_NAME_2 string = storageAccount2.name
output IDENTITY_FUNCTION_NAME string = azureFunction.name
output IDENTITY_AKS_CLUSTER_NAME string = kubernetesCluster.name
output IDENTITY_AKS_POD_NAME string = 'javascript-test-app'
output IDENTITY_ACR_NAME string = acrResource.name
output IDENTITY_ACR_LOGIN_SERVER string = acrResource.properties.loginServer
