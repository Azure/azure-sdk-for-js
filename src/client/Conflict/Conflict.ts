import { Constants } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
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
  private client: CosmosClient;
  /**
   * @hidden
   * @param container The parent {@link Container}.
   * @param id The id of the given {@link Conflict}.
   */
  constructor(public readonly container: Container, public readonly id: string) {
    this.client = this.container.database.client;
  }

  /**
   * Read the {@link ConflictDefinition} for the given {@link Conflict}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<ConflictResponse> {
    const response = await this.client.documentClient.readConflict(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, conflict: this };
  }

  /**
   * Delete the given {@link ConflictDefinition}.
   * @param options
   */
  public async delete(options?: RequestOptions): Promise<ConflictResponse> {
    const response = await this.client.documentClient.deleteConflict(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, conflict: this };
  }
}
