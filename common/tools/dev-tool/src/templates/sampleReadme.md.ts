// Copyright (c) Microsoft corporation.
// Licensed under the MIT license.

import path from "path";
import YAML from "yaml";

import prettier from "prettier";

import { SampleReadmeConfiguration } from "../util/samples/info";

/**
 * Renders the frontmatter of the sample README.
 */
function formatFrontmatter(frontmatter: unknown): string {
  if (!frontmatter) return "";

  return `\
---
${YAML.stringify(frontmatter, { indent: 2 })}\
---

`;
}

/**
 * A helper for rendering code fences. (Useful because of the multi-line
 * string literal using the same grave accent mark as its delimiter.
 */
function fence(language: string, ...contents: string[]): string {
  return `\`\`\`${language}\n${contents.join("\n\n")}\n\`\`\``;
}

/**
 * Renders a sample file name into a simple linkable tag.
 *
 * Ex. recognizePii.ts -> recognizepii
 */
function sampleLinkTag(filePath: string): string {
  return filePath
    .split(path.sep)
    .join("_")
    .replace(/\.[a-z]*$/, "")
    .toLowerCase();
}

/**
 * Renders the sample file links.
 */
function fileLinks(info: SampleReadmeConfiguration) {
  const packageSamplesPathFragment = [
    info.overridePublicationLinkFragment ?? info.publicationDirectory,
    info.useTypeScript ? "typescript/src" : "javascript",
  ].join("/");

  return filterModules(info)
    .map(({ relativeSourcePath }) => {
      const sourcePath = info.useTypeScript
        ? relativeSourcePath
        : relativeSourcePath.replace(/\.ts$/, ".js");
      return `[${sampleLinkTag(
        relativeSourcePath
      )}]: https://github.com/Azure/azure-sdk-for-js/blob/main/${packageSamplesPathFragment}/${sourcePath}`;
    })
    .join("\n");
}

function resourceNameToLinkSlug(name: string) {
  return `createinstance_${name.toLowerCase().replace(/\s+/g, "")}`;
}

/**
 * Renders the resource creation links.
 */
function resourceLinks(info: SampleReadmeConfiguration) {
  const resources = Object.entries(info.requiredResources ?? {});

  return resources.map(([name, link]) => `[${resourceNameToLinkSlug(name)}]: ${link}`).join("\n");
}

/**
 * Renders the text describing and linking to the required Azure resources.
 */
function resources(info: SampleReadmeConfiguration) {
  const resources = Object.entries(info.requiredResources ?? {});

  const header = `You need [an Azure subscription][freesub] ${
    resources.length > 0 ? "and the following Azure resources " : ""
  }to run these sample programs${resources.length > 0 ? ":\n\n" : "."}`;

  return (
    header + resources.map(([name]) => `- [${name}][${resourceNameToLinkSlug(name)}]`).join("\n")
  );
}

/**
 * Helper function for filtering the modules that are relevant to the sample README.
 */
function filterModules(info: SampleReadmeConfiguration): SampleReadmeConfiguration["moduleInfos"] {
  // In JavaScript mode, we may have to skip a sample that specified "skip-javascript"
  const modules = info.useTypeScript
    ? info.moduleInfos
    : info.moduleInfos.filter(({ azSdkTags: { "skip-javascript": skipJs } }) => !skipJs);

  return modules
    .filter(({ azSdkTags: { ignore } }) => !ignore)
    .sort((left, right) => {
      // Descending order, default 0
      return (right.azSdkTags.weight ?? 0) - (left.azSdkTags.weight ?? 0);
    });
}

/**
 * Renders the sample file table.
 */
function table(info: SampleReadmeConfiguration) {
  const contents = filterModules(info).map(({ summary, relativeSourcePath }) => {
    const fileName = info.useTypeScript
      ? relativeSourcePath
      : relativeSourcePath.replace(/\.ts$/, ".js");
    return `| [${fileName}][${sampleLinkTag(relativeSourcePath)}] | ${summary} |`;
  });

  return [
    "| **File Name** | **Description** |",
    "| ------------- | --------------- |",
    ...contents,
  ].join("\n");
}

/**
 * Renders an example node invocation for the README.
 */
function exampleNodeInvocation(info: SampleReadmeConfiguration) {
  const firstModule = filterModules(info)[0];
  const envVars = firstModule.usedEnvironmentVariables
    .map((envVar) => `${envVar}="<${envVar.replace(/_/g, " ").toLowerCase()}>"`)
    .join(" ");

  return `${envVars} node ${
    info.useTypeScript ? "dist/" : ""
  }${firstModule.relativeSourcePath.replace(/\.ts$/, ".js")}`;
}

/**
 * Create a link to the package.
 * @param info - the README configuration
 * @returns a link to the project
 */
function createReadmeLink(info: SampleReadmeConfiguration) {
  const fragment = info.overridePublicationLinkFragment
    ? info.overridePublicationLinkFragment.split("/").slice(0, -5).join("/")
    : info.projectRepoPath;
  return `https://github.com/Azure/azure-sdk-for-js/tree/main/${fragment}/README.md`;
}

/**
 * Creates a README for a sample package from a SampleReadmeConfiguration.
 */
export default (info: SampleReadmeConfiguration): string => {
  let stepCount = 1;
  const step = (content: string) => `${stepCount++}. ${content}`;

  const language = info.useTypeScript ? "TypeScript" : "JavaScript";

  return prettier.format(
    `${formatFrontmatter(info.frontmatter)}\
# ${info.productName} client library samples for ${language}${info.isBeta ? " (Beta)" : ""}

${info.customSnippets?.header ?? ""}

These sample programs show how to use the ${language} client libraries for ${
      info.productName
    } in some common scenarios.

${table(info)}

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

${(() => {
  if (info.useTypeScript) {
    return [
      "Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:",
      "",
      fence("bash", "npm install -g typescript"),
      "",
    ].join("\n");
  } else {
    return "";
  }
})()}\
${resources(info)}

${info.customSnippets?.prerequisites ?? ""}

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

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

${fence(
  "bash",
  `node ${(() => {
    const firstSource = filterModules(info)[0].relativeSourcePath;
    const filePath = info.useTypeScript ? "dist/" : "";
    return filePath + firstSource.replace(/\.ts$/, ".js");
  })()}`
)}

Alternatively, run a single sample with the correct environment variables set (setting up the \`.env\` file is not required if you do this), for example (cross-platform):

${fence("bash", `npx cross-env ${exampleNodeInvocation(info)}`)}

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

${info.customSnippets?.footer ?? ""}

${fileLinks(info)}
[apiref]: ${info.apiRefLink ?? `https://docs.microsoft.com/javascript/api/@azure/${info.baseName}`}
[freesub]: https://azure.microsoft.com/free/
${resourceLinks(info)}
[package]: ${createReadmeLink(info)}
${info.useTypeScript ? "[typescript]: https://www.typescriptlang.org/docs/home.html\n" : ""}\
`,
    {
      parser: "markdown",
    }
  );
};
