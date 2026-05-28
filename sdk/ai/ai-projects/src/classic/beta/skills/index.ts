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
    skillName: string,
    version: string,
    options?: BetaSkillsDeleteSkillVersionOptionalParams,
  ) => Promise<DeleteSkillVersionResponse>;
  /** Download the zip content for a specific version of a skill. */
  getSkillVersionContent: (
    skillName: string,
    version: string,
    options?: BetaSkillsGetSkillVersionContentOptionalParams,
  ) => Promise<BetaSkillsGetSkillVersionContentResponse>;

  /** Retrieve a specific version of a skill. */
  getSkillVersion: (
    skillName: string,
    version: string,
    options?: BetaSkillsGetSkillVersionOptionalParams,
  ) => Promise<SkillVersion>;
  /** List all versions of a skill. */
  listSkillVersions: (
    skillName: string,
    options?: BetaSkillsListSkillVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<SkillVersion>;

  /** Deletes a skill. */
  delete: (
    skillName: string,
    options?: BetaSkillsDeleteOptionalParams,
  ) => Promise<DeleteSkillResponse>;
  /** Update a skill. */
  update: (
    skillName: string,
    defaultVersion: string,
    options?: BetaSkillsUpdateOptionalParams,
  ) => Promise<Skill>;
  /** Returns the list of all skills. */
  list: (options?: BetaSkillsListOptionalParams) => PagedAsyncIterableIterator<Skill>;
  /** Download the zip content for the default version of a skill. */
  download: (
    skillName: string,
    options?: BetaSkillsDownloadOptionalParams,
  ) => Promise<BetaSkillsDownloadResponse>;
  /** Retrieves a skill. */
  get: (skillName: string, options?: BetaSkillsGetOptionalParams) => Promise<Skill>;
  /** Creates a new version of a skill from uploaded files via multipart form data. */
  createFromPackage: (
    skillName: string,
    content: CreateSkillVersionFromFilesBody,
    options?: CreateFromPackageOptionalParams,
  ) => Promise<SkillVersion>;
  /** Creates a new version of a skill. If the skill does not exist, it will be created. */
  create: (name: string, options?: BetaSkillsCreateOptionalParams) => Promise<SkillVersion>;
}

function _getBetaSkills(context: AIProjectContext) {
  return {
    deleteSkillVersion: (
      skillName: string,
      version: string,
      options?: BetaSkillsDeleteSkillVersionOptionalParams,
    ) => deleteSkillVersion(context, skillName, version, options),
    getSkillVersionContent: (
      skillName: string,
      version: string,
      options?: BetaSkillsGetSkillVersionContentOptionalParams,
    ) => getSkillVersionContent(context, skillName, version, options),

    getSkillVersion: (
      skillName: string,
      version: string,
      options?: BetaSkillsGetSkillVersionOptionalParams,
    ) => getSkillVersion(context, skillName, version, options),
    listSkillVersions: (skillName: string, options?: BetaSkillsListSkillVersionsOptionalParams) =>
      listSkillVersions(context, skillName, options),

    delete: (skillName: string, options?: BetaSkillsDeleteOptionalParams) =>
      $delete(context, skillName, options),
    update: (skillName: string, defaultVersion: string, options?: BetaSkillsUpdateOptionalParams) =>
      update(context, skillName, defaultVersion, options),
    list: (options?: BetaSkillsListOptionalParams) => list(context, options),
    download: (skillName: string, options?: BetaSkillsDownloadOptionalParams) =>
      download(context, skillName, options),
    get: (skillName: string, options?: BetaSkillsGetOptionalParams) =>
      get(context, skillName, options),
    createFromPackage: (
      skillName: string,
      content: CreateSkillVersionFromFilesBody,
      options?: CreateFromPackageOptionalParams,
    ) => createFromPackage(context, skillName, content, options),
    create: (name: string, options?: BetaSkillsCreateOptionalParams) =>
      create(context, name, options),
  };
}

export function _getBetaSkillsOperations(context: AIProjectContext): BetaSkillsOperations {
  return {
    ..._getBetaSkills(context),
  };
}
