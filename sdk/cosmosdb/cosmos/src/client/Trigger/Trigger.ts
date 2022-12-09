// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
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
import { createTriggerResponse, TriggerResponse } from "./TriggerResponse";

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
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Read the {@link TriggerDefinition} for the given {@link Trigger}.
   */
  public async read(options?: RequestOptions): Promise<TriggerResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.read({
      path,
      resourceType: ResourceType.trigger,
      resourceId: id,
      options,
    });
    return createTriggerResponse(response, this);
  }

  /**
   * Replace the given {@link Trigger} with the specified {@link TriggerDefinition}.
   * @param body - The specified {@link TriggerDefinition} to replace the existing definition with.
   */
  public async replace(
    body: TriggerDefinition,
    options?: RequestOptions
  ): Promise<TriggerResponse> {
    if (body.body) {
      body.body = body.body.toString();
    }

    const err = {};
    if (!isResourceValid(body, err)) {
      throw err;
    }

    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.replace({
      body,
      path,
      resourceType: ResourceType.trigger,
      resourceId: id,
      options,
    });
    return createTriggerResponse(response, this);
  }

  /**
   * Delete the given {@link Trigger}.
   */
  public async delete(options?: RequestOptions): Promise<TriggerResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const readResponse = await this.clientContext.read({
      path,
      resourceType: ResourceType.trigger,
      resourceId: id,
      options,
    });

    const response = await this.clientContext.delete({
      path,
      resourceType: ResourceType.trigger,
      resourceId: id,
      options,
    });
    return createTriggerResponse({...response, result: readResponse.result}, this);
  }
}
