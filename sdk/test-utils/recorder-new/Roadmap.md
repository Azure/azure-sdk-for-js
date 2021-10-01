# Azure @azure-tools/test-recorder-new library for JavaScript

`@azure-tools/test-recorder-new` leverages the [test-proxy](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy) tool built by ENG SYS.

[#15829](https://github.com/Azure/azure-sdk-for-js/issues/15829) tracks the work being done to make the `@azure-tools/test-recorder-new` tool complete.

This document talks about the roadmap for the `@azure-tools/test-recorder-new` tool.

| ICON | STATUS         |
| ---- | -------------- |
| ✅   | Done           |
| 🔒   | To be Unlocked |
|      |                |

## Initial steps

- ✅ Prototype with a package that uses core-http
- ✅ Prototype with a package that uses core-rest-pipeline
- ✅ Proxy-tool should support the both the browser tests and the node tests
- 🔒 Figure out a seamless way to start and stop the proxy-tool
  - With the current prototype, we run and stop the docker container manually, we need a script to make it a black box and run when the test script is triggered
- ✅ Unify the prototype recorders for core-http and core-rest-pipeline based SDKs.
- ✅ Unify the browser and node recorders.
- 🔒 Not all core-v1 SDKs allow passing httpClient option, not all core-v2 SDKs allow adding policies via pipeline option.
  [#16876](https://github.com/Azure/azure-sdk-for-js/issues/16876)

## Basic Recorder Features

(Assuming the proxy-tool is running)

- ✅ Basic Skeleton
  - Creating the recorder
  - Plugging in to the Clients
    - Pass it as `httpClient` in the client options for core-v1 SDKs,
    - Add it to the policies with `recorderHttpPolicy` for core-v2 SDKs
  - Take the test context (to generate recordings at the similar location as the ones with old recorder)
  - Allow starting the recorder
  - Putting the test code
  - Allow stopping the recorder
- ✅ Based on the TEST_MODE env, supports live, record and playback modes

## Post-Basic Features

- 🔒 Recorder should work with the basic AAD credential, not just the connection string
- 🔒 Recorder(and proxy tool) should allow tweaking the request bodies or paths(customizing outgoing requests) during playback
  - 🔒 uuids can be randomly generated within the SDK which makes the requests dynamic in playback, so customizing outgoing requests should be supported
- 🔒 Recorder to support the transforms supported by the test-proxy

### Masking secrets & Cred Scan

- 🔒 Allow sanitizing the recordings by providing APIs to let users
  - Provide regexes/plain-strings and the corresponding fake values
  - ENV vars and corresponding fake secrets
  - Connection strings and the fake conn strings
- 🔒 Provide APIs to remove the headers for all the recordings as needed
- 🔒 Proxy tool should understand parts of the URL and do the replacements accordingly
- 🔒 Scope sanitization to be allowed to remove false positives from cred scan
- 🔒 Access tokens to be masked automatically before saving the recordings
- 🔒 Warn users to add replacements/transforms if we detect any secrets being leaked. - (Running credscan on the recordings before generating the reports)

### Clean up

- 🔒 Recordings have a lot of headers that can be dynamic, could be better if they are stripped out or updated with defaults, this would make the recordings smaller.

## Testing `@azure-tools/test-recorder-new` package

- ✅ Tests for the tool
  - ✅ a separate server to run a fake service and return responses
  - ✅ to be able to test the proxy-tool's features
  - ✅ should work for both node and browser
  - ✅ server is supposed to run in parallel to the tests
  - 🔒 to be able to start the proxy-tool in parallel too
- ✅ Unit Tests
- 🔒 Corner cases - Example: Is it ok to start twice without calling stop?
- ✅ To make sure it works with our core-v1 and core-v2 packages all the way, start a standalone testing project which uses core-v1 and core-v2 sample SDKs and show how to leverage the recorder

## Merging with `@azure-tool/test-recorder` package

- 🔒 Instead of publishing a new package altogether, we'll merge this into the already published `@azure-tool/test-recorder` and release it again.

## Documentation & Ready to use

- 🔒 Public API - document it from the perspective of the user
- 🔒 Migrate tests of a core-v1 SDK and a core-v2 SDK as an example
- 🔒 Update the template package
