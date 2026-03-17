This guide will show you how to migrate a package's samples from the older samples v1 system to the new samples v2 system. Migrating to this system is part of the Azure SDK for JavaScript **Sample Quality Effort**, as the new system enables you to more easily develop and make changes to sample programs in your packages. The migration should be very straightforward for most packages.

### Samples v1

To clarify, the samples v1 system consists of:

- a `build:samples` NPM script that runs `dev-tool samples prep`, followed by
- an `execute:samples` NPM script that runs `dev-tool samples run`

In this old system, we only store sample programs in the public samples folder `/sdk/<service>/<package>/samples`, and the above two scripts exist to convert those "camera-ready" public samples into a format suitable for execution in the CI environment. We required package maintainers to manually update the meta-information files (such as `package.json`, `sample.env`, `tsconfig.json`, `README.md`).

### Samples v2

In the new system, sample sources are stored in `samples-dev` as simple TypeScript sources and annotated with a few simple directives. When working on samples in development, you will work out of this new folder instead of the `samples` folder, which is reserved for published sample copies. No manual management of meta-information files or JavaScript equivalents is required, because we generate all of these files from the TypeScript sources using templates.

## Migrating an Existing Package

Follow these steps. If you encounter _any_ issues with the following guide, please reach out to Will Temple (alias: witemple, @witemple-msft).

1. Install `dev-tool`. Navigate to `/common/tools/dev-tool` within the azure-sdk-for-js repo, and install the command globally:

```bash
$ cd common/tools/dev-tool
$ npm install -g
```

You will rarely have to do this again, as dev-tool bootstraps itself from the code in the repository, so it is always running from source.

1. Go to your package directory and copy the TypeScript sources to a new folder called `samples-dev`.

```bash
$ cd sdk/<service>/<package>
$ mkdir samples-dev
$ cp samples/typescript/src/* samples-dev/
```

2. Open the tsconfig.json for your package, and add the following settings. Replace any `include` and `exclude` configurations (unless you are _absolutely_ sure you need to change these settings) with only the following `"include"`, and add the `"paths"` configuration to the compiler options as shown below (replacing `<package name>` with the name of your package, e.g. `@azure/template`):

```javascript
{
  "compilerOptions": {
    ...,
    "paths": {
      "<package name>": ["./src/index"]
    }
  },
  "include": ["src/**/*.ts", "test/**/*.ts", "samples-dev/**/*.ts"]
}
```

These settings configure TypeScript to include your sources, tests, and sample programs during compilation (no more special compilation passes just for samples), and it configures the compiler to be able to resolve your package's types from within its own code, so that `import {...} from "@azure/template";` will typecheck correctly _within_ `@azure/template` itself (this does not change the runtime behavior of the program in any way).

3. Edit your package.json file's `"scripts"` entry and modify the samples scripts. Disable the `"build:samples"` script by replacing it with `echo Obsolete.` (we'll remove all of these and the CI steps that run them once the migration is complete). In addition, we'll change the `"execute:samples"` script to run the samples directly from `samples-dev`.

```javascript
{
  ...,
  "scripts": {
    ...,
    "build:samples": "echo Obsolete.",
    "execute:samples": "dev-tool samples run samples-dev",
    ...
  }
}
```

We also need to add the new `samples-dev` folder to the `format` commands, so that the sample sources will be formatted and checked for formatting when we execute `npm run format` (note the addition of **`\"samples-dev/**/*.ts\"`** to both commands):

```javascript
{
  ...,
  "scripts": {
    ...,
    "check-format": "prettier --list-different --config ../../../.prettierrc.json --ignore-path ../../../.prettierignore \"src/**/*.ts\" \"test/**/*.ts\" \"samples-dev/**/*.ts\" \"*.{js,json}\"",
    "format": "prettier --write --config ../../../.prettierrc.json --ignore-path ../../../.prettierignore \"src/**/*.ts\" \"test/**/*.ts\" \"samples-dev/**/*.ts\" \"*.{js,json}\"",
    ...
  }
}
```

4. Double-check that you have a good `sample.env` file in your package. Every Azure SDK for JavaScript package should have a file at its root (next to its package.json) called `sample.env` that lists and documents the environment variables that are used in the code. Check to make sure that this file exists **and that it makes sense to include this file in the sample bundle, as it will be given to customers**. This file is copied directly into the sample bundles, so if you have extra environment variables that are only used for testing, but not in the sample programs, it may make sense to split those off into a separate `test.env` file.

The `sample.env` file for the template project looks like this:

```
# Used in most samples. Retrieve these values from an instance in the Azure
# Portal. The APPCONFIG_TEST_SETTING_KEY value indicates which key to use
# when retrieving an example setting.

APPCONFIG_ENDPOINT="https://<resource name>.azconfig.io",
APPCONFIG_TEST_SETTING_KEY="<key>"
```

5. Update the sample configuration in the package.json file. There is a metadata field in the package.json of every Azure SDK for JavaScript package's configuration called `//sampleConfiguration`. Samples v2 introduces several new fields to this configuration that control how your sample bundles will be generated. Fill in the following fields with the appropriate values:

```javascript
{
  ...,
  "//sampleConfiguration": {
    // This should be the primary name of the Azure product, e.g.
    // - Azure Text Analytics
    // - Azure Storage Blob
    // - Azure Key Vault
    "productName": "Azure Text Analytics",
    // These are the product slugs associated with your package in docs.microsoft.com
    // Take these from the YAML frontmatter at the top of the existing sample READMEs
    // for your package, from the `products` array.
    //
    // It is _very_ important that these product slugs are correct. Please check the
    // documentation from docs.microsoft.com to ensure that they are.
    "productSlugs": [
      "azure",
      "azure-cognitive-services",
      "azure-text-analytics"
    ],
    // These are the Azure resource instances that are required for a developer to run
    // the sample programs. We express these as a map from resource name to a link that
    // describes how to create the resource. The resource name is not necessarily the
    // same as the product name. For example, Azure Text Analytics uses an "Azure
    // Cognitive Services account". The resource name should be a noun (in other words,
    // it should fit into the sentence "create a(n) ${resourceName}".
    "requiredResources": {
      "Azure Cognitive Services account": "https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account"
    }
  },
  ...
}
```

There are also some _optional_ settings that may be useful for your specific situation:

```javascript
{
  ...,
  "//sampleConfiguration": {
    // This field can be used to disable smoke-tests from running on your package.
    "skipFolder": false,
    // If this field is set to "true", then the YAML frontmatter for publication
    // on docs.microsoft.com will not be generated. You should ordinarily not
    // set this property, but in some cases (ex. @azure/template), we want to
    // generate, but not publish samples.
    "disableDocsMs": false,
    // This can be used to override the API reference documentation link.
    // Ordinarily, the link is assumed to be
    // https://docs.microsoft.com/javascript/api/<packagename>
    // However, you can change it with this property if you need to.
    "apiRefLink": "https://docs.microsoft.com/javascript/api/",
    // Any dependency version specifications in this setting will be preferred
    // over the dependencies specified in your ordinary dependencies or
    // devDependencies.
    "dependencyOverrides": {
      // For example, this setting will cause the generated sample packages
      // to include a dependency on a beta version of identity instead of the
      // version that your package depends on (currently ^1.1.0)
      "@azure/identity": "next"
    }
  },
  ...
}
```

6. We need to make a couple of changes to your sample sources. In samples-dev ensure that each sample has a JSDoc comment at the top that includes a `summary` tag. For example, the template package's sample looks like this:

```javascript
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a ConfigurationClient to retrieve a setting value.
 */

import { ConfigurationClient } from "@azure/template";
import { DefaultAzureCredential } from "@azure/identity";

export async function main() {
  const endpoint = process.env.APPCONFIG_ENDPOINT ?? "<endpoint>";
  const key = process.env.APPCONFIG_TEST_SETTING_KEY ?? "test-key";

  const client = new ConfigurationClient(endpoint, new DefaultAzureCredential());

  const setting = await client.getConfigurationSetting(key);

  console.log("The setting has a value of:", setting.value);
  console.log("Details:", setting);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

The `@summary` JSDoc tag is essential, and generating your sample packages will fail if any sources in samples-dev are missing this directive. It is used for the summary text in the table that lists the sample programs in their README files.

#### Extra JSDoc Settings

There are other non-required JSDoc settings that can be used to control how the samples are ordered and rendered within the output bundles. These extra tags (all prefixed with `azsdk-`) are all optional and will be _removed_ from the output sample files. They are only used internally to control how the output bundles appear.

- `@azsdk-weight <number>`: Specifies the "weight" of the sample file relative to the others. Samples with a higher weight will appear first within the source file table in the README, and the first sample by weight is used in the examples. If this setting is omitted, a default weight of zero is assumed.
- `@azsdk-ignore <boolean>`: If true, specifies that the sample should be excluded from the output. It will not appear in either the TypeScript sample package output or in the JavaScript sample package. This can be useful for prototyping samples before releasing them.
- `@azsdk-skip-javascript <boolean>`: If true, specifies that no JavaScript counterpart should be generated for the sample. It will still be published in the TypeScript sample package, but will be omitted from the JavaScript samples. This is useful for samples that only exist to demonstrate interactions with TypeScript.
- `@azsdk-util <boolean>`: If true, indicates that the file is a utility file and will exclude it from the README.md tables. It will still appear in the output folder, but will not be listed in the README.

7. Try it out. At this point, you should be done, and what remains is to make sure that your program is building and that the sample generation works correctly. Delete the old sample directory first:

```bash
$ rm -rf samples
$ pnpm -F {.}... build
$ npx dev-tool samples publish
```

**Note**: `dev-tool` will never overwrite a directory that has unstaged git changes. You must commit or stash your changes _before_ running dev-tool.

If everything worked well, then take a look at the generated sample bundles (in `samples/v${majorVersion}`) and make sure they look good. If you ran into any issues, please make sure again to reach out for assistance.

You are done! Congratulations.