// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementContext } from "../../api/dataMigrationManagementContext.js";
import {
  readWrite,
  read,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/files/operations.js";
import {
  FilesReadWriteOptionalParams,
  FilesReadOptionalParams,
  FilesListOptionalParams,
  FilesDeleteOptionalParams,
  FilesUpdateOptionalParams,
  FilesCreateOrUpdateOptionalParams,
  FilesGetOptionalParams,
} from "../../api/files/options.js";
import { ProjectFile, FileStorageInfo } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Files operations. */
export interface FilesOperations {
  /** This method is used for requesting information for reading and writing the file content. */
  readWrite: (
    groupName: string,
    serviceName: string,
    projectName: string,
    fileName: string,
    options?: FilesReadWriteOptionalParams,
  ) => Promise<FileStorageInfo>;
  /** This method is used for requesting storage information using which contents of the file can be downloaded. */
  read: (
    groupName: string,
    serviceName: string,
    projectName: string,
    fileName: string,
    options?: FilesReadOptionalParams,
  ) => Promise<FileStorageInfo>;
  /** The project resource is a nested resource representing a stored migration project. This method returns a list of files owned by a project resource. */
  list: (
    groupName: string,
    serviceName: string,
    projectName: string,
    options?: FilesListOptionalParams,
  ) => PagedAsyncIterableIterator<ProjectFile>;
  /** This method deletes a file. */
  delete: (
    groupName: string,
    serviceName: string,
    projectName: string,
    fileName: string,
    options?: FilesDeleteOptionalParams,
  ) => Promise<void>;
  /** This method updates an existing file. */
  update: (
    groupName: string,
    serviceName: string,
    projectName: string,
    fileName: string,
    parameters: ProjectFile,
    options?: FilesUpdateOptionalParams,
  ) => Promise<ProjectFile>;
  /** The PUT method creates a new file or updates an existing one. */
  createOrUpdate: (
    groupName: string,
    serviceName: string,
    projectName: string,
    fileName: string,
    parameters: ProjectFile,
    options?: FilesCreateOrUpdateOptionalParams,
  ) => Promise<ProjectFile>;
  /** The files resource is a nested, proxy-only resource representing a file stored under the project resource. This method retrieves information about a file. */
  get: (
    groupName: string,
    serviceName: string,
    projectName: string,
    fileName: string,
    options?: FilesGetOptionalParams,
  ) => Promise<ProjectFile>;
}

function _getFiles(context: DataMigrationManagementContext) {
  return {
    readWrite: (
      groupName: string,
      serviceName: string,
      projectName: string,
      fileName: string,
      options?: FilesReadWriteOptionalParams,
    ) => readWrite(context, groupName, serviceName, projectName, fileName, options),
    read: (
      groupName: string,
      serviceName: string,
      projectName: string,
      fileName: string,
      options?: FilesReadOptionalParams,
    ) => read(context, groupName, serviceName, projectName, fileName, options),
    list: (
      groupName: string,
      serviceName: string,
      projectName: string,
      options?: FilesListOptionalParams,
    ) => list(context, groupName, serviceName, projectName, options),
    delete: (
      groupName: string,
      serviceName: string,
      projectName: string,
      fileName: string,
      options?: FilesDeleteOptionalParams,
    ) => $delete(context, groupName, serviceName, projectName, fileName, options),
    update: (
      groupName: string,
      serviceName: string,
      projectName: string,
      fileName: string,
      parameters: ProjectFile,
      options?: FilesUpdateOptionalParams,
    ) => update(context, groupName, serviceName, projectName, fileName, parameters, options),
    createOrUpdate: (
      groupName: string,
      serviceName: string,
      projectName: string,
      fileName: string,
      parameters: ProjectFile,
      options?: FilesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, groupName, serviceName, projectName, fileName, parameters, options),
    get: (
      groupName: string,
      serviceName: string,
      projectName: string,
      fileName: string,
      options?: FilesGetOptionalParams,
    ) => get(context, groupName, serviceName, projectName, fileName, options),
  };
}

export function _getFilesOperations(context: DataMigrationManagementContext): FilesOperations {
  return {
    ..._getFiles(context),
  };
}
