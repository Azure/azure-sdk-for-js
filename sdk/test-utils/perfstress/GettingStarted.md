# Writing Performance Tests

## [Index](#index)

- [Setting up the project](#setting-up-the-project)
  - [Track 2](#setting-up-the-project)
  - [Track 1](#for-perf-testing-track-1-version-of-the-same-package)
- [Writing perf tests](#writing-perf-tests)
  - [Entry Point](#entry-point)
  - [Base Class](#base-class)
  - [Test File](#test-file)
  - [Custom Options](#custom-options)
- [Executing the perf tests](#executing-the-perf-tests)
  - [Command to run](#command-to-run)
  - [Adding Readme/Instructions](#adding-readme/instructions)
  - [Testing an older track 2 version](#testing-an-older-track-2-version)
- [Using Proxy Tool](#using-proxy-tool)

## [Setting up the project](#setting-up-the-project)

To add perf tests for the `sdk/<service>/<service-sdk>` package, follow the steps below.

1.  Create a new folder for the perf tests.

    Path- `sdk/<service>/perf-tests/<service-sdk>`

    (Create the `perf-tests` folder if that doesn't exist)

2.  This new perf test project will be managed by the rush infrastructure in the repository, with the package name `@azure-tests/<service-sdk>`. To allow rush to manage the project, add the following entry in `rush.json`

    ```
        {
          "packageName": "@azure-tests/perf-<service-sdk>",
          "projectFolder": "sdk/<service>/perf-tests/<service-sdk>",
          "versionPolicyName": "test"
        }

    ```

3.  Tests will live under `sdk/<service>/perf-tests/<service-sdk>/test`
4.  Add a `package.json` such as [example-perf-package.json](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/perf-tests/storage-file-datalake/package.json) at `sdk/<service>/perf-tests/<service-sdk>` folder.

    Make sure to import your `<service-sdk>` and the `test-utils-perfstress` project.

    ```json
      "dependencies": {
         "@azure/<service-sdk>": "^<version-in-master-branch>",
         "@azure/test-utils-perfstress": "^1.0.0"
       }
    ```

    _Note: `"@azure/test-utils-perfstress"` is not a published npm package._

    Set the name of the package and mark it as private.

    ```json
     "name": "@azure-tests/perf-<service-sdk>",
     "sdk-type": "perf-test",
     "private": true,
    ```

5.  Run `rush update` and commit the changes to the `pnpm-lock` file.
6.  Copy the `tsconfig.json`, `sample.env`(and `.env`) files that are present at the `sdk/<service>/<service-sdk>` to `sdk/<service>/perf-tests/<service-sdk>`.

    TSCONFIG

    - Modify the "extends" string in the copied tsconfig by adding ".." since the perf tests project is located a level below the actual SDK.
    - Set the `compilerOptions.module` to `commonjs` in the `tsconfig` to allow running the tests with `ts-node`.

    In the end, your tsconfig may look something like below.

    ```
         {
           "extends": "../../../../tsconfig.package",
           "compilerOptions": {
             "module": "CommonJS",
             "declarationDir": "./typings/latest",
             "lib": ["ES6", "ESNext.AsyncIterable"],
             "noEmit": true
           },
           "compileOnSave": true,
           "include": ["./test/**/*.ts"]
         }
    ```

### [For perf-testing track 1 version of the same package](#for-perf-testing-track-1-version-of-the-same-package)

(_Skip this section if your service does not have or does not care about a track-1 version._)

1. If there is an old major version of your package that needs to be compared, create the folder as `sdk/<service>/perf-tests/<service-sdk>-track-1`

2. It is expected that the track-1 perf tests are counterparts of track-2 tests, so they need to have the same names as specified in the track-2 tests for convenience.

3. Add a `package.json` such as [example-track-1-perf-package.json](https://github.com/Azure/azure-sdk-for-js/blob/fe9b1e5a50946f53b6491d7f67b2420d8ee1b229/sdk/storage/perf-tests/storage-blob-track-1/package.json) at `sdk/<service>/perf-tests/<service-sdk>` folder.

   Make sure to import your `<service-sdk>` and the `test-utils-perfstress` project.

   ```json
     "dependencies": {
        "@azure/<service-sdk>": "^<latest-track-1-version>",
        "@azure/test-utils-perfstress": "file:../../../test-utils/perfstress/azure-test-utils-perfstress-1.0.0.tgz",
      }
   ```

   Set the name of the package and mark it as private.

   ```json
    "name": "@azure-tests/perf-<service-sdk>-track-1",
    "sdk-type": "perf-test"
    "private": true,
   ```

   _Note: Track-1 packages will not be managed by `rush`, instead `npm` will be used to manage/run the track-1 tests, you can copy the readme such as the [storage-blob-perf-tests-track-1-readme](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/perf-tests/storage-blob-track-1/README.md) for instructions._

   Make sure to add the "setup" step in package.json.

   ```json
       "setup": "node ../../../../common/tools/perf-tests-track-1-setup.js",
   ```

4. Run `rush update` followed by `npm run setup` to be able to use the perf framework for track-1 perf tests.

   _`npm run setup` installs the dependencies specified in `package.json`_

5. Repeat the step 6 from the previous section for the track-1 too to get the `tsconfig.json`, `sample.env`(and `.env`) files.

## [Writing perf tests](#writing-perf-tests)

### [Entry Point](#entry-point)

Add an `index.spec.ts` at `sdk/<service>/perf-tests/<service-sdk>/test/`.

```js
import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { `ServiceNameAPI1Name`Test } from "./api1-name.spec";
import { `ServiceNameAPI2Name`Test } from "./api2-name.spec";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(selectPerfStressTest([`ServiceNameAPIName`Test, `ServiceNameAPIName2`Test]));

perfStressProgram.run();
```

### [Base Class](#base-class)

Base class would have all the common code that would be repeated for each of the tests - common code such as creating the client, creating a base resource, etc.

Create a new file such as `serviceName.spec.ts` at `sdk/<service>/perf-tests/<service-sdk>/test/`.

```js
import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";
import {
  ServiceNameClient
} from "@azure/<service-sdk>";

export abstract class `ServiceName`Test<TOptions = {}> extends PerfStressTest<TOptions> {
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
import { PerfStressOptionDictionary, drainStream } from "@azure/test-utils-perfstress";
import { `ServiceName`Test } from "./serviceNameTest.spec";

export class `ServiceNameAPIName`Test extends ServiceNameTest {
  // The next section talks about the custom options that you can provide for a test
  public options: PerfStressOptionDictionary = {};

  serviceNameClient: `ServiceName`Client;

  constructor() {
    super();
    // Setting up the client
  }

  public async globalSetup() {
    await super.globalSetup(); // Calling base class' setup
    // Add any additional setup
  }

  async runAsync(): Promise<void> {
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
  public options: PerfStressOptionDictionary<`ServiceNameAPIName`TestOptions> = {
    newOption: {
      required: true,
      description: "A new option",
      shortName: "sz",
      longName: "newOption",
      defaultValue: 10240
    }
  };

  async runAsync(): Promise<void> {
    // You can leverage the parsedOptions in the setup or globalSetup or runAsync methods as shown below.
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

Refer to [storage-blob-perf-tests-readme](https://github.com/Azure/azure-sdk-for-js/blob/fe9b1e5a50946f53b6491d7f67b2420d8ee1b229/sdk/storage/perf-tests/storage-blob/README.md) and [storage-blob-perf-tests-readme-track-1](https://github.com/Azure/azure-sdk-for-js/blob/fe9b1e5a50946f53b6491d7f67b2420d8ee1b229/sdk/storage/perf-tests/storage-blob-track-1/README.md) and have similar set of instructions for your perf project.

### [Testing an older track 2 version](#testing-an-older-track-2-version)

Example: Currently `@azure/<service-sdk>` is at 12.4.0 on master and you want to test version 12.2.0

- In the track 2 perf tests project, update dependency `@azure/<service-sdk>` version in `package.json` to `12.2.0`
- Add a new exception in `common\config\rush\common-versions.json` under `allowedAlternativeVersions`
  - `"@azure/<service-sdk>": [..., "12.2.0"]`
- `rush update` (generates a new pnpm-lock file)
- Navigate to `sdk\storage\perf-tests\<service-sdk>`
- `rush build -t perf-<service-sdk>`
- Run the tests as suggested before, example `npm run perf-test:node -- TestClassName --warmup 2 --duration 7 --iterations 2 --parallel 50`

## [Using Proxy Tool](#using-proxy-tool)

### Using the testProxy option

To be able to leverage the powers of playing back the requests using the test proxy, add the following to your code.

      ```ts
      /// Core V1 SDKs - For services depending on core-http
      /// Call this.configureClientOptionsCoreV1 method on your client options
      this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString, this.configureClientOptionsCoreV1({}));

      /// Core V2 SDKs - For services depending on core-rest-pipeline
      /// this.configureClient call to modify your client
      this.client = this.configureClient(TableClient.fromConnectionString(connectionString, tableName));

      // Not all core-v1 SDKs allow passing httpClient option.
      // Not all core-v2 SDKs allow adding policies via pipeline option.
      // Please reach out if your service doesn't support.
      ```

### Running the proxy server

Run this command

- `docker run -p 5000:5000 -p 5001:5001 azsdkengsys.azurecr.io/engsys/testproxy-lin:latest`

Reference: https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/Azure.Sdk.Tools.TestProxy#via-docker-image

To use the proxy-tool in your test pass this option in cli `--test-proxy http://localhost:5000`(Make sure the port is same as what you have used to run the `docker run` command).

Sample command(using storage-blob perf tests as example (Core-v1)!)

> npm run perf-test:node -- StorageBlobDownloadTest --warmup 2 --duration 7 --iterations 2 --test-proxy http://localhost:5000

> npm run perf-test:node -- StorageBlobDownloadTest --warmup 2 --duration 7 --iterations 2 --parallel 2 --test-proxy http://localhost:5000

> npm run perf-test:node -- StorageBlobDownloadTest --warmup 2 --duration 7 --iterations 2 --parallel 2 --test-proxy https://localhost:5001 --insecure true

Sample command(using data-tables perf tests as example (Core-v2)!)

> npm run perf-test:node -- ListComplexEntitiesTest --duration 7 --iterations 2 --parallel 2 --test-proxy http://localhost:5000

> npm run perf-test:node -- ListComplexEntitiesTest --duration 7 --iterations 2 --parallel 2 --test-proxy https://localhost:5001 --insecure true

> npm run perf-test:node -- ListComplexEntitiesTest --duration 7 --iterations 2 --parallel 2

**Using proxy-tool** part is still under construction. Please reach out to the owners/team if you face issues.
