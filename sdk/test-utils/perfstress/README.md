# Azure PerfStress library for JavaScript

## Getting started

To start a new perf test project for the your SDK in the js repository, follow the steps in the [GettingStarted.md](./GettingStarted.md).

Link to the wiki - [Writing-Performance-Tests](https://github.com/Azure/azure-sdk-for-js/wiki/Writing-Performance-Tests) (has the same contents as the GettingStarted docs)

## KeyConcepts

- A **PerfStressTest** test is a test that will be executed repeatedly to show both the performance of the program, and how it behaves under stress.
- Tests can have both a synchronous method called `run`, and an asynchronous method called `runAsync`. By default, `runAsync` will be the only method executed. If the command line parameter `--sync` is passed, only the `run` method will be executed instead.
- A **PerfStressOption** is a command line parameter. We use `minimist` to parse them appropriately, and then to consolidate them in a dictionary of options that is called `PerfStressOptionDictionary<string>`. The dictionary class accepts a union type of strings that defines the options that are allowed by each test.
- Some default options are parsed by the PerfStress program. Their longer names are: `help`, `no-cleanups`, `parallel`, `duration`, `warmup`, `iterations`, `no-cleanup` and `milliseconds-to-log`.
- PerfStress tests are executed as many times as possible until the `duration` parameter is specified. This process may repeat as many `iterations` are given. Before each iteration, tests might be called for a period of time up to `warmup`, to adjust to possible runtime optimizations. In each iteration, as many as `parallel` instances of the same test are called without waiting for each other, letting the event loop decide which one is prioritized (it's not true parallelism, but it's an approximation that aligns with the design in other languages, we might improve it over time).
- Each test can have a `globalSetup` method, which is called once before the process begins, a `globalCleanup` method, which is called once after the process finishes.
- Each test can have a `setup` method, which is called as many times as test instances are created (up to `parallel`), and help specify local state for each test instance. A `cleanup` method is also optional, called the same amount of times, but after finishing running the tests.

## Examples

Check the [test folder](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/test-utils/perfstress/test/).

## Troubleshooting

TODO

## Next steps

Check the [source](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/test-utils/perfstress/src/) folder and the [test folder](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/test-utils/perfstress/test/).

Also check the PerfStress EPIC, here: https://github.com/Azure/azure-sdk-for-js/issues/8057

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftest-utils%2Fperfstress%2FREADME.png)
