# Getting Started: Generate JavaScript/TypeScript DPG Libraries with TypeSpec

## Before You Start

:warning: **Important**: Only proceed with DPG code generation for JavaScript/TypeScript if you have been explicitly instructed to do so by the AZSDK Architecture Board. Otherwise, please use the [RLC Quickstart Guide](https://aka.ms/azsdk/rlc/js).

:warning: Ensure that your TypeSpec definition has been merged into the main branch of the [Azure REST API specs repository](https://github.com/Azure/azure-rest-api-specs) before you begin.

For an overview of the review and release process for new libraries, visit: https://aka.ms/azsdk/dpcodegen.

If you have code generation queries, post them in the [TypeSpec Discussion](https://teams.microsoft.com/l/channel/19%3a906c1efbbec54dc8949ac736633e6bdf%40thread.skype/TypeSpec%2520Discussion%2520%25F0%259F%2590%25AE?groupId=3e17dcb0-4257-4a30-b843-77f47f1d4121&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47) channel. Tag `@DPG TypeScript` for JavaScript/TypeScript-specific inquiries.

Join the [JavaScript - Reviews](https://teams.microsoft.com/l/channel/19%3a408c5f1322ee4303b02b5da9c5ff6137%40thread.skype/Language%2520-%2520JavaScript%2520-%2520Reviews?groupId=3e17dcb0-4257-4a30-b843-77f47f1d4121&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47) channel for assistance with the API review process.

## Prerequisites

- Node.js 18 or later.
- Install Rush with `npm install @microsoft/rush`.

## Setting Up Your Development Environment

Follow the [setup guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#prerequisites) for environment prerequisites in the Azure SDK for JS repository.

## Identifying Your Project's Service and Package Names

The `service name` is a concise identifier for the Azure service and should be consistent across all SDK languages. It's typically the name of the directory in the azure-rest-api-specs repository containing your service's REST API definition.

The `package name` is used when publishing to [NpmJs](https://www.npmjs.com/). It usually follows the format `@azure/{service-name}` or `@azure/{service-name}-{module}` for services with multiple modules.

## Structuring Your Project

1. **SDK Repository Root**: Fork and clone the [azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) repository.
2. **Project Folder Structure**: The typical structure is `sdk/{servicename}/{servicename}-{modulename}`, e.g., `sdk/storage/storage-blob`.
3. **Package Name Convention**: Follow the format `@azure/{service-name}-{module}`, like `@azure/storage-blob`.

## Steps to Generate DPG

1. **Configure TypeScript Emitter**
   In your specs repository, update or create `tspconfig.yaml` to configure the TypeScript emitter. Replace `YOUR_SERVICE_DIRECTORY` and `YOUR_PACKAGE_NAME` with your specific details.

   ```yaml
   parameters:
     "service-dir":
       default: "YOUR_SERVICE_DIRECTORY"

   emit: ["@azure-tools/typespec-ts"]

   options:
     "@azure-tools/typespec-ts":
       isModularLibrary: true
       packageDetails:
         name: YOUR_PACKAGE_NAME
         description: "SHORT_DESCRIPTION"
         version: "1.0.0-beta.1"
   ```

   > **Note**: After the initial generation, set `generateMetadata: false` to avoid overwriting any manual updates to the generated package.json

2. **Run the Generation Command**
   To add a clear example to the guide, you would insert a new section that directly follows the explanation of the generation command. This would provide users with a practical application of the command in a real-world scenario. Here’s how you could incorporate it:

3. **Initialize and generate the new TypeScript DPG library**

   Use the `tsp-client` CLI tool to initialize the generation process. From the root of your local `azure-sdk-for-js` repository clone, run the following command, replacing `YOUR_REMOTE_TSPCONFIG_URL` with the URL to your TypeSpec configuration file:

   ```sh
   tsp-client init -c YOUR_REMOTE_TSPCONFIG_URL
   ```

   ### Example

   If you are generating the DPG library for Azure Cognitive Services Content Safety, and your TypeSpec configuration file is located at `https://github.com/Azure/azure-rest-api-specs/blob/46ca83821edd120552403d4d11cf1dd22360c0b5/specification/cognitiveservices/ContentSafety/tspconfig.yaml`, you would initialize the library like this:

   ```sh
   tsp-client init -c https://github.com/Azure/azure-rest-api-specs/blob/46ca83821edd120552403d4d11cf1dd22360c0b5/specification/cognitiveservices/ContentSafety/tspconfig.yaml
   ```

   This command sets up your local SDK repository with the necessary structure and files based on your `tspconfig.yaml` file.

4. **Update rush.json**
   Add your library to the `rush.json` file in the projects section to manage it with Rush.

   ```json
   {
     "packageName": "YOUR_PACKAGE_NAME",
     "projectFolder": "YOUR_SERVICE_DIRECTORY/YOUR_PACKAGE_NAME",
     "versionPolicyName": "client"
   }
   ```
