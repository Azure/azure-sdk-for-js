# How to authenticate to Microsoft Playwright Testing service using service access token.

This guide will walk you through the steps to integrate your Playwright project where you are launching browsers from within the tests with the service. 

### Prerequisites

- An Azure account with an active subscription. If you don't have an Azure subscription, [create a free account](https://aka.ms/mpt/create-azure-subscription) before you begin.
- Your Azure account must be assigned the [Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner), [Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor), or one of the [classic administrator roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles#classic-subscription-administrator-roles).
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) must be installed in the machine from where you are running Playwright tests. 


### Setup Playwright Testing workspace

Make sure you have set up your Playwright Testing workspace by following these steps

- [Create a workspace](../../../../README.md#create-a-workspace)

### Install Microsoft Playwright Testing package

1. Run this command to install the service package

    ```sh
    npm init @azure/microsoft-playwright-testing
    ```

Installing the service package will create a service config named `playwright.service.config.ts`.

The service configuration serves to:

- Direct and authenticate Playwright to the Microsoft Playwright Testing service.
- Add Microsoft Playwright Testing reporting to your config.
- Override timeouts for service operations, if needed.

> [!NOTE]
> Make sure your project uses @playwright/test version 1.37 or above.

### Configure authentication settings

1. Enable authentication using service access tokens for the workspace by following these [steps.](https://aka.ms/mpt/enable-token-auth)

2. Update the `Playwright.service.config.ts` file to enable authentication using service tokens.

    ```javascript
    const {
        getServiceConfig,
        Auth,
    } = require("@azure/microsoft-playwright-testing");
    const { defineConfig } = require("@playwright/test");
    const config = require("./playwright.config");

    export default defineConfig(
        config,
        getServiceConfig(config, {
            defaultAuth: Auth.TOKEN,
        }),
        {
            reporter: [["list"], ["@azure/microsoft-playwright-testing/reporter"]],
        },
    );
    ```

### Obtain region endpoint

1. In the [Playwright portal](https://aka.ms/mpt/portal), copy the command under **Add region endpoint in your set up**.

    ![Set workspace endpoint](https://github.com/microsoft/playwright-testing-service/assets/12104064/d81ca629-2b23-4d34-8b70-67b6f7061a83)

    The endpoint URL corresponds to the workspace region. You might see a different endpoint URL in the Playwright portal, depending on the region you selected when creating the workspace.

### Generate Access Token

1. In the [Playwright portal](https://aka.ms/mpt/portal), select **Generate token** to create the access token.

    ![Generate access token](https://github.com/microsoft/playwright-testing-service/assets/12104064/2368ad52-d919-4c8a-b916-bdfddbd7a396)

1. Copy the access token.

### Set up environment

Ensure that the `PLAYWRIGHT_SERVICE_ACCESS_TOKEN` and `PLAYWRIGHT_SERVICE_URL` that you obtained in previous steps are available in your environment.

We recommend using `dotenv` module to manage your environment. With `dotenv` you'll be using the `.env` file to define your environment variables.

> [!IMPORTANT]
> Don't forget to add `.env` file to your `.gitignore` file in order to not leak your secrets.

```sh
npm i --save-dev dotenv
```

`.env` file
```
PLAYWRIGHT_SERVICE_ACCESS_TOKEN=eyJh...
PLAYWRIGHT_SERVICE_URL=wss://eastus.api.playwright.microsoft.com/accounts/<workspace-id>/browsers
```

### Run the tests

Run Playwright tests against browsers managed by the service using the configuration you created above.

```sh
npx playwright test --config=playwright.service.config.ts --workers=20
```