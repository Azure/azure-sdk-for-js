# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

# IMPORTANT: Do not invoke this file directly. Please instead run eng/New-TestResources.ps1 from the repository root.

param (
  [Parameter(ValueFromRemainingArguments = $true)]
  $RemainingArguments,

  [Parameter()]
  [hashtable] $DeploymentOutputs,

  [Parameter()]
  [switch] $CI = ($null -ne $env:SYSTEM_TEAMPROJECTID),

  [Parameter()]
  [hashtable] $AdditionalParameters = @{}
)

if (!$AdditionalParameters['deployMIResources']) {
    Write-Host "Skipping post-provisioning script because resources weren't deployed"
    return
}

$MIClientId = $DeploymentOutputs['IDENTITY_USER_DEFINED_CLIENT_ID']
$MIName = $DeploymentOutputs['IDENTITY_USER_DEFINED_IDENTITY_NAME']
$saAccountName = 'workload-identity-sa'
$podName = $DeploymentOutputs['IDENTITY_AKS_POD_NAME']
$storageName2 = $DeploymentOutputs['IDENTITY_STORAGE_NAME_2']
$userDefinedClientId = $DeploymentOutputs['IDENTITY_USER_DEFINED_CLIENT_ID']

$ErrorActionPreference = 'Continue'
$PSNativeCommandUseErrorActionPreference = $true

$webappRoot = "$PSScriptRoot/identity/integration" | Resolve-Path
$workingFolder = $webappRoot;

Write-Host "Working directory: $workingFolder"

if ($CI) {
  Write-Host "Logging in to service principal"
  az login --service-principal -u $env:ARM_CLIENT_ID --tenant $env:ARM_TENANT_ID --allow-no-subscriptions --federated-token $env:ARM_OIDC_TOKEN
  az account set --subscription $DeploymentOutputs['IDENTITY_SUBSCRIPTION_ID']
}

# Azure Functions app deployment
Write-Host "Building the code for functions app"
Push-Location "$webappRoot/AzureFunctions/RunTest"
npm install
npm run build
Pop-Location
Write-Host "starting azure functions deployment"
Compress-Archive -Path "$workingFolder/AzureFunctions/RunTest/*"  -DestinationPath "$workingFolder/AzureFunctions/app.zip" -Force
az functionapp deployment source config-zip -g $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] -n $DeploymentOutputs['IDENTITY_FUNCTION_NAME'] --src "$workingFolder/AzureFunctions/app.zip"
Remove-Item -Force "$workingFolder/AzureFunctions/app.zip"
Write-Host "Deployed function app"

Write-Host "Deplying Identity Web App"
Push-Location "$webappRoot/AzureWebApps"
npm install
npm run build
az webapp up --resource-group $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] --name $DeploymentOutputs['IDENTITY_WEBAPP_NAME'] --plan $DeploymentOutputs['IDENTITY_WEBAPP_PLAN'] --runtime NODE:18-lts
Pop-Location
Write-Host "Deployed Identity Web App"

Write-Host "Deploying Identity Docker image to ACR"
az acr login -n $DeploymentOutputs['IDENTITY_ACR_NAME']
$loginServer = az acr show -n $DeploymentOutputs['IDENTITY_ACR_NAME'] --query loginServer -o tsv
$image = "$loginServer/identity-aks-test-image"
docker build --no-cache --build-arg REGISTRY="mcr.microsoft.com/mirror/docker/library/" -t $image "$workingFolder/AzureKubernetes"
docker push $image
Write-Host "Deployed image to ACR"

Write-Host "Configuring kubernetes to use our image"
az aks update -n $DeploymentOutputs['IDENTITY_AKS_CLUSTER_NAME'] -g $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] --attach-acr $DeploymentOutputs['IDENTITY_ACR_NAME']

# Get the aks cluster credentials
Write-Host "Getting AKS credentials"
az aks get-credentials --resource-group $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] --name $DeploymentOutputs['IDENTITY_AKS_CLUSTER_NAME']

#Get the aks cluster OIDC issuer
Write-Host "Getting AKS OIDC issuer"
$AKS_OIDC_ISSUER = az aks show -n $DeploymentOutputs['IDENTITY_AKS_CLUSTER_NAME'] -g $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] --query "oidcIssuerProfile.issuerUrl" -otsv


# Create the federated identity
Write-Host "Creating federated identity"
az identity federated-credential create --name $MIName --identity-name $MIName --resource-group $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] --issuer $AKS_OIDC_ISSUER --subject system:serviceaccount:default:workload-identity-sa

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
    - name: IDENTITY_STORAGE_NAME_2
      value: "$storageName2"
    - name: IDENTITY_USER_DEFINED_CLIENT_ID
      value: "$userDefinedClientId"
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
