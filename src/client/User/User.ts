import { UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions } from "../../request";
import { Database } from "../Database";
import { Permission, Permissions } from "../Permission";
import { UserDefinition } from "./UserDefinition";
import { UserResponse } from "./UserResponse";

export class User {
  public readonly permissions: Permissions;
  public get url() {
    return UriFactory.createUserUri(this.database.id, this.id);
  }
  private client: CosmosClient;
  constructor(public readonly database: Database, public readonly id: string) {
    this.client = this.database.client;
    this.permissions = new Permissions(this);
  }

  public permission(id: string): Permission {
    return new Permission(this, id);
  }

  public async read(options?: RequestOptions): Promise<UserResponse> {
    const response = await this.client.documentClient.readUser(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, user: this };
  }

  public async replace(body: UserDefinition, options?: RequestOptions): Promise<UserResponse> {
    const response = await this.client.documentClient.replaceUser(this.url, body, options);
    return { body: response.result, headers: response.headers, ref: this, user: this };
  }

  public async delete(options?: RequestOptions): Promise<UserResponse> {
    const response = await this.client.documentClient.deleteUser(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, user: this };
  }
}
