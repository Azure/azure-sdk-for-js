## Learn about different available service parameters and how to use them

Follow the steps listed in this [README](../../../../README.md) to integrate your existing Playwright test suite with the Microsoft Playwright Testing service.

This guide explains the different options available to you in the `playwright.service.config.ts` file and how to use them.

Here is the updated `playwright.service.config.ts` file with all the available options:

```typescript
const { AzureCliCredential } = require("@azure/identity");
const { getServiceConfig, ServiceOS } = require("@azure/microsoft-playwright-testing");
const { defineConfig } = require('@playwright/test');
const config = require("./playwright.config");

export default defineConfig(
  config,
  getServiceConfig(config, {
    os: ServiceOS.WINDOWS, // Select the operating system where you want to run tests.
    runId: new Date().toISOString(), // Set a unique ID for every test run to distinguish them in the service portal.
    credential: new AzureCliCredential(), // Select the authentication method you want to use with Entra
    useCloudHostedBrowsers: true, //Select if you want to use cloud-hosted browsers to run your Playwright tests
  }),
  {
    reporter: [
      ["list"],
      [
        "@azure/microsoft-playwright-testing/reporter",
        {
          enableGitHubSummary: false, // Configure it to enable/disable GitHub summary in GH Actions workflow
        },
      ],
    ],
  },
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

2. **`runId`**:
    - **Description**: This setting allows you to set a unique ID for every test run to distinguish them in the service portal.
    - **Example**:
      ```typescript
      runId: new Date().toISOString()
      ```

3. **`credential`**:
    - **Description**: This setting allows you to select the authentication method you want to use with Entra.
    - **Example**:
      ```typescript
      credential: new AzureCliCredential()
      ```

4. **`enableGitHubSummary`**:
    - **Description**: This setting allows you to configure the Microsoft Playwright Testing service reporter. You can choose whether to include the test run summary in the GitHub summary when running in GitHub Actions.
    - **Default Value**: true
    - **Example**:
    ```typescript
      reporter: [
        ["list"],
        [
          "@azure/microsoft-playwright-testing/reporter",
          {
            enableGitHubSummary: false,
          },
        ],
      ]
      ```

5. **`useCloudHostedBrowsers`**
    - **Description**: This setting allows you to select whether to use cloud-hosted browsers to run your Playwright tests. Reporting features remain available even if you disable this setting.
    - **Example**:
      ```typescript
      useCloudHostedBrowsers: true
      ```