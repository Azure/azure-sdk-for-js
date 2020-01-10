// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import {
  createStoredProcedureUri,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType
} from "../../common";
import { undefinedPartitionKey } from "../../extractPartitionKey";
import { RequestOptions, ResourceResponse } from "../../request";
import { Container } from "../Container";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";
import { StoredProcedureResponse } from "./StoredProcedureResponse";

/**
 * Operations for reading, replacing, deleting, or executing a specific, existing stored procedure by id.
 *
 * For operations to create, upsert, read all, or query Stored Procedures,
 */
export class StoredProcedure {
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url() {
    return createStoredProcedureUri(this.container.database.id, this.container.id, this.id);
  }
  /**
   * Creates a new instance of {@link StoredProcedure} linked to the parent {@link Container}.
   * @param container The parent {@link Container}.
   * @param id The id of the given {@link StoredProcedure}.
   * @hidden
   */
  constructor(
    public readonly container: Container,
    public readonly id: string,
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Read the {@link StoredProcedureDefinition} for the given {@link StoredProcedure}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<StoredProcedureResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);
    const response = await this.clientContext.read<StoredProcedureDefinition>({
      path,
      resourceType: ResourceType.sproc,
      resourceId: id,
      options
    });
    return new StoredProcedureResponse(response.result, response.headers, response.code, this);
  }

  /**
   * Replace the given {@link StoredProcedure} with the specified {@link StoredProcedureDefinition}.
   * @param body The specified {@link StoredProcedureDefinition} to replace the existing definition.
   * @param options
   */
  public async replace(
    body: StoredProcedureDefinition,
    options?: RequestOptions
  ): Promise<StoredProcedureResponse> {
    if (body.body) {
      body.body = body.body.toString();
    }

    const err = {};
    if (!isResourceValid(body, err)) {
      throw err;
    }

    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.replace<StoredProcedureDefinition>({
      body,
      path,
      resourceType: ResourceType.sproc,
      resourceId: id,
      options
    });
    return new StoredProcedureResponse(response.result, response.headers, response.code, this);
  }

  /**
   * Delete the given {@link StoredProcedure}.
   * @param options
   */
  public async delete(options?: RequestOptions): Promise<StoredProcedureResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.delete<StoredProcedureDefinition>({
      path,
      resourceType: ResourceType.sproc,
      resourceId: id,
      options
    });
    return new StoredProcedureResponse(response.result, response.headers, response.code, this);
  }

  /**
   * Execute the given {@link StoredProcedure}.
   *
   * The specified type, T, is not enforced by the client.
   * Be sure to validate the response from the stored procedure matches the type, T, you provide.
   *
   * @param partitionKey The partition key to use when executing the stored procedure
   * @param params Array of parameters to pass as arguments to the given {@link StoredProcedure}.
   * @param options Additional options, such as the partition key to invoke the {@link StoredProcedure} on.
   */
  public async execute<T = any>(
    partitionKey: any,
    params?: any[],
    options?: RequestOptions
  ): Promise<ResourceResponse<T>> {
    if (partitionKey === undefined) {
      const {
        resource: partitionKeyDefinition
      } = await this.container.readPartitionKeyDefinition();
      partitionKey = undefinedPartitionKey(partitionKeyDefinition);
    }
    const response = await this.clientContext.execute<T>({
      sprocLink: this.url,
      params,
      options,
      partitionKey
    });
    return new ResourceResponse<T>(response.result, response.headers, response.code);
  }
}
