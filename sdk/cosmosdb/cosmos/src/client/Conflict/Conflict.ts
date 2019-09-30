// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import { Constants, getIdFromLink, getPathFromLink, ResourceType } from "../../common";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
import { ConflictDefinition } from "./ConflictDefinition";
import { ConflictResponse } from "./ConflictResponse";

/**
 * Use to read or delete a given {@link Conflict} by id.
 *
 * @see {@link Conflicts} to query or read all conflicts.
 */
export class Conflict {
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url() {
    return `/${this.container.url}/${Constants.Path.ConflictsPathSegment}/${this.id}`;
  }
  /**
   * @hidden
   * @param container The parent {@link Container}.
   * @param id The id of the given {@link Conflict}.
   */
  constructor(
    public readonly container: Container,
    public readonly id: string,
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Read the {@link ConflictDefinition} for the given {@link Conflict}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<ConflictResponse> {
    const path = getPathFromLink(this.url, ResourceType.conflicts);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.read<ConflictDefinition>({
      path,
      resourceType: ResourceType.user,
      resourceId: id,
      options
    });
    return new ConflictResponse(response.result, response.headers, response.code, this);
  }

  /**
   * Delete the given {@link ConflictDefinition}.
   * @param options
   */
  public async delete(options?: RequestOptions): Promise<ConflictResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.delete<ConflictDefinition>({
      path,
      resourceType: ResourceType.conflicts,
      resourceId: id,
      options
    });
    return new ConflictResponse(response.result, response.headers, response.code, this);
  }
}
