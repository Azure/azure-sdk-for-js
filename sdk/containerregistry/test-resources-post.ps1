param (
    [hashtable] $DeploymentOutputs,
    [string] $TenantId,
    [string] $TestApplicationId,
    [string] $TestApplicationSecret
)

Import-AzContainerRegistryImage `
    -ResourceGroupName $DeploymentOutputs['CONTAINERREGISTRY_RESOURCE_GROUP'] `
    -RegistryName $DeploymentOutputs['CONTAINER_REGISTRY_NAME'] `
    -SourceImage 'mcr/hello-world' -SourceRegistryUri 'mcr.microsoft.com' `
    -Mode 'Force' `
    -TargetTag 'library/busybox:latest'

Import-AzContainerRegistryImage `
    -ResourceGroupName $DeploymentOutputs['CONTAINERREGISTRY_RESOURCE_GROUP'] `
    -RegistryName $DeploymentOutputs['CONTAINER_REGISTRY_NAME'] `
    -SourceImage 'mcr/hello-world' -SourceRegistryUri 'mcr.microsoft.com' `
    -Mode 'Force' `
    -TargetTag 'library/hello-world:test1','library/hello-world:test-delete'

Import-AzContainerRegistryImage `
    -ResourceGroupName $DeploymentOutputs['CONTAINERREGISTRY_RESOURCE_GROUP'] `
    -RegistryName $DeploymentOutputs['CONTAINER_REGISTRY_ANONYMOUS_NAME'] `
    -SourceImage 'mcr/hello-world' -SourceRegistryUri 'mcr.microsoft.com' `
    -Mode 'Force' `
    -TargetTag 'library/hello-world:latest','library/hello-world:v1','library/hello-world:v2','library/hello-world:v3','library/hello-world:v4'
