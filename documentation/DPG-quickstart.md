Getting Started: Generate JavaScript/TypeScript DPG Libraries with TypeSpec
===========================================================================

# Before you start

:warning: **Important**: Only proceed with DPG code generation for JavaScript/TypeScript if you have been explicitly instructed to do so by the AZSDK Architecture Board. Otherwise, please use the [RLC Quickstart Guide](https://aka.ms/azsdk/rlc/js).

:warning: Ensure that your TypeSpec definition has been merged into the main branch of the [Azure REST API specs repository](https://github.com/Azure/azure-rest-api-specs) before you begin.

For an overview of the review and release process for new libraries, visit: https://aka.ms/azsdk/dpcodegen.

If you have code generation queries, post them in the [TypeSpec Discussion](https://teams.microsoft.com/l/channel/19%3a906c1efbbec54dc8949ac736633e6bdf%40thread.skype/TypeSpec%2520Discussion%2520%25F0%259F%2590%25AE?groupId=3e17dcb0-4257-4a30-b843-77f47f1d4121&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47) channel. Tag `@DPG TypeScript` for JavaScript/TypeScript-specific inquiries.

Join the [JavaScript - Reviews](https://teams.microsoft.com/l/channel/19%3a408c5f1322ee4303b02b5da9c5ff6137%40thread.skype/Language%2520-%2520JavaScript%2520-%2520Reviews?groupId=3e17dcb0-4257-4a30-b843-77f47f1d4121&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47) channel for assistance with the API review process.

## Prerequisites

- Node.js 18 or later.
- Install pnpm with the [pnpm installation instructions](https://pnpm.io/installation).
- Install tsp-client with `npm install -g @azure-tools/typespec-client-generator-cli`

# Set up your development environment

Follow the [setup guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#prerequisites) for environment prerequisites in the `azure-sdk-for-js` repository.

# Identify your project's service and package name

The `service name` is a concise identifier for the Azure service and should be consistent across all SDK languages. It's typically the name of the directory in the `azure-rest-api-specs` repository containing your service's REST API definition.

The `package name` is used when publishing to [npmjs](https://www.npmjs.com/). It usually follows the format `@azure/{service-name}` or `@azure/{service-name}-{module}` for services with multiple modules.

# Structure your project

1. **SDK Repo Root**: the generated libraries should be in the [azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) repo, so fork and clone it in your local then the absolute path is called **${SDK_REPO_ROOT} folder**.

1. **Project Folder Structure**: the typical structure is `sdk/{servicename}/{servicename}-{modulename}`, e.g., `sdk/storage/storage-blob`. That folder is under {SDK_REPO_ROOT} and will be your **${PROJECT_ROOT} folder**. 

1. **Package Name Convention**: follow the format `@azure/{service-name}-{module}`, like `@azure/storage-blob`.


# Steps to generate DPG

1. **Configure tspconfig.yaml in spec repository**
   
   In your specs repository, update or create `tspconfig.yaml` to configure the TypeScript emitter. Replace `YOUR_SERVICE_DIRECTORY`, `YOUR_SERVICE_FOLDER` and `YOUR_PACKAGE_NAME` with your specific details.

   ```yaml
   parameters:
     "service-dir":
       default: "YOUR_SERVICE_DIRECTORY"

   emit: ["@azure-tools/typespec-ts"]

   options:
     "@azure-tools/typespec-ts":
       emitter-output-dir: "{output-dir}/{service-dir}/YOUR_SERVICE_FOLDER"
       is-modular-library: true
       package-details:
         name: YOUR_PACKAGE_NAME
         description: "SHORT_DESCRIPTION"
         version: "1.0.0-beta.1"
   ```

2. **Generate code**
    
    **Initialize a new TypeScript DPG library**
    
    For initial set up, use the `tsp-client` CLI tool to initialize the generation process. From the root of your local `azure-sdk-for-js` repository clone, run the following command, replacing `YOUR_REMOTE_TSPCONFIG_URL` with the URL to your TypeSpec configuration file:

    ```sh
    tsp-client init -c YOUR_REMOTE_TSPCONFIG_URL
    ```

    If you are generating the DPG library for Azure Cognitive Services Content Safety, and your TypeSpec configuration file is located at `https://github.com/Azure/azure-rest-api-specs/blob/46ca83821edd120552403d4d11cf1dd22360c0b5/specification/cognitiveservices/ContentSafety/tspconfig.yaml`, you would initialize the library like this:

    ```sh
    tsp-client init -c https://github.com/Azure/azure-rest-api-specs/blob/46ca83821edd120552403d4d11cf1dd22360c0b5/specification/cognitiveservices/ContentSafety/tspconfig.yaml
    ```

    This command sets up your local SDK repository with the necessary structure and files based on your `tspconfig.yaml` file and then generate SDKs with given url typespec.

    **Re-generate an existing TypeScript DPG library**
    
    If you'd like to update/regenerate an existing SDK, go to your SDK folder and then update `tsp-location.yaml`. You can refer to the [tsp-location.yaml](https://github.com/Azure/azure-sdk-tools/blob/main/doc/common/TypeSpec-Project-Scripts.md#tsp-locationyaml) which describes the supported properties in the file.

    ```yaml
    directory: specification/agrifood/DataPlane
    commit: b646a42aa3b7a0ce488d05f1724827ea41d12cf1 # the commit id you'd like to refer for generation
    repo: Azure/azure-rest-api-specs
    ```
    
    Run the `update` command from SDK directory (i.e sdk/agrifood/agrifood-farming) to re-generate the code:

    ```sh
    tsp-client update
    ```

    ---  
    **NOTE**
    The version of typespec-ts is configured in [emitter-package.json](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/emitter-package.json) and relevant lock file [emitter-package-lock.json](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/emitter-package-lock.json). Change them in local, if you would like to use a different version of typespec-ts.

    --- 

# After SDK generation

The generated code is not enough to release at once and you need to update it for better usage experience. Please follow [steps after generation guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/steps-after-generations.md) to check the code.
