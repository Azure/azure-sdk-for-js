import { Constants, UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions, Response } from "../../request";
import { Container } from "../Container";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";
import { UserDefinedFunctionResponse } from "./UserDefinedFunctionResponse";

export class UserDefinedFunction {
  public get url() {
    return UriFactory.createUserDefinedFunctionUri(this.container.database.id, this.container.id, this.id);
  }
  private client: CosmosClient;
  constructor(public readonly container: Container, public readonly id: string) {
    this.client = this.container.database.client;
  }

  public async read(options?: RequestOptions): Promise<UserDefinedFunctionResponse> {
    const response = await this.client.documentClient.readUserDefinedFunction(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, userDefinedFunction: this, udf: this };
  }

  public async replace(
    body: UserDefinedFunctionDefinition,
    options?: RequestOptions
  ): Promise<UserDefinedFunctionResponse> {
    const response = await this.client.documentClient.replaceUserDefinedFunction(this.url, body, options);
    return { body: response.result, headers: response.headers, ref: this, userDefinedFunction: this, udf: this };
  }

  public async delete(options?: RequestOptions): Promise<UserDefinedFunctionResponse> {
    const response = await this.client.documentClient.deleteUserDefinedFunction(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, userDefinedFunction: this, udf: this };
  }
}
