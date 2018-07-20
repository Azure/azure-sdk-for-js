import { UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions } from "../../request";
import { Container } from "../Container";
import { UserDefinedFunctionDefinition } from "./UserDefinedFunctionDefinition";
import { UserDefinedFunctionResponse } from "./UserDefinedFunctionResponse";

/**
 * Used to read, replace, or delete a specified User Definied Function by id.
 *
 * @see {@link UserDefinedFunction} to create, upsert, query, read all User Defined Functions.
 */
export class UserDefinedFunction {
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url() {
    return UriFactory.createUserDefinedFunctionUri(this.container.database.id, this.container.id, this.id);
  }
  private client: CosmosClient;
  /**
   * @hidden
   * @param container The parent {@link Container}.
   * @param id The id of the given {@link UserDefinedFunction}.
   */
  constructor(public readonly container: Container, public readonly id: string) {
    this.client = this.container.database.client;
  }

  /**
   * Read the {@link UserDefinedFunctionDefinition} for the given {@link UserDefinedFunction}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<UserDefinedFunctionResponse> {
    const response = await this.client.documentClient.readUserDefinedFunction(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, userDefinedFunction: this, udf: this };
  }

  /**
   * Replace the given {@link UserDefinedFunction} with the specified {@link UserDefinedFunctionDefinition}.
   * @param body The specified {@link UserDefinedFunctionDefinition}.
   * @param options
   */
  public async replace(
    body: UserDefinedFunctionDefinition,
    options?: RequestOptions
  ): Promise<UserDefinedFunctionResponse> {
    const response = await this.client.documentClient.replaceUserDefinedFunction(this.url, body, options);
    return { body: response.result, headers: response.headers, ref: this, userDefinedFunction: this, udf: this };
  }

  /**
   * Delete the given {@link UserDefined}.
   * @param options
   */
  public async delete(options?: RequestOptions): Promise<UserDefinedFunctionResponse> {
    const response = await this.client.documentClient.deleteUserDefinedFunction(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, userDefinedFunction: this, udf: this };
  }
}
