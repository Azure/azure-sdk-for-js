## Azure @azure-tools/test-recorder library for JavaScript

**Note: This project is a test utility that assits with testing the packages maintained at the Azure SDK for JavaScript repository. This is not intended for the public utilization.**

This tool helps to record and playback the tests in the JS repo by leveraging the unified out-of-process test proxy server.

## Resources

- [Migration guide to recorder v2 from v1](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/MIGRATION.md)
- [Azure SDK Tools Test Proxy](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/Azure.Sdk.Tools.TestProxy)
- [Using Test Proxy with docker container](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/docker#build-and-run)

## Running the tests along with the test-proxy tool

### With the `dev-tool` commands

- The following commands run the tests with the default configs, and concurrently runs the proxy tool in record/playback modes if it is not already active. Additionally, more options can be passeed to override the default configs.
  - `dev-tool run test:node-js-input -- --timeout 5000000 'dist-esm/test/**/*.spec.js'`
  - `dev-tool run test:node-ts-input -- --timeout 1200000 --exclude 'test/**/browser/*.spec.ts' 'test/**/*.spec.ts'`
  - `dev-tool run test:browser`
    Read more at [dev-tool commands #usage](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/dev-tool/README.md#usage)

Follow the below two methods if you wish to run the proxy tool yourself without relying on the `dev-tool` commands.

### With the `docker run` command

- Run this command

  > `docker run -v /workspaces/azure-sdk-for-js/:/srv/testproxy -p 5001:5001 -p 5000:5000 azsdkengsys.azurecr.io/engsys/testproxy-lin:latest`

  Map the root directory of the azure-sdk-for-js repo to `/srv/testproxy` inside the container for an accurate location while generating recordings.

  Add `--add-host host.docker.internal:host-gateway` for linux to access host's network(to access `localhost`) through `host.docker.internal`.
  Docker for Windows and Mac support `host.docker.internal` as a functioning alias for localhost.

  If the above command doesn't work directly, try [Troubleshooting Access to Public Container Registry](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/docker#troubleshooting-access-to-public-container-registry).

  Reference: [Using Test Proxy with docker container](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/docker#build-and-run)

### (OR) With the `dotnet tool`

- Install [.Net 5.0](https://dotnet.microsoft.com/download)
- Install test-proxy
  > `dotnet tool install azure.sdk.tools.testproxy --global --add-source https://pkgs.dev.azure.com/azure-sdk/public/_packaging/azure-sdk-for-net/nuget/v3/index.json --version 1.0.0-dev*`
- After successful installation, run the tool:

  > `test-proxy --storage-location <root-of-the-repo>`

  [ `root-of-the-repo example` - `/workspaces/azure-sdk-for-js` if you're on codespaces]
