// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import fs from "fs-extra";
import path from "path";
import YAML from "yaml";

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { PACKAGE_JSON_SCHEMA } from "../../schemas/package.json";
import { API_EXTRACTOR_SCHEMA } from "../../schemas/api-extractor.json";

import { createPrinter } from "../../util/printer";
import { resolveProject } from "../../util/resolveProject";
import { ReifySchema, Schema, validate, ValidationError } from "../../util/schema";

const log = createPrinter("check-config");

export const commandInfo = makeCommandInfo(
  "check-config",
  "checks the current package's configuration using simple rules"
);

type KnownExtensions = "yml" | "yaml" | "json";
type AllowedConfigFileNames = `${string}.${KnownExtensions}`;

const CONFIG_SCHEMAS = {
  "package.json": PACKAGE_JSON_SCHEMA,
  "api-extractor.json": API_EXTRACTOR_SCHEMA,
  //  "tests.yml": Schema.never,
  //  "tsconfig.json": Schema.never,
};

// @ts-ignore
const _CONFIG_SCHEMAS: Record<AllowedConfigFileNames, Schema> = CONFIG_SCHEMAS;

type RuleContext = { [K in keyof typeof CONFIG_SCHEMAS]: ReifySchema<typeof CONFIG_SCHEMAS[K]> };

type RuleFunction = (context: RuleContext) => boolean;

const RULES: Record<string, RuleFunction> = {
  "package.json 'types' matches api-extractor.json 'publicTrimmedFilePath'"(context) {
    return (
      context["package.json"].types ===
      context["api-extractor.json"].dtsRollup.publicTrimmedFilePath
    );
  },
  "example failing rule"() {
    return false;
  },
};

interface ProcessResult {
  name: string;
  error?: ValidationError;
}

export default leafCommand(commandInfo, async () => {
  const projectInfo = await resolveProject(process.cwd());

  const context: Record<string, unknown> = {};

  log.info("Checking configuration schemas...");

  const results = await Promise.all(
    Object.entries(CONFIG_SCHEMAS).map(async ([name, schema]) => {
      const file = await fs.readFile(path.resolve(projectInfo.path, name));
      const contents = file.toString("utf-8");

      let data: unknown;

      switch (name.slice(name.lastIndexOf(".") + 1)) {
        case "yml":
        case "yaml":
          data = YAML.parse(contents);
          break;
        case "json":
          data = JSON.parse(contents);
          break;
        default:
          throw new Error(`internal error: unrecognized file extension '${name}'`);
      }

      let result: ProcessResult;

      try {
        validate(schema, data, `<${name}>`);
        result = { name };

        // Populate context as long as it was successfully validated.
        context[name] = data;
      } catch (error) {
        if (error instanceof ValidationError) {
          result = {
            name,
            error,
          };
        } else {
          throw error;
        }
      }

      return result;
    })
  );

  let allOk = true;

  for (const result of results) {
    if (result.error) {
      log.error(result.name, "failed!");
      for (const line of result.error.formatMessage()) {
        log.error(line);
      }
      allOk = false;
    } else {
      log.success(result.name, "OK");
    }
  }

  if (!allOk) {
    log.warn("Skipping rule checks due to failing schemas.");
    return false;
  }

  // Continue to checking rules

  allOk = true;

  log.info("Checking rules...");

  for (const [name, ruleFunction] of Object.entries(RULES)) {
    const ruleResult = ruleFunction(context as RuleContext);

    if (!ruleResult) {
      log.error("❌", name);
      allOk = false;
    } else {
      log.success("✅", name);
    }
  }

  return allOk;
});
