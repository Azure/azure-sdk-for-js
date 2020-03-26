# Azure PerfStress library for JavaScript

## Getting started

Install it with:

```
rush add -p @azure/test-utils-perfstress
```

Then, in a folder called `perfstress` inside of your client, create a new TypeScript file,
with a name similar to `myTest.spec.ts`, with something similar to the following test:

```ts
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "@azure/test-utils-perfstress";

export class MyTest extends PerfStressTest<string> {
  public options = {};

  async run(): Promise<void> {
  }
}
```

Make sure this folder is included in the `include` array on the `tsconfig.json` file.

Create a new TypeScript file in the `perfstress` directory called `index.spec.ts`, with content similar to:

```ts
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";

// Tests:
import { MyTest } from "./myTest.spec";

console.log("=== Starting a PerfStress test for MyClient ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([
    MyTest,
  ])
);

perfStressProgram.run();
```

Add the following script to the list of scripts in your `package.json`:

```json
  "perfstress-test:node": "rushx build && node dist-esm/test/index.spec.js",
```

Now you'll be able to call your new PerfStress test as follows:

```
npm run perfstress-test:node -- MyTest --warmup 2 --duration 4 --iterations 2
```

## KeyConcepts

- A **PerfStress** is a test that will be executed repeatedly to show both the performance of the program, and how it behaves under stress.
- The **PerfStressTestError** class specifies expected errors on PerfStress tests.
- A **PerfStressOption** is a command line parameter. We use `minimist` to parse them appropriately, and then to consolidate them in a dictionary of options that is called `PerfStressOptionDictionary<string>`. The dictionary class accepts a union type of strings that defines the options that are allowed by each test.
- Some default options are parsed by the PerfStress program. Their longer names are: `help`, `no-cleanups`, `parallel`, `duration`, `warmup`, `iterations`, `no-cleanup` and `milliseconds-to-log`.
- PerfStress tests are executed as many times as possible until the `duration` parameter is specified. This process may repeat as many `iterations` are given. Before each iteration, tests might be called for a period of time up to `warmup`, to adjust to possible runtime optimizations. In each iteration, as many as `parallel` instances of the same test are called without waiting for each other, letting the event loop decide which one is prioritized (it's not true parallelism, but it's an approximation that aligns with the design in other languages, we might improve it over time).
- Each test can have a `globalSetup` method, which is called once before the process begins, a `globalCleanup` method, which is called once after the process finishes.
- Each test can have a `setup` method, which is called as many times as test instances are created (up to `parallel`), and help specify local state for each test instance. A `cleanup` method is also optional, called the same amount of times, but after finishing running the tests.

## Examples

Check the [test folder](./test/).

## Troubleshooting

TODO

## Next steps

Check the [source](./src/) folder and the [test folder](./test/).



## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

### Testing

To run our tests, first install the dependencies (with `npm install` or `rush install`),
then run the unit tests with: `npm run unit-test`.

Some of our tests aim to reproduce the behavior of our library against remotely
available endpoints. These are executed using previously recorded HTTP request and
responses.

You can read more about the tests of this project [here](test/README.md).

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftest-utils%2Fperfstress%2FREADME.png)