# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License.

# IMPORTANT: Do not invoke this file directly. Please instead run eng/New-TestResources.ps1 from the repository root.

param (
  [Parameter(ValueFromRemainingArguments = $true)]
  $RemainingArguments,

  [Parameter()]
  [hashtable] $DeploymentOutputs
)

# If not Linux, skip this script.
# if ($isLinux -ne "Linux") {
#   Write-Host "Skipping post-deployment because not running on Linux."
#   return
# }

$ErrorActionPreference = 'Continue'
$PSNativeCommandUseErrorActionPreference = $true

$webappRoot = "$PSScriptRoot/identity/integration" | Resolve-Path
$workingFolder = $webappRoot;

Write-Host "Working directory: $workingFolder"

az login --service-principal -u $DeploymentOutputs['IDENTITY_CLIENT_ID'] -p $DeploymentOutputs['IDENTITY_CLIENT_SECRET'] --tenant $DeploymentOutputs['IDENTITY_TENANT_ID']
az account set --subscription $DeploymentOutputs['IDENTITY_SUBSCRIPTION_ID']

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
# $image = "$loginServer/identity-functions-test-image"
# docker build --no-cache -t $image "$workingFolder/AzureFunctions"
# docker push $image

# az functionapp config container set -g $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] -n $DeploymentOutputs['IDENTITY_FUNCTION_NAME'] -i $image -r $loginServer -p $(az acr credential show -n $DeploymentOutputs['IDENTITY_ACR_NAME'] --query "passwords[0].value" -o tsv) -u $(az acr credential show -n $DeploymentOutputs['IDENTITY_ACR_NAME'] --query username -o tsv)

# Azure Web Apps app deployment
Push-Location "$webappRoot/AzureWebApps"
npm install
npm run build
Compress-Archive -Path "$workingFolder/AzureWebApps/*" -DestinationPath "$workingFolder/AzureWebApps/app.zip" -Force
az webapp deploy --resource-group $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] --name $DeploymentOutputs['IDENTITY_WEBAPP_NAME'] --src-path "$workingFolder/AzureWebApps/app.zip" --async true
Remove-Item -Force "$workingFolder/AzureWebApps/app.zip"
Pop-Location

# Push-Location "$webappRoot/AzureWebApps"
# npm install
# npm run build
# az webapp up --resource-group $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] --name $DeploymentOutputs['IDENTITY_WEBAPP_NAME'] --plan $DeploymentOutputs['IDENTITY_WEBAPP_PLAN'] --runtime NODE:18-lts
# Pop-Location

Write-Host "Deployed webapp"
Write-Host "Sleeping for a bit to enable debugging the logs."
Start-Sleep -Seconds 600

# Write-Host "Sleeping for a bit to ensure container registry is ready."
# Start-Sleep -Seconds 20
# Write-Host "trying to login to acr"
# az acr login -n $DeploymentOutputs['IDENTITY_ACR_NAME']
# $loginServer = az acr show -n $DeploymentOutputs['IDENTITY_ACR_NAME'] --query loginServer -o tsv

# # Azure Kubernetes Service deployment
# $image = "$loginServer/identity-aks-test-image"
# docker build --no-cache -t $image "$workingFolder/AzureKubernetes"
# docker push $image

# Attach the ACR to the AKS cluster
# Write-Host "Attaching ACR to AKS cluster"
# az aks update -n $DeploymentOutputs['IDENTITY_AKS_CLUSTER_NAME'] -g $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] --attach-acr $DeploymentOutputs['IDENTITY_ACR_NAME']

# $MIClientId = $DeploymentOutputs['IDENTITY_USER_DEFINED_IDENTITY_CLIENT_ID']
# $MIName = $DeploymentOutputs['IDENTITY_USER_DEFINED_IDENTITY_NAME']
# $SaAccountName = 'workload-identity-sa'
# $PodName = $DeploymentOutputs['IDENTITY_AKS_POD_NAME']
# $storageName = $DeploymentOutputs['IDENTITY_STORAGE_NAME_2']

# # Get the aks cluster credentials
# Write-Host "Getting AKS credentials"
# az aks get-credentials --resource-group $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] --name $DeploymentOutputs['IDENTITY_AKS_CLUSTER_NAME']

# #Get the aks cluster OIDC issuer
# Write-Host "Getting AKS OIDC issuer"
# $AKS_OIDC_ISSUER = az aks show -n $DeploymentOutputs['IDENTITY_AKS_CLUSTER_NAME'] -g $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] --query "oidcIssuerProfile.issuerUrl" -otsv

# # Create the federated identity
# Write-Host "Creating federated identity"
# az identity federated-credential create --name $MIName --identity-name $MIName --resource-group $DeploymentOutputs['IDENTITY_RESOURCE_GROUP'] --issuer $AKS_OIDC_ISSUER --subject system:serviceaccount:default:workload-identity-sa

# # Build the kubernetes deployment yaml
# $kubeConfig = @"
# apiVersion: v1
# kind: ServiceAccount
# metadata:
#   annotations:
#     azure.workload.identity/client-id: $MIClientId
#   name: $SaAccountName
#   namespace: default
# ---
# apiVersion: v1
# kind: Pod
# metadata:
#   name: $PodName
#   namespace: default
#   labels:
#     azure.workload.identity/use: "true"
# spec:
#   serviceAccountName: $SaAccountName
#   containers:
#   - name: $PodName
#     image: $image
#     env:
#     - name: IDENTITY_STORAGE_NAME
#       value: "$StorageName"
#     ports:
#     - containerPort: 80
#   nodeSelector:
#     kubernetes.io/os: linux
# "@

# Set-Content -Path "$workingFolder/kubeconfig.yaml" -Value $kubeConfig
# Write-Host "Created kubeconfig.yaml with contents:"
# Write-Host $kubeConfig

# # Apply the config
# kubectl apply -f "$workingFolder/kubeconfig.yaml" --overwrite=true
# Write-Host "Applied kubeconfig.yaml"
# az logout
