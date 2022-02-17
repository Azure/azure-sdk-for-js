Getting Started - Generate the RLC rest-level client libraries
================================================================

# Prerequisites

You may refer to this [link](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#prerequisites) for the environment set up prerequisites in azure-sdk-for-js repository.

# Project folder and name convention

Before we start, we probably should get to know the project folder and name convention for RLC libraries.

1. Project Folder structure.  
   normally, the folder structure would be something like `sdk/{servicename}/{servicename}-{modulename}-rest`. For example, we have `sdk/agrifood/agrifood-farming-rest` folder for Farmbeats account modules. That folder will be your **${PROJECT_ROOT} folder**.  
1. Package Name Convention.  
   The package name for RLC is something like `@azure-rest/{servicename}-{modulename}`. For example, the package name for Farmbeats module is `@azure-rest/agrifood-farming`.

# How to generate RLC

We are working on to automatically generate everything right now, but currently we still need some manual work to get a releasable package. Here're the steps of how to get the package.

1. **Create a swagger/README.md file.under ${PROJECT_ROOT} folder**  
    We are using autorest to generate the code, but there's a lot of command options and in order to make the regenerate process easier in the cases of refresh the rest api input or change the code generator version, you need to document the generate command parameters.  
    Here's an example of the swagger/README.md

    ~~~
    
    # Azure  Farmbeats TypeScript Protocol Layer
    
    > see https://aka.ms/autorest
    ## Configuration
    
    ```yaml
    package-name: "@azure-rest/agrifood-farming"
    title: Farmbeats
    description: Farmbeats Client
    generate-metadata: true
    license-header: MICROSOFT_MIT_NO_VERSION
    output-folder: ../
    source-code-folder-path: ./src
    input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/683e3f4849ee1d84629d0d0fa17789e80a9cee08/specification/agfood/data-plane/Microsoft.AgFoodPlatform/preview/2021-03-31-preview/agfood.json
    package-version: 1.0.0-beta.2
    rest-level-client: true
    add-credentials: true
    credential-scopes: https://farmbeats.azure.net/.default
    use-extension:
      "@autorest/typescript": "6.0.0-beta.14"
    ```
    ~~~

    Here, we need to replace the value in `package-name`, `title`, `description`, `input-file`, `package-version`, `credential-scopes` into **your own service's** `package-name`, `title`, `description` etc.

    ---
    **NOTE**

    It's always recommended to replace the version of code generator @autorest/typescript with the latest version you can find in [npmjs.com](https://www.npmjs.com/package/@autorest/typescript) in latest tag.  

    **After the first generation, you need to switch `generate-metadata: false`  as we have some manual changes in this file and don't want them get overwrite by generated ones.**

    ---  
  
1. **edit rush.json**  
    As the libraries in this azure-sdk-for-js repository are managed by rush, you need to add an entry in rush.json under projects section for the first time to make sure it works. For example:

    ```
        {
          "packageName": "@azure-rest/agrifood-farming",
          "projectFolder": "sdk/agrifood/agrifood-farming-rest",
          "versionPolicyName": "client"
        },
    ```

    Here you also need to replace the `packageName`, `projectFolder` into your own services'.

    ---  
    **NOTE**

    About the `versionPolicyName`, if the library you are working on is for data-plane, then it should be `client`, if the library you are working on is for control plane, then it should be `mgmt`.  

    ---  

1. **run autorest to generate the SDK**  

    Now you can run this command in swagger folder you just created.

    ```shell
    autorest --typescript ./README.md
    ```

    After this finishes, you will see the generated code in `${PROJECT_ROOT}/src` folder .
1. **add a rollup.config.js file under `${PROJECT_ROOT}` folder**  
   You need to add a rollup.config.js file and put the following content into it.  
    ```javascript
    import { makeConfig } from "@azure/dev-tool/shared-config/rollup";

    export default makeConfig(require("./package.json"));
    ```
    After that, you can get a workable package, and run the following commands to get a artifact if you like.

    ```shell
    rush update
    rush build -t <your-package-name>
    cd <your-sdk-folder>
    rushx pack
    ```

    But we still need to add some tests for it.

# How to write test for RLC

In order to release it, we need to add some tests for it to make sure we are delivering high quality packages. but before we add the test, we need to manual change a few things to make the test framework works.

1. **update package.json file**  
    Currently the generated will skip the actual test step. you should change it to make sure it works.
    First, change the `scripts` section from

    ~~~
        "test": "echo \"Error: no test specified\" && exit 1",
        "test:node": "echo skipped",
        "test:browser": "echo skipped",
        "build:node": "echo skipped",
        "build:browser": "echo skipped",
        "build:test": "echo skipped",
        "unit-test": "echo skipped",
        "unit-test:node": "echo skipped",
        "unit-test:browser": "echo skipped",
        "integration-test:browser": "echo skipped",
        "integration-test:node": "echo skipped",
        "integration-test": "echo skipped",
    ~~~

    into

    ~~~
        "test": "npm run clean && npm run build:test && npm run unit-test",
        "test:node": "npm run clean && npm run build:test && npm run unit-test:node",
        "test:browser": "npm run clean && npm run build:test && npm run unit-test:browser",
        "build:browser": "tsc -p . && cross-env ONLY_BROWSER=true rollup -c 2>&1", 
        "build:node": "tsc -p . && cross-env ONLY_NODE=true rollup -c 2>&1", 
        "build:test": "tsc -p . && rollup -c 2>&1",
        "unit-test": "npm run unit-test:node && npm run unit-test:browser",
        "unit-test:node": "mocha -r esm --require ts-node/register --reporter ../../../common/tools/mocha-multi-reporter.js --timeout 1200000 --full-trace \"test/{,!(browser)/**/}*.spec.ts\"",
        "unit-test:browser": "karma start --single-run",
        "integration-test:browser": "karma start --single-run",
        "integration-test:node": "nyc mocha -r esm --require source-map-support/register --reporter ../../../common/tools/mocha-multi-reporter.js --timeout 5000000 --full-trace \"dist-esm/test/{,!(browser)/**/}*.spec.js\"",
        "integration-test": "npm run integration-test:node && npm run integration-test:browser",
    ~~~

    Then add the following test dependencies into the `devDependencies` section.

    ~~~
        "@azure/dev-tool": "^1.0.0",
        "@azure/eslint-plugin-azure-sdk": "^3.0.0",
        "@azure/identity": "^2.0.1",
        "@azure-tools/test-recorder": "^1.0.0",
        "@microsoft/api-extractor": "^7.18.11",
        "@types/chai": "^4.1.6",
        "@types/mocha": "^7.0.2",
        "@types/node": "^12.0.0",
        "chai": "^4.2.0",
        "cross-env": "^7.0.2",
        "dotenv": "^8.2.0",
        "eslint": "^7.15.0",
        "karma-chrome-launcher": "^3.0.0",
        "karma-coverage": "^2.0.0",
        "karma-edge-launcher": "^0.4.2",
        "karma-env-preprocessor": "^0.1.1",
        "karma-firefox-launcher": "^1.1.0",
        "karma-ie-launcher": "^1.0.0",
        "karma-json-preprocessor": "^0.3.3",
        "karma-json-to-file-reporter": "^1.0.1",
        "karma-junit-reporter": "^2.0.1",
        "karma-mocha-reporter": "^2.2.5",
        "karma-mocha": "^2.0.1",
        "karma-source-map-support": "~1.4.0",
        "karma-sourcemap-loader": "^0.3.8",
        "karma": "^6.2.0",
        "mkdirp": "^1.0.4",
        "mocha-junit-reporter": "^1.18.0",
        "mocha": "^7.1.1",
        "nyc": "^14.0.0",
        "prettier": "2.2.1",
        "rimraf": "^3.0.0",
        "rollup": "^1.16.3",
        "source-map-support": "^0.5.9",
        "typedoc": "0.15.2",
        "typescript": "~4.2.0"
    ~~~
   
    Then add a browser test entry section.  
    
    ~~~
      "browser": {
        "./dist-esm/test/public/utils/env.js": "./dist-esm/test/public/utils/env.browser.js"
      },
    ~~~
    
    ---
    **NOTE**
    We need to make sure those dependencies versions are align with other package.json files. You can double check it in [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agrifood/agrifood-farming-rest/package.json)

    ---

    Finally, add this line into the package.json as well.

    ```
      "module": "./dist-esm/src/index.js"
    ```  

1. **Update tsconfig.json file.**  
    remove the `exclude` section and add an `include` section like this.

    ```
      "include": ["src/**/*.ts", "./test/**/*.ts"]
    ```

1. **Update the api-extractor.json file.**  
    change the `mainEntryPointFilePath` into `"./dist-esm/src/index.d.ts"`.  
1. **Add a karma.conf.js file for web browser tests.under ${PROJECT_ROOT} folder**  
    File content is like this

    ```javascript
    // Copyright (c) Microsoft Corporation.
    // Licensed under the MIT license.
    
    // https://github.com/karma-runner/karma-chrome-launcher
    process.env.CHROME_BIN = require("puppeteer").executablePath();
    require("dotenv").config();
    const {
      jsonRecordingFilterFunction,
      isPlaybackMode,
      isSoftRecordMode,
      isRecordMode
    } = require("@azure-tools/test-recorder");
    
    module.exports = function(config) {
      config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "./",
    
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["source-map-support", "mocha"],
    
        plugins: [
          "karma-mocha",
          "karma-mocha-reporter",
          "karma-chrome-launcher",
          "karma-edge-launcher",
          "karma-firefox-launcher",
          "karma-ie-launcher",
          "karma-env-preprocessor",
          "karma-coverage",
          "karma-sourcemap-loader",
          "karma-junit-reporter",
          "karma-json-to-file-reporter",
          "karma-source-map-support",
          "karma-json-preprocessor"
        ],
    
        // list of files / patterns to load in the browser
        files: [
          "dist-test/index.browser.js",
          {
            pattern: "dist-test/index.browser.js.map",
            type: "html",
            included: false,
            served: true
          }
        ].concat(
          isPlaybackMode() || isSoftRecordMode()
            ? ["recordings/browsers/**/*.json"]
            : []
        ),
    
        // list of files / patterns to exclude
        exclude: [],
    
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
          "**/*.js": ["sourcemap", "env"],
          "recordings/browsers/**/*.json": ["json"]
          // IMPORTANT: COMMENT following line if you want to debug in your browsers!!
          // Preprocess source file to calculate code coverage, however this will make source file unreadable
          // "dist-test/index.js": ["coverage"]
        },
    
        envPreprocessor: [
          "TEST_MODE",
          "ENDPOINT",
          "AZURE_CLIENT_SECRET",
          "AZURE_CLIENT_ID",
          "AZURE_TENANT_ID",
          "SUBSCRIPTION_ID"
        ],
    
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["mocha", "coverage", "junit", "json-to-file"],
    
        coverageReporter: {
          // specify a common output directory
          dir: "coverage-browser/",
          reporters: [
            { type: "json", subdir: ".", file: "coverage.json" },
            { type: "lcovonly", subdir: ".", file: "lcov.info" },
            { type: "html", subdir: "html" },
            { type: "cobertura", subdir: ".", file: "cobertura-coverage.xml" }
          ]
        },
    
        junitReporter: {
          outputDir: "", // results will be saved as $outputDir/$browserName.xml
          outputFile: "test-results.browser.xml", // if included, results will be saved as $outputDir/$browserName/$outputFile
          suite: "", // suite will become the package name attribute in xml testsuite element
          useBrowserName: false, // add browser name to report and classes names
          nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
          classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
          properties: {} // key value pair of properties to add to the <properties> section of the report
        },
    
        jsonToFileReporter: {
          filter: jsonRecordingFilterFunction,
          outputPath: "."
        },
    
        // web server port
        port: 9876,
    
        // enable / disable colors in the output (reporters and logs)
        colors: true,
    
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
    
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
    
        // --no-sandbox allows our tests to run in Linux without having to change the system.
        // --disable-web-security allows us to authenticate from the browser without having to write tests using interactive auth, which would be far more complex.
        browsers: ["ChromeHeadlessNoSandbox"],
        customLaunchers: {
          ChromeHeadlessNoSandbox: {
            base: "ChromeHeadless",
            flags: ["--no-sandbox", "--disable-web-security"]
          }
        },
    
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
    
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: 1,
    
        browserNoActivityTimeout: 60000000,
        browserDisconnectTimeout: 10000,
        browserDisconnectTolerance: 3,
        browserConsoleLogOptions: {
          terminal: !isRecordMode()
        },
    
        client: {
          mocha: {
            // change Karma's debug.html to the mocha web reporter
            reporter: "html",
            timeout: "600000"
          }
        }
      });
    };
    ```
1. **add sample.env under ${PROJECT_ROOT} folder**  
    create a sample.env and put the following content into this file.
    ``` 
     # Purview Scanning resource endpoint
    ENDPOINT=
    
    # App registration secret for AAD authentication
    AZURE_CLIENT_SECRET=
    AZURE_CLIENT_ID=
    AZURE_TENANT_ID= 
    ```
1. **add test utils.**  

    create a `${PROJECT_ROOT}/test/public` folder and then copy the content [here](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/agrifood/agrifood-farming-rest/test/public/utils) into public folder

    there are some manual changes in the copied recordedClient.ts that need to be done. 
    ```typescript
    import Farmbeats, { FarmbeatsRestClient } from "../../../src";
    ```
    Needs to change to the value that was used in the swagger/readme.md in title. For example if title is "Foo"
    ```typescript
    import Foo, { FooRestClient } from "../../../src";
    ```
    and
    ```typescript
    export function createClient(options?: ClientOptions): PurviewAccountRestClient {
      const credential = new ClientSecretCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        env.AZURE_CLIENT_SECRET
      );
      return Farmbeats(env.ENDPOINT, credential, options);
    }
    ``` 
    Needs to change to
    ```typescript
    export function createClient(options?: ClientOptions): FooRestClient {
      const credential = new ClientSecretCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        env.AZURE_CLIENT_SECRET
      );
      return Foo(env.ENDPOINT, credential, options);
    }
    ```
    Now, you can add some sample tests with the filename in the format of `sampleTest.spec.ts` like

    ```typescript
    /*
     * Copyright (c) Microsoft Corporation.
     * Licensed under the MIT License.
     *
     * Code generated by Microsoft (R) AutoRest Code Generator.
     * Changes may cause incorrect behavior and will be lost if the code is regenerated.
     */
    
    import { Recorder } from "@azure-tools/test-recorder";
    import { assert } from "chai";
    import { createRecorder } from "./utils/recordedClient";
    
    describe("My test", () => {
      let recorder: Recorder;
    
      beforeEach(async function() {
        recorder = createRecorder(this);
      });
    
      afterEach(async function() {
        await recorder.stop();
      });
    
      it("sample test", async function() {
        // Use assert to test your assumptions
        assert.equal(1,1)
      });
    });
    ```

    You may change the sample test into real tests to test against your libraries.
1. **run the test**  
    Now, you can run the test like this.
    ```shell  
    rush build -t ${PACKAGE_NAME}
    export TEST_MODE=record && rushx test # this will run live test and generate a recordings folder, you will need to submit it in the PR. 
    ```
    You can also run the playback mode test if your apis don't have breaking changes and you already done the recording before.  
    ```shell 
    rush build -t ${PACKAGE_NAME}
    rushx test 
    ```
# How to write samples

We author TypeScript samples under the `samples-dev` folder. You can use sample-dev template for reference [samples-dev folder](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/template/template/samples-dev)  folder and update the relevant information for your service such as package-name, sample code, description, etc.  
After the samples-dev folder change is finished, you will need to change the tsconfig.json to make sure the dev samples can be compiled and build correctly.  

You will need to add this part to the "compilerOptions" of your tsconfig.json file so that the Samples engine could resolve the sample-dev package against the source code of the SDK.  
``` json
    "paths": { "@msinternal/sql-resource-manager": ["./src/index"] } 
```
And change the *"include"* part into 
```json
  "include": ["./src/**/*.ts", "./test/**/*.ts", "samples-dev/**/*.ts"],
```

Then, we provide tools to automatically change it into workable samples in both TypeScript and JavaScript. and you just need to add a sampleConfiguration in your package.json.  

You will need to add a sample configuration section in your package.json file and put the following content into it.
```json
  "//sampleConfiguration": {
    "productName": "A description of your services",
    "productSlugs": ["azure"],
    "disableDocsMs": true,
    "apiRefLink": "<the-link-to-your-service-on-docs.microsoft.com>"
  }
```

Now, you can generate both JavaScript and TypeScript workable samples with the following commands.
```shell
npm install -g common/tools/dev-tool # make sure you are in the azure-sdk-for-js repo root directory
cd ${PROJECT_ROOT}
dev-tool samples publish -f 
```
You will see the workable samples in the `${PROJECT_ROOT}/samples` folder.  

# How to create package

Now we can use the exact same steps to build an releasable artifact.

```shell
rush update
rush build -t <your-package-name>
cd <your-sdk-folder>
export TEST_MODE=record && rushx test
rushx pack
```
You may send this artifact to your customer if your services are still in private preview and some customers want to try it out.
# Create/Update the ci.yaml

Now, if everything looks good to you, you can submit a PR in azure-sdk-for-js repo with all the changes you made above. Before you do that, you need to add/update the ci.yml file. Depends on whether there's already one in your package folder.

If there's no such file then you can add the following template.

``` yaml
# NOTE: Please refer to https://aka.ms/azsdk/engsys/ci-yaml before editing this file.
trigger:
  branches:
    include:
      - main
      - release/*
      - hotfix/*
  paths:
    include:
      - sdk/purview/
pr:
  branches:
    include:
      - main
      - feature/*
      - release/*
      - hotfix/*
    exclude:
      - feature/v4
  paths:
    include:
      - sdk/purview/
extends:
  template: ../../eng/pipelines/templates/stages/archetype-sdk-client.yml
  parameters:
    ServiceDirectory: purview
    Artifacts:
      - name: azure-rest-agrifood-farming
        safeName: azurerestagrifoodfarming
```

Please change the paths.include value as your own project path, and change the Artifacts name and safeName into yours.  

If there's already a ci.yml file in your project path. then the only thing you need to do is to add the Artifacts name and safeName of yours into that ci.yml.  
