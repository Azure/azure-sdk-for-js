Getting Started - Generate the RLC rest-level client libraries with Cadl
========================================================================

# Before you start

Please refer to this [link](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#prerequisites) for the environment set up prerequisites in azure-sdk-for-js repository. We highly recommand to read [this blog](https://devblogs.microsoft.com/azure-sdk/azure-rest-libraries-for-javascript/) to get familiar with REST libraries for JavaScript. 

:warning: Note: if you’re still generating from Swagger with RLC, please read [this doc](./RLC-Swagger-quickstart.md) for Swagger specific details.


# Project folder structure and name convention

Please follow the Azure SDK guidance and discuss with architects to decide the project folder and name convention for RLC libraries.

1. SDK Repo Root.
   The generated libraries should be the [azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) repo, so fork and clone it in your local then the absolute path is called **${SDK_REPO_ROOT} folder**.

1. Project Folder Structure.  
   Normally, the folder structure would be something like `sdk/{servicename}/{servicename}-{modulename}-rest`. For example, we have `sdk/agrifood/agrifood-farming-rest` folder for Farmbeats account modules under {SDK_REPO_ROOT}. That folder will be your **${PROJECT_ROOT} folder**.  
1. Package Name Convention.  
   The package name for RLC is something like `@azure-rest/{servicename}-{modulename}`. For example, the package name for Farmbeats module is `@azure-rest/agrifood-farming`.


# How to generate RLC

We are working on to automatically generate everything right now, but currently we still need some manual work to get a releasable package. Here're the steps of how to get the package.

1. **Add typescript emitter dependency in package.json**  
   
   In Cadl project, modify `package.json` to add dependency for typescript emitter, then run `npm install` again to install `@azure-tools/cadl-typescript`.

   ```json
   "dependencies": {
     ...
     "@azure-tools/cadl-typescript": "1.0.0-beta.3"
   },
   ```

   ---
   **NOTE**
    It's always recommended to replace the version of emitter cadl-typescript with the latest version you can find in [npmjs.com](https://www.npmjs.com/package/@azure-tools/cadl-typescript) in latest tag.

   ---

1. **Configure typescript emitter in cadl-project.yaml**

    In Cadl project, modify (or create) `cadl-project.yaml` and configure the SDK generated, using the emitter options on `@azure-tools/cadl-typescript`
    
    ```yaml
    emitters:
      "@azure-tools/cadl-typescript":
        generateMetadata: true
        generateTest: true
        packageDetails:
          name: "@azure-rest/agrifood-farming"
          description: "Farmbeats Client"
          version: "1.0.0-beta.1"
    ```

    Here, we need to replace the value in `name`,`description`, `version`  in `packageDetails` to **your own service's** package details. Also we have some other options refer to [the link](https://github.com/Azure/autorest.typescript/tree/main/packages/cadl-typescript#emitter-options) for more details.

    ---  
    **NOTE**

    After the first generation, you need to switch `generate-metadata: false` as we have some manual changes in this file and don't want them get overwrite by generated ones.

    --- 

1. **Edit rush.json**  
    As the libraries in azure-sdk-for-js repository are managed by rush, you need to add an entry in rush.json under projects section for the first time to make sure it works. For example:

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

1. **Run command to generate the SDK**  

    We need to configure `--output-dir` to put generated code. The output dir contains two parts: the {SDK_REPO_ROOT} and {PROJECT_ROOT}.
    
    Assume **{SDK_REPO_ROOT}** is `D:/azure-sdk-for-js` and **{PROJECT_ROOT}** is `sdk/agrifood/agrifood-farming-rest` then we could run this command in **your local Cadl project** to generate the SDK: 

    ```shell
    cadl compile . --emit=@azure-tools/cadl-typescript --output-dir=D:/azure-sdk-for-js/sdk/agrifood/agrifood-farming-rest
    ```

    After this finishes, you will see the generated code in `src` folder in your project root.  
    After that, you can get a workable package, and run the following commands to get a artifact if you like.

    ```shell
    rush update
    rush build -t <your-package-name>
    cd <your-sdk-folder>
    rushx pack
    ```

    But we still need to add some tests for it.

# Improve README.md document

A minimal README.md is generated by typescript emitter and you could improve it with more meaningful information to let customers know more about your service.

# How to write test for RLC

In order to release it, we need to add some tests for it to make sure we are delivering high quality packages. But before we add the test, we need to add a `generateTest: true` make the codegen generate the necessary change in `package.json` and `tsconfig.json` so that test framework can work. Once the generation finished, you will see a `sampleTest.spec.ts` file in your `{PROJECT_ROOT}/test/public` folder, which only has a empty test and you may change them into test against your own services.

See the [Javascript Codegen Quick Start for Test](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/test-quickstart.md) for information on how to write and run tests for the Javascript SDK.

1. **Prerequisites**  

    To record and playback the tests, [Docker](https://www.docker.com/) is required when we run the test, as the [test proxy server](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy) is run in a container during testing. When running the tests, ensure the Docker daemon is running and you have permission to use it.

1. **Run the test**  
    Now, you can run the test like this. If you are the first time to run test, you need to set the environment variable `TEST_MODE` to `record`. This will generate recordings for your test they could be used in `playback` mode.
    On Linux, you could use `export` to set env variable:
    ```shell
    rush build -t ${PACKAGE_NAME}
    export TEST_MODE=record && rushx test # this will run live test and generate a recordings folder, you will need to submit it in the PR.
    ```
    On Windows, you could use `SET`:
    ```shell
    rush build -t ${PACKAGE_NAME}
    SET TEST_MODE=record&& rushx test # this will run live test and generate a recordings folder, you will need to submit it in the PR.
    ```
    You can also run the `playback` mode test if your apis don't have breaking changes and you've already done the recording before.
    On Linux, you could use below commands:
    ```shell
    rush build -t ${PACKAGE_NAME}
    export TEST_MODE=playback && rushx test # this will run live test and generate a recordings folder, you will need to submit it in the PR.
    ```
    On Windows, you can use:
    ```shell
    rush build -t ${PACKAGE_NAME}
    SET TEST_MODE=playback&& rushx test # this will run live test and generate a recordings folder, you will need to submit it in the PR.
    ```

# How to write samples

We author TypeScript samples under the `samples-dev` folder. You can use sample-dev template for reference [samples-dev folder](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/template/template/samples-dev) folder and update the relevant information for your service such as package-name, sample code, description, etc.  
After the samples-dev folder change is finished, you will need to change the tsconfig.json to make sure the dev samples can be compiled and build correctly.  

You will need to add this part to the "compilerOptions" of your tsconfig.json file so that the Samples engine could resolve the sample-dev package against the source code of the SDK.  
``` json
    "paths": { "@azure-rest/agrifood-farming": ["./src/index"] } 
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
npx dev-tool samples publish -f 
```
You will see the workable samples in the `${PROJECT_ROOT}/samples` folder.  

# Format both the generated code and manual code
After you have finished the generation and added your own tests or samples, You can use the following command to format the code.  
```shell
cd ${PROJECT_ROOT} && rushx format
```

# How to do customizations
There is many information about the SDK that AutoRest will never know, so you may want to do your customizations based on generated code. 

We collect some common customization cases and you can read [Customization on the RLC rest-level client libraries](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-customization.md) for more details.

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

Please notice the Artifacts name should align with your package name. Here the package name is `@azure-rest/agrifood-farming` so the relevant Artifacts name is `azure-rest-agrifood-farming`.

# Create API View
You may also want to create API View when submitting a PR. You can do it easily by uploading a json file to [API View Website](https://apiview.dev/). The json file is under `<you-sdk-folder>/temp`, and its name ends with `api.json`. For example: `sdk/compute/arm-compute/temp/arm-compute.api.json`.


# Prepare PR

RLC can only help you generate SDK code, there is something you need to update manually:

## CHANGELOG.md

CHANGELOG can help customers know the change of new version quicky, so you need to update the it according to the change of this new version. It is also necessary to update release date like `1.0.0-beta.1 (2022-11-11)`(rough time is fine and no need to be very accurate).

## Version Number

You shall update the version number according to [semantic versioning rule](https://semver.org/).

## Test recordings

Please ensure that your test recordings are committed together with your code.

## Fix CI for PR
You may meet the CI failures after submitting the PR, so please refer to [Troubleshoot CI Failure](./Troubleshoot-ci-failure.md) to fix it.


# Release

After the PR is merged, it is time to release package. Here is the [Release Checklist](https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/8/Release-Checklist?anchor=prepare-release-script) you should know before release.
