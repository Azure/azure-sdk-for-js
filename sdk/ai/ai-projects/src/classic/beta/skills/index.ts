// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteSkillVersion,
  getSkillVersionContent,
  getSkillVersion,
  listSkillVersions,
  $delete,
  update,
  list,
  download,
  get,
  createFromPackage,
  create,
} from "../../../api/beta/skills/operations.js";
import type {
  BetaSkillsDeleteSkillVersionOptionalParams,
  BetaSkillsGetSkillVersionContentOptionalParams,
  BetaSkillsGetSkillVersionOptionalParams,
  BetaSkillsListSkillVersionsOptionalParams,
  BetaSkillsDeleteOptionalParams,
  BetaSkillsUpdateOptionalParams,
  BetaSkillsListOptionalParams,
  BetaSkillsDownloadOptionalParams,
  BetaSkillsGetOptionalParams,
  CreateFromPackageOptionalParams,
  BetaSkillsCreateOptionalParams,
} from "../../../api/beta/skills/options.js";
import type {
  Skill,
  DeleteSkillResponse,
  SkillVersion,
  CreateSkillVersionFromFilesBody,
  DeleteSkillVersionResponse,
  BetaSkillsGetSkillVersionContentResponse,
  BetaSkillsDownloadResponse,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaSkills operations. */
export interface BetaSkillsOperations {
  /** Delete a specific version of a skill. */
  deleteSkillVersion: (
    name: string,
    version: string,
    options?: BetaSkillsDeleteSkillVersionOptionalParams,
  ) => Promise<DeleteSkillVersionResponse>;
  /** Download the zip content for a specific version of a skill. */
  getSkillVersionContent: (
    name: string,
    version: string,
    options?: BetaSkillsGetSkillVersionContentOptionalParams,
  ) => Promise<BetaSkillsGetSkillVersionContentResponse>;
  /** Download the zip content for the default version of a skill. */
  download: (
    name: string,
    options?: BetaSkillsDownloadOptionalParams,
  ) => Promise<BetaSkillsDownloadResponse>;
  /** Retrieve a specific version of a skill. */
  getSkillVersion: (
    name: string,
    version: string,
    options?: BetaSkillsGetSkillVersionOptionalParams,
  ) => Promise<SkillVersion>;
  /** List all versions of a skill. */
  listSkillVersions: (
    name: string,
    options?: BetaSkillsListSkillVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<SkillVersion>;
  /** Creates a new version of a skill from uploaded files via multipart form data. */
  createFromPackage: (
    name: string,
    content: CreateSkillVersionFromFilesBody,
    options?: CreateFromPackageOptionalParams,
  ) => Promise<SkillVersion>;
  /** Creates a new version of a skill. If the skill does not exist, it will be created. */
  create: (name: string, options?: BetaSkillsCreateOptionalParams) => Promise<SkillVersion>;
  /** Deletes a skill. */
  delete: (name: string, options?: BetaSkillsDeleteOptionalParams) => Promise<DeleteSkillResponse>;
  /** Update a skill. */
  update: (
    name: string,
    defaultVersion: string,
    options?: BetaSkillsUpdateOptionalParams,
  ) => Promise<Skill>;
  /** Returns the list of all skills. */
  list: (options?: BetaSkillsListOptionalParams) => PagedAsyncIterableIterator<Skill>;
  /** Retrieves a skill. */
  get: (name: string, options?: BetaSkillsGetOptionalParams) => Promise<Skill>;
}

function _getBetaSkills(context: AIProjectContext) {
  return {
    deleteSkillVersion: (
      name: string,
      version: string,
      options?: BetaSkillsDeleteSkillVersionOptionalParams,
    ) => deleteSkillVersion(context, name, version, options),
    getSkillVersionContent: (
      name: string,
      version: string,
      options?: BetaSkillsGetSkillVersionContentOptionalParams,
    ) => getSkillVersionContent(context, name, version, options),
    download: (name: string, options?: BetaSkillsDownloadOptionalParams) =>
      download(context, name, options),
    getSkillVersion: (
      name: string,
      version: string,
      options?: BetaSkillsGetSkillVersionOptionalParams,
    ) => getSkillVersion(context, name, version, options),
    listSkillVersions: (name: string, options?: BetaSkillsListSkillVersionsOptionalParams) =>
      listSkillVersions(context, name, options),
    createFromPackage: (
      name: string,
      content: CreateSkillVersionFromFilesBody,
      options?: CreateFromPackageOptionalParams,
    ) => createFromPackage(context, name, content, options),
    create: (name: string, options?: BetaSkillsCreateOptionalParams) =>
      create(context, name, options),
    delete: (name: string, options?: BetaSkillsDeleteOptionalParams) =>
      $delete(context, name, options),
    update: (name: string, defaultVersion: string, options?: BetaSkillsUpdateOptionalParams) =>
      update(context, name, defaultVersion, options),
    list: (options?: BetaSkillsListOptionalParams) => list(context, options),
    get: (name: string, options?: BetaSkillsGetOptionalParams) => get(context, name, options),
  };
}

export function _getBetaSkillsOperations(context: AIProjectContext): BetaSkillsOperations {
  return {
    ..._getBetaSkills(context),
  };
}
