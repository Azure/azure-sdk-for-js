import { Constants, UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions, Response } from "../../request";
import { Container } from "../Container";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";

export class UserDefinedFunction {
  public get url() {
    return UriFactory.createUserDefinedFunctionUri(this.container.database.id, this.container.id, this.id);
  }
  private client: CosmosClient;
  constructor(public readonly container: Container, public readonly id: string) {
    this.client = this.container.database.client;
  }

  public read(options?: RequestOptions): Promise<Response<UserDefinedFunctionDefinition>> {
    return this.client.documentClient.readUserDefinedFunction(this.url, options);
  }

  public replace(
    body: UserDefinedFunctionDefinition,
    options?: RequestOptions
  ): Promise<Response<UserDefinedFunctionDefinition>> {
    return this.client.documentClient.replaceUserDefinedFunction(this.url, body, options);
  }

  public delete(options?: RequestOptions): Promise<Response<UserDefinedFunctionDefinition>> {
    return this.client.documentClient.deleteUserDefinedFunction(this.url, options);
  }
}
