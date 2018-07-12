import { Constants, UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions, Response } from "../../request";
import { Container } from "../Container";
import { TriggerDefinition } from "./TriggerDefinition";

export class Trigger {
  public get url() {
    return UriFactory.createTriggerUri(this.container.database.id, this.container.id, this.id);
  }

  private client: CosmosClient;

  constructor(public readonly container: Container, public readonly id: string) {
    this.client = this.container.database.client;
  }

  public read(options?: RequestOptions): Promise<Response<TriggerDefinition>> {
    return this.client.documentClient.readTrigger(this.url, options);
  }

  public replace(body: TriggerDefinition, options?: RequestOptions): Promise<Response<TriggerDefinition>> {
    return this.client.documentClient.replaceTrigger(this.url, body, options);
  }

  public delete(options?: RequestOptions): Promise<Response<TriggerDefinition>> {
    return this.client.documentClient.deleteTrigger(this.url, options);
  }
}
