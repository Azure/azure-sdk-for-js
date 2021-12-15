# Azure Perf library for JavaScript

## Getting started

To start a new perf test project for the your SDK in the js repository, follow the steps in the [GettingStarted.md](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/perf/GettingStarted.md).

Link to the wiki - [Writing-Performance-Tests](https://github.com/Azure/azure-sdk-for-js/wiki/Writing-Performance-Tests) (has the same contents as the GettingStarted docs)

## KeyConcepts

- A **PerfTest** test is a test that will be executed repeatedly to show both the performance of the program, and how it behaves under stress.
- Tests have an asynchronous method called `run` which is executed based on the duration, iterations, and parallel options provided for the perf test. More about options below.
- A **PerfOption** is a command line parameter. We use `minimist` to parse them appropriately, and then to consolidate them in a dictionary of options that is called `PerfOptionDictionary<string>`. The dictionary class accepts a union type of strings that defines the options that are allowed by each test.
- Some default options are parsed by the Perf program. Their longer names are: `help`, `no-cleanups`, `parallel`, `duration`, `warmup`, `iterations`, `no-cleanup` and `milliseconds-to-log`.
- Perf tests are executed as many times as possible until the `duration` parameter is specified. This process may repeat as many `iterations` are given. Before each iteration, tests might be called for a period of time up to `warmup`, to adjust to possible runtime optimizations. In each iteration, as many as `parallel` instances of the same test are called without waiting for each other, letting the event loop decide which one is prioritized (it's not true parallelism, but it's an approximation that aligns with the design in other languages, we might improve it over time).
- Each test can have a `globalSetup` method, which is called once before the process begins, a `globalCleanup` method, which is called once after the process finishes.
- Each test can have a `setup` method, which is called as many times as test instances are created (up to `parallel`), and help specify local state for each test instance. A `cleanup` method is also optional, called the same amount of times, but after finishing running the tests.
- `test-proxies` url option - this option can be leveraged to avoid hitting throttling scenarios while testing the services. This option lets the requests go through proxy server(s) based on the url(s) provided, we run the `run` method once in record mode to save the requests and responses in memory and then a ton of times in playback. Workflow with the test-proxies below.

## Workflow with test proxy

Steps below constitute the workflow of a typical perf test.

- test resources are setup
  - hitting the live service
- then start record
  - making a request to the proxy server to start recording
  - proxy server gives a recording id, we'll use this id to save the actual requests and responses
- run the `run` method once
  - proxy-server saves all the requests and responses in memory
- stop record
  - making a request to the proxy server to stop recording
- start playback
  - making a request to the proxy server to start playback
  - we use the same recording-id that we used in the record mode since that's the only way proxy-server knows what requests are supposed to be played back
  - As a response, we get a new recording-id, which will be used for future playback requests
- run the `run` method again
  - based on the duration, iterations, and parallel options provided for the perf test
  - all the requests in the `run` method are played back since we have already recorded them before
- when the `run` loops end, stop playback
  - making a request to the proxy server to stop playing back
- delete the live resources that we have created before

## Examples

Check the [test folder](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/perf/test/).

## Running the tests in `/test` folder

> `ts-node ./test/index.spec.ts ${testClassName} ${options}`

### Example

> `ts-node ./test/index.spec.ts NoOp --parallel 2 --duration 7 --iterations 2 --warmup 2`

If you would like to run all the tests at once in sequence, use the following command

> `rushx test:node`

## Troubleshooting

TODO

## Next steps

Check the [source](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/perf/src/) folder and the [test folder](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/perf/test/).

Also check the Perf EPIC, here: https://github.com/Azure/azure-sdk-for-js/issues/8057

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftest-utils%2Fperf%2FREADME.png)
