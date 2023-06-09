// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FooContext, isUnexpected } from "../../foo/rest/index.js";
import { StreamableMethod } from "@azure-rest/core-client";
import { Resource, CustomPage } from "./models.js";
import { RequestOptions } from "../../common/interfaces.js";
import {
  CreateOrUpdate200Response,
  CreateOrUpdate201Response,
  CreateOrUpdateDefaultResponse,
  Get200Response,
  GetDefaultResponse,
  DeleteOperation204Response,
  DeleteOperationDefaultResponse,
  List200Response,
  ListDefaultResponse,
} from "../rest/responses.js";

export interface CreateOrUpdateOptions extends RequestOptions {
  /** */
  description?: string;
}

export function _createOrUpdateSend(
  context: FooContext,
  type: string,
  name: string,
  options: CreateOrUpdateOptions = { requestOptions: {} }
): StreamableMethod<
  | CreateOrUpdate200Response
  | CreateOrUpdate201Response
  | CreateOrUpdateDefaultResponse
> {
  return context
    .path("/cadl-foo/resources/{name}", name)
    .put({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      headers: { ...options.requestOptions?.headers },
      body: { description: options?.description, type: type },
    });
}

export async function _createOrUpdateDeserialize(
  result:
    | CreateOrUpdate200Response
    | CreateOrUpdate201Response
    | CreateOrUpdateDefaultResponse
): Promise<Resource> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    description: result.body["description"],
    type: result.body["type"],
  };
}

/** Creates a new resource or updates an existing one. */
export async function createOrUpdate(
  context: FooContext,
  type: string,
  name: string,
  options: CreateOrUpdateOptions = { requestOptions: {} }
): Promise<Resource> {
  const result = await _createOrUpdateSend(context, type, name, options);
  return _createOrUpdateDeserialize(result);
}

export interface GetOptions extends RequestOptions {}

export function _getSend(
  context: FooContext,
  name: string,
  options: GetOptions = { requestOptions: {} }
): StreamableMethod<Get200Response | GetDefaultResponse> {
  return context
    .path("/cadl-foo/resources/{name}", name)
    .get({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      headers: { ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: Get200Response | GetDefaultResponse
): Promise<Resource> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    description: result.body["description"],
    type: result.body["type"],
  };
}

/** Gets the details of a resource. */
export async function get(
  context: FooContext,
  name: string,
  options: GetOptions = { requestOptions: {} }
): Promise<Resource> {
  const result = await _getSend(context, name, options);
  return _getDeserialize(result);
}

export interface DeleteOptions extends RequestOptions {}

export function _deleteOperationSend(
  context: FooContext,
  name: string,
  options: DeleteOptions = { requestOptions: {} }
): StreamableMethod<
  DeleteOperation204Response | DeleteOperationDefaultResponse
> {
  return context
    .path("/cadl-foo/resources/{name}", name)
    .delete({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      headers: { ...options.requestOptions?.headers },
    });
}

export async function _deleteOperationDeserialize(
  result: DeleteOperation204Response | DeleteOperationDefaultResponse
): Promise<void> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

/** Deletes a resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name. Please add @projectedName(
 *       "javascript", "<JS-Specific-Name>") to the operation to override the generated name.
 */
export async function deleteOperation(
  context: FooContext,
  name: string,
  options: DeleteOptions = { requestOptions: {} }
): Promise<void> {
  const result = await _deleteOperationSend(context, name, options);
  return _deleteOperationDeserialize(result);
}

export interface ListOptions extends RequestOptions {}

export function _listSend(
  context: FooContext,
  options: ListOptions = { requestOptions: {} }
): StreamableMethod<List200Response | ListDefaultResponse> {
  return context
    .path("/cadl-foo/resources")
    .get({
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      headers: { ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: List200Response | ListDefaultResponse
): Promise<CustomPage> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body["value"] ?? []).map((p) => ({
      id: p["id"],
      name: p["name"],
      description: p["description"],
      type: p["type"],
    })),
    nextLink: result.body["nextLink"],
  };
}

/** Lists the existing resources. */
export async function list(
  context: FooContext,
  options: ListOptions = { requestOptions: {} }
): Promise<CustomPage> {
  const result = await _listSend(context, options);
  return _listDeserialize(result);
}
