// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementContext } from "../../api/educationManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/students/operations.js";
import {
  StudentsListOptionalParams,
  StudentsDeleteOptionalParams,
  StudentsCreateOrUpdateOptionalParams,
  StudentsGetOptionalParams,
} from "../../api/students/options.js";
import { StudentDetails } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Students operations. */
export interface StudentsOperations {
  /** Get a list of details about students that are associated with the specified lab. */
  list: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: StudentsListOptionalParams,
  ) => PagedAsyncIterableIterator<StudentDetails>;
  /** Delete the specified student based on the student alias. */
  delete: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    studentAlias: string,
    options?: StudentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create and add a new student to the specified lab or update the details of an existing student in a lab. Note the student must have a valid tenant to accept the lab after they have been added to lab. */
  createOrUpdate: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    studentAlias: string,
    parameters: StudentDetails,
    options?: StudentsCreateOrUpdateOptionalParams,
  ) => Promise<StudentDetails>;
  /** Get the details for a specific student in the specified lab by student alias */
  get: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    studentAlias: string,
    options?: StudentsGetOptionalParams,
  ) => Promise<StudentDetails>;
}

function _getStudents(context: EducationManagementContext) {
  return {
    list: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: StudentsListOptionalParams,
    ) => list(context, billingAccountName, billingProfileName, invoiceSectionName, options),
    delete: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      studentAlias: string,
      options?: StudentsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        studentAlias,
        options,
      ),
    createOrUpdate: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      studentAlias: string,
      parameters: StudentDetails,
      options?: StudentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        studentAlias,
        parameters,
        options,
      ),
    get: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      studentAlias: string,
      options?: StudentsGetOptionalParams,
    ) =>
      get(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        studentAlias,
        options,
      ),
  };
}

export function _getStudentsOperations(context: EducationManagementContext): StudentsOperations {
  return {
    ..._getStudents(context),
  };
}
