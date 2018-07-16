import { Constants } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
import { ConflictResponse } from "./ConflictResponse";

export class Conflict {
  public get url() {
    return `/${this.container.url}/${Constants.Path.ConflictsPathSegment}/${this.id}`;
  }
  private client: CosmosClient;
  constructor(public readonly container: Container, public readonly id: string) {
    this.client = this.container.database.client;
  }

  public async read(options?: RequestOptions): Promise<ConflictResponse> {
    const response = await this.client.documentClient.readConflict(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, conflict: this };
  }

  public async delete(options?: RequestOptions): Promise<ConflictResponse> {
    const response = await this.client.documentClient.deleteConflict(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, conflict: this };
  }
}
