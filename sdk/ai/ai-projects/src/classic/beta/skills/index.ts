// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  $delete,
  update,
  list,
  download,
  get,
  createFromPackage,
  create,
} from "../../../api/beta/skills/operations.js";
import type {
  BetaSkillsDeleteOptionalParams,
  BetaSkillsUpdateOptionalParams,
  BetaSkillsListOptionalParams,
  BetaSkillsDownloadOptionalParams,
  BetaSkillsGetOptionalParams,
  CreateFromPackageOptionalParams,
  BetaSkillsCreateOptionalParams,
} from "../../../api/beta/skills/options.js";
import type {
  SkillObject,
  DeleteSkillResponse,
  BetaSkillsDownloadResponse,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaSkills operations. */
export interface BetaSkillsOperations {
  /** Deletes a skill. */
  delete: (
    skillName: string,
    foundryFeatures: "Skills=V1Preview",
    options?: BetaSkillsDeleteOptionalParams,
  ) => Promise<DeleteSkillResponse>;
  /** Updates an existing skill. */
  update: (
    skillName: string,
    foundryFeatures: "Skills=V1Preview",
    options?: BetaSkillsUpdateOptionalParams,
  ) => Promise<SkillObject>;
  /** Returns the list of all skills. */
  list: (
    foundryFeatures: "Skills=V1Preview",
    options?: BetaSkillsListOptionalParams,
  ) => PagedAsyncIterableIterator<SkillObject>;
  /** Downloads a skill package. */
  download: (
    skillName: string,
    foundryFeatures: "Skills=V1Preview",
    options?: BetaSkillsDownloadOptionalParams,
  ) => Promise<BetaSkillsDownloadResponse>;
  /** Retrieves a skill. */
  get: (
    skillName: string,
    foundryFeatures: "Skills=V1Preview",
    options?: BetaSkillsGetOptionalParams,
  ) => Promise<SkillObject>;
  /** Creates a skill from a gzip package. */
  createFromPackage: (
    body: Uint8Array,
    foundryFeatures: "Skills=V1Preview",
    options?: CreateFromPackageOptionalParams,
  ) => Promise<SkillObject>;
  /** Creates a skill. */
  create: (
    name: string,
    foundryFeatures: "Skills=V1Preview",
    options?: BetaSkillsCreateOptionalParams,
  ) => Promise<SkillObject>;
}

function _getBetaSkills(context: AIProjectContext) {
  return {
    delete: (
      skillName: string,
      foundryFeatures: "Skills=V1Preview",
      options?: BetaSkillsDeleteOptionalParams,
    ) => $delete(context, skillName, foundryFeatures, options),
    update: (
      skillName: string,
      foundryFeatures: "Skills=V1Preview",
      options?: BetaSkillsUpdateOptionalParams,
    ) => update(context, skillName, foundryFeatures, options),
    list: (foundryFeatures: "Skills=V1Preview", options?: BetaSkillsListOptionalParams) =>
      list(context, foundryFeatures, options),
    download: (
      skillName: string,
      foundryFeatures: "Skills=V1Preview",
      options?: BetaSkillsDownloadOptionalParams,
    ) => download(context, skillName, foundryFeatures, options),
    get: (
      skillName: string,
      foundryFeatures: "Skills=V1Preview",
      options?: BetaSkillsGetOptionalParams,
    ) => get(context, skillName, foundryFeatures, options),
    createFromPackage: (
      body: Uint8Array,
      foundryFeatures: "Skills=V1Preview",
      options?: CreateFromPackageOptionalParams,
    ) => createFromPackage(context, body, foundryFeatures, options),
    create: (
      name: string,
      foundryFeatures: "Skills=V1Preview",
      options?: BetaSkillsCreateOptionalParams,
    ) => create(context, name, foundryFeatures, options),
  };
}

export function _getBetaSkillsOperations(context: AIProjectContext): BetaSkillsOperations {
  return {
    ..._getBetaSkills(context),
  };
}
