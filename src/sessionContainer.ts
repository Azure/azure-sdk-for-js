import * as BigInt from "big-integer";
import { Constants, EMPTY, Helper, ResourceId } from "./common";
import { IHeaders } from "./queryExecutionContext";

/** @hidden */
export class SessionContainer {
  constructor(
    private hostname?: string,
    private collectionNameToCollectionResourceId: {
      [collectionName: string]: string;
    } = {},
    // TODO: chrande made this public for a test
    public collectionResourceIdToSessionTokens: {
      [collectionResourceId: string]: { [SessionName: string]: string };
    } = {}
  ) {}

  public getHostName() {
    // TODO: move to getter
    return this.hostname;
  }

  public getPartitionKeyRangeIdToTokenMap(request: any) {
    // TODO: any
    return this.getPartitionKeyRangeIdToTokenMapPrivate(
      request["isNameBased"],
      request["resourceId"],
      request["resourceAddress"]
    );
  }

  public getPartitionKeyRangeIdToTokenMapPrivate(isNameBased: boolean, rId: string, resourceAddress: string) {
    let rangeIdToTokenMap = null;
    if (!isNameBased) {
      if (rId) {
        const resourceIdObject = new ResourceId();
        const resourceId = resourceIdObject.parse(rId);
        if (resourceId.documentCollection !== EMPTY) {
          rangeIdToTokenMap = this.collectionResourceIdToSessionTokens[resourceId.getUniqueDocumentCollectionId()];
        }
      }
    } else {
      resourceAddress = Helper.trimSlashes(resourceAddress);
      const collectionName = Helper.getContainerLink(resourceAddress);
      if (collectionName && collectionName in this.collectionNameToCollectionResourceId) {
        rangeIdToTokenMap = this.collectionResourceIdToSessionTokens[
          this.collectionNameToCollectionResourceId[collectionName]
        ];
      }
    }

    return rangeIdToTokenMap;
  }

  public resolveGlobalSessionToken(request: any) {
    // TODO: any request
    if (!request) {
      throw new Error("request cannot be null");
    }

    return this.resolveGlobalSessionTokenPrivate(
      request["isNameBased"],
      request["resourceId"],
      request["resourceAddress"]
    );
  }

  public resolveGlobalSessionTokenPrivate(isNameBased: boolean, rId: string, resourceAddress: string) {
    const rangeIdToTokenMap = this.getPartitionKeyRangeIdToTokenMapPrivate(isNameBased, rId, resourceAddress);
    if (rangeIdToTokenMap != null) {
      return this.getCombinedSessionToken(rangeIdToTokenMap);
    }

    return "";
  }

  public clearToken(request: any) {
    // TODO: any request
    let collectionResourceId;
    if (!request["isNameBased"]) {
      if (request["resourceId"]) {
        const resourceIdObject = new ResourceId();
        const resourceId = resourceIdObject.parse(request["resourceId"]);
        if (resourceId.documentCollection !== EMPTY) {
          collectionResourceId = resourceId.getUniqueDocumentCollectionId();
        }
      }
    } else {
      const resourceAddress = Helper.trimSlashes(request["resourceAddress"]);
      const collectionName = Helper.getContainerLink(resourceAddress);
      if (collectionName) {
        collectionResourceId = this.collectionNameToCollectionResourceId[collectionName];
        delete this.collectionNameToCollectionResourceId[collectionName];
      }
    }
    if (collectionResourceId !== undefined) {
      delete this.collectionResourceIdToSessionTokens[collectionResourceId];
    }
  }

  public setSessionToken(request: any, resHeaders: IHeaders) {
    // TODO: any request
    if (resHeaders && !this.isReadingFromMaster(request["resourceType"], request["opearationType"])) {
      const sessionToken = resHeaders[Constants.HttpHeaders.SessionToken];
      if (sessionToken) {
        let ownerFullName = resHeaders[Constants.HttpHeaders.OwnerFullName];
        if (!ownerFullName) {
          ownerFullName = Helper.trimSlashes(request["resourceAddress"]);
        }

        const collectionName = Helper.getContainerLink(ownerFullName as string);

        const ownerId = !request["isNameBased"]
          ? request["resourceId"]
          : resHeaders[Constants.HttpHeaders.OwnerId] || request["resourceId"];

        if (ownerId) {
          const resourceIdObject = new ResourceId();
          const resourceId = resourceIdObject.parse(ownerId);

          if (resourceId.documentCollection !== EMPTY && collectionName) {
            const uniqueDocumentCollectionId = resourceId.getUniqueDocumentCollectionId();
            this.setSesisonTokenPrivate(uniqueDocumentCollectionId, collectionName, sessionToken as string);
          }
        }
      }
    }
  }

  public setSesisonTokenPrivate(collectionRid: string, collectionName: string, sessionToken: string) {
    if (!(collectionRid in this.collectionResourceIdToSessionTokens)) {
      this.collectionResourceIdToSessionTokens[collectionRid] = {};
    }
    this.compareAndSetToken(sessionToken, this.collectionResourceIdToSessionTokens[collectionRid]);
    if (!(collectionName in this.collectionNameToCollectionResourceId)) {
      this.collectionNameToCollectionResourceId[collectionName] = collectionRid;
    }
  }

  public getCombinedSessionToken(tokens: { [key: string]: string }) {
    let result = "";
    if (tokens) {
      for (const index in tokens) {
        if (tokens.hasOwnProperty(index)) {
          result = result + index + ":" + tokens[index] + ",";
        }
      }
    }
    return result.slice(0, -1);
  }

  public compareAndSetToken(newToken: string, oldTokens: { [key: string]: string }) {
    if (newToken) {
      const newTokenParts = newToken.split(":");
      if (newTokenParts.length === 2) {
        const range = newTokenParts[0];
        const newLSN = BigInt(newTokenParts[1]);
        const success = false;

        const oldLSN = BigInt(oldTokens[range]);
        if (!oldLSN || oldLSN.lesser(newLSN)) {
          oldTokens[range] = newLSN.toString();
        }
      }
    }
  }

  public isReadingFromMaster(resourceType: string, operationType: string) {
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
}
