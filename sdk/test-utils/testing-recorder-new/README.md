## Azure testing-recorder-new library for JavaScript

This package tests the test-utils-recorder-new library, which is an experimental tool to record and playback the tests in the JS repo by leveraging the unified out-of-proc test proxy server. This library is still under construction.
Feature work is being tracked at [#15829](https://github.com/Azure/azure-sdk-for-js/issues/15829)

To run the tests, build the package and run the test:node command.

You will need to create a local `.env` file under the same directory as this readme. Within it, define:

```
      "TEST_MODE",
      "STORAGE_CONNECTION_STRING",
      "STORAGE_SAS_URL",
      "TABLES_SAS_CONNECTION_STRING"
