# How to authenticate to Playwright workspaces using service access token.

This guide will walk you through the steps to integrate your Playwright project where you are launching browsers from within the tests with the service.

### Prerequisites

- An Azure account with an active subscription. If you don't have an Azure subscription, [create a free account](https://aka.ms/pww/docs/create-azure-subscription) before you begin.
- Your Azure account must be assigned the [Owner](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#owner), [Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#contributor), or one of the [classic administrator roles](https://learn.microsoft.com/azure/role-based-access-control/rbac-and-directory-admin-roles#classic-subscription-administrator-roles).
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) must be installed in the machine from where you are running Playwright tests.

### Setup Azure Playwright workspace

Make sure you have set up your Playwright Workspace in Azure App Testing by following these steps:

- [Create a workspace](https://aka.ms/pww/docs/create)

### Install Azure Playwright package

1. Run this command to install the service package

    ```sh
    npm init @azure/playwright@latest
    ```

Installing the service package will create a service config named `playwright.service.config.ts`.

The service configuration serves to:

- Direct and authenticate Playwright to the Playwright Workspaces.
- Override timeouts for service operations, if needed.

> Make sure your project uses @playwright/test version 1.47 or above.

### Configure authentication settings

1. Enable authentication using service access tokens for the workspace by following these [steps.](https://aka.ms/pww/docs/enable-token-auth)

2. Update the `playwright.service.config.ts` file to enable authentication using service tokens.

    ```javascript
    const {
        createAzurePlaywrightConfig,
        ServiceAuth,
    } = require("@azure/playwright");
    const { defineConfig } = require("@playwright/test");
    const config = require("./playwright.config");

    export default defineConfig(
        config,
        createAzurePlaywrightConfig(config, {
            serviceAuthType: ServiceAuth.ACCESS_TOKEN,
        })
    );
    ```

### Obtain region endpoint

1. In the [Azure portal](https://portal.azure.com/), copy the command under **Add region endpoint in your set up**.

    ![Set workspace endpoint](https://aka.ms/pww/docs/copyurlsnapshot)

    The endpoint URL corresponds to the workspace region. You might see a different endpoint URL in the Azure portal, depending on the region you selected when creating the workspace.

### Generate Access Token

To generate an access token for your Playwright workspace, follow the detailed instructions in [How to Manage Access Tokens](https://aka.ms/pww/docs/manage-access-tokens).

Once you have generated the access token, copy it for use in the next step.

### Set up environment

Ensure that the `PLAYWRIGHT_SERVICE_ACCESS_TOKEN` and `PLAYWRIGHT_SERVICE_URL` that you obtained in previous steps are available in your environment.

We recommend using `dotenv` module to manage your environment. With `dotenv` you'll be using the `.env` file to define your environment variables.

> Don't forget to add `.env` file to your `.gitignore` file in order to not leak your secrets.

```sh
npm i --save-dev dotenv
```

`.env` file

```
PLAYWRIGHT_SERVICE_ACCESS_TOKEN=eyJh...
PLAYWRIGHT_SERVICE_URL=wss://eastus.api.playwright.microsoft.com/playwrightworkspaces/workspace-id/browsers
```

### Run the tests

Run Playwright tests against browsers managed by the service using the configuration you created above.

```sh
npx playwright test --config=playwright.service.config.ts --workers=20
```
