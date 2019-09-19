// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import {
  createUserDefinedFunctionUri,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType
} from "../../common";
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
    return createUserDefinedFunctionUri(this.container.database.id, this.container.id, this.id);
  }
  /**
   * @hidden
   * @param container The parent {@link Container}.
   * @param id The id of the given {@link UserDefinedFunction}.
   */
  constructor(
    public readonly container: Container,
    public readonly id: string,
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Read the {@link UserDefinedFunctionDefinition} for the given {@link UserDefinedFunction}.
   * @param options
   */
  public async read(options?: RequestOptions): Promise<UserDefinedFunctionResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.read<UserDefinedFunctionDefinition>({
      path,
      resourceType: ResourceType.udf,
      resourceId: id,
      options
    });
    return new UserDefinedFunctionResponse(response.result, response.headers, response.code, this);
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
    if (body.body) {
      body.body = body.body.toString();
    }

    const err = {};
    if (!isResourceValid(body, err)) {
      throw err;
    }

    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.replace<UserDefinedFunctionDefinition>({
      body,
      path,
      resourceType: ResourceType.udf,
      resourceId: id,
      options
    });
    return new UserDefinedFunctionResponse(response.result, response.headers, response.code, this);
  }

  /**
   * Delete the given {@link UserDefined}.
   * @param options
   */
  public async delete(options?: RequestOptions): Promise<UserDefinedFunctionResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.delete({
      path,
      resourceType: ResourceType.udf,
      resourceId: id,
      options
    });
    return new UserDefinedFunctionResponse(response.result, response.headers, response.code, this);
  }
}
