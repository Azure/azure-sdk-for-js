import { UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
import { TriggerDefinition } from "./TriggerDefinition";
import { TriggerResponse } from "./TriggerResponse";

/**
 * Operations to read, replace, or delete a {@link Trigger}.
 *
 * Use `container.triggers` to create, upsert, query, or read all.
 */
export class Trigger {
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url() {
    return UriFactory.createTriggerUri(this.container.database.id, this.container.id, this.id);
  }

  private client: CosmosClient;

  /**
   * @hidden
   * @param container The parent {@link Container}.
   * @param id The id of the given {@link Trigger}.
   */
  constructor(public readonly container: Container, public readonly id: string) {
    this.client = this.container.database.client;
  }

  /**
   * Read the {@link TriggerDefinition} for the given {@link Trigger}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<TriggerResponse> {
    const response = await this.client.documentClient.readTrigger(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, trigger: this };
  }

  /**
   * Replace the given {@link Trigger} with the specified {@link TriggerDefinition}.
   * @param body The specified {@link TriggerDefinition} to replace the existing definition with.
   * @param options
   */
  public async replace(body: TriggerDefinition, options?: RequestOptions): Promise<TriggerResponse> {
    const response = await this.client.documentClient.replaceTrigger(this.url, body, options);
    return { body: response.result, headers: response.headers, ref: this, trigger: this };
  }

  /**
   * Delete the given {@link Trigger}.
   * @param options
   */
  public async delete(options?: RequestOptions): Promise<TriggerResponse> {
    const response = await this.client.documentClient.deleteTrigger(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, trigger: this };
  }
}
