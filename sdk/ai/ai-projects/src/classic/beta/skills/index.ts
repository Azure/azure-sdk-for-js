// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  deleteVersion,
  downloadVersion,
  download,
  getVersion,
  listVersions,
  createFromFiles,
  create,
  $delete,
  update,
  list,
  get,
} from "../../../api/beta/skills/operations.js";
import type {
  DeleteVersionOptionalParams,
  DownloadVersionOptionalParams,
  BetaSkillsDownloadOptionalParams,
  GetVersionOptionalParams,
  ListVersionsOptionalParams,
  CreateFromFilesOptionalParams,
  BetaSkillsCreateOptionalParams,
  BetaSkillsDeleteOptionalParams,
  BetaSkillsUpdateOptionalParams,
  BetaSkillsListOptionalParams,
  BetaSkillsGetOptionalParams,
} from "../../../api/beta/skills/options.js";
import type {
  Skill,
  DeleteSkillResponse,
  SkillVersion,
  CreateSkillVersionFromFilesBody,
  DeleteSkillVersionResponse,
  DownloadVersionResponse,
  BetaSkillsDownloadResponse,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaSkills operations. */
export interface BetaSkillsOperations {
  /** Delete a specific version of a skill. */
  deleteVersion: (
    name: string,
    version: string,
    options?: DeleteVersionOptionalParams,
  ) => Promise<DeleteSkillVersionResponse>;
  /** Download the zip content for a specific version of a skill. */
  downloadVersion: (
    name: string,
    version: string,
    options?: DownloadVersionOptionalParams,
  ) => Promise<DownloadVersionResponse>;
  /** Download the zip content for the default version of a skill. */
  download: (
    name: string,
    options?: BetaSkillsDownloadOptionalParams,
  ) => Promise<BetaSkillsDownloadResponse>;
  /** Retrieve a specific version of a skill. */
  getVersion: (
    name: string,
    version: string,
    options?: GetVersionOptionalParams,
  ) => Promise<SkillVersion>;
  /** List all versions of a skill. */
  listVersions: (
    name: string,
    options?: ListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<SkillVersion>;
  /** Creates a new version of a skill from uploaded files via multipart form data. */
  createFromFiles: (
    name: string,
    content: CreateSkillVersionFromFilesBody,
    options?: CreateFromFilesOptionalParams,
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
    deleteVersion: (name: string, version: string, options?: DeleteVersionOptionalParams) =>
      deleteVersion(context, name, version, options),
    downloadVersion: (name: string, version: string, options?: DownloadVersionOptionalParams) =>
      downloadVersion(context, name, version, options),
    download: (name: string, options?: BetaSkillsDownloadOptionalParams) =>
      download(context, name, options),
    getVersion: (name: string, version: string, options?: GetVersionOptionalParams) =>
      getVersion(context, name, version, options),
    listVersions: (name: string, options?: ListVersionsOptionalParams) =>
      listVersions(context, name, options),
    createFromFiles: (
      name: string,
      content: CreateSkillVersionFromFilesBody,
      options?: CreateFromFilesOptionalParams,
    ) => createFromFiles(context, name, content, options),
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
