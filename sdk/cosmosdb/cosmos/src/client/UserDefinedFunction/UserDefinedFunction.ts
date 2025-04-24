// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import {
  createUserDefinedFunctionUri,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType,
} from "../../common/index.js";
import type { RequestOptions } from "../../request/index.js";
import type { Container } from "../Container/index.js";
import type { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition.js";
import { UserDefinedFunctionResponse } from "./UserDefinedFunctionResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";

/**
 * Used to read, replace, or delete a specified User Definied Function by id.
 *
 * @see {@link UserDefinedFunction} to create, upsert, query, read all User Defined Functions.
 */
export class UserDefinedFunction {
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url(): string {
    return createUserDefinedFunctionUri(this.container.database.id, this.container.id, this.id);
  }
  /**
   * @hidden
   * @param container - The parent {@link Container}.
   * @param id - The id of the given {@link UserDefinedFunction}.
   */
  constructor(
    public readonly container: Container,
    public readonly id: string,
    private readonly clientContext: ClientContext,
  ) {}

  /**
   * Read the {@link UserDefinedFunctionDefinition} for the given {@link UserDefinedFunction}.
   * @example
   * ```ts snippet:UserDefinedFunctionRead
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const { resource: udf } = await container.scripts.userDefinedFunction("<udf-id>").read();
   * ```
   */
  public async read(options?: RequestOptions): Promise<UserDefinedFunctionResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);

      const response = await this.clientContext.read<UserDefinedFunctionDefinition>({
        path,
        resourceType: ResourceType.udf,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new UserDefinedFunctionResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Replace the given {@link UserDefinedFunction} with the specified {@link UserDefinedFunctionDefinition}.
   * @param options -
   * @example
   * ```ts snippet:UserDefinedFunctionReplace
   * import { CosmosClient, UserDefinedFunctionDefinition } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const udfDefinition: UserDefinedFunctionDefinition = {
   *   id: "sample udf",
   *   body: "function () { const x = 10; }",
   * };
   * await container.scripts.userDefinedFunctions.create(udfDefinition);
   *
   * udfDefinition.body = "function () { const x = 20; }";
   * const { resource: replacedUdf } = await container.scripts
   *   .userDefinedFunction(udfDefinition.id)
   *   .replace(udfDefinition);
   * ```
   */
  public async replace(
    body: UserDefinedFunctionDefinition,
    options?: RequestOptions,
  ): Promise<UserDefinedFunctionResponse> {
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

      const response = await this.clientContext.replace<UserDefinedFunctionDefinition>({
        body,
        path,
        resourceType: ResourceType.udf,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new UserDefinedFunctionResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Delete the given {@link UserDefined}.
   * @example
   * ```ts snippet:UserDefinedFunctionDelete
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * await container.scripts.userDefinedFunction("<udf-id>").delete();
   * ```
   */
  public async delete(options?: RequestOptions): Promise<UserDefinedFunctionResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);

      const response = await this.clientContext.delete({
        path,
        resourceType: ResourceType.udf,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new UserDefinedFunctionResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}
