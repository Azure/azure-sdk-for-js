# Samples, Snippets, and How-To Guides

Developers like to learn by looking at code, and so the Azure SDK comes with many samples in the form of short code snippets, sample applications, and how-to guides. This document describes where to find all these resources.

## Structure of the Repository

The Azure SDK repository is organized in the following folder structure, with the main sample locations highlighted using **bold** font.

- `/samples` (this folder)
  - `README.md` (this file)
  - ... (subdirectories for examples that aren't specific to only one package)
- `/sdk` (folder containing sources for all SDK packages)
  - `/<service>` (e.g. storage)
    - `/<package>` (e.g. `@azure/storage-blob`)
      - **`README.md`** (package READMEs contain "hello world" code snippets)
      - **`/samples`**
        - **`/typescript`** (package-specific samples in TypeScript)
        - **`/javascript`** (package-specific samples in JavaScript using CommonJS)
      - `/src`
      - `/tests`

## Getting Started Samples

Each package folder contains a package-specific `README.md` file. Most of these `README` files contain samples illustrating basic usage of the the APIs contained in the package. For example, you can find the Getting Started samples for the `@azure/storage-blob` package [here](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob#examples).

## Package Samples and How-To Guides

Each package folder contains a subfolder called `samples` with additional code samples in the `typescript` and `javascript` subfolder. Corresponding files (i.e. `samples/typescript/src/helloWorld.ts` and `samples/javascript/helloWorld.js`) in the TypeScript and JavaScript directories are functionally equivalent. These samples may be viewed in GitHub or browsed on [the Sample Browser at learn.microsoft.com/samples](https://learn.microsoft.com/samples/browse/?products=azure&languages=typescript%2Cjavascript) by selecting the product and language combination that you wish to view samples for.

### Authoring Package Samples

For the majority of our packages we use the following workflow to develop samples:

1. Create samples in TypeScript under the package's `samples-dev/` directory
2. Add a `sample.env` listing all the environment variables that are needed by the samples of this package. Customers can adopt it into their `.env` file when running samples.
3. After testing is done on your samples, run `npx dev-tool samples publish` **from the package directory (where the package.json is located), not from the repository root**. This command generates both TypeScript and JavaScript versions of the samples under the `samples/` folder.

### Sample Configuration in package.json

The `//sampleConfiguration` section in the `package.json` holds the package-level sample configuration. Here is an example

```json
  "//sampleConfiguration": {
    "productName": "Azure Schema Registry",
    "productSlugs": [
      "azure",
      "azure-schema-registry"
    ],
    "requiredResources": {
      "Azure Schema Registry resource": "https://aka.ms/schemaregistry"
    }
  },
```

If you do not want to publish samples to learn.microsoft.com, add `"disableDocsMs": true` in the sample configuration.

### Azure SDK Metadata Tags for Samples

Files under `samples-dev` can also be configured individually with the following tags.

The `@summary` tag in JSDoc comments is used to provide a description of the sample, which will be extracted and included in the generated sample index in the sample README.md.

The following tags can be used in the first doc comment after the license header to customize the publication of samples

- `@azsdk-weight`: this gives a weight to the sample. It is used to control the ordering of samples in the table of the sample README.md. Samples with larger weights appear before samples with smaller weights. A default value of zero is used if weight is not specified.

- `@azsdk-ignore`: this causes the file to be skipped entirely (will not be included in publication)

- `@azsdk-util`: this causes the file to be omitted from the generated sample index in the sample README.md.

- `@azsdk-skip-javascript`: this causes the file to skip JavaScript output. Useful when sample code doesn't have supported syntax in the CommonJS version.

## Global Samples

Samples that apply to every package or to no package in particular are located in subdirectories within the root `/samples` directory. For example, the [`/samples/Bundling`](https://github.com/Azure/azure-sdk-for-js/tree/main/samples/Bundling) directory contains sample code illustrating how to configure package bundling tools to work with the Azure SDK for JS packages:

- `/samples/Bundling`
  - `/parcel` (samples for using the SDK packages with parcel)
    - `/js` (in JavaScript, using CommonJS)
    - `/ts` (in TypeScript)
  - `/rollup` (the same, with rollup)
  - `/webpack` (the same, with webpack)

(The `rollup` and `webpack` directories also have `js` and `ts` subdirectories for JavaScript and TypeScript respectively.)

For more information on package bundling, see [`/documentation/Bundling.md`](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md).

## Sample Applications

Sometimes we want to illustrate how several APIs or even packages work together in a context of a more complete program. For these cases, we created sample applications. These application samples are located in other repositories and, like the package-specific samples, may be viewed on [https://learn.microsoft.com/samples/](https://learn.microsoft.com/samples/).
