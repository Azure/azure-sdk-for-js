// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createFoo,
  FooClientOptions,
  Client,
  Resource,
  CustomPage,
  createOrUpdate,
  getOperation,
  deleteOperation,
  list,
  CreateOrUpdateOptions,
  GetOptions,
  DeleteOptions,
  ListOptions,
} from "./api/foo/index.js";

export { FooClientOptions } from "./api/foo/FooContext.js";

export class FooClient {
  private _client: Client.FooContext;

  /** Cadl Foo */
  constructor(endpoint: string, options: FooClientOptions = {}) {
    this._client = createFoo(endpoint, options);
  }

  /** Creates a new resource or updates an existing one. */
  createOrUpdate(
    type: string,
    name: string,
    options: CreateOrUpdateOptions = { requestOptions: {} }
  ): Promise<Resource> {
    return createOrUpdate(this._client, type, name, options);
  }

  /** Gets the details of a resource. */
  /**
   *  @fixme get is a reserved word that cannot be used as an operation name. Please add @projectedName(
   *       "javascript", "<JS-Specific-Name>") to the operation to override the generated name.
   */
  getOperation(
    name: string,
    options: GetOptions = { requestOptions: {} }
  ): Promise<Resource> {
    return getOperation(this._client, name, options);
  }

  /** Deletes a resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name. Please add @projectedName(
   *       "javascript", "<JS-Specific-Name>") to the operation to override the generated name.
   */
  deleteOperation(
    name: string,
    options: DeleteOptions = { requestOptions: {} }
  ): Promise<void> {
    return deleteOperation(this._client, name, options);
  }

  /** Lists the existing resources. */
  list(options: ListOptions = { requestOptions: {} }): Promise<CustomPage> {
    return list(this._client, options);
  }
}
