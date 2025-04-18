// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext.js";
import {
  Constants,
  getIdFromLink,
  getPathFromLink,
  isResourceValid,
  ResourceType,
  StatusCodes,
  validateClientEncryptionPolicy,
} from "../../common/index.js";
import { DEFAULT_PARTITION_KEY_PATH } from "../../common/partitionKeys.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { mergeHeaders } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import { type FeedOptions, type RequestOptions } from "../../request/index.js";
import type { Database } from "../Database/index.js";
import type { Resource } from "../Resource.js";
import { Container } from "./Container.js";
import type { ContainerDefinition } from "./ContainerDefinition.js";
import type { ContainerRequest } from "./ContainerRequest.js";
import { ContainerResponse } from "./ContainerResponse.js";
import { validateOffer } from "../../utils/offers.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";
import type { EncryptionManager } from "../../encryption/EncryptionManager.js";

/**
 * Operations for creating new containers, and reading/querying all containers
 *
 * @see {@link Container} for reading, replacing, or deleting an existing container; use `.container(id)`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `containers.readAll()` before every single `item.read()` call, to ensure the container exists;
 * do this once on application start up.
 */
export class Containers {
  /**
   * @hidden
   * @param database - The parent {@link Database}.
   */
  constructor(
    public readonly database: Database,
    private readonly clientContext: ClientContext,
    private encryptionManager?: EncryptionManager,
  ) {}

  /**
   * Queries all containers.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options - Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return specific containers in an array or iterate over them one at a time.
   * @example Read all containers to array.
   * ```ts snippet:ContainersQueryAllContainers
   * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const querySpec: SqlQuerySpec = {
   *   query: `SELECT * FROM root r WHERE r.id = @container`,
   *   parameters: [{ name: "@container", value: "Todo" }],
   * };
   * const { resources: containerList } = await client
   *   .database("<db id>")
   *   .containers.query(querySpec)
   *   .fetchAll();
   * ```
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Queries all containers.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options - Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return specific containers in an array or iterate over them one at a time.
   * @example Read all containers to array.
   * ```ts snippet:ContainersQueryAllContainers
   * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const querySpec: SqlQuerySpec = {
   *   query: `SELECT * FROM root r WHERE r.id = @container`,
   *   parameters: [{ name: "@container", value: "Todo" }],
   * };
   * const { resources: containerList } = await client
   *   .database("<db id>")
   *   .containers.query(querySpec)
   *   .fetchAll();
   * ```
   */
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = getPathFromLink(this.database.url, ResourceType.container);
    const id = getIdFromLink(this.database.url);

    return new QueryIterator(
      this.clientContext,
      query,
      options,
      (diagNode: DiagnosticNodeInternal, innerOptions) => {
        return this.clientContext.queryFeed<ContainerDefinition>({
          path,
          resourceType: ResourceType.container,
          resourceId: id,
          resultFn: (result) => result.DocumentCollections,
          query,
          options: innerOptions,
          diagnosticNode: diagNode,
        });
      },
    );
  }

  /**
   * Creates a container.
   *
   * A container is a named logical container for items.
   *
   * A database may contain zero or more named containers and each container consists of
   * zero or more JSON items.
   *
   * Being schema-free, the items in a container do not need to share the same structure or fields.
   *
   *
   * Since containers are application resources, they can be authorized using either the
   * master key or resource keys.
   *
   * @param body - Represents the body of the container.
   * @param options - Use to set options like response page size, continuation tokens, etc.
   * @example
   * ```ts snippet:CosmosClientDatabaseCreateContainer
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   * const container = client.database("<database id>").containers.create({
   *   id: "<name here>",
   * });
   * ```
   */
  public async create(
    body: ContainerRequest,
    options: RequestOptions = {},
  ): Promise<ContainerResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      return this.createInternal(diagnosticNode, body, options);
    }, this.clientContext);
  }

  /**
   * @hidden
   */
  public async createInternal(
    diagnosticNode: DiagnosticNodeInternal,
    body: ContainerRequest,
    options: RequestOptions = {},
  ): Promise<ContainerResponse> {
    const err = {};
    if (!isResourceValid(body, err)) {
      throw err;
    }
    const path = getPathFromLink(this.database.url, ResourceType.container);
    const id = getIdFromLink(this.database.url);

    validateOffer(body);

    if (body.maxThroughput) {
      const autoscaleParams: {
        maxThroughput: number;
        autoUpgradePolicy?: {
          throughputPolicy: {
            incrementPercent: number;
          };
        };
      } = {
        maxThroughput: body.maxThroughput,
      };
      if (body.autoUpgradePolicy) {
        autoscaleParams.autoUpgradePolicy = body.autoUpgradePolicy;
      }
      const autoscaleHeader = JSON.stringify(autoscaleParams);
      options.initialHeaders = Object.assign({}, options.initialHeaders, {
        [Constants.HttpHeaders.AutoscaleSettings]: autoscaleHeader,
      });
      delete body.maxThroughput;
      delete body.autoUpgradePolicy;
    }

    if (body.throughput) {
      options.initialHeaders = Object.assign({}, options.initialHeaders, {
        [Constants.HttpHeaders.OfferThroughput]: body.throughput,
      });
      delete body.throughput;
    }

    if (typeof body.partitionKey === "string") {
      if (!body.partitionKey.startsWith("/")) {
        throw new Error("Partition key must start with '/'");
      }
      body.partitionKey = {
        paths: [body.partitionKey],
      };
    }

    // If they don't specify a partition key, use the default path
    if (!body.partitionKey || !body.partitionKey.paths) {
      body.partitionKey = {
        paths: [DEFAULT_PARTITION_KEY_PATH],
      };
    }

    if (this.clientContext.enableEncryption && body.clientEncryptionPolicy) {
      body.clientEncryptionPolicy.policyFormatVersion =
        body.clientEncryptionPolicy.policyFormatVersion ?? 1;
      validateClientEncryptionPolicy(body.clientEncryptionPolicy, body.partitionKey);
    }
    const response = await this.clientContext.create<ContainerRequest, ContainerDefinition>({
      body,
      path,
      resourceType: ResourceType.container,
      resourceId: id,
      diagnosticNode,
      options,
    });
    const ref = new Container(
      this.database,
      response.result.id,
      this.clientContext,
      this.encryptionManager,
      response.result._rid,
    );
    this.clientContext.partitionKeyDefinitionCache[ref.url] = response.result.partitionKey;
    return new ContainerResponse(
      response.result,
      response.headers,
      response.code,
      ref,
      getEmptyCosmosDiagnostics(),
    );
  }

  /**
   * Checks if a Container exists, and, if it doesn't, creates it.
   * This will make a read operation based on the id in the `body`, then if it is not found, a create operation.
   * You should confirm that the output matches the body you passed in for non-default properties (i.e. indexing policy/etc.)
   *
   * A container is a named logical container for items.
   *
   * A database may contain zero or more named containers and each container consists of
   * zero or more JSON items.
   *
   * Being schema-free, the items in a container do not need to share the same structure or fields.
   *
   *
   * Since containers are application resources, they can be authorized using either the
   * master key or resource keys.
   *
   * @param body - Represents the body of the container.
   * @param options - Use to set options like response page size, continuation tokens, etc.
   * @example
   * ```ts snippet:ReadmeSampleCreateContainer
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
   * const { container } = await database.containers.createIfNotExists({ id: "Test Container" });
   * ```
   */
  public async createIfNotExists(
    body: ContainerRequest,
    options?: RequestOptions,
  ): Promise<ContainerResponse> {
    if (!body || body.id === null || body.id === undefined) {
      throw new Error("body parameter must be an object with an id property");
    }
    /*
      1. Attempt to read the Container (based on an assumption that most containers will already exist, so its faster)
      2. If it fails with NotFound error, attempt to create the container. Else, return the read results.
    */
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      try {
        const readResponse = await this.database
          .container(body.id)
          .readInternal(diagnosticNode, options);
        return readResponse;
      } catch (err: any) {
        if (err.code === StatusCodes.NotFound) {
          const createResponse = await this.createInternal(diagnosticNode, body, options);
          // Must merge the headers to capture RU costskaty
          mergeHeaders(createResponse.headers, err.headers);
          return createResponse;
        } else {
          throw err;
        }
      }
    }, this.clientContext);
  }

  /**
   * Read all containers.
   * @param options - Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return all containers in an array or iterate over them one at a time.
   * @example Read all containers to array.
   * ```ts snippet:ContainersReadAllContainers
   * import { CosmosClient } from "@azure/cosmos";
   *
   * const endpoint = "https://your-account.documents.azure.com";
   * const key = "<database account masterkey>";
   * const client = new CosmosClient({ endpoint, key });
   *
   * const { resources: containerList } = await client
   *   .database("<db id>")
   *   .containers.readAll()
   *   .fetchAll();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<ContainerDefinition & Resource> {
    return this.query(undefined, options);
  }
}
