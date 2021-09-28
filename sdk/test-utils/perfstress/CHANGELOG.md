# Release History

## 1.0.0 (Unreleased)

### 2021-09-24

- Instead of using the cached proxy-clients(to leverage the proxy-tool), we now get a new client for each of the instantiated PerfStressTest classes. [#17832](https://github.com/Azure/azure-sdk-for-js/pull/17832)

### 2021-09-23

- Bug fix - Running the perf framework with `--<option> 0` does not work correctly as it picks the default value instead. Fixed in [#17829](https://github.com/Azure/azure-sdk-for-js/pull/17829).

### 2021-08-05

- Adds test-proxy tool support to the perf framework. With this, the tests can avoid service throttling by hitting the test-proxy instead to get the recorded responses.
  [#16518](https://github.com/Azure/azure-sdk-for-js/pull/16518)

### 2021-07-26

- Average number of requests so far was reported as NaN when the lastMillisecondsElapsed=0.
  Fixed in [#16583](https://github.com/Azure/azure-sdk-for-js/pull/16583)

### 2021-07-14

- Removed the run method in the `PerfStressTest` class as we only deal with the async methods when it comes to performance.

### 2020-04-22

- Merged the first working implementation of perfstress.
