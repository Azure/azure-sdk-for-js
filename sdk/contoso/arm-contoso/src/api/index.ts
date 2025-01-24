// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { createContoso, ContosoContext, ContosoClientOptionalParams } from "./contosoContext.js";
export {
  EmployeesListBySubscriptionOptionalParams,
  EmployeesListByResourceGroupOptionalParams,
  EmployeesDeleteOptionalParams,
  EmployeesUpdateOptionalParams,
  EmployeesCreateOrUpdateOptionalParams,
  EmployeesGetOptionalParams,
  OperationsListOptionalParams,
} from "./options.js";
export {
  employeesListBySubscription,
  employeesListByResourceGroup,
  employeesDelete,
  employeesUpdate,
  employeesCreateOrUpdate,
  employeesGet,
} from "./employees/index.js";
export { operationsList } from "./operations/index.js";
