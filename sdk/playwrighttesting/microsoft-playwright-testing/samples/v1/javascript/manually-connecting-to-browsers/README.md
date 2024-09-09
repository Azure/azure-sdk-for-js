# How to integrate your test suite with Microsoft Playwright Testing service if you are manually launching browsers in tests

This guide will walk you through the steps to integrate your Playwright project, where you are launching browsers from within the tests, with the service.

### Prerequisites

- An Azure account with an active subscription. If you don't have an Azure subscription, [create a free account](https://aka.ms/mpt/create-azure-subscription) before you begin.
- Your Azure account must be assigned the [Owner](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#owner), [Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles#contributor), or one of the [classic administrator roles](https://learn.microsoft.com/azure/role-based-access-control/rbac-and-directory-admin-roles#classic-subscription-administrator-roles).
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) must be installed in the machine from where you are running Playwright tests. 


### Setup Playwright Testing workspace

Make sure you have set up your Playwright Testing workspace by following these steps:

- [Create a workspace](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/microsoft-playwright-testing/README.md#create-a-workspace)

### Install Microsoft Playwright Testing package

1. Run this command to install the service package

    ```sh
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

```sh
PLAYWRIGHT_SERVICE_URL=wss://eastus.api.playwright.microsoft.com/accounts/<workspace-id>/browsers
```

### Configure browsers to be launched on the service

In the test project, wherever there is a manual browser launch or manual connect to a remote browser, replace it with the below code snippet

```javascript
// old code
// await chromium.launch();
// await chromium.connect('ws://localhost:4444');

// new code
const { wsEndpoint, options } = await getConnectOptions();
const browser = await chromium.connect(wsEndpoint, options);
```

### Sign in to Azure

You need to sign in to Azure using Azure CLI to enable authentication via Entra ID.  Run the command to sign-in

```azurecli
az login
```

**NOTE**: If you are a part of multiple tenants, you will have to login to a particular tenant. Run `az login --tenant=<TENANT_ID>' to sign in to the tenant where the workspace is created. You can find the tenant id through these [steps.](https://learn.microsoft.com/entra/fundamentals/how-to-find-tenant)

### Run the tests

Run Playwright tests against browsers managed by the service using the configuration you created above.

```sh
npx playwright test --config=playwright.service.config.ts --workers=20
```
