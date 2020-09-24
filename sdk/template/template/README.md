## Azure Template client library for JavaScript

This template serves as a starting point for JavaScript libraries targeting both Node and the Browser and implemented in TypeScript.

**Note:**
For a more complete example of README.md file, please see [README template][readme_template]. Also see the [Azure SDK Document Guidelines][azsdk_doc_guidelines] for more information.

## Building the Template

Please refer to the [Contributing Guide][contributing_guide] for information on how to build projects in this repository.

## Implementation Details

The overall build pipeline looks like the following:

1. TypeScript builds all source files under `./src` to ECMAScript Modules (ESM) under `./dist-esm`.
2. Rollup builds `./dist-esm` to an optimized single file at `./dist/index.js` as the Node entry point.
3. Rollup builds `./dist-esm` to an optimized browser bundle under `./browser/azure-template.js`.

Tests follow a similar pipeline, however test output is under `dist-test` folder.


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftemplate%2Ftemplate%2FREADME.png)

[readme_template]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/template/template/README-TEMPLATE.md
[azsdk_doc_guidelines]: https://review.docs.microsoft.com/help/contribute-ref/contribute-ref-how-to-document-sdk?branch=master#readme
[contributing_guide]: https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md
