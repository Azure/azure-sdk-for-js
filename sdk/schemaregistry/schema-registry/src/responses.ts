// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  SchemaGroupsOutput,
  SchemaVersionsOutput,
  SchemaContentTypeValuesOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface ListSchemaGroups200Response extends HttpResponse {
  status: "200";
  body: SchemaGroupsOutput;
}

export interface ListSchemaGroupsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListSchemaGroupsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListSchemaGroupsDefaultHeaders;
}

/** The request has succeeded. */
export interface ListSchemaVersions200Response extends HttpResponse {
  status: "200";
  body: SchemaVersionsOutput;
}

export interface ListSchemaVersionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListSchemaVersionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListSchemaVersionsDefaultHeaders;
}

export interface GetSchemaById200Headers {
  /** URL location of schema, identified by schema group, schema name, and version. */
  location: string;
  /** References specific schema in registry namespace. */
  "schema-id": string;
  /** URL location of schema, identified by schema ID. */
  "schema-id-location": string;
  /** References schema group. */
  "schema-group-name": string;
  /** References schema name. */
  "schema-name": string;
  /** Version of the returned schema. */
  "schema-version": number;
  /** The content type for given schema. */
  "content-type": SchemaContentTypeValuesOutput;
}

/** The request has succeeded. */
export interface GetSchemaById200Response extends HttpResponse {
  status: "200";
  body: string;
  headers: RawHttpHeaders & GetSchemaById200Headers;
}

export interface GetSchemaByIdDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetSchemaByIdDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetSchemaByIdDefaultHeaders;
}

export interface GetSchemaByVersion200Headers {
  /** URL location of schema, identified by schema group, schema name, and version. */
  location: string;
  /** References specific schema in registry namespace. */
  "schema-id": string;
  /** URL location of schema, identified by schema ID. */
  "schema-id-location": string;
  /** References schema group. */
  "schema-group-name": string;
  /** References schema name. */
  "schema-name": string;
  /** Version of the returned schema. */
  "schema-version": number;
  /** The content type for given schema. */
  "content-type": SchemaContentTypeValuesOutput;
}

/** The request has succeeded. */
export interface GetSchemaByVersion200Response extends HttpResponse {
  status: "200";
  body: string;
  headers: RawHttpHeaders & GetSchemaByVersion200Headers;
}

export interface GetSchemaByVersionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetSchemaByVersionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetSchemaByVersionDefaultHeaders;
}

export interface GetSchemaPropertiesByContent204Headers {
  /** URL location of schema, identified by schema group, schema name, and version. */
  location: string;
  /** References specific schema in registry namespace. */
  "schema-id": string;
  /** URL location of schema, identified by schema ID. */
  "schema-id-location": string;
  /** References schema group. */
  "schema-group-name": string;
  /** References schema name. */
  "schema-name": string;
  /** Version of the returned schema. */
  "schema-version": number;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface GetSchemaPropertiesByContent204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & GetSchemaPropertiesByContent204Headers;
}

export interface GetSchemaPropertiesByContentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetSchemaPropertiesByContentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetSchemaPropertiesByContentDefaultHeaders;
}

export interface RegisterSchema204Headers {
  /** URL location of schema, identified by schema group, schema name, and version. */
  location: string;
  /** References specific schema in registry namespace. */
  "schema-id": string;
  /** URL location of schema, identified by schema ID. */
  "schema-id-location": string;
  /** References schema group. */
  "schema-group-name": string;
  /** References schema name. */
  "schema-name": string;
  /** Version of the returned schema. */
  "schema-version": number;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface RegisterSchema204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & RegisterSchema204Headers;
}

export interface RegisterSchemaDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface RegisterSchemaDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & RegisterSchemaDefaultHeaders;
}
