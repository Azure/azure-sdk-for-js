// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ClientContext } from "../../ClientContext";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
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
import { readPartitionKeyDefinition } from "../ClientUtils";
import { Container } from "../Container";
import { StoredProcedureDefinition } from "./StoredProcedureDefinition";
import { StoredProcedureResponse } from "./StoredProcedureResponse";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics";

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
    private readonly clientContext: ClientContext,
  ) {}

  /**
   * Read the {@link StoredProcedureDefinition} for the given {@link StoredProcedure}.
   */
  public async read(options?: RequestOptions): Promise<StoredProcedureResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);

      const response = await this.clientContext.read<StoredProcedureDefinition>({
        path,
        resourceType: ResourceType.sproc,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new StoredProcedureResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Replace the given {@link StoredProcedure} with the specified {@link StoredProcedureDefinition}.
   * @param body - The specified {@link StoredProcedureDefinition} to replace the existing definition.
   */
  public async replace(
    body: StoredProcedureDefinition,
    options?: RequestOptions,
  ): Promise<StoredProcedureResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
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
        diagnosticNode,
      });
      return new StoredProcedureResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Delete the given {@link StoredProcedure}.
   */
  public async delete(options?: RequestOptions): Promise<StoredProcedureResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);

      const response = await this.clientContext.delete<StoredProcedureDefinition>({
        path,
        resourceType: ResourceType.sproc,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new StoredProcedureResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
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
    options?: RequestOptions,
  ): Promise<ResourceResponse<T>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      if (partitionKey === undefined) {
        const partitionKeyResponse = await readPartitionKeyDefinition(
          diagnosticNode,
          this.container,
        );
        partitionKey = undefinedPartitionKey(partitionKeyResponse);
      }
      const response = await this.clientContext.execute<T>({
        sprocLink: this.url,
        params,
        options,
        partitionKey,
        diagnosticNode,
      });
      return new ResourceResponse<T>(
        response.result,
        response.headers,
        response.code,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}
