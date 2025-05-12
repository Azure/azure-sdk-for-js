// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { z } from "zod";
import { readFile } from "node:fs/promises";
import path, { dirname } from "node:path";
import stripJsonComments from "strip-json-comments";
import { fileURLToPath } from "node:url";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let _projectSchema: ListPackagesSchema | undefined = undefined;

async function getProjectSchema(): Promise<ListPackagesSchema> {
  if (_projectSchema) return _projectSchema;

  const rushJsonText = await readFile(path.resolve(__dirname, "../../../../../rush.json"), "utf-8");

  return (_projectSchema = JSON.parse(stripJsonComments(rushJsonText)));
}

/**
 * The schema for the `listPackages` tool.
 */
export interface ListPackagesSchema {
  /**
   * The packages in the monorepo.
   */
  projects: JsonProject[];
}

/**
 * The shape of a rush.json `projects` entry.
 */
export interface JsonProject {
  /**
   * The name of the package.
   */
  packageName: string;
  /**
   * The path to the project, relative to the monorepo root.
   */
  projectFolder: string;

  /**
   * The version policy name.
   */
  versionPolicyName: string;
}

export const listPackagesArgsSchema = z.object({
  packageName: z.string().optional(),
  versionPolicyName: z.string().optional(),
});

export type ListPackagesArgsSchema = z.infer<typeof listPackagesArgsSchema>;

/**
 * List the packages in the monorepo.
 * @returns The list of packages in the monorepo.
 */
export async function listPackages(args: ListPackagesArgsSchema): Promise<CallToolResult> {
  const schema = await getProjectSchema();
  let projects = schema.projects;

  if (args.packageName) {
    projects = projects.filter((p) => p.packageName === args.packageName);
  }
  if (args.versionPolicyName) {
    projects = projects.filter((p) => p.versionPolicyName === args.versionPolicyName);
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(projects, null, 2),
      },
    ],
  };
}
