// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SasTokenPartitionKeyValueRange } from "./SasTokenPartitionKeyValueRange";
import { SasTokenPermissionKind } from "../../common/constants";
import { hmac } from "../../utils/hmac";
import { CosmosContainerChildResourceKind } from "../../common/constants";
import { CosmosKeyType } from "../../common/constants";
import { Constants } from "../../common/constants";
import { encodeUTF8, encodeBase64 } from "../../utils/encode";

export class SasToken {
  private AUTH_PREFIX: string = "type=sas&ver=1.0&sig=";

  private SAS_TOKEN_SEPARATOR: string = ";";

  public user: string;
  public userTag: string;
  public databaseName: string;
  public containerName: string;
  public resourceName: string;
  public resourcePath: string;
  public resourceKind: CosmosContainerChildResourceKind;
  public partitionKeyValueRanges: SasTokenPartitionKeyValueRange[];
  public startTime: Date = new Date();
  public expiryTime: Date = new Date();
  public keyType: number;
  public controlPlaneReaderScope: number;
  public controlPlaneWriterScope: number;
  public dataPlaneReaderScope: number;
  public dataPlaneWriterScope: number;
  public cosmosContainerChildResourceKind: CosmosContainerChildResourceKind;
  public cosmosKeyType = CosmosKeyType.PrimaryMaster;
  private partitionRanges: string;

  public constructor() {
    this.user = "";
    this.userTag = "";
    this.databaseName = "";
    this.containerName = "";
    this.resourceName = "";
    this.resourcePath = "";
    this.startTime.setDate(Date.now());
    this.expiryTime.setDate(Date.now());
    this.controlPlaneReaderScope = 0;
    this.controlPlaneWriterScope = 0;
    this.dataPlaneReaderScope = 0;
    this.dataPlaneWriterScope = 0;
    this.keyType = 0;
    this.cosmosContainerChildResourceKind = CosmosContainerChildResourceKind.Item;
    this.resourceKind = CosmosContainerChildResourceKind.Item;
    this.partitionKeyValueRanges = [];
    this.partitionRanges = "";
  }
  public create(user: string, databaseName: string, containerName: string) {
    const token = new SasToken();
    token.user = user;
    token.databaseName = databaseName;
    token.containerName = containerName;
    return token;
  }
  public sasTokenValueUsingHMAC(key: string): string;
  public sasTokenValueUsingHMAC(key: string, keyType?: CosmosKeyType) {
    if (key === "") {
      throw new Error("key");
    } else if (typeof keyType === "object") {
      switch (keyType) {
        case CosmosKeyType.PrimaryMaster:
          this.keyType = 1;
        case CosmosKeyType.SecondaryMaster:
          this.keyType = 2;
          break;
        case CosmosKeyType.PrimaryReadOnly:
          this.keyType = 3;
          break;
        case CosmosKeyType.SecondaryReadOnly:
          this.keyType = 4;
          break;
        default:
          throw new Error("keyType");
          break;
      }
      return this.SasTokenWithHMACSHA256(key);
    } else {
      throw new Error("key");
    }
  }

  private generatePayload(): string {
    let resourcePrefixPath: string = "";
    if (!(this.databaseName === "")) {
      resourcePrefixPath = `${resourcePrefixPath}${Constants.Path.Root}${Constants.Path.DatabasesPathSegment}/${this.databaseName}`;
    }

    if (!(this.containerName === "")) {
      if (this.databaseName === "") {
        throw new Error("databaseName");
      }
      resourcePrefixPath = `${resourcePrefixPath}${Constants.Path.Root}${Constants.Path.CollectionsPathSegment}${Constants.Path.Root}${this.containerName}`;
    }

    if (!(this.resourceName === "")) {
      if (this.containerName === "") {
        throw new Error("containerName");
      }

      switch (this.resourceKind) {
        case CosmosContainerChildResourceKind.Item:
          resourcePrefixPath = `${resourcePrefixPath}${Constants.Path.Root}${Constants.Path.DocumentsPathSegment}`;
          break;
        case CosmosContainerChildResourceKind.StoredProcedure:
          resourcePrefixPath = `${resourcePrefixPath}${Constants.Path.Root}${Constants.Path.StoredProceduresPathSegment}`;
          break;
        case CosmosContainerChildResourceKind.UserDefinedFunction:
          resourcePrefixPath = `${resourcePrefixPath}${Constants.Path.Root}${Constants.Path.UserDefinedFunctionsPathSegment}`;
          break;
        case CosmosContainerChildResourceKind.Trigger:
          resourcePrefixPath = `${resourcePrefixPath}${Constants.Path.Root}${Constants.Path.TriggersPathSegment}`;
          break;
        default:
          throw new Error("resourceKind");
          break;
      }

      resourcePrefixPath = `${resourcePrefixPath}${Constants.Path.Root}${this.resourceName}`;
    }

    resourcePrefixPath = `${resourcePrefixPath}${Constants.Path.Root}`;
    this.resourcePath = resourcePrefixPath.toString();

    if (!(this.partitionKeyValueRanges.length > 0)) {
      if (this.resourceKind !== CosmosContainerChildResourceKind.Item) {
        throw new Error("partitionKeyValueRanges");
      }

      for (const range of this.partitionKeyValueRanges) {
        this.partitionRanges = `${this.partitionRanges}${range.encode()},`;
      }
    }
    this.expiryTime = this.startTime;
    this.expiryTime.setSeconds(this.startTime.getHours() + 2);

    if (this.controlPlaneReaderScope === 0) {
      this.controlPlaneReaderScope =
        this.controlPlaneReaderScope | SasTokenPermissionKind.ContainerFullAccess;
      this.controlPlaneReaderScope =
        this.controlPlaneReaderScope | SasTokenPermissionKind.ContainerReadAny;
    }

    if (this.dataPlaneReaderScope === 0 && this.dataPlaneWriterScope === 0) {
      this.dataPlaneReaderScope =
        this.dataPlaneReaderScope | SasTokenPermissionKind.ContainerFullAccess;
    }

    const payload: string = `${this.user}
      ${this.userTag}
      ${resourcePrefixPath}
      ${this.partitionRanges}
      ${this.startTime.getSeconds()}
      ${this.expiryTime.getSeconds()}
      ${this.keyType}
      ${this.controlPlaneReaderScope}
      ${this.controlPlaneWriterScope}
      ${this.dataPlaneReaderScope}
      ${this.dataPlaneWriterScope}`;

    return encodeBase64(encodeUTF8(payload));
  }

  private SasTokenWithHMACSHA256(key: string): string {
    const authorizationToken = hmac(key, this.generatePayload());
    const payload = this.generatePayload();
    const token = `${this.AUTH_PREFIX}${authorizationToken}${this.SAS_TOKEN_SEPARATOR}${payload}`;
    return token.toString();
  }

  public addPartitionKeyValue(partitionKeyValue: string) {
    if (this.partitionKeyValueRanges.length) {
      this.partitionKeyValueRanges = [];
    }
    this.partitionKeyValueRanges.push(SasTokenPartitionKeyValueRange.create(partitionKeyValue));
    return this;
  }
}
