## Azure test-utils-recorder-new library for JavaScript

This is an experimental tool to record and playback the tests in the JS repo by leveraging the unified out-of-proc test proxy server. This library is still under construction.
Feature work is being tracked at [#15829](https://github.com/Azure/azure-sdk-for-js/issues/15829)

## Resources

- https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/Azure.Sdk.Tools.TestProxy
- https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/docker#build-and-run
- https://github.com/HarshaNalluru/azure-sdk-for-js/tree/harshan/recorder/unified

## Running the proxy server

Run this command

- `docker run -v temp-location:/etc/testproxy -p 5001:5001 -p 5000:5000 azsdkengsys.azurecr.io/engsys/ubuntu_testproxy_server:latest`
  (Eventually, recorder will trigger this for you!)
  [Note: Update `temp-location` in the command to your desired location.]

## Running the test at test-utils\testing-recorder-new

- Navigate to the test-utils\testing-recorder-new folder
- Run `rush update && rush build -t .`
- Run `rushx test:node`
- Run `rushx test:browser`
