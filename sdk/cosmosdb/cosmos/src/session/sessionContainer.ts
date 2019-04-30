import { Constants, Helper } from "../common";
import { IHeaders } from "../queryExecutionContext";
import { SessionContext } from "./SessionContext";
import { VectorSessionToken } from "./VectorSessionToken";

/** @hidden */
export class SessionContainer {
  private static readonly EMPTY_SESSION_TOKEN = "";
  private static readonly SESSION_TOKEN_SEPARATOR = ",";
  private static readonly SESSION_TOKEN_PARTITION_SPLITTER = ":";
  constructor(
    private collectionNameToCollectionResourceId = new Map<string, string>(),
    private collectionResourceIdToSessionTokens = new Map<string, Map<string, VectorSessionToken>>()
  ) {}

  public get(request: SessionContext) {
    if (!request) {
      throw new Error("request cannot be null");
    }
    const collectionName = Helper.getContainerLink(Helper.trimSlashes(request.resourceAddress));
    const rangeIdToTokenMap = this.getPartitionKeyRangeIdToTokenMap(collectionName);
    return SessionContainer.getCombinedSessionTokenString(rangeIdToTokenMap);
  }

  public remove(request: SessionContext) {
    let collectionResourceId: string;
    const resourceAddress = Helper.trimSlashes(request.resourceAddress);
    const collectionName = Helper.getContainerLink(resourceAddress);
    if (collectionName) {
      collectionResourceId = this.collectionNameToCollectionResourceId.get(collectionName);
      this.collectionNameToCollectionResourceId.delete(collectionName);
    }
    if (collectionResourceId !== undefined) {
      this.collectionResourceIdToSessionTokens.delete(collectionResourceId);
    }
  }

  public set(request: SessionContext, resHeaders: IHeaders) {
    // TODO: we check the master logic a few different places. Might not need it.
    if (!resHeaders || SessionContainer.isReadingFromMaster(request.resourceType, request.operationType)) {
      return;
    }

    const sessionTokenString = resHeaders[Constants.HttpHeaders.SessionToken];
    if (!sessionTokenString) {
      return;
    }

    const containerName = this.getContainerName(request, resHeaders);

    const ownerId = !request.isNameBased
      ? request.resourceId
      : resHeaders[Constants.HttpHeaders.OwnerId] || request.resourceId;

    if (!ownerId) {
      return;
    }

    if (containerName && this.validateOwnerID(ownerId)) {
      if (!this.collectionResourceIdToSessionTokens.has(ownerId)) {
        this.collectionResourceIdToSessionTokens.set(ownerId, new Map());
      }

      if (!this.collectionNameToCollectionResourceId.has(containerName)) {
        this.collectionNameToCollectionResourceId.set(containerName, ownerId);
      }

      const containerSessionContainer = this.collectionResourceIdToSessionTokens.get(ownerId);
      SessionContainer.compareAndSetToken(sessionTokenString, containerSessionContainer);
    }
  }

  private validateOwnerID(ownerId: string) {
    const ownerIdBuffer = Buffer.from(ownerId, "base64");
    // If ownerId contains exactly 8 bytes it represents a unique database+collection identifier. Otherwise it represents another resource
    // The first 4 bytes are the database. The last 4 bytes are the collection.
    if (ownerIdBuffer.length === 8) {
      return true;
    }
    return false;
  }

  private getPartitionKeyRangeIdToTokenMap(collectionName: string): Map<string, VectorSessionToken> {
    let rangeIdToTokenMap: Map<string, VectorSessionToken> = null;
    if (collectionName && this.collectionNameToCollectionResourceId.has(collectionName)) {
      rangeIdToTokenMap = this.collectionResourceIdToSessionTokens.get(
        this.collectionNameToCollectionResourceId.get(collectionName)
      );
    }

    return rangeIdToTokenMap;
  }

  private static getCombinedSessionTokenString(tokens: Map<string, VectorSessionToken>) {
    if (!tokens || tokens.size === 0) {
      return SessionContainer.EMPTY_SESSION_TOKEN;
    }

    let result = "";
    for (const [range, token] of tokens.entries()) {
      result +=
        range +
        SessionContainer.SESSION_TOKEN_PARTITION_SPLITTER +
        token.toString() +
        SessionContainer.SESSION_TOKEN_SEPARATOR;
    }
    return result.slice(0, -1);
  }

  private static compareAndSetToken(newTokenString: string, containerSessionTokens: Map<string, VectorSessionToken>) {
    if (!newTokenString) {
      return;
    }

    const partitionsParts = newTokenString.split(SessionContainer.SESSION_TOKEN_SEPARATOR);
    for (const partitionPart of partitionsParts) {
      const newTokenParts = partitionPart.split(SessionContainer.SESSION_TOKEN_PARTITION_SPLITTER);
      if (newTokenParts.length !== 2) {
        return;
      }

      const range = newTokenParts[0];
      const newToken = VectorSessionToken.create(newTokenParts[1]);
      const tokenForRange = !containerSessionTokens.get(range)
        ? newToken
        : containerSessionTokens.get(range).merge(newToken);
      containerSessionTokens.set(range, tokenForRange);
    }
  }

  // TODO: have a assert if the type doesn't mastch known types
  private static isReadingFromMaster(resourceType: string, operationType: string): boolean {
    if (
      resourceType === Constants.Path.OffersPathSegment ||
      resourceType === Constants.Path.DatabasesPathSegment ||
      resourceType === Constants.Path.UsersPathSegment ||
      resourceType === Constants.Path.PermissionsPathSegment ||
      resourceType === Constants.Path.TopologyPathSegment ||
      resourceType === Constants.Path.DatabaseAccountPathSegment ||
      resourceType === Constants.Path.PartitionKeyRangesPathSegment ||
      (resourceType === Constants.Path.CollectionsPathSegment && operationType === Constants.OperationTypes.Query)
    ) {
      return true;
    }

    return false;
  }

  private getContainerName(request: SessionContext, headers: IHeaders) {
    let ownerFullName = headers[Constants.HttpHeaders.OwnerFullName];
    if (!ownerFullName) {
      ownerFullName = Helper.trimSlashes(request.resourceAddress);
    }

    return Helper.getContainerLink(ownerFullName as string);
  }
}
