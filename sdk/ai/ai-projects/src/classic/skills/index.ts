// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import type { Skill, DeleteSkillResponse, SkillVersion, CreateSkillVersionFromFilesBody, DeleteSkillVersionResponse, DownloadVersionResponse, SkillsDownloadResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { DeleteVersionOptionalParams, DownloadVersionOptionalParams, SkillsDownloadOptionalParams, GetVersionOptionalParams, ListVersionsOptionalParams, CreateFromFilesOptionalParams, SkillsCreateOptionalParams, SkillsDeleteOptionalParams, SkillsUpdateOptionalParams, SkillsListOptionalParams, SkillsGetOptionalParams } from "../../api/skills/options.js";
import { deleteVersion, downloadVersion, download, getVersion, listVersions, createFromFiles, create, $delete, update, list, get } from "../../api/skills/operations.js";

/** Operations for SkillsOperations. */
export interface SkillsOperations {
/** Removes the specified version of a skill. */
deleteVersion: (name: string, version: string, options?: DeleteVersionOptionalParams) => Promise<DeleteSkillVersionResponse>;
/** Downloads the zip content for a specific version of a skill. */
downloadVersion: (name: string, version: string, options?: DownloadVersionOptionalParams) => Promise<DownloadVersionResponse>;
/** Downloads the zip content for the default version of a skill. */
download: (name: string, options?: SkillsDownloadOptionalParams) => Promise<SkillsDownloadResponse>;
/** Retrieves the specified version of a skill by public ID and version identifier. */
getVersion: (name: string, version: string, options?: GetVersionOptionalParams) => Promise<SkillVersion>;
/** Returns the available versions for the specified skill. */
listVersions: (name: string, options?: ListVersionsOptionalParams) => PagedAsyncIterableIterator<SkillVersion>;
/** Creates a new version of a skill from uploaded files via multipart form data. */
createFromFiles: (name: string, content: CreateSkillVersionFromFilesBody, options?: CreateFromFilesOptionalParams) => Promise<SkillVersion>;
/** Creates a new version of a skill. If the skill does not exist, it will be created. */
create: (name: string, options?: SkillsCreateOptionalParams) => Promise<SkillVersion>;
/** Removes the specified skill and its associated versions. */
delete: (name: string, options?: SkillsDeleteOptionalParams) => Promise<DeleteSkillResponse>;
/** Modifies the specified skill's configuration. */
update: (name: string, defaultVersion: string, options?: SkillsUpdateOptionalParams) => Promise<Skill>;
/** Returns the skills available in the current project. */
list: (options?: SkillsListOptionalParams) => PagedAsyncIterableIterator<Skill>;
/** Retrieves the specified skill and its current configuration. */
get: (name: string, options?: SkillsGetOptionalParams) => Promise<Skill>;
}

export function _getSkillsOperations(context: AIProjectContext): SkillsOperations {
return {deleteVersion: (name: string, version: string, options?: DeleteVersionOptionalParams) => deleteVersion(context, name, version, options),
downloadVersion: (name: string, version: string, options?: DownloadVersionOptionalParams) => downloadVersion(context, name, version, options),
download: (name: string, options?: SkillsDownloadOptionalParams) => download(context, name, options),
getVersion: (name: string, version: string, options?: GetVersionOptionalParams) => getVersion(context, name, version, options),
listVersions: (name: string, options?: ListVersionsOptionalParams) => listVersions(context, name, options),
createFromFiles: (name: string, content: CreateSkillVersionFromFilesBody, options?: CreateFromFilesOptionalParams) => createFromFiles(context, name, content, options),
create: (name: string, options?: SkillsCreateOptionalParams) => create(context, name, options),
delete: (name: string, options?: SkillsDeleteOptionalParams) => $delete(context, name, options),
update: (name: string, defaultVersion: string, options?: SkillsUpdateOptionalParams) => update(context, name, defaultVersion, options),
list: (options?: SkillsListOptionalParams) => list(context, options),
get: (name: string, options?: SkillsGetOptionalParams) => get(context, name, options)};
}
