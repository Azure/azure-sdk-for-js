// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client } from "@azure-rest/core-client";
import {
  MetadataPolicyGetParameters,
  MetadataPolicyListAllParameters,
  MetadataPolicyUpdateParameters,
  MetadataRolesListParameters,
} from "./parameters";
import {
  MetadataPolicyGet200Response,
  MetadataPolicyGetdefaultResponse,
  MetadataPolicyListAll200Response,
  MetadataPolicyListAlldefaultResponse,
  MetadataPolicyUpdate200Response,
  MetadataPolicyUpdatedefaultResponse,
  MetadataRolesList200Response,
  MetadataRolesListdefaultResponse,
} from "./responses";

export interface MetadataRolesList {
  /** Lists roles for Purview Account */
  get(
    options?: MetadataRolesListParameters
  ): Promise<MetadataRolesList200Response | MetadataRolesListdefaultResponse>;
}

export interface MetadataPolicyListAll {
  /** List or Get metadata policies */
  get(
    options?: MetadataPolicyListAllParameters
  ): Promise<MetadataPolicyListAll200Response | MetadataPolicyListAlldefaultResponse>;
}

export interface MetadataPolicyUpdate {
  /** Updates a metadata policy */
  put(
    options?: MetadataPolicyUpdateParameters
  ): Promise<MetadataPolicyUpdate200Response | MetadataPolicyUpdatedefaultResponse>;
  /** Gets a metadata policy */
  get(
    options?: MetadataPolicyGetParameters
  ): Promise<MetadataPolicyGet200Response | MetadataPolicyGetdefaultResponse>;
}

export interface Routes {
  /** Resource for '/metadataRoles' has methods for the following verbs: get */
  (path: "/metadataRoles"): MetadataRolesList;
  /** Resource for '/metadataPolicies' has methods for the following verbs: get */
  (path: "/metadataPolicies"): MetadataPolicyListAll;
  /** Resource for '/metadataPolicies/\{policyId\}' has methods for the following verbs: put, get */
  (path: "/metadataPolicies/{policyId}", policyId: string): MetadataPolicyUpdate;
}

export type PurviewMetadataPoliciesRestClient = Client & {
  path: Routes;
};
