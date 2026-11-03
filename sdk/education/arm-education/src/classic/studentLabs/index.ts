// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementContext } from "../../api/educationManagementContext.js";
import { listAll, get } from "../../api/studentLabs/operations.js";
import {
  StudentLabsListAllOptionalParams,
  StudentLabsGetOptionalParams,
} from "../../api/studentLabs/options.js";
import { StudentLabDetails } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StudentLabs operations. */
export interface StudentLabsOperations {
  /** Get a list of all labs associated with the caller of the API. */
  listAll: (
    options?: StudentLabsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<StudentLabDetails>;
  /** Get the details for a specified lab associated with the student lab. */
  get: (
    studentLabName: string,
    options?: StudentLabsGetOptionalParams,
  ) => Promise<StudentLabDetails>;
}

function _getStudentLabs(context: EducationManagementContext) {
  return {
    listAll: (options?: StudentLabsListAllOptionalParams) => listAll(context, options),
    get: (studentLabName: string, options?: StudentLabsGetOptionalParams) =>
      get(context, studentLabName, options),
  };
}

export function _getStudentLabsOperations(
  context: EducationManagementContext,
): StudentLabsOperations {
  return {
    ..._getStudentLabs(context),
  };
}
