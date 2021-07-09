## Resources

- https://github.com/Azure/azure-sdk-tools/tree/feature/http-recording-server/tools/test-proxy/Azure.Sdk.Tools.TestProxy
- https://github.com/Azure/azure-sdk-tools/tree/feature/http-recording-server/tools/test-proxy/docker#build-and-run
- https://github.com/HarshaNalluru/azure-sdk-for-js/tree/harshan/recorder/unified
- https://github.com/nguerrera/azure-sdk-for-js/cf43c0cb8c7b9430283a0f4b207b5341958aebe8

## Running the proxy server

Run this command

- `docker run -v <your-volume-name-or-location>:/etc/testproxy -p 5001:5001 -p 5000:5000 azsdkengsys.azurecr.io/engsys/ubuntu_testproxy_server:latest`
  (Eventually, recorder will trigger this for you!)

## Running the test at test-utils\recorder-new

- Navigate to the test-utils\recorder-new folder
- Run `rush update && rush build -t .`
- Run `rushx unit-test:node`
