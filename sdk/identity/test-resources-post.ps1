# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.az acr login -n $($DeploymentOutputs['IDENTITY_ACR_NAME']) && \

param (
  [Parameter()]
  [hashtable] $DeploymentOutputs,

  [Parameter()]
  [switch] $CI = ($null -ne $env:SYSTEM_TEAMPROJECTID),

  [Parameter(Mandatory = $true)]
  [ValidateNotNullOrEmpty()]
  [string] $SubscriptionId,

  [Parameter(Mandatory = $true)]
  [ValidateNotNullOrEmpty()]
  [string] $TenantId,

  [Parameter()]
  [ValidatePattern('^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$')]
  [string] $TestApplicationId,

  [Parameter(Mandatory = $true)]
  [ValidateNotNullOrEmpty()]
  [string] $Environment,

  # Captures any arguments from eng/New-TestResources.ps1 not declared here (no parameter errors).
  [Parameter(ValueFromRemainingArguments = $true)]
  $RemainingArguments
)

if (!$AdditionalParameters['deployMIResources']) {
    Write-Host "Skipping post-provisioning script because resources weren't deployed"
    return
}

$MIClientId = $DeploymentOutputs['IDENTITY_USER_DEFINED_CLIENT_ID']
$MIName = $DeploymentOutputs['IDENTITY_USER_DEFINED_IDENTITY_NAME']
$MIObjectId = $DeploymentOutputs['IDENTITY_USER_DEFINED_OBJECT_ID']
$saAccountName = 'workload-identity-sa'
$podName = $DeploymentOutputs['IDENTITY_AKS_POD_NAME']
$identityResourceGroup = $DeploymentOutputs['IDENTITY_RESOURCE_GROUP']
$storageName1 = $DeploymentOutputs['IDENTITY_STORAGE_NAME_1']
$storageNameUserAssigned = $DeploymentOutputs['IDENTITY_STORAGE_NAME_USER_ASSIGNED']

$ErrorActionPreference = 'Continue'
$PSNativeCommandUseErrorActionPreference = $true

$webappRoot = "$PSScriptRoot/identity/integration" | Resolve-Path
$workingFolder = $webappRoot;

Write-Host "Working directory: $workingFolder"

if ($CI) {
  Write-Host "Logging in to service principal"
  az login --service-principal -u $TestApplicationId --tenant $TenantId --allow-no-subscriptions --federated-token $env:ARM_OIDC_TOKEN
  az account set --subscription $SubscriptionId
}

# Azure Functions app deployment
# TODO: Skip Azure Functions deployment for timeout error
# Write-Host "Building the code for functions app"
# Push-Location "$webappRoot/AzureFunctions/RunTest"
# npm install
# npm run build
# Pop-Location
# Write-Host "starting azure functions deployment"
# Compress-Archive -Path "$workingFolder/AzureFunctions/RunTest/*"  -DestinationPath "$workingFolder/AzureFunctions/app.zip" -Force
# az functionapp deployment source config-zip -g $identityResourceGroup -n $DeploymentOutputs['IDENTITY_FUNCTION_NAME'] --src "$workingFolder/AzureFunctions/app.zip"
# Remove-Item -Force "$workingFolder/AzureFunctions/app.zip"
# Write-Host "Deployed function app"

# TODO: The deployment step runs into 504 Gateway Timeout error
# Write-Host "Deplying Identity Web App"
# Push-Location "$webappRoot/AzureWebApps"
# npm install
# npm run build
# az webapp up --resource-group $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] --name $DeploymentOutputs['IDENTITY_WEBAPP_NAME'] --plan $DeploymentOutputs['IDENTITY_WEBAPP_PLAN'] --runtime NODE:18-lts
# Pop-Location
# Write-Host "Deployed Identity Web App"

Write-Host "Deploying Identity Docker image to ACR"
az acr login -n $DeploymentOutputs['IDENTITY_ACR_NAME']
$loginServer = $DeploymentOutputs['IDENTITY_ACR_LOGIN_SERVER']
$image = "$loginServer/identity-aks-test-image"
docker build --no-cache --build-arg REGISTRY="mcr.microsoft.com/mirror/docker/library/" -t $image "$workingFolder/AzureKubernetes"
docker push $image

Write-Host "Deployed image to ACR"
$uuid = [guid]::NewGuid().ToString()
$vmScript = @"
az acr login -n $($DeploymentOutputs['IDENTITY_ACR_NAME']) && \
sudo docker run \
-e IDENTITY_STORAGE_NAME=$($DeploymentOutputs['IDENTITY_STORAGE_NAME']) \
-e IDENTITY_STORAGE_NAME_USER_ASSIGNED=$($DeploymentOutputs['IDENTITY_STORAGE_NAME_USER_ASSIGNED']) \
-e IDENTITY_USER_ASSIGNED_IDENTITY=$($DeploymentOutputs['IDENTITY_USER_ASSIGNED_IDENTITY']) \
-e IDENTITY_USER_ASSIGNED_IDENTITY_CLIENT_ID=$($DeploymentOutputs['IDENTITY_USER_ASSIGNED_IDENTITY_CLIENT_ID']) \
-e IDENTITY_USER_ASSIGNED_IDENTITY_OBJECT_ID=$($DeploymentOutputs['IDENTITY_USER_ASSIGNED_IDENTITY_OBJECT_ID']) \
-p 80:8080 -d \
$image && \
/usr/bin/echo $uuid
"@
$output = az vm run-command invoke -g $identityResourceGroup -n $DeploymentOutputs['IDENTITY_VM_NAME'] --command-id RunShellScript --scripts "$vmScript" | Out-String
Write-Host $output
if (-not $output.Contains($uuid)) {
  throw "couldn't start container on VM"
}

Write-Host "Deploying Azure Container Instance"

az container create -g $identityResourceGroup -n $($DeploymentOutputs['IDENTITY_CONTAINER_INSTANCE_NAME']) --image $image `
  --acr-identity $DeploymentOutputs['IDENTITY_USER_DEFINED_IDENTITY'] `
  --assign-identity $DeploymentOutputs['IDENTITY_USER_DEFINED_IDENTITY'] `
  --cpu "1" `
  --ports 80 `
  --ip-address "Public" `
  --memory "1.0" `
  --os-type "Linux" `
  -e IDENTITY_STORAGE_NAME_USER_ASSIGNED=$storageNameUserAssigned `
  IDENTITY_USER_DEFINED_CLIENT_ID=$MIClientId `
  IDENTITY_FUNCTIONS_CUSTOMHANDLER_PORT=80

$aciIP = az container show -g $identityResourceGroup -n $DeploymentOutputs['IDENTITY_CONTAINER_INSTANCE_NAME'] --query ipAddress.ip --output tsv
Write-Host "##vso[task.setvariable variable=IDENTITY_ACI_IP;]$aciIP"

Write-Host "Deployed Azure Container Instance"

Write-Host "Configuring kubernetes to use our image"
az aks update -n $DeploymentOutputs['IDENTITY_AKS_CLUSTER_NAME'] -g $identityResourceGroup --attach-acr $DeploymentOutputs['IDENTITY_ACR_NAME']

# Get the aks cluster credentials
Write-Host "Getting AKS credentials"
az aks get-credentials --resource-group $identityResourceGroup --name $DeploymentOutputs['IDENTITY_AKS_CLUSTER_NAME']

#Get the aks cluster OIDC issuer
Write-Host "Getting AKS OIDC issuer"
$AKS_OIDC_ISSUER = az aks show -n $DeploymentOutputs['IDENTITY_AKS_CLUSTER_NAME'] -g $identityResourceGroup --query "oidcIssuerProfile.issuerUrl" -otsv


# Create the federated identity
Write-Host "Creating federated identity"
az identity federated-credential create --name $MIName --identity-name $MIName --resource-group $identityResourceGroup --issuer $AKS_OIDC_ISSUER --subject system:serviceaccount:default:workload-identity-sa --audiences api://AzureADTokenExchange

# Build the kubernetes deployment yaml
$kubeConfig = @"
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    azure.workload.identity/client-id: $MIClientId
  name: $saAccountName
  namespace: default
---
apiVersion: v1
kind: Pod
metadata:
  name: $podName
  namespace: default
  labels:
    azure.workload.identity/use: "true"
spec:
  serviceAccountName: $saAccountName
  containers:
  - name: $podName
    image: $image
    env:
    - name: IDENTITY_STORAGE_NAME_USER_ASSIGNED
      value: "$storageNameUserAssigned"
    - name: IDENTITY_USER_DEFINED_CLIENT_ID
      value: "$MIClientId"
    - name: IDENTITY_FUNCTIONS_CUSTOMHANDLER_PORT
      value: "80"
    ports:
    - containerPort: 80
  nodeSelector:
    kubernetes.io/os: linux
"@

Write-Host $kubeConfig
Set-Content -Path "$workingFolder/kubeconfig.yaml" -Value $kubeConfig

# Apply the config
kubectl apply -f "$workingFolder/kubeconfig.yaml" --overwrite=true
Write-Host "Applied kubeconfig.yaml"

Write-Host ""
Write-Host "=== LOGGS ==="

# Container Instance logs and IMDS test
az container logs -g $identityResourceGroup -n $DeploymentOutputs['IDENTITY_CONTAINER_INSTANCE_NAME']

Write-Host "Container Name: $($DeploymentOutputs['IDENTITY_CONTAINER_INSTANCE_NAME'])"
Write-Host "Container IP: $aciIP"
Write-Host ""

Write-Host "--- Container State ---"
az container show -g $identityResourceGroup -n $DeploymentOutputs['IDENTITY_CONTAINER_INSTANCE_NAME'] `
  --query "{name:name,provisioningState:provisioningState,state:instanceView.state,restartCount:containers[0].instanceView.restartCount,ip:ipAddress.ip,os:osType}" `
  -o table

Write-Host ""
Write-Host "ACI Identity Assignment:"
az container show -g $identityResourceGroup -n $DeploymentOutputs['IDENTITY_CONTAINER_INSTANCE_NAME'] --query "identity" -o json

Write-Host ""
Write-Host "VM Identity Assignment:"
az vm identity show -g $identityResourceGroup -n $DeploymentOutputs['IDENTITY_VM_NAME'] -o json

Write-Host ""
Write-Host "Expected User-Assigned Identity:"
Write-Host "  Client ID: $MIClientId"
Write-Host "  Object ID: $MIObjectId"
Write-Host "  Resource ID: $($DeploymentOutputs['IDENTITY_USER_DEFINED_IDENTITY'])"

Write-Host ""
Write-Host "=== Identity Check (VM) ==="

try {
  $uamiId = $DeploymentOutputs['IDENTITY_USER_DEFINED_IDENTITY']
  Write-Host "User-Assigned Managed Identity Resource ID: $uamiId"
  $vmIdentityJson = az vm identity show -g $identityResourceGroup -n $DeploymentOutputs['IDENTITY_VM_NAME'] -o json
  $vmIdentity = $vmIdentityJson | ConvertFrom-Json

  $hasExpectedUami = $false
  $clientIdMatches = $false
  $principalIdMatches = $false

  if ($vmIdentity -and $vmIdentity.userAssignedIdentities -and $uamiId) {
    $vmUami = $vmIdentity.userAssignedIdentities.$uamiId
    if ($null -ne $vmUami) {
      $hasExpectedUami = $true
      if ($MIClientId) { $clientIdMatches = ($vmUami.clientId -eq $MIClientId) }
      if ($MIObjectId) { $principalIdMatches = ($vmUami.principalId -eq $MIObjectId) }
    }
  }

  Write-Host "VM has expected UAMI attached: $hasExpectedUami"
  Write-Host "VM UAMI clientId matches expected: $clientIdMatches"
  Write-Host "VM UAMI principalId matches expected: $principalIdMatches"
} catch {
  Write-Host "VM identity check failed: $($_.Exception.Message)"
}
