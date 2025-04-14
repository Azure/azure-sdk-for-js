Getting Started - Generate the RLC REST-level client libraries with Swagger
===========================================================================

# Before you start

Please refer to this [link](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#prerequisites) for the environment set up prerequisites in `azure-sdk-for-js` repository. We highly recommand to read [this blog](https://devblogs.microsoft.com/azure-sdk/azure-rest-libraries-for-javascript/) to get familiar with REST libraries for JavaScript. 

:warning: Note: if you’re generating from Cadl with RLC, please read [this doc](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md) for Cadl specific details.

# Project folder and name convention

If you are the first time to prepare the SDK, please follow the Azure SDK guidance and discuss with architects to decide the project folder and name convention for RLC libraries.

1. Project Folder Structure.  
   normally, the folder structure would be something like `sdk/{servicename}/{servicename}-{modulename}-rest`. For example, we have `sdk/agrifood/agrifood-farming-rest` folder for Farmbeats account modules. That folder will be your **${PROJECT_ROOT} folder**.  
1. Package Name Convention.  
   The package name for RLC is something like `@azure-rest/{servicename}-{modulename}`. For example, the package name for Farmbeats module is `@azure-rest/agrifood-farming`.

# How to generate RLC

We are working on to automatically generate everything right now, but currently, we still need some manual work to get a releasable package. Here're the steps of how to get the package.

1. **Create a swagger/README.md file under ${PROJECT_ROOT} folder**  
    We are using autorest to generate the code, but there's a lot of command options and in order to make the regenerate process easier in the cases of refresh the rest api input or change the code generator version, you need to document the generate command parameters.  
    Here's an example of the `swagger/README.md`:

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
    generate-sample: true
    license-header: MICROSOFT_MIT_NO_VERSION
    output-folder: ../
    source-code-folder-path: ./src
    input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/683e3f4849ee1d84629d0d0fa17789e80a9cee08/specification/agfood/data-plane/Microsoft.AgFoodPlatform/preview/2021-03-31-preview/agfood.json
    package-version: 1.0.0-beta.2
    rest-level-client: true
    security: AADToken
    security-scopes: https://farmbeats.azure.net/.default
    use-extension:
      "@autorest/typescript": "6.0.0-rc.10"
    ```
    ~~~

    Here, we need to replace the value in `package-name`, `title`, `description`, `input-file`, `package-version`,  `security`,`security-scopes` into **your own service's** `package-name`, `title`, `description` etc.

    **How to configure authentication**
    
    Autorest only support two types of authentication: Azure Key Credential(AzureKey) and Token credential(AADToken), any other will need to be handled manually. 

    This could be either configured in OpenAPI spec or configuration file e.g `README.md`. You could learn more in [Authentication in AutoRest](https://github.com/Azure/autorest/blob/main/docs/generate/authentication.md).

    Here are the details if we configure in README.md file.
    - Support AAD token authentication
    ```yaml
    security: AzureKey
    security-header-name: Your-Subscription-Key
    ```
    - Support key authentication
    ```yaml
    security: AADToken
    security-scopes: https://yourendpoint.azure.com/.default
    ```
    - Support both credentials
    ```yaml
    security:
      - AADToken
      - AzureKey
    security-header-name: Your-Subscription-Key
    security-scopes: https://yourendpoint.azure.com/.default
    ```
    - Disable neither authentications
    ```yaml
    add-credentials: false
    ```
  
    ---
    **NOTE**

    It's always recommended to replace the version of code generator @autorest/typescript with the latest version you can find in [npmjs.com](https://www.npmjs.com/package/@autorest/typescript) in latest tag. 

    If the `input-file` is followed by an `.md` file, you need to replace the `input-file` with `require`. If it is a `JSON` file, do not change it.

    We enable the samples generation by default, this may fail the generation due to the example quality or codegen issue. You could turn this option off by `generate-sample: false` to non-block your process.

    **After the first generation, you need to switch `generate-metadata: false` as we have some manual changes in this file and don't want them get overwritten by generated ones.**

    ---  
  
1. **Edit rush.json**  
    As the libraries in this `azure-sdk-for-js` repository are managed by rush, you need to add an entry in `rush.json` under projects section for the first time to make sure it works. For example:

    ```json
        {
          "packageName": "@azure-rest/agrifood-farming",
          "projectFolder": "sdk/agrifood/agrifood-farming-rest",
          "versionPolicyName": "client"
        },
    ```

    Here, you also need to replace the `packageName`, `projectFolder` into your own services'.

    ---  
    **NOTE**

    About the `versionPolicyName`, if the library you are working on is for data-plane, then it should be `client`, if the library you are working on is for control plane, then it should be `mgmt`.  

    ---  

1. **Run autorest to generate the SDK**  

    Now, you can run this command in swagger folder you just created.

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
    
    But, we still need to add some tests for it.

# Improve README.md document

A minimal README.md is generated by our codegen and you could improve README.md file per your service. To learn more about README, see an [example README.md here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-route-rest/README.md).


# How to write test for RLC

In order to release your RLC library, we need to add some tests for it to make sure we are delivering high quality packages. But before adding the test, we need to enable the option `generate-test: true` to generate the necessary change in `package.json` and `tsconfig.json` so that test framework can work. Once the generation finished, you will see a `sampleTest.spec.ts` file in your `{PROJECT_ROOT}/test/public` folder, which has an empty test and you could add/update test cases against your own services.

See the [JavaScript Codegen Quick Start for Test](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Quickstart-on-how-to-write-tests.md) for information on how to write and run tests for the JavaScript SDK.

1. **Prerequisites** 

    To be able to leverage the asset-sync workflow
    - Install [Powershell](https://github.com/PowerShell/PowerShell)
      - Make sure `pwsh` command works at this step (If you follow the above link, `pwsh` is typically added to the system environment variables by default)
    - Add `dev-tool` to the `devDependencies` in the `package.json`.

    The package you are migrating needs to be using the new version of the recorder that uses the test proxy (`@azure-tools/test-recorder@^3.0.0`).

    Then, we need to generate a `assets.json` file. If your package is new or has never been pushed before, you could use below commands:

    ```shell
    npx dev-tool test-proxy init # this will generate assets.json file, you will get some info in this file.
    ```

1. **Write the test**
    
    You could follow the [basic RLC test interaction and recording example](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Quickstart-on-how-to-write-tests.md#example-1-basic-rlc-test-interaction-and-recording-for-azure-data-plane-service) to write your test step by step. Also you could refer [the test of MapsRouteClient](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-route-rest/test/public) for more cases.


2. **Run the test**

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

3. **Push recording to assets repo**

    `Notice`:
      - the tests have to be recorded using the `TEST_MODE=record`, then the recording files will be generate.

      - Before push your recording file, you must confirm that you are able to push recordings to the `azure-sdk-assets` repo, you need write-access to the assets repo.
      [Permissions to `Azure/azure-sdk-assets`](https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/785/Externalizing-Recordings-(Asset-Sync)?anchor=permissions-to-%60azure/azure-sdk-assets%60)


    Here is the command to push:

    ```shell
    npx dev-tool test-proxy push 
    ```

    After above command finished, you can find your local recording files in `./azure-sdk-for-js/.assets`.

    And if you want to find your recording on `assets repo`, you can get the tag in `assets.json` in your package root, which is a tag pointing to your recordings in the [Azure/azure-sdk-assets](https://github.com/Azure/azure-sdk-assets) repo.

    Example `assets.json` from `keyvault-certificates` SDK.
    
    ```json
    {
      "AssetsRepo": "Azure/azure-sdk-assets",
      "AssetsRepoPrefixPath": "js",
      "TagPrefix": "js/keyvault/keyvault-certificates",
      "Tag": "js/keyvault/keyvault-certificates_43821e21b3"
    }
    ```
    And the recordings are located at [here](https://github.com/Azure/azure-sdk-assets/tree/js/keyvault/keyvault-certificates_43821e21b3).
    

# How to write samples

If you enable `generate-sample: true` option, the codegen would do two things for you:
- Add samples metadata in `tsconfig.json` and `package.json`.
- Generate a collection of TypeScript sample files (based on `x-ms-examples` in OpenAPI specs) under `samples-dev` folder.

Please notice that the generated samples might not be directly usable as runnable codes, however, we could get the basic idea on how code works, and update them to be more valuable samples.

And the errors may come from two kinds, the codegen issue or swagger example issue. For the former one, we need to report them with codegen owner while as for the latter one we need to fix our swagger examples.

Now, you can generate both JavaScript and TypeScript workable samples with the following commands.

```shell
npm install -g common/tools/dev-tool # make sure you are in the azure-sdk-for-js repo root directory
cd ${PROJECT_ROOT}
npx dev-tool samples publish -f 
```

You will see the workable samples in the `${PROJECT_ROOT}/samples` folder. 

Besides the generated samples, we also recommand you to add your HERO sample scenarios per your services to guide customers on how to use your library. You could refer to [the samples of MapsRouteClient here](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-route-rest/samples-dev) as an example.

# Format both the generated code and manual code

After you have finished the generation and added your own tests or samples, You can use the following command to format the code.

```shell
cd ${PROJECT_ROOT} && rushx format
```
 
Also we'll recommand you to run `lint` command to analyze your code and quickly find any problems.

```shell
cd ${PROJECT_ROOT} && rushx lint
```

And we could use `lint:fix` if there are any errors.

```shell
cd ${PROJECT_ROOT} && rushx lint:fix
```

# How to do customizations

You may want to do your customizations based on generated code. We collect some common customization cases and you can read [Customization on the RLC rest-level client libraries](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-customization.md) for more details.

# How to create package

Now, we can use the exact same steps to build an releasable artifact.

```shell
rush update
rush build -t <your-package-name>
cd <your-sdk-folder>
export TEST_MODE=record && rushx test
rushx pack
```
You may send this artifact to your customer if your services are still in private preview and some customers want to try it out.

# Create/Update the ci.yaml

Now, if everything looks good to you, you can submit a PR in `azure-sdk-for-js` repo with all the changes you made above. Before you do that, you need to add/update the `ci.yml` file. Depends on whether there's already one in your package folder.

If there's no such file, then you can add the following template.

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

Please change the `paths.include` value as your own project path, and change the Artifacts `name` and `safeName` into yours.  

If there's already a `ci.yml` file in your project path, then the only thing you need to do is to add the Artifacts `name` and `safeName` of yours into that `ci.yml`.  

Please notice the Artifacts name should align with your package name. Here, the package name is `@azure-rest/agrifood-farming`, so the relevant Artifacts name is `azure-rest-agrifood-farming`.

# Prepare PR

The codegen can only help you generate SDK code, there is something you need to update manually:

## CHANGELOG.md

CHANGELOG can help customers know the change of new version quicky, so you need to update it according to the change of this new version. It is also necessary to update release date like `1.0.0-beta.1 (2022-11-11)` (rough time is fine and no need to be very accurate).

## Version Number

You shall update the version number according to [semantic versioning rule](https://semver.org/).

## Test recordings

Please ensure that your test recordings are committed together with your code.

## Fix CI for PR

You may meet the CI failures after submitting the PR, so please refer to [Troubleshoot CI Failure](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Troubleshoot-ci-failure.md) to fix it.

## CC dpg-devs for review

Please add below comment in your PR to include `dpg-devs` to review your PR timely.

```
cc @Azure/dpg-devs for awareness
```

# Create API View

When submitting a PR, our pipeline would automatically prepare the API view in [API View Website](https://apiview.dev/). You could see an [example link](https://github.com/Azure/azure-sdk-for-js/pull/23866#issuecomment-1316259448) here. You could click the API view link in that comment to know more details. 

# Release

After the PR is merged, it is time to release package. Here is the [Release Checklist](https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/8/Release-Checklist?anchor=prepare-release-script) you should know before release.
