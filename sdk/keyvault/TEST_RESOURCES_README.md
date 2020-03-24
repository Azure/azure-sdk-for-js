# KeyVault Test Resources

The KeyVault packages provide a common [Azure Resource Manager template][KVARM] to help developers set up the resources needed
to run all of the integration tests for each KeyVault client. This ARM template is used by the CI pipelines
that run during pull requests, just as much as it is used to help developers deploy their own resources on their personal
Azure accounts for manual testing purposes.

If you wish to use this ARM template to deploy resources on your own Azure personal or business account, you can click
the following deploy button:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Ftest-resources.json)

Keep in mind that deploying these resources constitutes a purchase of Azure services that will be billed to your active account.

## What resources will be created

The [ARM template][KVARM] used by the Deploy Button will create:

- A single standard KeyVault, on the provided location, under the provided tenant, with a name based on the provided "Base Name".

You can read more about KeyVault pricing details [here](https://azure.microsoft.com/en-us/pricing/details/key-vault/).

## The form to deploy the KeyVault resources

Once you click the "Deploy to Azure" button, you will be prompted to fill a form.
In this guide we will go through the necessary steps to fill this form for the KeyVault clients for JavaScript.

### Logging in

Clicking the button will make Azure attempt to authenticate your Azure account. Make sure to log in using the Azure account that you want to be billed through.
If you want to **create a new account**, you may follow this guide: [Create an Azure account][CreateAzureAccount].

### The "Subscription" field

The first field you will encounter is the "Subscription" field.
It will have a drop down menu where you will be able to search for the specific Azure subscription
you may want to use as the host of the resources you will create.

**This field is required.**

### The "Resource Group" field.

Having picked a subscription, the resource groups available for that subscription
will be pre-filled in a drop-down menu. You can either pick one resource group from this menu,
or click on the "Create new" link right under the drop-down menu to create a new resource group.
You can read more about Resource groups [here][ResourceGroups].

**This field is required.**

### The "Location" field.

Azure has more global regions than any other cloud provider.
Once you've picked a subscription and a resource group,
you'll be able to pick a location. 
You can read more about Azure locations [here][AzureLocations].

**This field is required.**

### The "Base Name" field.

Under "Settings", the "Base Name" will serve us as a prefix
to determine the name of the resources that we will create,
so that you can easily find them later. It is **required**
to replace the default value that will appear on the website.
`[resourceGroup().name]` is used by our CI pipelines for automation purposes.

Even though it is possible to use non-alphanumeric characters in some resource names,
like dashes in KV names, we recommended writing something simple to reduce confusion.

The constraints on the length of the names are different for every template depending on the resources used,
but a safe upper limit on the number of characters to use on the `baseName` field is: 17 characters.

### The "Tenant Id" field.

To fill the **Tenant Id** field, you may copy it from the one available on the
[overview page of the Azure Active Directory section of the Azure portal][AADOverview],
or obtain it from the overview page of a recently created Azure Application.
Here's [how to use the portal to create an Azure AD application and service principal that can access resources][HowToAADApp].

**This field is required.**

### The "Test Application Oid" field.

To fill the **Test Application Oid** field, you may get it from the overview page of a recently created Azure application.

If you don't have an Azure AD application, follow: [How to use the portal to create an Azure AD application and service principal that can access resources][HowToAADApp].
Once created, go to your application's overview page, and you'll see an "Object ID" property. This is the one that you want to copy and paste on the form.

**This field is required.**

### Verifying your deploy

Once your ARM template deployment starts a notification badge will appear on the top right of the portal,
indicating that the resource is being created. You can go to your resource group's page,
then go to the **Deployments** section to see a history of all the deployments you've made.

Deployments done with an ARM template will have **Microsoft.Template** in their name.
If you click in one of them, you'll see at the left "Outputs" as one of the menu options.
If your deployment has succeeded, the outputs will contain the name of the KeyVault that was just created.

## Deleting your test resources

At the home page of your Azure account you will be able to see your recently created resources.
If you don't see these resources there, you can go to the resource group you used to see
what resources have been assigned to it. You can select the resources you want to delete
at the resource group page (then delete them clicking the "Delete" button in the menu bar),
or you can use the "Delete" button located at the top of the "Overview" page of your created resources.

## About the ARM templates

We recommend you to take some time to check out our [Intro to Microsoft Azure Resource Manager Templates (Video)][ARMIntro],
so that you can read through the [ARM template we are using for this deploy button][KVARM].


[KVARM]: https://github.com/Azure/azure-sdk-for-js/blob/keyvault/deploy-button-guide/sdk/keyvault/test-resources.json
[CreateAzureAccount]: https://docs.microsoft.com/en-us/learn/modules/create-an-azure-account/
[ResourceGroups]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
[AzureLocations]: https://azure.microsoft.com/en-us/global-infrastructure/locations/
[ARMIntro]: https://dev.to/azure/intro-to-microsoft-azure-resource-manager-templates-video-9cc
[AADOverview]: https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview
[HowToAADApp]: https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal
