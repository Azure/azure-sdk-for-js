// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import {
  createTriggerUri,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType,
} from "../../common";
import type { RequestOptions } from "../../request";
import type { Container } from "../Container";
import type { TriggerDefinition } from "./TriggerDefinition";
import { TriggerResponse } from "./TriggerResponse";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics";

/**
 * Operations to read, replace, or delete a {@link Trigger}.
 *
 * Use `container.triggers` to create, upsert, query, or read all.
 */
export class Trigger {
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url(): string {
    return createTriggerUri(this.container.database.id, this.container.id, this.id);
  }

  /**
   * @hidden
   * @param container - The parent {@link Container}.
   * @param id - The id of the given {@link Trigger}.
   */
  constructor(
    public readonly container: Container,
    public readonly id: string,
    private readonly clientContext: ClientContext,
  ) {}

  /**
   * Read the {@link TriggerDefinition} for the given {@link Trigger}.
   * @example
   * ```ts snippet:TriggerRead
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const { resource: trigger } = await container.scripts.trigger("<trigger-id>").read();
   * ```
   */
  public async read(options?: RequestOptions): Promise<TriggerResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);

      const response = await this.clientContext.read<TriggerDefinition>({
        path,
        resourceType: ResourceType.trigger,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new TriggerResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Replace the given {@link Trigger} with the specified {@link TriggerDefinition}.
   * @param body - The specified {@link TriggerDefinition} to replace the existing definition with.
   * @example
   * ```ts snippet:TriggerReplace
   * import { CosmosClient, TriggerDefinition, TriggerType, TriggerOperation } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * const triggerDefinition: TriggerDefinition = {
   *   id: "sample trigger",
   *   body: "serverScript() { var x = 10; }",
   *   triggerType: TriggerType.Pre,
   *   triggerOperation: TriggerOperation.All,
   * };
   *
   * const { resource: trigger } = await container.scripts.triggers.create(triggerDefinition);
   *
   * trigger.body = "function () { const x = 20; console.log(x); }";
   * const { resource: replacedTrigger } = await container.scripts.trigger(trigger.id).replace(trigger);
   * ```
   */
  public async replace(
    body: TriggerDefinition,
    options?: RequestOptions,
  ): Promise<TriggerResponse> {
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

      const response = await this.clientContext.replace<TriggerDefinition>({
        body,
        path,
        resourceType: ResourceType.trigger,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new TriggerResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Delete the given {@link Trigger}.
   * @example
   * ```ts snippet:TriggerDelete
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   *
   * await container.scripts.trigger("<trigger-id>").delete();
   * ```
   */
  public async delete(options?: RequestOptions): Promise<TriggerResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);

      const response = await this.clientContext.delete<TriggerDefinition>({
        path,
        resourceType: ResourceType.trigger,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new TriggerResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}
