// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as models from "./models";
import * as paginateHelper from "./paginateHelper";
import * as parameters from "./parameters";
import * as purviewMetadataPolicies from "./purviewMetadataPolicies";
import * as responses from "./responses";

export namespace MetadataPolicies {
  export const PurviewMetadataPoliciesClient = purviewMetadataPolicies.PurviewMetadataPolicies;
  export type PurviewMetadataPoliciesClientLike = purviewMetadataPolicies.PurviewMetadataPoliciesRestClient;

  export type MetadataRoleList = models.MetadataRoleList;
  export type MetadataRole = models.MetadataRole;
  export type MetadataRoleProperties = models.MetadataRoleProperties;
  export type AttributeMatcher = models.AttributeMatcher;
  export type ErrorResponseModel = models.ErrorResponseModel;
  export type ErrorModel = models.ErrorModel;
  export type MetadataPolicyList = models.MetadataPolicyList;
  export type MetadataPolicy = models.MetadataPolicy;
  export type MetadataPolicyProperties = models.MetadataPolicyProperties;
  export type DecisionRule = models.DecisionRule;
  export type AttributeRule = models.AttributeRule;
  export type CollectionReference = models.CollectionReference;

  export const paginate = paginateHelper.paginate;
  export type GetArrayType<T> = paginateHelper.GetArrayType<T>;
  export type GetPage<T> = paginateHelper.GetPage<T>;
  export type PaginateReturn<T> = paginateHelper.PaginateReturn<T>;
  export type PagingOptions<T> = paginateHelper.PagingOptions<T>;

  export type MetadataRolesListParameters = parameters.MetadataRolesListParameters;
  export type MetadataPolicyListAllParameters = parameters.MetadataPolicyListAllParameters;
  export type MetadataPolicyUpdateParameters = parameters.MetadataPolicyUpdateParameters;
  export type MetadataPolicyGetParameters = parameters.MetadataPolicyGetParameters;
  export type MetadataPolicyListAllQueryParamProperties = parameters.MetadataPolicyListAllQueryParamProperties;
  export type MetadataPolicyListAllQueryParam = parameters.MetadataPolicyListAllQueryParam;
  export type MetadataPolicyUpdateBodyParam = parameters.MetadataPolicyUpdateBodyParam;

  export type MetadataRolesList = purviewMetadataPolicies.MetadataRolesList;
  export type MetadataPolicyListAll = purviewMetadataPolicies.MetadataPolicyListAll;
  export type MetadataPolicyUpdate = purviewMetadataPolicies.MetadataPolicyUpdate;
  export type Routes = purviewMetadataPolicies.Routes;

  export type MetadataRolesList200Response = responses.MetadataRolesList200Response;
  export type MetadataRolesListdefaultHeaders = responses.MetadataRolesListdefaultHeaders;
  export type MetadataRolesListdefaultResponse = responses.MetadataRolesListdefaultResponse;
  export type MetadataPolicyListAll200Response = responses.MetadataPolicyListAll200Response;
  export type MetadataPolicyListAlldefaultHeaders = responses.MetadataPolicyListAlldefaultHeaders;
  export type MetadataPolicyListAlldefaultResponse = responses.MetadataPolicyListAlldefaultResponse;
  export type MetadataPolicyUpdate200Response = responses.MetadataPolicyUpdate200Response;
  export type MetadataPolicyUpdatedefaultHeaders = responses.MetadataPolicyUpdatedefaultHeaders;
  export type MetadataPolicyUpdatedefaultResponse = responses.MetadataPolicyUpdatedefaultResponse;
  export type MetadataPolicyGet200Response = responses.MetadataPolicyGet200Response;
  export type MetadataPolicyGetdefaultHeaders = responses.MetadataPolicyGetdefaultHeaders;
  export type MetadataPolicyGetdefaultResponse = responses.MetadataPolicyGetdefaultResponse;
}
