# Azure SDK for JavaScript Smoke Test

The Smoke Tests validate customer scenarios by creating an application which
uses package dependencies, loads all packages into a single process, and
executes code samples to ensure basic end to end scenarios work as expected.

Smoke Tests are meant to be run periodically in an Azure DevOps pipeline. See
[`smoke-tests.yml`](./smoke-tests.yml) to configure Smoke Tests in an Azure
DevOps pipeline. When run in an Azure DevOps pipeline specify the `-CI` flag to
ensure environment variables are properly set and error/warning messages are
properly surfaced during the execution.

Smoke Tests can be run locally to debug failures.

This Smoke Test tool automates the process of deploying resources, preparing,
and executing samples.

Samples are opt-out and can be configured in the `package.json` file of the
package.

## Requirements

- AAD Application with `Owner` permissions to an Azure subscription
- PowerShell 7
- Node 12.x
- Azure SDK for JS [`dev-tool`](../tools/dev-tool)

## Configuring Samples

By default _all_ JavaScript samples are prepped, loaded, and executed. Samples
are assumed to work with just the environment variables defined in
`test-resources.json` for the service. Samples which have additional resource
requirements should opt out of execution.

To opt-out, set the value in the `sdk/<service>/<package>/package.json`.

To opt-out of all smoke tests:

```json
  "//smokeTestConfiguration": {
    "skipFolder": true
  }
```

To opt-out particular files that will fail unnecessarily in tests (note files
not skipped will be included in smoke tests):

```json
  "//smokeTestConfiguration": {
    "skip": [
      "anonymousCred.js",
      "azureAdAuth.js",
      "basic.js",
      "customPipeline.js",
      "iterators.js",
      "sharedKeyCred.js"
    ]
  },
```

## Running Smoke Tests

### Initialize Smoke Tests

Run `Initialize-SmokeTests.ps1` to deploy resources and prepare samples. The
deploy script will search for packages that have samples, deploy resources
specified in `test-resources.json`, prep samples to execute in the JS Smoke Test
harness, and build the Smoke Test run manifest.

Omit the `-CI` flag when running locally to have environment variables set in
the context of your current PowerShell session.

Use the `-ServiceDirectory` parameter to isolate testing to a single Service
Directory (e.g. `-ServiceDirectory appconfiguration`)

In the folder `common/smoke-tests/`

```powershell
.\Initialize-SmokeTests.ps1
  -TestApplicationId <test_application_aad_application_id> `
  -TestApplicationSecret <test_application_aad_secret>`
  -TestApplicationOid <test_application_service_principal_object_id> `
  -TenantId <tenant_id>`
  -SubscriptionId <subscription_id> `
  -ServiceDirectory <service_directory>
```

### Run tests

In the folder `common/smoke-tests/`

```powershell
# Install collected dependencies
npm i

# Run smoke tests
node run.js
```
