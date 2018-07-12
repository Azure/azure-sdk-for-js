import { Constants, UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { Response } from "../../request";
import { RequestOptions } from "../../request/RequestOptions";
import { User } from "../User";
import { PermissionDefinition } from "./PermissionDefinition";

export class Permission {
  public get url() {
    return UriFactory.createPermissionUri(this.user.database.id, this.user.id, this.id);
  }
  private client: CosmosClient;
  constructor(public readonly user: User, public readonly id: string) {
    this.client = this.user.database.client;
  }
  public read(options?: RequestOptions): Promise<Response<PermissionDefinition>> {
    return this.client.documentClient.readPermission(this.url, options);
  }

  public replace(body: PermissionDefinition, options?: RequestOptions): Promise<Response<PermissionDefinition>> {
    return this.client.documentClient.replacePermission(this.url, body, options);
  }

  public delete(options?: RequestOptions): Promise<Response<PermissionDefinition>> {
    return this.client.documentClient.deletePermission(this.url, options);
  }
}
