## Test Utils - Record and Playback

This library provides interfaces and helper methods to equip the sdks in the azure-sdk-for-js repo with the recording and playback capabilities for the tests, it targets HTTP requests in both Node.js and the Browsers.

As a "test-utils" library, it is supposed to be added only as a devDependency and should be used only for the tests of an sdk.

This library assumes that the tests rely on mocha test framework(and karma test runner for browser tests).

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/test-utils/recorder/README.png)
