// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import { CosmosDiagnosticContext } from "../../CosmosDiagnosticsContext";
import {
  createStoredProcedureUri,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType,
} from "../../common";
import { PartitionKey } from "../../documents/PartitionKey";
import { undefinedPartitionKey } from "../../extractPartitionKey";
import { RequestOptions, ResourceResponse } from "../../request";
import { readAndRecordPartitionKeyDefinition } from "../ClientUtils";
import { Container } from "../Container";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";
import { StoredProcedureResponse } from "./StoredProcedureResponse";

/**
 * Operations for reading, replacing, deleting, or executing a specific, existing stored procedure by id.
 *
 * For operations to create, read all, or query Stored Procedures,
 */
export class StoredProcedure {
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url(): string {
    return createStoredProcedureUri(this.container.database.id, this.container.id, this.id);
  }
  /**
   * Creates a new instance of {@link StoredProcedure} linked to the parent {@link Container}.
   * @param container - The parent {@link Container}.
   * @param id - The id of the given {@link StoredProcedure}.
   * @hidden
   */
  constructor(
    public readonly container: Container,
    public readonly id: string,
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Read the {@link StoredProcedureDefinition} for the given {@link StoredProcedure}.
   */
  public async read(options?: RequestOptions): Promise<StoredProcedureResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);
    const response = await this.clientContext.read<StoredProcedureDefinition>({
      path,
      resourceType: ResourceType.sproc,
      resourceId: id,
      options,
    });
    return new StoredProcedureResponse(
      response.result,
      response.headers,
      response.code,
      this,
      response.diagnostics
    );
  }

  /**
   * Replace the given {@link StoredProcedure} with the specified {@link StoredProcedureDefinition}.
   * @param body - The specified {@link StoredProcedureDefinition} to replace the existing definition.
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
      options,
    });
    return new StoredProcedureResponse(
      response.result,
      response.headers,
      response.code,
      this,
      response.diagnostics
    );
  }

  /**
   * Delete the given {@link StoredProcedure}.
   */
  public async delete(options?: RequestOptions): Promise<StoredProcedureResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.delete<StoredProcedureDefinition>({
      path,
      resourceType: ResourceType.sproc,
      resourceId: id,
      options,
    });
    return new StoredProcedureResponse(
      response.result,
      response.headers,
      response.code,
      this,
      response.diagnostics
    );
  }

  /**
   * Execute the given {@link StoredProcedure}.
   *
   * The specified type, T, is not enforced by the client.
   * Be sure to validate the response from the stored procedure matches the type, T, you provide.
   *
   * @param partitionKey - The partition key to use when executing the stored procedure
   * @param params - Array of parameters to pass as arguments to the given {@link StoredProcedure}.
   * @param options - Additional options, such as the partition key to invoke the {@link StoredProcedure} on.
   */
  public async execute<T = any>(
    partitionKey: PartitionKey,
    params?: any[],
    options?: RequestOptions
  ): Promise<ResourceResponse<T>> {
    let diagnosticContext: CosmosDiagnosticContext;
    if (partitionKey === undefined) {
      const partitionKeyResponse = await readAndRecordPartitionKeyDefinition(this.container);
      diagnosticContext = partitionKeyResponse.diagnosticContext;
      partitionKey = undefinedPartitionKey(partitionKeyResponse.partitionKeyDefinition);
    }
    const response = await this.clientContext.execute<T>({
      sprocLink: this.url,
      params,
      options,
      partitionKey,
      diagnosticContext,
    });
    return new ResourceResponse<T>(
      response.result,
      response.headers,
      response.code,
      response.diagnostics
    );
  }
}
