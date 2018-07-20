// tslint:disable:no-bitwise
import * as BigInt from "big-integer";
import { Int64BE } from "int64-buffer";

/** @hidden */
export const EMPTY = "0"; // TODO: This is kinda hacky

/** @hidden */
export class ResourceId {
  public offer: string;
  public database: string;
  public documentCollection: string;
  public storedProcedure: string;
  public trigger: string;
  public userDefinedFunction: string;
  public document: string;
  public partitionKeyRange: string;
  public user: string;
  public conflict: string;
  public permission: string;
  public attachment: string;
  public length: number;
  public offerIdLength: number;
  public DocumentByte: number;
  public StoredProcedureByte: number;
  public TriggerByte: number;
  public UserDefinedFunctionByte: number;
  public ConflictByte: number;
  public PartitionKeyRangeByte: number;

  constructor() {
    this.offer = EMPTY;
    this.database = EMPTY;
    this.documentCollection = EMPTY;
    this.storedProcedure = EMPTY;
    this.trigger = EMPTY;
    this.userDefinedFunction = EMPTY;
    this.document = EMPTY;
    this.partitionKeyRange = EMPTY;
    this.user = EMPTY;
    this.conflict = EMPTY;
    this.permission = EMPTY;
    this.attachment = EMPTY;
    this.length = 20;
    this.offerIdLength = 3;
    this.DocumentByte = 0;
    this.StoredProcedureByte = 8;
    this.TriggerByte = 7;
    this.UserDefinedFunctionByte = 6;
    this.ConflictByte = 4;
    this.PartitionKeyRangeByte = 5;
  }

  public parse(id: string) {
    const pair = this.tryParse(id);

    if (!pair[0]) {
      throw new Error("invalid resource id " + id);
    }
    return pair[1];
  }

  public newDatabaseId(dbId: string) {
    const resourceId = new ResourceId();
    resourceId.database = dbId;
    return ResourceId;
  }

  public newDocumentCollectionId(databaseId: string, collectionId: string) {
    const dbId = this.parse(databaseId);

    const collectionResourceId = new ResourceId();
    collectionResourceId.database = dbId.database;
    collectionResourceId.documentCollection = collectionId;

    return collectionResourceId;
  }

  public newUserId(databaseId: string, userId: string) {
    const dbId = this.parse(databaseId);

    const userResourceId = new ResourceId();
    userResourceId.database = dbId.database;
    userResourceId.user = userId;

    return userResourceId;
  }

  public newPermissionId(userId: string, permissionId: string) {
    const usrId = this.parse(userId);

    const permissionResourceId = new ResourceId();
    permissionResourceId.database = usrId.database;
    permissionResourceId.user = usrId.user;
    permissionResourceId.permission = permissionId;
    return permissionResourceId;
  }

  public newAttachmentId(documentId: string, attachmentId: string) {
    const docId = this.parse(documentId);

    const attachmentResourceId = new ResourceId();
    attachmentResourceId.database = docId.database;
    attachmentResourceId.documentCollection = docId.documentCollection;
    attachmentResourceId.document = docId.document;
    attachmentResourceId.attachment = attachmentId;

    return attachmentResourceId;
  }

  public tryParse(id: string): [boolean, ResourceId] {
    let rid;
    if (!id) {
      return [false, undefined];
    }

    const pair = this.verify(id);

    if (!pair[0]) {
      return [false, undefined];
    }

    const buffer = pair[1];

    const intArray = new Int8Array(buffer);

    if (buffer.length % 4 !== 0 && buffer.length !== this.offerIdLength) {
      return [false, undefined];
    }

    rid = new ResourceId();

    // if length < 4 bytes, the resource is an offer
    if (buffer.length === this.offerIdLength) {
      let offer = 0;

      for (let index = 0; index < this.offerIdLength; index++) {
        offer = offer | (intArray[index] << (index * 8));
      }

      rid.offer = offer.toString();
      return [true, rid];
    }

    // first 4 bytes represent the database
    if (buffer.length >= 4) {
      rid.database = buffer.readIntBE(0, 4).toString();
    }

    if (buffer.length >= 8) {
      const isCollection = (intArray[4] & 128) > 0;

      if (isCollection) {
        // 5th - 8th bytes represents the collection

        rid.documentCollection = buffer.readIntBE(4, 4).toString();

        if (buffer.length >= 16) {
          // 9th - 15th bytes represent one of document, trigger, sproc, udf, conflict, pkrange
          const subCollectionResource = ResourceId.bigNumberReadIntBE(buffer, 8, 8).toString();

          if (intArray[15] >> 4 === this.DocumentByte) {
            rid.document = subCollectionResource;

            // 16th - 20th bytes represent the attachment
            if (buffer.length === 20) {
              rid.attachment = buffer.readIntBE(16, 4).toString();
            }
          } else if (Math.abs(intArray[15] >> 4) === this.StoredProcedureByte) {
            rid.storedProcedure = subCollectionResource;
          } else if (intArray[15] >> 4 === this.TriggerByte) {
            rid.trigger = subCollectionResource;
          } else if (intArray[15] >> 4 === this.UserDefinedFunctionByte) {
            rid.userDefinedFunction = subCollectionResource;
          } else if (intArray[15] >> 4 === this.ConflictByte) {
            rid.conflict = subCollectionResource;
          } else if (intArray[15] >> 4 === this.PartitionKeyRangeByte) {
            rid.partitionKeyRange = subCollectionResource;
          } else {
            return [false, rid];
          }
        } else if (buffer.length !== 8) {
          return [false, rid];
        }
      } else {
        // 5th - 8th bytes represents the user

        rid.user = buffer.readIntBE(4, 4).toString();

        // 9th - 15th bytes represent the permission
        if (buffer.length === 16) {
          rid.permission = ResourceId.bigNumberReadIntBE(buffer, 8, 8).toString();
        } else if (buffer.length !== 8) {
          return [false, rid];
        }
      }
    }

    return [true, rid];
  }

  public verify(id: string): [boolean, Buffer] {
    if (!id) {
      throw new Error("invalid resource id " + id);
    }

    let buffer = ResourceId.fromBase64String(id);
    if (!buffer || buffer.length > this.length) {
      buffer = undefined;
      return [false, buffer];
    }

    return [true, buffer];
  }

  public verifyBool(id: string) {
    return this.verify(id)[0];
  }

  public static fromBase64String(s: string) {
    return new Buffer(s.replace("-", "/"), "base64");
  }

  public static toBase64String(buffer: Buffer) {
    return buffer.toString("base64");
  }

  public isDatabaseId() {
    return this.database !== EMPTY && (this.documentCollection === EMPTY && this.user === EMPTY);
  }

  public getDatabaseId() {
    const rid = new ResourceId();
    rid.database = this.database;
    return rid;
  }

  public getDocumentCollectionId() {
    const rid = new ResourceId();
    rid.database = this.database;
    rid.documentCollection = this.documentCollection;
    return rid;
  }

  public getUniqueDocumentCollectionId() {
    const db = BigInt(this.database);
    const coll = BigInt(this.documentCollection);
    return db
      .shiftLeft(32)
      .or(coll)
      .toString();
  }

  public getStoredProcedureId() {
    const rid = new ResourceId();
    rid.database = this.database;
    rid.documentCollection = this.documentCollection;
    rid.storedProcedure = this.storedProcedure;
    return rid;
  }

  public getTriggerId() {
    const rid = new ResourceId();
    rid.database = this.database;
    rid.documentCollection = this.documentCollection;
    rid.trigger = this.trigger;
    return rid;
  }

  public getUserDefinedFunctionId() {
    const rid = new ResourceId();
    rid.database = this.database;
    rid.documentCollection = this.documentCollection;
    rid.userDefinedFunction = this.userDefinedFunction;
    return rid;
  }

  public getConflictId() {
    const rid = new ResourceId();
    rid.database = this.database;
    rid.documentCollection = this.documentCollection;
    rid.conflict = this.conflict;
    return rid;
  }

  public getDocumentId() {
    const rid = new ResourceId();
    rid.database = this.database;
    rid.documentCollection = this.documentCollection;
    rid.document = this.document;
    return rid;
  }

  public getPartitonKeyRangeId() {
    const rid = new ResourceId();
    rid.database = this.database;
    rid.documentCollection = this.documentCollection;
    rid.partitionKeyRange = this.partitionKeyRange;
    return rid;
  }

  public getUserId() {
    const rid = new ResourceId();
    rid.database = this.database;
    rid.user = this.user;
    return rid;
  }

  public getPermissionId() {
    const rid = new ResourceId();
    rid.database = this.database;
    rid.user = this.user;
    rid.permission = this.permission;
    return rid;
  }

  public getAttachmentId() {
    const rid = new ResourceId();
    rid.database = this.database;
    rid.documentCollection = this.documentCollection;
    rid.document = this.document;
    rid.attachment = this.attachment;
    return rid;
  }

  public getOfferId() {
    const rid = new ResourceId();
    rid.offer = this.offer;
    return rid;
  }

  public getValue() {
    let len = 0;
    if (this.offer !== EMPTY) {
      len = len + this.offerIdLength;
    } else if (this.database !== EMPTY) {
      len = len + 4;
    }
    if (this.documentCollection !== EMPTY || this.user !== EMPTY) {
      len = len + 4;
    }
    if (
      this.document !== EMPTY ||
      this.permission !== EMPTY ||
      this.storedProcedure !== EMPTY ||
      this.trigger !== EMPTY ||
      this.userDefinedFunction !== EMPTY ||
      this.conflict !== EMPTY ||
      this.partitionKeyRange !== EMPTY
    ) {
      len = len + 8;
    }
    if (this.attachment !== EMPTY) {
      len = len + 4;
    }

    const buffer = new Buffer(len);
    buffer.fill(0);

    if (this.offer !== EMPTY) {
      buffer.writeIntLE(Number(this.offer), 0, this.offerIdLength);
    } else if (this.database !== EMPTY) {
      buffer.writeIntBE(Number(this.database), 0, 4);
    }

    if (this.documentCollection !== EMPTY) {
      buffer.writeIntBE(Number(this.documentCollection), 4, 4);
    } else if (this.user !== EMPTY) {
      buffer.writeIntBE(Number(this.user), 4, 4);
    }

    let big: Int64BE;
    if (this.storedProcedure !== EMPTY) {
      big = new Int64BE(this.storedProcedure);
      big.toBuffer().copy(buffer, 8, 0, 8);
    } else if (this.trigger !== EMPTY) {
      big = new Int64BE(this.trigger);
      big.toBuffer().copy(buffer, 8, 0, 8);
    } else if (this.userDefinedFunction !== EMPTY) {
      big = new Int64BE(this.userDefinedFunction);
      big.toBuffer().copy(buffer, 8, 0, 8);
    } else if (this.conflict !== EMPTY) {
      big = new Int64BE(this.conflict);
      big.toBuffer().copy(buffer, 8, 0, 8);
    } else if (this.document !== EMPTY) {
      big = new Int64BE(this.document);
      big.toBuffer().copy(buffer, 8, 0, 8);
    } else if (this.permission !== EMPTY) {
      big = new Int64BE(this.permission);
      big.toBuffer().copy(buffer, 8, 0, 8);
    } else if (this.partitionKeyRange !== EMPTY) {
      big = new Int64BE(this.partitionKeyRange);
      big.toBuffer().copy(buffer, 8, 0, 8);
    }

    if (this.attachment !== EMPTY) {
      buffer.writeIntBE(Number(this.attachment), 16, 4);
    }

    return buffer;
  }

  public toString() {
    return ResourceId.toBase64String(this.getValue());
  }

  public static bigNumberReadIntBE(buffer: Buffer, offset: number, byteLength: number) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;

    let i = byteLength;
    let mul = BigInt("1");
    let val = BigInt(buffer[offset + --i]);
    while (i > 0 && mul) {
      const temp = BigInt(buffer[offset + --i]);
      mul = mul.times(0x100);
      val = val.plus(temp.times(mul));
    }
    mul = mul.times(0x80);

    if (val.greater(mul)) {
      const subtrahend = BigInt(2);
      val = val.minus(subtrahend.pow(8 * byteLength));
    }

    return val;
  }
}
