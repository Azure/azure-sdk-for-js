# Testing

To test this project, make sure to build it by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building), then follow the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

## Azure resources 

The Azure Azure Service Bus client does not have any recorded tests and so, all the tests require an Azure Service Bus namespace to be set up beforehand.  You can use existing Azure resources for the live tests, or generate new ones by using our [New-TestResources.ps1](https://github.com/Azure/azure-sdk-for-js/blob/master/eng/common/TestResources/New-TestResources.ps1) script, which will use an [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/test-resources.json) that already has all of the the necessary configurations.

The Azure resource that is used by the tests in this project is:

- A standard [Azure Service Bus namespace](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messaging-overview#namespaces) with listen, manage and send authorization rules.
- An Azure Active Directory application for the tests to use. See the [AAD based authentication](#AAD-based-authentication) for steps to register the application.

To run the live tests, you will also need to set the below environment variables:

- `AZURE_CLIENT_ID`: The client ID of an Azure Active Directory application.
- `AZURE_CLIENT_SECRET`: The client secret of an Azure Active Directory application.
- `AZURE_TENANT_ID`: The Tenant ID of your organization in Azure Active Directory.
- `SERVICEBUS_CONNECTION_STRING`: The connection string of your Azure Service Bus namespace.

The live tests in this project will create queues, topics and subscriptions in the provided Service Bus namespace.

## AAD based authentication

The following steps will help you setup the AAD credentials.

### Register a new application in AAD

- Follow [Documentation to register a new application](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app) in the Azure Active Directory (in the Azure portal).
- Note down the `CLIENT_ID` and `TENANT_ID`.
- In the "Certificates & Secrets" tab, create a secret and note that down.

### Assign owner role to the registered application

- In the Azure portal, go to your Azure Service Bus namespace and assign the **Azure Service Bus Data Owner** role to the registered application.
- This can be done from `Role assignment` section of `Access control (IAM)` tab (in the left-side-navbar of your Service Bus namespace in the azure-portal)<br>
  _Doing this would allow the registered application manage the namespace, i.e., entity creation, deletion, etc.,_<br>
- For more information on Service Bus RBAC setup: [Learn more](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-role-based-access-control)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fservicebus%2Fservice-bus%2Ftest%2FREADME.png)
