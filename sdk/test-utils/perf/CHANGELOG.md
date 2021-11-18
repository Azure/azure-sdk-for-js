# Release History

## 1.0.0 (Unreleased)

### 2021-11-18

- Respect the `longName` option when provided in the options object
  [#18693](https://github.com/Azure/azure-sdk-for-js/pull/18693)

### 2021-11-15

- Throw an error when an unrecognized command-line argument is encountered
  [#18708](https://github.com/Azure/azure-sdk-for-js/pull/18708)

### 2021-10-29

- Add an elapsed time column to the snapshot log output.
  [#18353](https://github.com/Azure/azure-sdk-for-js/pull/18353)

### 2021-10-27

- Log dependencies (`@azure` packages only) on perf test start. Extended output of transitive dependencies can be enabled using the new `--list-transitive-dependencies` flag.
  [#18366](https://github.com/Azure/azure-sdk-for-js/pull/18366)

### 2021-10-20

- Clean up some naming: `PerfStress` to `Perf` everywhere; also rename the `runAsync` method to `run`.
  [#18290](https://github.com/Azure/azure-sdk-for-js/pull/18290)

### 2021-10-05

- Support multiple test proxies
  [#18031](https://github.com/Azure/azure-sdk-for-js/pull/18031)

### 2021-10-01

- Calls runAsync() once before starting recording, to avoid capturing one-time setup like authorization requests.
  [#17993](https://github.com/Azure/azure-sdk-for-js/pull/17993)

### 2021-09-29

- Allows connecting to the proxy-tool with https with the "insecure" boolean option.
  [#17898](https://github.com/Azure/azure-sdk-for-js/pull/17898)

- [Bug Fix] Fixes [#17954](https://github.com/Azure/azure-sdk-for-js/issues/17954), boolean options parsed incorrectly as strings is rectified.

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
