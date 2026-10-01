// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  checkNameAvailability,
  checkChildrenNameAvailability,
  listSkus,
  stop,
  start,
  checkStatus,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  ServicesCheckNameAvailabilityOptionalParams,
  ServicesCheckChildrenNameAvailabilityOptionalParams,
  ServicesListSkusOptionalParams,
  ServicesStopOptionalParams,
  ServicesStartOptionalParams,
  ServicesCheckStatusOptionalParams,
  ServicesListOptionalParams,
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "./options.js";
