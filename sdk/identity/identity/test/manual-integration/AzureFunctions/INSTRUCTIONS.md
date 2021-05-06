# Testing Identity in Azure Functions

## Prerequisites

-

- An Azure Key Vault.

### Install Azure Functions

> **Note:**

## Give the Azure Functions access to the key vault

## Run the azure-identity Tests on the Azure Functions

1. go to the code in the repo
2. follow the instructions here to create RG and deploy to RG - https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-resource-manager?tabs=command-line%2Cazure-cli#deploy-the-template
3. publish the function app - func azure functionapp publish <FUNCTION_APP_NAME>
4. On the portal go to the created function app in the resource group - Go to Features -> Managed Identity -> System Assigned -> Set status to On and create a role assignment for Kweyvault and select the keyvault created fro mthe resource name dropdown, you can assign the role of Keyvault Administrator
5. Go to the created keyvault and set permissions for this function app resource (Add access policy)
