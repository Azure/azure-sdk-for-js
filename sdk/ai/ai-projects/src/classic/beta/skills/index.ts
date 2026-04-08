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
    options?: BetaSkillsDeleteOptionalParams,
  ) => Promise<DeleteSkillResponse>;
  /** Updates an existing skill. */
  update: (skillName: string, options?: BetaSkillsUpdateOptionalParams) => Promise<SkillObject>;
  /** Returns the list of all skills. */
  list: (options?: BetaSkillsListOptionalParams) => PagedAsyncIterableIterator<SkillObject>;
  /** Downloads a skill package. */
  download: (
    skillName: string,
    options?: BetaSkillsDownloadOptionalParams,
  ) => Promise<BetaSkillsDownloadResponse>;
  /** Retrieves a skill. */
  get: (skillName: string, options?: BetaSkillsGetOptionalParams) => Promise<SkillObject>;
  /** Creates a skill from a zip package. */
  createFromPackage: (
    body: Uint8Array,
    options?: CreateFromPackageOptionalParams,
  ) => Promise<SkillObject>;
  /** Creates a skill. */
  create: (name: string, options?: BetaSkillsCreateOptionalParams) => Promise<SkillObject>;
}

function _getBetaSkills(context: AIProjectContext) {
  return {
    delete: (skillName: string, options?: BetaSkillsDeleteOptionalParams) =>
      $delete(context, skillName, options),
    update: (skillName: string, options?: BetaSkillsUpdateOptionalParams) =>
      update(context, skillName, options),
    list: (options?: BetaSkillsListOptionalParams) => list(context, options),
    download: (skillName: string, options?: BetaSkillsDownloadOptionalParams) =>
      download(context, skillName, options),
    get: (skillName: string, options?: BetaSkillsGetOptionalParams) =>
      get(context, skillName, options),
    createFromPackage: (body: Uint8Array, options?: CreateFromPackageOptionalParams) =>
      createFromPackage(context, body, options),
    create: (name: string, options?: BetaSkillsCreateOptionalParams) =>
      create(context, name, options),
  };
}

export function _getBetaSkillsOperations(context: AIProjectContext): BetaSkillsOperations {
  return {
    ..._getBetaSkills(context),
  };
}
