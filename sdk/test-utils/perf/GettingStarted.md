# Writing Performance Tests

## [Index](#index)

- [Sample perf test project](#sample-perf-test-project)
- [Setting up the project](#setting-up-the-project)
- [Writing perf tests](#writing-perf-tests)
  - [Entry Point](#entry-point)
  - [Base Class](#base-class)
  - [Test File](#test-file)
  - [Custom Options](#custom-options)
- [Executing the perf tests](#executing-the-perf-tests)
  - [Command to run](#command-to-run)
  - [Adding Readme/Instructions](#adding-readme/instructions)
  - [Testing an older version](#testing-an-older-version)
- [Using Proxy Tool](#using-proxy-tool)

## [Sample perf test project](#sample-perf-test-project)

A [sample project](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/template/template-perf-tests) has been created which demonstrates a basic perf test against the existing `@azure/template` project. Take a look at this sample to see the standard perf test project structure.

## [Setting up the project](#setting-up-the-project)

To add perf tests for the `sdk/<service>/<service-sdk>` package, follow the steps below.

1.  Create a new folder for the perf tests.

    Path- `sdk/<service>/<service-sdk>-perf-tests`

    (Create the `<service-sdk>-perf-tests` folder if that doesn't exist)

2.  This new perf test project will be managed by the rush infrastructure in the repository, with the package name `@azure-tests/perf-<service-sdk>`. To allow rush to manage the project, add the following entry in `rush.json`

    ```
        {
          "packageName": "@azure-tests/perf-<service-sdk>",
          "projectFolder": "sdk/<service>/<service-sdk>-perf-tests",
          "versionPolicyName": "test"
        }

    ```

3.  Tests will live under `sdk/<service>/<service-sdk>-perf-tests/test`
4.  Add a `package.json` such as [example-perf-package.json](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/storage-file-datalake-perf-tests/package.json) at `sdk/<service>/<service-sdk>-perf-tests` folder.

    Make sure to import your `<service-sdk>` and the `test-utils-perf` project.

    ```json
      "dependencies": {
         "@azure/<service-sdk>": "^<version-in-master-branch>",
         "@azure-tools/test-perf": "^1.0.0"
       }
    ```

    _Note: `"@azure-tools/test-perf"` is not a published npm package._

    Set the name of the package and mark it as private.

    ```json
     "name": "@azure-tests/perf-<service-sdk>",
     "sdk-type": "perf-test",
     "private": true,
    ```

5.  Run `rush update` and commit the changes to the `pnpm-lock` file.
6.  Copy the `tsconfig.json` and `tsconfig.src.json` from [the sample project](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/template/template-perf-tests).
7.  Copy `sample.env`(and `.env`) files that are present at the `sdk/<service>/<service-sdk>` to `sdk/<service>/<service-sdk>-perf-tests`.

## [Writing perf tests](#writing-perf-tests)

### [Entry Point](#entry-point)

Add an `index.ts` at `sdk/<service>/<service-sdk>-perf-tests/src/`.

```js
import { createPerfProgram } from "@azure-tools/test-perf";
import { `ServiceNameAPI1Name`Test } from "./api1-name.spec";
import { `ServiceNameAPI2Name`Test } from "./api2-name.spec";

// Expects the .env file at the same level
import "dotenv/config";

console.log("=== Starting the perf test ===");

const perfProgram = createPerfProgram([`ServiceNameAPIName`Test, `ServiceNameAPIName2`Test]);

perfProgram.run();
```

### [Base Class](#base-class)

Base class would have all the common code that would be repeated for each of the tests - common code such as creating the client, creating a base resource, etc.

Create a new file such as `serviceName.spec.ts` at `sdk/<service>/<service-sdk>-perf-tests/test/`.

```js
import { PerfTest, getEnvVar } from "@azure-tools/test-perf";
import {
  ServiceNameClient
} from "@azure/<service-sdk>";

export abstract class `ServiceName`Test<TOptions = {}> extends PerfTest<TOptions> {
  serviceNameClient: ServiceNameClient;

  constructor() {
    super();
    // Setting up the serviceNameClient
  }

  public async globalSetup() {
    // .createResources() using serviceNameClient
  }

  public async globalCleanup() {
    // .deleteResources() using serviceNameClient
  }
}
```

### [Test File](#test-file)

Following code shows how the individual perf test files would look like.

```js
import { ServiceNameClient } from "@azure/<service-sdk>";
import { PerfOptionDictionary, drainStream } from "@azure-tools/test-perf";
import { `ServiceName`Test } from "./serviceNameTest.spec";

export class `ServiceNameAPIName`Test extends ServiceNameTest {
  // The next section talks about the custom options that you can provide for a test
  public options: PerfOptionDictionary = {};

  serviceNameClient: `ServiceName`Client;

  constructor() {
    super();
    // Setting up the client
  }

  public async globalSetup() {
    await super.globalSetup(); // Calling base class' setup
    // Add any additional setup
  }

  async run(): Promise<void> {
    // call the method on `serviceNameClient` that you're interested in testing
  }
}
```

It is not mandatory to have separate base class and test classes. If there is nothing common among the testing scenarios of your service, feel free to merge base class with the test class to only have a single test class instead.

### [Custom Options](#custom-options)

As seen in the previous section, you can specify custom options along with the default options from the performance framework. You can access the options in the class using `this.parsedOptions`.

Parsed options include the default options such as duration, iterations, parallel, etc offered by the perf framework as well as the custom options provided in the TestClass.

```js
interface `ServiceNameAPIName`TestOptions {
  newOption: number;
}

export class `ServiceNameAPIName`Test extends ServiceNameTest<`ServiceNameAPIName`TestOptions> {
  public options: PerfOptionDictionary<`ServiceNameAPIName`TestOptions> = {
    newOption: {
      required: true,
      description: "A new option",
      shortName: "sz",
      longName: "newOption",
      defaultValue: 10240
    }
  };

  async run(): Promise<void> {
    // You can leverage the parsedOptions in the setup or globalSetup or run methods as shown below.
    // this.parsedOptions.duration.value!
    // this.parsedOptions.newOption.value!
  }
}
```

## [Executing the perf tests](#executing-the-perf-tests)

### [Command to run](#command-to-run)

To run a particular test, use `npm run perf-test:node` - takes the test class name as the argument along with the command line arguments you may provide.

- Run `npm run perf-test:node -- TestClassName --warmup 2 --duration 7 --iterations 2 --parallel 50`

### [Adding Readme/Instructions](#adding-readme/instructions)

Refer to [the README for the template project](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/template/template-perf-tests/README.md) and create a similar set of instructions for your perf project.

### [Testing an older version](#testing-an-older-version)

Example: Currently `@azure/<service-sdk>` is at 12.4.0 on master and you want to test version 12.2.0

- In the perf tests project, update dependency `@azure/<service-sdk>` version in `package.json` to `12.2.0`
- Add a new exception in `common\config\rush\common-versions.json` under `allowedAlternativeVersions`
  - `"@azure/<service-sdk>": [..., "12.2.0"]`
- `rush update` (generates a new pnpm-lock file)
- Navigate to `sdk\storage\<service-sdk>-perf-tests`
- `rush build -t perf-<service-sdk>`
- Run the tests as suggested before, example `npm run perf-test:node -- TestClassName --warmup 2 --duration 7 --iterations 2 --parallel 50`

## [Using Proxy Tool](#using-proxy-tool)

### Using the testProxy option

To be able to leverage the powers of playing back the requests using the test proxy, add the following to your code.

      ```ts
      /// this.configureClientOptions call to modify your client
      this.client = TableClient.fromConnectionString(connectionString, tableName, this.configureClientOptions({}));

      // Please reach out if your service/SDK doesn't support or if you face difficulties in this area.
      ```

### Running the proxy server

Run this command

- `docker run -p 5000:5000 -p 5001:5001 azsdkengsys.azurecr.io/engsys/testproxy-lin:latest`

Reference: https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/Azure.Sdk.Tools.TestProxy#via-docker-image

To use the proxy-tool in your test pass this option in cli `--test-proxies http://localhost:5000`(Make sure the port is same as what you have used to run the `docker run` command).

Sample command(using storage-blob perf tests as example (Core-v1)!)

> npm run perf-test:node -- StorageBlobDownloadTest --warmup 2 --duration 7 --iterations 2 --test-proxies http://localhost:5000

> npm run perf-test:node -- StorageBlobDownloadTest --warmup 2 --duration 7 --iterations 2 --parallel 2 --test-proxies http://localhost:5000

> npm run perf-test:node -- StorageBlobDownloadTest --warmup 2 --duration 7 --iterations 2 --parallel 2 --test-proxies https://localhost:5001 --insecure true

Sample command(using data-tables perf tests as example (Core-v2)!)

> npm run perf-test:node -- ListComplexEntitiesTest --duration 7 --iterations 2 --parallel 2 --test-proxies http://localhost:5000

> npm run perf-test:node -- ListComplexEntitiesTest --duration 7 --iterations 2 --parallel 2 --test-proxies https://localhost:5001 --insecure true

> npm run perf-test:node -- ListComplexEntitiesTest --duration 7 --iterations 2 --parallel 2

**Using proxy-tool** part is still under construction. Please reach out to the owners/team if you face issues.
