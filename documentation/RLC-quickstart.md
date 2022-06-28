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
    generate-test: true
    license-header: MICROSOFT_MIT_NO_VERSION
    output-folder: ../
    source-code-folder-path: ./src
    input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/683e3f4849ee1d84629d0d0fa17789e80a9cee08/specification/agfood/data-plane/Microsoft.AgFoodPlatform/preview/2021-03-31-preview/agfood.json
    package-version: 1.0.0-beta.2
    rest-level-client: true
    add-credentials: true
    credential-scopes: https://farmbeats.azure.net/.default
    use-extension:
      "@autorest/typescript": "6.0.0-rc.1"
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

    After this finishes, you will see the generated code in `${PROJECT_ROOT}/src` folder.  
    After that, you can get a workable package, and run the following commands to get a artifact if you like.

    ```shell
    rush update
    rush build -t <your-package-name>
    cd <your-sdk-folder>
    rushx pack
    ```

    But we still need to add some tests for it.

# How to write test for RLC

In order to release it, we need to add some tests for it to make sure we are delivering high quality packages. but before we add the test, we need to add a `generate-test: true` make the code generator generate the necessary change in `package.json` and `tsconfig.json` so that test framework can work. Once the generation finished, you will see a  `sampleTest.spec.ts` file in your `{PROJECT_ROOT}/test/public` folder, which only has a empty test and you may change them into test against your own services.

See the [Javascript Codegen Quick Start for Test](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/test-quickstart.md) for information on how to write and run tests for the Javascript SDK.

## Prerequisites

- To record and playback the tests, [Docker](https://www.docker.com/) is required when we run the test, as the [test proxy server](https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy) is run in a container during testing. When running the tests, ensure the Docker daemon is running and you have permission to use it.

1. **run the test**  
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

# Format both the generated code and manual code
After you have finished the generation and added your own tests or samples, You can use the following command to format the code.  
```shell
cd ${PROJECT_ROOT} && rushx format
```

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

# Create API View
You may also want to create API View when submitting a PR. You can do it easily by uploading a json file to [API View Website](https://apiview.dev/). The json file is under `<you-sdk-folder>/temp`, and its name ends with `api.json`. For example: `sdk/compute/arm-compute/temp/arm-compute.api.json`.

# How to do customizations
There is many information about the SDK that AutoRest will never know, so you may want to do your customizations based on generated code. 

We collect some common customization cases and you can read [Customization on the RLC rest-level client libraries](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-customization.md) for more details.
