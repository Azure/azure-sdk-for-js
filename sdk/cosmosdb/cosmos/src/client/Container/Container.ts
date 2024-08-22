// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import {
  Constants,
  createDocumentCollectionUri,
  getIdFromLink,
  getPathFromLink,
  HTTPMethod,
  isResourceValid,
  ResourceType,
  StatusCodes,
  SubStatusCodes,
} from "../../common";
import {
  convertToInternalPartitionKey,
  PartitionKey,
  PartitionKeyDefinition,
} from "../../documents";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions, ResourceResponse, Response } from "../../request";
import { ErrorResponse, PartitionedQueryExecutionInfo } from "../../request/ErrorResponse";
import { Conflict, Conflicts } from "../Conflict";
import { Database } from "../Database";
import { Item, Items } from "../Item";
import { Scripts } from "../Script/Scripts";
import { ContainerDefinition } from "./ContainerDefinition";
import { ContainerResponse } from "./ContainerResponse";
import { PartitionKeyRange } from "./PartitionKeyRange";
import { Offer, OfferDefinition } from "../Offer";
import { OfferResponse } from "../Offer/OfferResponse";
import { Resource } from "../Resource";
import { FeedRange, FeedRangeInternal } from "../ChangeFeed";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import {
  getEmptyCosmosDiagnostics,
  withDiagnostics,
  withMetadataDiagnostics,
} from "../../utils/diagnostics";
import { MetadataLookUpType } from "../../CosmosDiagnostics";
import {
  EncryptionProcessor,
  EncryptionSettingForProperty,
  EncryptionManager,
} from "../../encryption";

/**
 * Operations for reading, replacing, or deleting a specific, existing container by id.
 *
 * @see {@link Containers} for creating new containers, and reading/querying all containers; use `.containers`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `container(id).read()` before every single `item.read()` call, to ensure the container exists;
 * do this once on application start up.
 */
export class Container {
  private $items: Items;
  /**
   * Operations for creating new items, and reading/querying all items
   *
   * For reading, replacing, or deleting an existing item, use `.item(id)`.
   *
   * @example Create a new item
   * ```typescript
   * const {body: createdItem} = await container.items.create({id: "<item id>", properties: {}});
   * ```
   */
  public get items(): Items {
    if (!this.$items) {
      this.$items = new Items(this, this.clientContext);
    }
    return this.$items;
  }

  private $scripts: Scripts;
  /**
   * All operations for Stored Procedures, Triggers, and User Defined Functions
   */
  public get scripts(): Scripts {
    if (!this.$scripts) {
      this.$scripts = new Scripts(this, this.clientContext);
    }
    return this.$scripts;
  }

  private $conflicts: Conflicts;
  /**
   * Operations for reading and querying conflicts for the given container.
   *
   * For reading or deleting a specific conflict, use `.conflict(id)`.
   */
  public get conflicts(): Conflicts {
    if (!this.$conflicts) {
      this.$conflicts = new Conflicts(this, this.clientContext);
    }
    return this.$conflicts;
  }

  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url(): string {
    return createDocumentCollectionUri(this.database.id, this.id);
  }
  /**
   * @internal
   */
  public encryptionProcessor: EncryptionProcessor;

  /**
   * @internal
   */
  public _rid: string;
  /**
   * @internal
   */
  public isEncryptionInitialized: boolean = false;
  /**
   * Returns a container instance. Note: You should get this from `database.container(id)`, rather than creating your own object.
   * @param database - The parent {@link Database}.
   * @param id - The id of the given container.
   * @hidden
   */
  constructor(
    public readonly database: Database,
    public readonly id: string,
    private readonly clientContext: ClientContext,
    private encryptionManager?: EncryptionManager,
    _rid?: string,
  ) {
    this._rid = _rid;
    if (this.clientContext.enableEncryption) {
      this.encryptionProcessor = new EncryptionProcessor(
        this.id,
        this._rid,
        this.database,
        this.clientContext,
        this.encryptionManager,
      );
    }
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link Item} by id.
   *
   * Use `.items` for creating new items, or querying/reading all items.
   *
   * @param id - The id of the {@link Item}.
   * @param partitionKeyValue - The value of the {@link Item} partition key
   * @example Replace an item
   * `const {body: replacedItem} = await container.item("<item id>", "<partition key value>").replace({id: "<item id>", title: "Updated post", authorID: 5});`
   */
  public item(id: string, partitionKeyValue?: PartitionKey): Item {
    return new Item(this, id, this.clientContext, partitionKeyValue);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link Conflict} by id.
   *
   * Use `.conflicts` for creating new conflicts, or querying/reading all conflicts.
   * @param id - The id of the {@link Conflict}.
   */
  public conflict(id: string, partitionKey?: PartitionKey): Conflict {
    return new Conflict(this, id, this.clientContext, partitionKey);
  }

  /** Read the container's definition */
  public async read(options?: RequestOptions): Promise<ContainerResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      return this.readInternal(diagnosticNode, options);
    }, this.clientContext);
  }

  /**
   * @hidden
   */
  public async readInternal(
    diagnosticNode: DiagnosticNodeInternal,
    options?: RequestOptions,
  ): Promise<ContainerResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);
    const response = await this.clientContext.read<ContainerDefinition>({
      path,
      resourceType: ResourceType.container,
      resourceId: id,
      options,
      diagnosticNode,
    });
    this.clientContext.partitionKeyDefinitionCache[this.url] = response.result.partitionKey;
    return new ContainerResponse(
      response.result,
      response.headers,
      response.code,
      this,
      getEmptyCosmosDiagnostics(),
    );
  }

  /** Replace the container's definition */
  public async replace(
    body: ContainerDefinition,
    options?: RequestOptions,
  ): Promise<ContainerResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const err = {};
      if (!isResourceValid(body, err)) {
        throw err;
      }
      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);

      const response = await this.clientContext.replace<ContainerDefinition>({
        body,
        path,
        resourceType: ResourceType.container,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new ContainerResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /** Delete the container */
  public async delete(options?: RequestOptions): Promise<ContainerResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);

      const response = await this.clientContext.delete<ContainerDefinition>({
        path,
        resourceType: ResourceType.container,
        resourceId: id,
        options,
        diagnosticNode,
      });
      return new ContainerResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }

  /**
   * Gets the partition key definition first by looking into the cache otherwise by reading the collection.
   * @deprecated This method has been renamed to readPartitionKeyDefinition.
   */
  public async getPartitionKeyDefinition(): Promise<ResourceResponse<PartitionKeyDefinition>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      return this.readPartitionKeyDefinition(diagnosticNode);
    }, this.clientContext);
  }

  /**
   * Gets the partition key definition first by looking into the cache otherwise by reading the collection.
   * @hidden
   */
  public async readPartitionKeyDefinition(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<ResourceResponse<PartitionKeyDefinition>> {
    // $ISSUE-felixfan-2016-03-17: Make name based path and link based path use the same key
    // $ISSUE-felixfan-2016-03-17: Refresh partitionKeyDefinitionCache when necessary
    if (this.url in this.clientContext.partitionKeyDefinitionCache) {
      diagnosticNode.addData({ readFromCache: true });
      return new ResourceResponse<PartitionKeyDefinition>(
        this.clientContext.partitionKeyDefinitionCache[this.url],
        {},
        0,
        getEmptyCosmosDiagnostics(),
      );
    }

    const { headers, statusCode, diagnostics } = await withMetadataDiagnostics(
      async (node: DiagnosticNodeInternal) => {
        return this.readInternal(node);
      },
      diagnosticNode,
      MetadataLookUpType.ContainerLookUp,
    );

    return new ResourceResponse<PartitionKeyDefinition>(
      this.clientContext.partitionKeyDefinitionCache[this.url],
      headers,
      statusCode,
      diagnostics,
    );
  }

  /**
   * Gets offer on container. If none exists, returns an OfferResponse with undefined.
   */
  public async readOffer(options: RequestOptions = {}): Promise<OfferResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const { resource: container } = await this.read();
      const path = "/offers";
      const url = container._self;

      const response = await this.clientContext.queryFeed<OfferDefinition & Resource[]>({
        path,
        resourceId: "",
        resourceType: ResourceType.offer,
        query: `SELECT * from root where root.resource = "${url}"`,
        resultFn: (result) => result.Offers,
        options,
        diagnosticNode,
      });
      const offer = response.result[0]
        ? new Offer(this.database.client, response.result[0].id, this.clientContext)
        : undefined;
      return new OfferResponse(
        response.result[0],
        response.headers,
        response.code,
        getEmptyCosmosDiagnostics(),
        offer,
      );
    }, this.clientContext);
  }

  public async getQueryPlan(
    query: string | SqlQuerySpec,
  ): Promise<Response<PartitionedQueryExecutionInfo>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const path = getPathFromLink(this.url);

      return this.clientContext.getQueryPlan(
        path + "/docs",
        ResourceType.item,
        getIdFromLink(this.url),
        query,
        {},
        diagnosticNode,
      );
    }, this.clientContext);
  }

  public readPartitionKeyRanges(feedOptions?: FeedOptions): QueryIterator<PartitionKeyRange> {
    feedOptions = feedOptions || {};
    return this.clientContext.queryPartitionKeyRanges(this.url, undefined, feedOptions);
  }
  /**
   *
   * @returns all the feed ranges for which changefeed could be fetched.
   */
  public async getFeedRanges(): Promise<ReadonlyArray<FeedRange>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      const { resources } = await this.readPartitionKeyRanges().fetchAllInternal(diagnosticNode);

      const feedRanges: FeedRange[] = [];
      for (const resource of resources) {
        const feedRange = new FeedRangeInternal(resource.minInclusive, resource.maxExclusive);
        Object.freeze(feedRange);
        feedRanges.push(feedRange);
      }
      return feedRanges;
    }, this.clientContext);
  }

  /**
   * Delete all documents belong to the container for the provided partition key value
   * @param partitionKey - The partition key value of the items to be deleted
   */
  public async deleteAllItemsForPartitionKey(
    partitionKey: PartitionKey,
    options?: RequestOptions,
  ): Promise<ContainerResponse> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      let path = getPathFromLink(this.url);
      const id = getIdFromLink(this.url);
      path = path + "/operations/partitionkeydelete";
      if (this.clientContext.enableEncryption) {
        if (!this.isEncryptionInitialized) {
          await this.initializeEncryption();
        }
        this.encryptionProcessor.containerRid = this._rid;
        options = options || {};
        options.containerRid = this._rid;
        const partitionKeyInternal = convertToInternalPartitionKey(partitionKey);
        partitionKey =
          await this.encryptionProcessor.getEncryptedPartitionKeyValue(partitionKeyInternal);
      }
      let response: Response<any>;
      try {
        response = await this.clientContext.delete<ContainerDefinition>({
          path,
          resourceType: ResourceType.container,
          resourceId: id,
          options,
          partitionKey: partitionKey,
          method: HTTPMethod.post,
          diagnosticNode,
        });
      } catch (error) {
        if (this.clientContext.enableEncryption) {
          await this.throwIfRequestNeedsARetryPostPolicyRefresh(error);
        }
        throw error;
      }

      return new ContainerResponse(
        response.result,
        response.headers,
        response.code,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
  /**
   * @hidden
   * Warms up encryption related caches for the container.
   */
  public async initializeEncryption(): Promise<void> {
    if (!this.clientContext.enableEncryption) {
      throw new ErrorResponse("Encryption is not enabled for the client.");
    } else {
      await withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
        const readResponse = await this.readInternal(diagnosticNode);
        this._rid = readResponse.resource._rid;
        const clientEncryptionPolicy = readResponse.resource.clientEncryptionPolicy;
        if (!clientEncryptionPolicy) return;
        const partitionKeyPaths = readResponse.resource.partitionKey.paths;
        const { resource: databaseDefinition } = await this.database.read();
        this.database._rid = databaseDefinition._rid;

        const key = this.database._rid + "/" + this._rid;

        await this.encryptionManager.encryptionSettingsCache.createAndSetEncryptionSettings(
          key,
          this._rid,
          partitionKeyPaths,
          clientEncryptionPolicy,
        );
        const clientEncryptionKeyIds = [
          ...new Set(
            clientEncryptionPolicy.includedPaths.map((item) => item.clientEncryptionKeyId),
          ),
        ];
        // fetch and set clientEncryptionKeys in the cache
        for (const clientEncryptionKeyId of clientEncryptionKeyIds) {
          const res = await this.database.readClientEncryptionKey(clientEncryptionKeyId);
          const encryptionKeyProperties = res.clientEncryptionKeyProperties;
          const key = this.database._rid + "/" + clientEncryptionKeyId;

          this.encryptionManager.clientEncryptionKeyPropertiesCache.setClientEncryptionKeyProperties(
            key,
            encryptionKeyProperties,
          );
        }
        this.isEncryptionInitialized = true;
      }, this.clientContext);
    }
  }
  /**
   * This function handles the scenario where a container is deleted(say from different Client) and recreated with same Id but with different client encryption policy.
   * The idea is to have the container Rid cached and sent out as part of RequestOptions with Container Rid set in "x-ms-cosmos-intended-collection-rid" header.
   * So, when the container being referenced here gets recreated we would end up with a stale encryption settings and container Rid and this would result in BadRequest (and a substatus 1024).
   * This would allow us to refresh the encryption settings and Container Rid, on the premise that the container recreated could possibly be configured with a new encryption policy.
   */
  async throwIfRequestNeedsARetryPostPolicyRefresh(errorResponse: any): Promise<void> {
    const key = this.database._rid + "/" + this._rid;
    const encryptionSetting =
      this.encryptionManager.encryptionSettingsCache.getEncryptionSettings(key);
    const subStatusCode = errorResponse.headers[Constants.HttpHeaders.SubStatus];
    const isPartitionKeyMismatch = subStatusCode == SubStatusCodes.PartitionKeyMismatch;
    const isIncorrectContainerRidSubstatus =
      subStatusCode == SubStatusCodes.IncorrectContainerRidSubstatus;
    if (
      errorResponse.code === StatusCodes.BadRequest &&
      (isPartitionKeyMismatch || isIncorrectContainerRidSubstatus)
    ) {
      if (isPartitionKeyMismatch && encryptionSetting.partitionKeyPaths.length) {
        let encryptionSettingsForProperty: EncryptionSettingForProperty = null;
        for (const path of encryptionSetting.partitionKeyPaths) {
          const partitionKeyPath = path.split("/")[1];
          encryptionSettingsForProperty =
            encryptionSetting.getEncryptionSettingForProperty(partitionKeyPath);
          if (encryptionSettingsForProperty) {
            break;
          }
        }

        if (encryptionSettingsForProperty == null) {
          return;
        }
      }
      const currentContainerRid = encryptionSetting.containerRid;
      const forceRefresh = true;
      const updatedContainerRid = (
        await this.encryptionProcessor.getEncryptionSetting(forceRefresh)
      ).containerRid;

      if (currentContainerRid === updatedContainerRid) {
        return;
      }
      await this.initializeEncryption();
      throw new ErrorResponse(
        "Operation has failed due to a possible mismatch in Client Encryption Policy configured on the container. Retrying may fix the issue. Please refer to https://aka.ms/CosmosClientEncryption for more details." +
          errorResponse.message,
      );
    }
  }
}
