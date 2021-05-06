# Testing Identity in Azure Functions

## Configuration
Before you begin, you must have the following:

An Azure account with an active subscription.

The Azure Functions Core Tools version 3.x.

One of the following tools for creating Azure resources:

Azure CLI version 2.4 or later.

Azure PowerShell version 5.0 or later.

Node.js, Active LTS and Maintenance LTS versions (8.11.1 and 10.14.1 recommended).

- Prerequisites and Configuration of local env same as this - https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-typescript?tabs=azure-cli%2Cbrowser#configure-your-local-environment

## Prerequisites
In a terminal or command window, run func --version to check that the Azure Functions Core Tools are version 3.x.

Run az --version to check that the Azure CLI version is 2.4 or later.

Run az login to sign in to Azure and verify an active subscription.

- An Azure Key Vault.

### Install Azure Functions
 `cd IdentityTest`
 `npm install`

## Give the Azure Functions access to the key vault

1. go to the code in the repo,
2. follow the instructions here to create RG and deploy to RG - https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-resource-manager?tabs=command-line%2Cazure-cli#deploy-the-template

Note -> if 3 gives error, try 5 first then do 3 to 4 

3. On the portal go to the created function app in the resource group - Go to Features -> Managed Identity -> System Assigned -> Set status to On and create a role assignment for Kweyvault and select the keyvault created fro mthe resource name dropdown, you can assign the role of Keyvault Administrator
4. Go to the created keyvault and set permissions for this function app resource (Add access policy)
5. publish the function app - func azure functionapp publish <FUNCTION_APP_NAME>
-> Take note of the invoke url

## Run the azure-identity Tests on the Azure Functions
Go to the invoke url which will look something like - `https://<func app name>.azurewebsites.net/api/httpexample`
