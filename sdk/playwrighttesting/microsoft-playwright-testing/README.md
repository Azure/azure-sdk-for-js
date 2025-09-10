# Microsoft Playwright Testing preview

**Deprecation message**
 
This package has been deprecated and will no longer be maintained after **March 8, 2026**. Upgrade to the replacement package, **@azure/playwright**, to continue receiving updates. Refer to the [migration guide](https://aka.ms/mpt/migration-guidance) for guidance on upgrading. Refer to our [deprecation policy](https://azure.github.io/azure-sdk/policies_support.html) for more details.

Microsoft Playwright Testing is a fully managed Azure service that uses the cloud to enable you to run Playwright tests with much higher parallelization across different operating system-browser combinations simultaneously. This means faster test runs with broader scenario coverage, which helps speed up delivery of features without sacrificing quality. The service also enables you to publish test results and related artifacts to the service and view them in the service portal enabling faster and easier troubleshooting. With Microsoft Playwright Testing service, you can release features faster and more confidently.

Ready to get started? Jump into our [quickstart guide](#get-started)!


## Useful Links
- [Quickstart: Run end-to-end tests at scale](https://aka.ms/mpt/quickstart)
- [Quickstart: Set up continuous end-to-end testing across different browsers and operating systems](https://aka.ms/mpt/ci)
- [Explore features and benefits](https://aka.ms/mpt/about)
- [Documentation](https://aka.ms/mpt/docs) 
- [Pricing](https://aka.ms/mpt/pricing)
- [Share feedback](https://aka.ms/mpt/feedback)

## Get Started
Follow these steps to run your existing Playwright test suite with the service.

### Prerequisites

- An Azure account with an active subscription. If you don't have an Azure subscription, [create a free account](https://aka.ms/mpt/create-azure-subscription) before you begin.
- Your Azure account must be assigned the [Owner](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#owner), [Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#contributor), or one of the [classic administrator roles](https://learn.microsoft.com/azure/role-based-access-control/rbac-and-directory-admin-roles#classic-subscription-administrator-roles).
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) must be installed in the machine from where you are running Playwright tests. 

### Create a Workspace

1. Sign in to the [Playwright portal](https://aka.ms/mpt/portal) with your Azure account.

1. Create the Workspace.

    ![Create new workspace](https://github.com/microsoft/playwright-testing-service/assets/12104064/d571e86b-9d43-48ac-a2b7-63afb9bb86a8)

    |Field  |Description  |
    |---------|---------|
    |**Workspace Name** | A unique name to identify your workspace.<BR>The name can't contain special characters or whitespace. |
    |**Azure Subscription** | Select an Azure subscription where you want to create the workspace. |
    |**Region** | This is where test run data will be stored for your workspace. |

  > If you don't see this screen, select an existing workspace and go to the next section.

### Install Microsoft Playwright Testing package

1. Run this command to install the service package

    ```nodejs
    npm init @azure/microsoft-playwright-testing
    ```

Installing the service package will create a service config file named `playwright.service.config.ts`

The service configuration serves to:

- Direct and authenticate Playwright to the Microsoft Playwright Testing service.
- Add Microsoft Playwright Testing reporting to your config.
- Override timeouts for service operations, if needed.

> Make sure your project uses @playwright/test version 1.47 or above.

### Obtain region endpoint

1. In the [Playwright portal](https://aka.ms/mpt/portal), copy the command under **Add region endpoint in your set up**.

    ![Set workspace endpoint](https://github.com/microsoft/playwright-testing-service/assets/12104064/d81ca629-2b23-4d34-8b70-67b6f7061a83)

    The endpoint URL corresponds to the workspace region. You might see a different endpoint URL in the Playwright portal, depending on the region you selected when creating the workspace.

### Set up environment

Ensure that the `PLAYWRIGHT_SERVICE_URL` that you obtained in previous step is available in your environment.

We recommend using `dotenv` module to manage your environment. With `dotenv` you'll be using the `.env` file to define your environment variables.

> Don't forget to add `.env` file to your `.gitignore` file in order to not leak your secrets.

```sh
npm i --save-dev dotenv
```

`.env` file

```nodejs
PLAYWRIGHT_SERVICE_URL=wss://eastus.api.playwright.microsoft.com/accounts/workspace-id/browsers
```

### Set up Authentication

To run your Playwright tests in your Microsoft Playwright Testing workspace, you need to authenticate the Playwright client where you are running the tests with the service. This could be your local dev machine or CI machine. 

The service offers two authentication methods: Microsoft Entra ID and Access Tokens.

Microsoft Entra ID uses your Azure credentials, requiring a sign-in to your Azure account for secure access. Alternatively, you can generate an access token from your Playwright workspace and use it in your setup.

#### Set up authtication using Microsoft Entra ID 

Microsoft Entra ID is the default and recommended authentication for the service. From your local dev machine, you can use [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) to sign-in

```CLI
az login
```

**NOTE**: If you are a part of multiple Microsoft Entra tenants, make sure you sign-in to the tenant where your workspace belongs. You can get the tenant id from Azure portal, see [Find your Microsoft Entra Tenant](https://learn.microsoft.com/azure/azure-portal/get-subscription-tenant-id#find-your-microsoft-entra-tenant). Once you get the ID, sign-in using the command `az login --tenant <TenantID>`

#### Set up authentication using access tokens

You can generate an access token from your Playwright Testing workspace and use it in your setup. However, we strongly recommend Microsoft Entra ID for authentication due to its enhanced security. Access tokens, while convenient, function like long-lived passwords and are more susceptible to being compromised.

1. To use access token based authentication, [Enable access-token based authentication](https://aka.ms/mpt/authentication)

2. [Set up authentication using access tokens](https://aka.ms/mpt/access-token)

> We strongly recommend using Microsoft Entra ID for authentication to the service. If you are using access tokens, see [How to Manage Access Tokens](https://aka.ms/mpt/access-token)

*NOTE:* To use Microsoft Playwright Testing in CI pipelines, you need to configure authentication with the service from pipeline, see [set up continuous end-to-end testing across different browsers and operating systems](https://aka.ms/mpt/ci)

### Run the tests

Run Playwright tests against browsers managed by the service using the configuration you created above.

```nodejs
npx playwright test --config=playwright.service.config.ts --workers=20
```

## Next steps

- Run tests in a [CI/CD pipeline.](https://aka.ms/mpt/configure-pipeline)

- Learn how to [manage access](https://aka.ms/mpt/manage-access) to the created workspace.

- Experiment with different number of workers to [determine the optimal configuration of your test suite](https://aka.ms/mpt/parallelism).

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos is subject to those third-party's policies.
