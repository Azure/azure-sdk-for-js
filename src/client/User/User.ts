import { Constants, UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions, Response } from "../../request";
import { Database } from "../Database";
import { Permission, Permissions } from "../Permission";
import { UserDefinition } from "./UserDefinition";

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

  public read(options?: RequestOptions): Promise<Response<UserDefinition>> {
    return this.client.documentClient.readUser(this.url, options);
  }

  public replace(body: UserDefinition, options?: RequestOptions): Promise<Response<UserDefinition>> {
    return this.client.documentClient.replaceUser(this.url, body, options);
  }

  public delete(options?: RequestOptions): Promise<Response<UserDefinition>> {
    return this.client.documentClient.deleteUser(this.url, options);
  }
}
