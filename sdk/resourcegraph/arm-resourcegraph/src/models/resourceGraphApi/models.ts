// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  errorDetailsArrayDeserializer,
  ErrorDetails,
  ResultFormat,
} from "../resourceGraphCommon/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Describes a query to be executed. */
export interface QueryRequest {
  /** Azure subscriptions against which to execute the query. */
  subscriptions?: string[];
  /** Azure management groups against which to execute the query. Example: [ 'mg1', 'mg2' ] */
  managementGroups?: string[];
  /** The resources query. */
  query: string;
  /** The query evaluation options */
  options?: QueryRequestOptions;
  /** An array of facet requests to be computed against the query result. */
  facets?: FacetRequest[];
}

export function queryRequestSerializer(item: QueryRequest): any {
  return {
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : item["subscriptions"].map((p: any) => {
          return p;
        }),
    managementGroups: !item["managementGroups"]
      ? item["managementGroups"]
      : item["managementGroups"].map((p: any) => {
          return p;
        }),
    query: item["query"],
    options: !item["options"] ? item["options"] : queryRequestOptionsSerializer(item["options"]),
    facets: !item["facets"] ? item["facets"] : facetRequestArraySerializer(item["facets"]),
  };
}

/** The options for query evaluation */
export interface QueryRequestOptions {
  /** Continuation token for pagination, capturing the next page size and offset, as well as the context of the query. */
  skipToken?: string;
  /** The maximum number of rows that the query should return. Overrides the page size when ```$skipToken``` property is present. */
  top?: number;
  /** The number of rows to skip from the beginning of the results. Overrides the next page offset when ```$skipToken``` property is present. */
  skip?: number;
  /** Defines in which format query result returned. */
  resultFormat?: ResultFormat;
  /** Only applicable for tenant and management group level queries to decide whether to allow partial scopes for result in case the number of subscriptions exceed allowed limits. */
  allowPartialScopes?: boolean;
  /** Defines what level of authorization resources should be returned based on the which subscriptions and management groups are passed as scopes. */
  authorizationScopeFilter?: AuthorizationScopeFilter;
}

export function queryRequestOptionsSerializer(item: QueryRequestOptions): any {
  return {
    $skipToken: item["skipToken"],
    $top: item["top"],
    $skip: item["skip"],
    resultFormat: item["resultFormat"],
    allowPartialScopes: item["allowPartialScopes"],
    authorizationScopeFilter: item["authorizationScopeFilter"],
  };
}

/** Defines what level of authorization resources should be returned based on the which subscriptions and management groups are passed as scopes. */
export type AuthorizationScopeFilter =
  | "AtScopeAndBelow"
  | "AtScopeAndAbove"
  | "AtScopeExact"
  | "AtScopeAboveAndBelow";

export function facetRequestArraySerializer(result: Array<FacetRequest>): any[] {
  return result.map((item) => {
    return facetRequestSerializer(item);
  });
}

/** A request to compute additional statistics (facets) over the query results. */
export interface FacetRequest {
  /** The column or list of columns to summarize by */
  expression: string;
  /** The options for facet evaluation */
  options?: FacetRequestOptions;
}

export function facetRequestSerializer(item: FacetRequest): any {
  return {
    expression: item["expression"],
    options: !item["options"] ? item["options"] : facetRequestOptionsSerializer(item["options"]),
  };
}

/** The options for facet evaluation */
export interface FacetRequestOptions {
  /** The column name or query expression to sort on. Defaults to count if not present. */
  sortBy?: string;
  /** The sorting order by the selected column (count by default). */
  sortOrder?: FacetSortOrder;
  /** Specifies the filter condition for the 'where' clause which will be run on main query's result, just before the actual faceting. */
  filter?: string;
  /** The maximum number of facet rows that should be returned. */
  top?: number;
}

export function facetRequestOptionsSerializer(item: FacetRequestOptions): any {
  return {
    sortBy: item["sortBy"],
    sortOrder: item["sortOrder"],
    filter: item["filter"],
    $top: item["top"],
  };
}

/** The sorting order by the selected column (count by default). */
export type FacetSortOrder = "asc" | "desc";

/** Query result. */
export interface QueryResponse {
  /** Number of total records matching the query. */
  totalRecords: number;
  /** Number of records returned in the current response. In the case of paging, this is the number of records in the current page. */
  count: number;
  /** Indicates whether the query results are truncated. */
  resultTruncated: ResultTruncated;
  /** When present, the value can be passed to a subsequent query call (together with the same query and scopes used in the current request) to retrieve the next page of data. */
  skipToken?: string;
  /** Query output in JObject array or Table format. */
  data: any;
  /** Query facets. */
  facets?: FacetUnion[];
}

export function queryResponseDeserializer(item: any): QueryResponse {
  return {
    totalRecords: item["totalRecords"],
    count: item["count"],
    resultTruncated: item["resultTruncated"],
    skipToken: item["$skipToken"],
    data: item["data"],
    facets: !item["facets"] ? item["facets"] : facetUnionArrayDeserializer(item["facets"]),
  };
}

/** Indicates whether the query results are truncated. */
export type ResultTruncated = "true" | "false";

export function facetUnionArrayDeserializer(result: Array<FacetUnion>): any[] {
  return result.map((item) => {
    return facetUnionDeserializer(item);
  });
}

/** A facet containing additional statistics on the response of a query. Can be either FacetResult or FacetError. */
export interface Facet {
  /** Facet expression, same as in the corresponding facet request. */
  expression: string;
  /** Result type */
  /** The discriminator possible values: FacetResult, FacetError */
  resultType: string;
}

export function facetDeserializer(item: any): Facet {
  return {
    expression: item["expression"],
    resultType: item["resultType"],
  };
}

/** Alias for FacetUnion */
export type FacetUnion = FacetResult | FacetError | Facet;

export function facetUnionDeserializer(item: any): FacetUnion {
  switch (item["resultType"]) {
    case "FacetResult":
      return facetResultDeserializer(item as FacetResult);

    case "FacetError":
      return facetErrorDeserializer(item as FacetError);

    default:
      return facetDeserializer(item);
  }
}

/** Successfully executed facet containing additional statistics on the response of a query. */
export interface FacetResult extends Facet {
  /** Number of total records in the facet results. */
  totalRecords: number;
  /** Number of records returned in the facet response. */
  count: number;
  /** A JObject array or Table containing the desired facets. Only present if the facet is valid. */
  data: any;
  /** Result type */
  resultType: "FacetResult";
}

export function facetResultDeserializer(item: any): FacetResult {
  return {
    expression: item["expression"],
    resultType: item["resultType"],
    totalRecords: item["totalRecords"],
    count: item["count"],
    data: item["data"],
  };
}

/** A facet whose execution resulted in an error. */
export interface FacetError extends Facet {
  /** An array containing detected facet errors with details. */
  errors: ErrorDetails[];
  /** Result type */
  resultType: "FacetError";
}

export function facetErrorDeserializer(item: any): FacetError {
  return {
    expression: item["expression"],
    resultType: item["resultType"],
    errors: errorDetailsArrayDeserializer(item["errors"]),
  };
}

/** Paged collection of Operation items */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Resource Graph REST API operation definition. */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** Display metadata associated with the operation. */
  display?: OperationDisplay;
  /** The origin of operations. */
  origin?: string;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
  };
}

/** Display metadata associated with the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft Resource Graph. */
  provider?: string;
  /** Resource on which the operation is performed etc. */
  resource?: string;
  /** Type of operation: get, read, delete, etc. */
  operation?: string;
  /** Description for the operation. */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}
