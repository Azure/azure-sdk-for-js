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

Each package folder contains a package-specific `README.md` file. Most of these `README` files contain samples illustrating basic usage of the the APIs contained in the package. For example, you can find the Getting Started samples for the `@azure/storage-blob` package [here](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob#examples).

## Package Samples and How-To Guides

Each package folder contains a subfolder called `samples` with additional code samples in the `typescript` and `javascript` subfolder. Corresponding files (i.e. `samples/typescript/src/helloWorld.ts` and `samples/javascript/helloWorld.js`) in the TypeScript and JavaScript directories are functionally equivalent. These samples may be viewed in GitHub or browsed on [the Sample Browser at docs.microsoft.com/samples](https://docs.microsoft.com/samples/browse/?products=azure&languages=typescript%2Cjavascript) by selecting the product and language combination that you wish to view samples for.

## Global Samples

Samples that apply to every package or to no package in particular are located in subdirectories within the root `/samples` directory. For example, the [`/samples/Bundling`](https://github.com/Azure/azure-sdk-for-js/tree/master/samples/Bundling) directory contains sample code illustrating how to configure package bundling tools to work with the Azure SDK for JS packages:

- `/samples/Bundling`
  - `/parcel` (samples for using the SDK packages with parcel)
    - `/js` (in JavaScript, using CommonJS)
    - `/ts` (in TypeScript)
  - `/rollup` (the same, with rollup)
  - `/webpack` (the same, with webpack)

(The `rollup` and `webpack` directories also have `js` and `ts` subdirectories for JavaScript and TypeScript respectively.)

For more information on package bundling, see [`/documentation/Bundling.md`](https://github.com/Azure/azure-sdk-for-js/blob/master/documentation/Bundling.md).

## Sample Applications

Sometimes we want to illustrate how several APIs or even packages work together in a context of a more complete program. For these cases, we created sample applications. These application samples are located in other repositories and, like the package-specific samples, may be viewed on [https://docs.microsoft.com/samples/](https://docs.microsoft.com/samples/).
