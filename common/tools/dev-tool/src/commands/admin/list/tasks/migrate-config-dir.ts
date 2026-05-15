import path from "node:path";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { resolveProject } from "../../../../util/resolveProject.ts";
import type { RushJsonProject } from "../../../../util/synthesizedRushJson.ts";
import { existsSync } from "node:fs";

export default async function listPackageCallback(
  project: RushJsonProject,
  _paths: boolean,
  _cwd: string,
  root: string,
) {
  const { projectFolder, packageName } = project;
  const fullProjectPath = path.join(root, projectFolder);
  const { packageJson } = await resolveProject(fullProjectPath);

  if (project.versionPolicyName !== "management") {
    return;
  }

  // if (packageName !== "@azure/arm-advisor" && packageName !== "@azure/arm-cognitiveservices") {
  //   return;
  // }

  delete packageJson.devDependencies?.["react-native"];
  delete packageJson["react-native"];
  for (const exprt of Object.keys((packageJson.exports as any) ?? {})) {
    if ((packageJson.exports as any)?.[exprt]?.["react-native"]) {
      delete (packageJson.exports as any)[exprt]["react-native"];
    }
  }
  if ((packageJson.imports as any)?.["#platform/*"]?.["react-native"]) {
    delete (packageJson.imports as any)["#platform/*"]["react-native"];
  }

  if (existsSync(path.join(fullProjectPath, "config"))) {
    console.log(`skipping ${packageName}. already migrated`);
    return;
  }

  console.log(`### Migrating ${packageName} ${fullProjectPath}`);
  const references: { path: string }[] = [
    { path: "./config/tsconfig.src.esm.json" },
    { path: "./config/tsconfig.src.cjs.json" }
  ];
  if (supportFlavor("browser")) {
    references.push(
      { path: "./config/tsconfig.src.browser.json" },
    );
  }
  if (supportFlavor("react-native")) {
    references.push({ path: "./config/tsconfig.src.react-native.json" });
  }

  const generateTest = existsSync(path.join(fullProjectPath, "test"));
  const generateSample = existsSync(path.join(fullProjectPath, "samples-dev"));
  if (generateTest) {
    references.push(
      { path: "./config/tsconfig.test.node.json" },
    );
    if (!packageJson.scripts["test:browser"]?.includes("skipped")) {
      references.push({ path: "./config/tsconfig.test.browser.json" });
    }
    references.push({ path: "./config/tsconfig.snippets.json" });
  }
  if (generateSample) {
    references.push({ path: "./config/tsconfig.samples.json" });
  }

  const tsConfig: Record<string, any> = { references, files: [] };
  await createFile("tsconfig.json", tsConfig);

  console.log(`creating config dir`);
  await mkdir(path.join(fullProjectPath, "config"));

  for (const flavor of ["cjs", "esm", "browser", "react-native"]) {
    if (flavor === "cjs" || flavor === "esm" || supportFlavor(flavor)) {
      const config = {
        extends: `../../../../eng/tsconfigs/src.${flavor}.json`,
        include: ["../src/index.ts"]
      }
      await createFile(`config/tsconfig.src.${flavor}.json`, config);
    }
  }

  if (generateSample) {
    const samplesConfig = {
      extends: "../../../../eng/tsconfigs/samples.json",
      compilerOptions: {
        paths: {
          [packageName]: ["../dist/esm"]
        }
      }
    }
    await createFile("config/tsconfig.samples.json", samplesConfig);
  }

  const snippetsConfig = {
    extends: "../../../../eng/tsconfigs/snippets.json"
  };
  await createFile("config/tsconfig.snippets.json", snippetsConfig);

  const lintConfig = {
    extends: "../../../../tsconfig.json",
    include: ["../src", "../test"]
  };
  await createFile("config/tsconfig.lint.json", lintConfig);

  const esLintConfigEsm = `import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [
  ...azsdkEslint.config([
    {
      rules: {
        "@azure/azure-sdk/ts-modules-only-named": "warn",
        "@azure/azure-sdk/ts-package-json-types": "warn",
        "@azure/azure-sdk/ts-package-json-engine-is-present": "warn",
        "@azure/azure-sdk/ts-package-json-files-required": "off",
        "@azure/azure-sdk/ts-package-json-main-is-cjs": "off",
        "tsdoc/syntax": "warn"
      }
    }
  ]),
  {
    files: ["src/**/*.ts", "src/**/*.mts", "test/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "./config/tsconfig.lint.json",
      },
    },
  },
];
`;
  await writeFile(path.join(fullProjectPath, "eslint.config.mjs"), esLintConfigEsm);

  packageJson.scripts["build:samples"] = packageJson.scripts["build:samples"].replace("-p tsconfig.samples.json", "-p config/tsconfig.samples.json");

  packageJson.scripts["test"] = "tsc -b --noEmit && npm run test:node && npm run test:browser"
  packageJson.scripts["test:node"] = "dev-tool run test:vitest";

  const nodeTestConfig = {
    "extends": "../../../../eng/tsconfigs/test.node.json"
  };
  await createFile("config/tsconfig.test.node.json", nodeTestConfig);

  if (!packageJson.scripts["test:browser"]?.includes("skipped")) {
    packageJson.scripts["test:browser"] = "dev-tool run test:vitest --browser";
    const browserTestConfig = {
      "extends": "../../../../eng/tsconfigs/test.browser.json"
    };
    await createFile("config/tsconfig.test.browser.json", browserTestConfig);

    const vitestBrowserConfig = `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { default } from "../../../eng/vitestconfigs/browser.config.ts";
`;
    await writeFile(path.join(fullProjectPath, "vitest.browser.config.ts"), vitestBrowserConfig);
  }

  // removing other package-level tsconfig files
  const files = await readdir(fullProjectPath);
  for (const other of files.filter(fn => fn.startsWith("tsconfig.") && fn !== "tsconfig.json")) {
    await rm(path.join(fullProjectPath, other));
  }

  if (supportFlavor("react-native") &&
    !packageJson.devDependencies["react-native"]) {
    console.log(`adding react-native dev dep`);
    packageJson.devDependencies["react-native"] = "catalog:testing";
  }
  await writeFile(
    path.join(fullProjectPath, "package.json"),
    JSON.stringify(packageJson, undefined, 2) + "\n",
  );

  let warpContent = `
extends: ../../../warp.base.config.yml

targets:
  - name: esm
    condition: import
    tsconfig: "./config/tsconfig.src.esm.json"

  - name: commonjs
    condition: require
    tsconfig: "./config/tsconfig.src.cjs.json"
    moduleType: commonjs
`;
  if (supportFlavor("browser")) {
    warpContent += `
  - name: browser
    tsconfig: "./config/tsconfig.src.browser.json"
`;
  }
  if (supportFlavor("react-native")) {
    warpContent += `
  - name: react-native
    tsconfig: "./config/tsconfig.src.react-native.json"
`;
  }

  await writeFile(path.join(fullProjectPath, "warp.config.yml"), warpContent);

  async function createFile(relativePath: string, obj: Record<string, unknown>) {
    console.log(`creating file ${relativePath}  for ${packageName}, ${fullProjectPath}`);
    const fullFilePath = path.join(fullProjectPath, relativePath);
    await writeFile(fullFilePath, JSON.stringify(obj, null, 2) + "\n");
  }

  function supportFlavor(flavor: string): boolean {
    return Boolean((packageJson.exports as any)?.["."]?.[flavor]);
  }
}
