// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
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
import {
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
import {
  Skill,
  DeleteSkillResponse,
  SkillVersion,
  CreateSkillVersionFromFilesBody,
  DeleteSkillVersionResponse,
  DownloadVersionResponse,
  BetaSkillsDownloadResponse,
} from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaSkills operations. */
export interface BetaSkillsOperations {
  /** Removes the specified version of a skill. */
  deleteVersion: (
    name: string,
    version: string,
    foundryFeatures: "Skills=V1Preview",
    options?: DeleteVersionOptionalParams,
  ) => Promise<DeleteSkillVersionResponse>;
  /** Downloads the zip content for a specific version of a skill. */
  downloadVersion: (
    name: string,
    version: string,
    foundryFeatures: "Skills=V1Preview",
    options?: DownloadVersionOptionalParams,
  ) => Promise<DownloadVersionResponse>;
  /** Downloads the zip content for the default version of a skill. */
  download: (
    name: string,
    foundryFeatures: "Skills=V1Preview",
    options?: BetaSkillsDownloadOptionalParams,
  ) => Promise<BetaSkillsDownloadResponse>;
  /** Retrieves the specified version of a skill by name and version identifier. */
  getVersion: (
    name: string,
    version: string,
    foundryFeatures: "Skills=V1Preview",
    options?: GetVersionOptionalParams,
  ) => Promise<SkillVersion>;
  /** Returns the available versions for the specified skill. */
  listVersions: (
    name: string,
    foundryFeatures: "Skills=V1Preview",
    options?: ListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<SkillVersion>;
  /** Creates a new version of a skill from uploaded files via multipart form data. */
  createFromFiles: (
    name: string,
    content: CreateSkillVersionFromFilesBody,
    foundryFeatures: "Skills=V1Preview",
    options?: CreateFromFilesOptionalParams,
  ) => Promise<SkillVersion>;
  /** Creates a new version of a skill. If the skill does not exist, it will be created. */
  create: (
    name: string,
    foundryFeatures: "Skills=V1Preview",
    options?: BetaSkillsCreateOptionalParams,
  ) => Promise<SkillVersion>;
  /** Removes the specified skill and its associated versions. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    name: string,
    foundryFeatures: "Skills=V1Preview",
    options?: BetaSkillsDeleteOptionalParams,
  ) => Promise<DeleteSkillResponse>;
  /** Modifies the specified skill's configuration. */
  update: (
    name: string,
    defaultVersion: string,
    foundryFeatures: "Skills=V1Preview",
    options?: BetaSkillsUpdateOptionalParams,
  ) => Promise<Skill>;
  /** Returns the skills available in the current project. */
  list: (
    foundryFeatures: "Skills=V1Preview",
    options?: BetaSkillsListOptionalParams,
  ) => PagedAsyncIterableIterator<Skill>;
  /** Retrieves the specified skill and its current configuration. */
  get: (
    name: string,
    foundryFeatures: "Skills=V1Preview",
    options?: BetaSkillsGetOptionalParams,
  ) => Promise<Skill>;
}

function _getBetaSkills(context: AIProjectContext) {
  return {
    deleteVersion: (
      name: string,
      version: string,
      foundryFeatures: "Skills=V1Preview",
      options?: DeleteVersionOptionalParams,
    ) => deleteVersion(context, name, version, foundryFeatures, options),
    downloadVersion: (
      name: string,
      version: string,
      foundryFeatures: "Skills=V1Preview",
      options?: DownloadVersionOptionalParams,
    ) => downloadVersion(context, name, version, foundryFeatures, options),
    download: (
      name: string,
      foundryFeatures: "Skills=V1Preview",
      options?: BetaSkillsDownloadOptionalParams,
    ) => download(context, name, foundryFeatures, options),
    getVersion: (
      name: string,
      version: string,
      foundryFeatures: "Skills=V1Preview",
      options?: GetVersionOptionalParams,
    ) => getVersion(context, name, version, foundryFeatures, options),
    listVersions: (
      name: string,
      foundryFeatures: "Skills=V1Preview",
      options?: ListVersionsOptionalParams,
    ) => listVersions(context, name, foundryFeatures, options),
    createFromFiles: (
      name: string,
      content: CreateSkillVersionFromFilesBody,
      foundryFeatures: "Skills=V1Preview",
      options?: CreateFromFilesOptionalParams,
    ) => createFromFiles(context, name, content, foundryFeatures, options),
    create: (
      name: string,
      foundryFeatures: "Skills=V1Preview",
      options?: BetaSkillsCreateOptionalParams,
    ) => create(context, name, foundryFeatures, options),
    delete: (
      name: string,
      foundryFeatures: "Skills=V1Preview",
      options?: BetaSkillsDeleteOptionalParams,
    ) => $delete(context, name, foundryFeatures, options),
    update: (
      name: string,
      defaultVersion: string,
      foundryFeatures: "Skills=V1Preview",
      options?: BetaSkillsUpdateOptionalParams,
    ) => update(context, name, defaultVersion, foundryFeatures, options),
    list: (foundryFeatures: "Skills=V1Preview", options?: BetaSkillsListOptionalParams) =>
      list(context, foundryFeatures, options),
    get: (
      name: string,
      foundryFeatures: "Skills=V1Preview",
      options?: BetaSkillsGetOptionalParams,
    ) => get(context, name, foundryFeatures, options),
  };
}

export function _getBetaSkillsOperations(context: AIProjectContext): BetaSkillsOperations {
  return {
    ..._getBetaSkills(context),
  };
}
