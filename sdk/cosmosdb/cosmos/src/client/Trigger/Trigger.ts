// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ClientContext } from "../../ClientContext";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import {
  createTriggerUri,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType,
} from "../../common";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
import { TriggerDefinition } from "./TriggerDefinition";
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
