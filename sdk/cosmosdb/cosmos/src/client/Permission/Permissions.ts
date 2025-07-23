// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import {
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType,
} from "../../common/index.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions, RequestOptions } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { User } from "../User/index.js";
import { Permission } from "./Permission.js";
import type { PermissionBody } from "./PermissionBody.js";
import type { PermissionDefinition } from "./PermissionDefinition.js";
import { PermissionResponse } from "./PermissionResponse.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";

/**
 * Use to create, replace, query, and read all Permissions.
 *
 * @see {@link Permission} to read, replace, or delete a specific permission by id.
 */
export class Permissions {
  /**
   * @hidden
   * @param user - The parent {@link User}.
   */
  constructor(
    public readonly user: User,
    private readonly clientContext: ClientContext,
  ) {}

  /**
   * Query all permissions.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @example Query permission with id.
   * ```ts snippet:PermissionsQuery
   * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const querySpec: SqlQuerySpec = {
   *   query: `SELECT * FROM root r WHERE r.id = @permission`,
   *   parameters: [{ name: "@permission", value: "<permission-id>" }],
   * };
   * const { resources: permisssion } = await database
   *   .user("<user-id>")
   *   .permissions.query(querySpec)
   *   .fetchAll();
   * ```
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Query all permissions.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   */
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = getPathFromLink(this.user.url, ResourceType.permission);
    const id = getIdFromLink(this.user.url);

    return new QueryIterator(this.clientContext, query, options, (diagnosticNode, innerOptions) => {
      return this.clientContext.queryFeed({
        path,
        resourceType: ResourceType.permission,
        resourceId: id,
        resultFn: (result) => result.Permissions,
        query,
        options: innerOptions,
        diagnosticNode,
      });
    });
  }

  /**
   * Read all permissions.
   * @example Read all permissions to array.
   * ```ts snippet:PermissionsReadAll
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   *
   * const { resources: permissionList } = await database.user("user1").permissions.readAll().fetchAll();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<PermissionDefinition & Resource> {
    return this.query(undefined, options);
  }

  /**
   * Create a permission.
   *
   * A permission represents a per-User Permission to access a specific resource
   * e.g. Item or Container.
   * @param body - Represents the body of the permission.
   * @example
   * ```ts snippet:PermissionsCreate
   * import { CosmosClient, PermissionDefinition, PermissionMode } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { user } = await database.users.create({ id: "<user-id>" });
   *
   * const permissionDefinition: PermissionDefinition = {
   *   id: "<permission-id>",
   *   permissionMode: PermissionMode.Read,
   *   resource: "<resource-url>",
   * };
   * await user.permissions.create(permissionDefinition);
   * ```
   */
  public async create(
    body: PermissionDefinition,
    options?: RequestOptions,
  ): Promise<PermissionResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const err = {};
      if (!isResourceValid(body, err)) {
        throw err;
      }

      const path = getPathFromLink(this.user.url, ResourceType.permission);
      const id = getIdFromLink(this.user.url);

      const response = await this.clientContext.create<PermissionDefinition, PermissionBody>({
        body,
        path,
        resourceType: ResourceType.permission,
        resourceId: id,
        diagnosticNode,
        options,
      });
      const ref = new Permission(this.user, response.result.id, this.clientContext);
      return new PermissionResponse(
        response.result,
        response.headers,
        response.code,
        ref,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Upsert a permission.
   * A permission represents a per-User Permission to access a
   * specific resource e.g. Item or Container.
   * @example
   * ```ts snippet:PermissionsUpsert
   * import { CosmosClient, PermissionDefinition, PermissionMode } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const user = database.user("<user-id>");
   * const permissionDefinitionToUpsert: PermissionDefinition = {
   *   id: "<permission-id>",
   *   permissionMode: PermissionMode.Read,
   *   resource: "<resource-url>",
   * };
   *
   * await user.permissions.upsert(permissionDefinitionToUpsert);
   * ```
   */
  public async upsert(
    body: PermissionDefinition,
    options?: RequestOptions,
  ): Promise<PermissionResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const err = {};
      if (!isResourceValid(body, err)) {
        throw err;
      }

      const path = getPathFromLink(this.user.url, ResourceType.permission);
      const id = getIdFromLink(this.user.url);

      const response = await this.clientContext.upsert<PermissionDefinition, PermissionBody>({
        body,
        path,
        resourceType: ResourceType.permission,
        resourceId: id,
        options,
        diagnosticNode,
      });
      const ref = new Permission(this.user, response.result.id, this.clientContext);
      return new PermissionResponse(
        response.result,
        response.headers,
        response.code,
        ref,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}
