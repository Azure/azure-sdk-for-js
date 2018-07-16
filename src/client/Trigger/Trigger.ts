import { UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
import { TriggerDefinition } from "./TriggerDefinition";
import { TriggerResponse } from "./TriggerResponse";

export class Trigger {
  public get url() {
    return UriFactory.createTriggerUri(this.container.database.id, this.container.id, this.id);
  }

  private client: CosmosClient;

  constructor(public readonly container: Container, public readonly id: string) {
    this.client = this.container.database.client;
  }

  public async read(options?: RequestOptions): Promise<TriggerResponse> {
    const response = await this.client.documentClient.readTrigger(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, trigger: this };
  }

  public async replace(body: TriggerDefinition, options?: RequestOptions): Promise<TriggerResponse> {
    const response = await this.client.documentClient.replaceTrigger(this.url, body, options);
    return { body: response.result, headers: response.headers, ref: this, trigger: this };
  }

  public async delete(options?: RequestOptions): Promise<TriggerResponse> {
    const response = await this.client.documentClient.deleteTrigger(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, trigger: this };
  }
}
