param (
    [hashtable] $DeploymentOutputs,
    [string] $TenantId,
    [string] $TestApplicationId,
    [string] $TestApplicationSecret
)

Import-AzContainerRegistryImage `
    -ResourceGroupName $DeploymentOutputs['CONTAINERREGISTRY_RESOURCE_GROUP'] `
    -RegistryName $DeploymentOutputs['CONTAINERREGISTRY_REGISTRY_NAME'] `
    -SourceImage 'library/busybox' -SourceRegistryUri 'registry.hub.docker.com' `
    -Mode 'Force'

Import-AzContainerRegistryImage `
    -ResourceGroupName $DeploymentOutputs['CONTAINERREGISTRY_RESOURCE_GROUP'] `
    -RegistryName $DeploymentOutputs['CONTAINERREGISTRY_REGISTRY_NAME'] `
    -SourceImage 'library/hello-world' -SourceRegistryUri 'registry.hub.docker.com' `
    -Mode 'Force' `
    -TargetTag 'library/hello-world:test1','library/hello-world:test-delete'