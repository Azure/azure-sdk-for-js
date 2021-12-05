## Azure @azure-tools/test-recorder-new library for JavaScript

This is an experimental tool to record and playback the tests in the JS repo by leveraging the unified out-of-process test proxy server. This library is still under construction.
Feature work is being tracked at [#15829](https://github.com/Azure/azure-sdk-for-js/issues/15829)

## Resources

- [Azure SDK Tools Test Proxy](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/Azure.Sdk.Tools.TestProxy)
- [Using Test Proxy with docker container](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/docker#build-and-run)

## Running the test-proxy tool

### With the `docker run` command

- Run this command

  > `docker run -v /workspaces/azure-sdk-for-js/:/srv/testproxy -p 5001:5001 -p 5000:5000 azsdkengsys.azurecr.io/engsys/testproxy-lin:latest`

  Map the root directory of the azure-sdk-for-js repo to `/srv/testproxy` inside the container for an accurate location while generating recordings.

  (Eventually, recorder will trigger this for you!)

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

## Run the tests using recorder-new at `test-utils/testing-recorder-new`

- Navigate to the test-utils\testing-recorder-new folder
- Run `rush update && rush build -t .`
- Run `rushx test:node`
- Run `rushx test:browser`

## Copying the recordings saved in the container

For some reason, the volume mapping did not work for you, copy the recordings manually.

- `docker cp <container_id>:/srv/testproxy/ temp-location`

  [This will be fixed eventually [#Issue-17138](https://github.com/Azure/azure-sdk-for-js/issues/17138)]
