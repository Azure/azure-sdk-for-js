## Azure @azure-tools/test-recorder-new library for JavaScript

This is an experimental tool to record and playback the tests in the JS repo by leveraging the unified out-of-process test proxy server. This library is still under construction.
Feature work is being tracked at [#15829](https://github.com/Azure/azure-sdk-for-js/issues/15829)

## Resources

- [Azure SDK Tools Test Proxy](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/Azure.Sdk.Tools.TestProxy)
- [Using Test Proxy with docker container](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/docker#build-and-run)

## Running the proxy server

Run this command

> `docker run -v temp-location:/etc/testproxy -p 5001:5001 -p 5000:5000 azsdkengsys.azurecr.io/engsys/testproxy-lin:latest`

(Eventually, recorder will trigger this for you!)

[Note: Update `temp-location` in the command to your desired location.]

If the above command doesn't work directly, try [Troubleshooting Access to Public Container Registry](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/docker#troubleshooting-access-to-public-container-registry).

Reference: [Using Test Proxy with docker container](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/docker#build-and-run)

## Run the tests using recorder-new at `test-utils/testing-recorder-new`

- Navigate to the test-utils\testing-recorder-new folder
- Run `rush update && rush build -t .`
- Run `rushx test:node`
- Run `rushx test:browser`

## Copying the recordings saved in the container

For some reason, the volume mapping did not work for you, copy the recordings manually.

- `docker cp <container_id>:/etc/testproxy/ temp-location`

  [This will be fixed eventually [#Issue-17138](https://github.com/Azure/azure-sdk-for-js/issues/17138)]
