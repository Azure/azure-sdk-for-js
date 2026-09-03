// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  updateBfdAdministrativeState,
  updateStaticRouteBfdAdministrativeState,
  updateBgpAdministrativeState,
  updateAdministrativeState,
  listByL3IsolationDomain,
  $delete,
  update,
  create,
  get,
} from "./operations.js";
export type {
  InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  InternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams,
  InternalNetworksUpdateBgpAdministrativeStateOptionalParams,
  InternalNetworksUpdateAdministrativeStateOptionalParams,
  InternalNetworksListByL3IsolationDomainOptionalParams,
  InternalNetworksDeleteOptionalParams,
  InternalNetworksUpdateOptionalParams,
  InternalNetworksCreateOptionalParams,
  InternalNetworksGetOptionalParams,
} from "./options.js";
