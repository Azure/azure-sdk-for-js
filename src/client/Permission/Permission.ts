import { Constants, UriFactory } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { Response } from "../../request";
import { RequestOptions } from "../../request/RequestOptions";
import { User } from "../User";
import { PermissionDefinition } from "./PermissionDefinition";
import { PermissionResponse } from "./PermissionResponse";

export class Permission {
  public get url() {
    return UriFactory.createPermissionUri(this.user.database.id, this.user.id, this.id);
  }
  private client: CosmosClient;
  constructor(public readonly user: User, public readonly id: string) {
    this.client = this.user.database.client;
  }
  public async read(options?: RequestOptions): Promise<PermissionResponse> {
    const response = await this.client.documentClient.readPermission(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, permission: this };
  }

  public async replace(body: PermissionDefinition, options?: RequestOptions): Promise<PermissionResponse> {
    const response = await this.client.documentClient.replacePermission(this.url, body, options);
    return { body: response.result, headers: response.headers, ref: this, permission: this };
  }

  public async delete(options?: RequestOptions): Promise<PermissionResponse> {
    const response = await this.client.documentClient.deletePermission(this.url, options);
    return { body: response.result, headers: response.headers, ref: this, permission: this };
  }
}
