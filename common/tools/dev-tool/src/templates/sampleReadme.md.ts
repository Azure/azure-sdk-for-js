// Copyright (c) Microsoft corporation.
// Licensed under the MIT license.

import path from "path";
import YAML from "yaml";

import prettier from "prettier";

interface SampleReadmeConfiguration {
  /**
   * YAML frontmatter used for publication on docs.microsoft.com.
   */
  frontmatter: unknown;
  /**
   * Whether or not to add the TypeScript-specific bits.
   */
  useTypeScript: boolean;
  /**
   * The Azure product name to use
   */
  productName: string;
  /**
   * The path within the repo to the package for this README.
   */
  projectRepoPath: string;
  /**
   * The camera-ready samples directory name
   */
  publicationDirectory: string;
  /**
   * Sample information from the TypeScript compiler.
   */
  moduleInfos: Array<{
    filePath: string;
    relativeSourcePath: string;
    summary: string;
  }>;
}

function formatFrontmatter(frontmatter: unknown): string {
  if (!frontmatter) return "";

  return `\
---
${YAML.stringify(frontmatter, { indent: 2 })}\
---

`;
}

function fence(language: string, ...contents: string[]): string {
  return `\`\`\`${language}\n${contents.join("\n\n")}\n\`\`\``;
}

function sampleLinkTag(filePath: string): string {
  return path
    .basename(filePath)
    .replace(/\.[a-z]*$/, "")
    .replace(/\//, "_")
    .toLowerCase();
}

function links(info: SampleReadmeConfiguration) {
  const packageSamplesPathFragment = [
    info.projectRepoPath,
    info.publicationDirectory,
    info.useTypeScript ? "typescript/src" : "javascript"
  ].join("/");

  return info.moduleInfos
    .map(
      ({ filePath, relativeSourcePath }) =>
        `[${sampleLinkTag(
          filePath
        )}]: https://github.com/Azure/azure-sdk-for-js/${packageSamplesPathFragment}/${relativeSourcePath}`
    )
    .join("\n");
}

function table(info: SampleReadmeConfiguration) {
  const contents = info.moduleInfos.map(
    ({ filePath, summary, relativeSourcePath }) =>
      `| [${relativeSourcePath}][${sampleLinkTag(filePath)}] | ${summary} |`
  );

  return [
    "| **File Name** | **Description** |",
    "| ------------- | --------------- |",
    ...contents
  ].join("\n");
}

export default (info: SampleReadmeConfiguration) => {
  let stepCount = 1;
  const step = (content: string) => `${stepCount++}. ${content}`;

  const language = info.useTypeScript ? "TypeScript" : "JavaScript";

  return prettier.format(
    `${formatFrontmatter(info.frontmatter)}\
# ${info.productName} client library samples for ${language}

These sample programs show how to use the ${language} client libraries for Azure Template in some common scenarios.

${table(info)}

## Prerequisites

The samples are compatible with Node.js >= 10.0.0.

${(() => {
  if (info.useTypeScript) {
    return [
      "Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:",
      "",
      fence("bash", "npm install -g typescript"),
      ""
    ].join("\n");
  } else {
    return "";
  }
})()}\
You need [an Azure subscription][freesub] to run these sample programs. Samples retrieve credentials to access the endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables / credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

${step("Install the dependencies using `npm`:")}

${fence("bash", "npm install")}
${(() => {
  if (info.useTypeScript) {
    return [step("Compile the samples:"), "", fence("bash", "npm run build"), ""].join("\n");
  } else {
    return "";
  }
})()}
${step(
  "Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically."
)}

${step(
  "Run whichever samples you like (note that some samples may require additional setup, see the table above):"
)}

${fence("bash", `node ${info.useTypeScript ? "dist/" : ""}getConfigurationSetting.js`)}

Alternatively, run a single sample with the correct environment variables set (setting up the \`.env\` file is not required if you do this), for example (cross-platform):

${fence(
  "bash",
  `npx cross-env ENDPOINT="<endpoint>" API_KEY="<api key>" node ${
    info.useTypeScript ? "dist/" : ""
  }getConfigurationSetting.js`
)}

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

${links(info)}
[apiref]: https://docs.microsoft.com/javascript/api
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/${info.projectRepoPath}/README.md
${info.useTypeScript ? "[typescript]: https://www.typescriptlang.org/docs/home.html\n" : ""}\
`,
    {
      parser: "markdown"
    }
  );
};
