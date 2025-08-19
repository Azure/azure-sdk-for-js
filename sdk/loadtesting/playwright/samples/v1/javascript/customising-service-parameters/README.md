## Learn about different available service parameters and how to use them

Follow the steps listed in this [README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/loadtesting/playwright/README.md) to integrate your existing Playwright test suite with the Azure Playwright service.

This guide explains the different options available to you in the `playwright.service.config.ts` file and how to use them.

Here is the updated `playwright.service.config.ts` file with all the available options:

```typescript
const { AzureCliCredential } = require("@azure/identity");
const { getServiceConfig, ServiceOS } = require("@azure/playwright");
const { defineConfig } = require('@playwright/test');
const config = require("./playwright.config");

export default defineConfig(
  config,
  getServiceConfig(config, {
    os: ServiceOS.WINDOWS, // Select the operating system where you want to run tests.
    credential: new AzureCliCredential(), // Select the authentication method you want to use with Entra.
  })
);

```

## Settings in `playwright.service.config.ts` file

1. **`os`**:
    - **Description**: This setting allows you to choose the operating system where the browsers running Playwright tests will be hosted.
    - **Available Options**:
        - `ServiceOS.WINDOWS` for Windows OS.
        - `ServiceOS.LINUX` for Linux OS.
    - **Default Value**: `ServiceOS.LINUX`
    - **Example**:
      ```typescript
      os: ServiceOS.WINDOWS
      ```

2. **`credential`**:
    - **Description**: This setting allows you to select the authentication method you want to use with Entra.
    - **Example**:
      ```typescript
      credential: new AzureCliCredential()
      ```

4. **`runName`**:
    - **Description**: This setting allows you to set a run name for every test run in the service portal.
    - **Example**:
      ```typescript
      runName: "Playwright Service Test" 
      ```
