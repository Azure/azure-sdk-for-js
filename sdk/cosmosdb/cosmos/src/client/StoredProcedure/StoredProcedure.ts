// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import {
  createStoredProcedureUri,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType,
} from "../../common/index.js";
import type { PartitionKey } from "../../documents/PartitionKey.js";
import { undefinedPartitionKey } from "../../extractPartitionKey.js";
import type { RequestOptions } from "../../request/index.js";
import { ResourceResponse } from "../../request/index.js";
import { readPartitionKeyDefinition } from "../ClientUtils.js";
import type { Container } from "../Container/index.js";
import type { StoredProcedureDefinition } from "./StoredProcedureDefinition.js";
import { StoredProcedureResponse } from "./StoredProcedureResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";

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
   * @example
   * ```ts snippet:StoredProcedureRead
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const { resource: sproc } = await container.scripts.storedProcedure("<sproc-id>").read();
   * ```
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
   * @example
   * ```ts snippet:StoredProcedureReplace
   * import { CosmosClient, StoredProcedureDefinition } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const sprocDefinition: StoredProcedureDefinition = {
   *   id: "sample sproc",
   *   body: "function () { const x = 10; }",
   * };
   *
   * const { resource: sproc } = await container.scripts.storedProcedures.create(sprocDefinition);
   *
   * sproc.body = function () {
   *   const x = 20;
   *   console.log(x);
   * };
   * const { resource: replacedSproc } = await container.scripts
   *   .storedProcedure(sproc.id)
   *   .replace(sproc);
   * ```
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
   * @example
   * ```ts snippet:StoredProcedureDelete
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * await container.scripts.storedProcedure("<sproc-id>").delete();
   * ```
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
   * * @example
   * ```ts snippet:StoredProcedureExecute
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const { resource: result } = await container.scripts
   *   .storedProcedure("<sproc-id>")
   *   .execute(undefined);
   * ```
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
