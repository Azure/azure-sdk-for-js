# Testing

To test this project, make sure to build it by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#building), then follow the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#testing).

## Azure resources 

The Azure Azure Service Bus client does not have any recorded tests and so, all the tests require an Azure Service Bus namespace to be set up beforehand.  You can use existing Azure resources for the live tests, or generate new ones by using our [New-TestResources.ps1](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/common/TestResources/New-TestResources.ps1) script, which will use an [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/test-resources.json) that already has all of the the necessary configurations.

The Azure resource that is used by the tests in this project is:

- A standard [Azure Service Bus namespace](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messaging-overview#namespaces) with listen, manage and send authorization rules.
- An Azure Active Directory application for the tests to use. See the [AAD based authentication](#aad-based-authentication) for steps to register the application.

To run the live tests, you will also need to set the below environment variables:

- `SERVICEBUS_FQDN`: The fully qualified domain name which represents the Azure Service Bus namespace.
- `SERVICEBUS_CONNECTION_STRING`: The connection string of your Azure Service Bus namespace.

The live tests in this project will create queues, topics and subscriptions in the provided Service Bus namespace.

## Entra Id based authentication

### Assign owner role to the registered application

- In the Azure portal, go to your Azure Service Bus namespace and assign the **Azure Service Bus Data Owner** role to your user or managed identity.
- This can be done from `Role assignment` section of `Access control (IAM)` tab (in the left-side-navbar of your Service Bus namespace in the azure-portal)
- For more information on Service Bus RBAC setup: [Learn more](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-role-based-access-control)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fservicebus%2Fservice-bus%2Ftest%2FREADME.png)
