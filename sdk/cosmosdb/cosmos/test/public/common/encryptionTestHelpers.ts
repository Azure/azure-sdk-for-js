// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { randomUUID } from "@azure/core-util";
import {
  ClientEncryptionKeyResponse,
  Constants,
  Container,
  CosmosDiagnostics,
  Database,
  EncryptionAlgorithm,
  EncryptionKeyResolver,
  EncryptionKeyWrapMetadata,
  EncryptionQueryBuilder,
  ErrorResponse,
  ItemDefinition,
  ItemResponse,
  PatchOperation,
  QueryIterator,
  RequestOptions,
  SqlQuerySpec,
  StatusCode,
  StatusCodes,
} from "../../../src";
import { assert } from "chai";

export class MockKeyVaultEncryptionKeyResolver implements EncryptionKeyResolver {
  private keyInfo: { [key: string]: number } = {
    tempmetadata1: 1,
    tempmetadata2: 2,
    "revokedKek-metadata": 3,
    mymetadata1: 4,
    mymetadata2: 5,
    testmetadata1: 6,
    metadataupdatedmetadata: 7,
  };
  revokeAccessSet = false;
  wrapKeyCallsCount: { [key: string]: any };
  unwrapKeyCallsCount: { [key: string]: any };
  constructor() {
    this.revokeAccessSet = false;
    this.wrapKeyCallsCount = {};
    this.unwrapKeyCallsCount = {};
  }
  async unwrapKey(encryptionKeyId: string, algorithm: string, key: Buffer): Promise<Buffer> {
    algorithm;
    if (encryptionKeyId === "revokedKek-metadata" && this.revokeAccessSet) {
      const errorResponse = new ErrorResponse("Forbidden");
      errorResponse.statusCode = StatusCodes.Forbidden;
      throw errorResponse;
    }
    if (encryptionKeyId in this.unwrapKeyCallsCount) {
      this.unwrapKeyCallsCount[encryptionKeyId]++;
    } else {
      this.unwrapKeyCallsCount[encryptionKeyId] = 1;
    }
    const moveBy = this.keyInfo[encryptionKeyId];
    const plainKey = Buffer.alloc(key.length);
    for (let i = 0; i < key.length; i++) {
      plainKey[i] = key[i] - moveBy;
    }
    return plainKey;
  }

  async wrapKey(encryptionKeyId: string, algorithm: string, wrappedKey: Buffer): Promise<Buffer> {
    algorithm;
    if (encryptionKeyId in this.wrapKeyCallsCount) {
      this.wrapKeyCallsCount[encryptionKeyId]++;
    } else {
      this.wrapKeyCallsCount[encryptionKeyId] = 1;
    }
    const moveBy = this.keyInfo[encryptionKeyId];
    const encryptedKey = Buffer.alloc(wrappedKey.length);
    for (let i = 0; i < wrappedKey.length; i++) {
      encryptedKey[i] = wrappedKey[i] + moveBy;
    }
    return encryptedKey;
  }
}

export class TestDoc {
  id: string;
  PK: string;
  nonsensitive: string;
  nonsensitiveInt: number;
  sensitive_StringFormat: string;
  sensitive_DateFormat: Date;
  sensitive_DecimalFormat: number;
  sensitive_BoolFormat: boolean;
  sensitive_IntFormat: number;
  sensitive_LongFormat: number;
  sensitive_FloatFormat: number;
  sensitive_DoubleFormat: number;
  sensitive_IntArray: number[];
  sensitive_IntMultiDimArray: number[][];
  sensitive_ArrayFormat: SensitiveArrayData[];
  sensitive_ArrayMultiTypes: SensitiveArrayMultiType[][];
  sensitive_ObjectArrayType: any[];
  sensitive_NestedObjectFormatL1: SensitiveNestedObjectL1;

  constructor(other: any) {
    this.id = other.id;
    this.PK = other.PK;
    this.nonsensitive = other.nonsensitive;
    this.nonsensitiveInt = other.nonsensitiveInt;
    this.sensitive_StringFormat = other.sensitive_StringFormat;
    this.sensitive_DateFormat = other.sensitive_DateFormat;
    this.sensitive_DecimalFormat = other.sensitive_DecimalFormat;
    this.sensitive_IntFormat = other.sensitive_IntFormat;
    this.sensitive_LongFormat = other.sensitive_LongFormat;
    this.sensitive_BoolFormat = other.sensitive_BoolFormat;
    this.sensitive_FloatFormat = other.sensitive_FloatFormat;
    this.sensitive_DoubleFormat = other.sensitive_DoubleFormat;
    this.sensitive_ArrayFormat = other.sensitive_ArrayFormat;
    this.sensitive_IntArray = other.sensitive_IntArray;
    this.sensitive_ObjectArrayType = other.sensitive_ObjectArrayType;
    this.sensitive_NestedObjectFormatL1 = other.sensitive_NestedObjectFormatL1;
    this.sensitive_ArrayMultiTypes = other.sensitive_ArrayMultiTypes;
    this.sensitive_IntMultiDimArray = other.sensitive_IntMultiDimArray;
  }

  static create(partitionKey: string | null = null): TestDoc {
    return {
      id: randomUUID(),
      PK: partitionKey || randomUUID(),
      nonsensitive: randomUUID(),
      nonsensitiveInt: 10,
      sensitive_StringFormat: randomUUID(),
      sensitive_DateFormat: new Date(1987, 12, 25),
      sensitive_DecimalFormat: 472.3108,
      sensitive_IntArray: [999, 1000],
      sensitive_IntMultiDimArray: [
        [1, 2],
        [2, 3],
        [4, 5],
      ],
      sensitive_ObjectArrayType: [
        { sensitive_ArrayIntFormat: 18273, sensitive_ArrayDecimalFormat: 1234.11 },
        9823,
      ],
      sensitive_IntFormat: 1965,
      sensitive_LongFormat: Number.MAX_SAFE_INTEGER,
      sensitive_BoolFormat: true,
      sensitive_FloatFormat: 0.11983,
      sensitive_DoubleFormat: 1.1,
      sensitive_ArrayFormat: [
        { sensitive_ArrayIntFormat: 1111, sensitive_ArrayDecimalFormat: 1111.11 },
      ],
      sensitive_ArrayMultiTypes: [
        [
          {
            sensitive_NestedObjectFormatL0: {
              sensitive_IntFormatL0: 888,
              sensitive_DecimalFormatL0: 888.1,
            },
            sensitive_StringArrayMultiType: ["sensitivedata1a", "verysensitivedata1a", null],
            sensitive_ArrayMultiTypeDecimalFormat: 10.2,
            sensitive_IntArrayMultiType: [999, 1000],
          },
          {
            sensitive_NestedObjectFormatL0: {
              sensitive_IntFormatL0: 888,
              sensitive_DecimalFormatL0: 888.1,
            },
            sensitive_StringArrayMultiType: ["sensitivedata1b", "verysensitivedata1b"],
            sensitive_ArrayMultiTypeDecimalFormat: 12.2,
            sensitive_IntArrayMultiType: [888, 1010],
          },
        ],
        [
          {
            sensitive_NestedObjectFormatL0: {
              sensitive_IntFormatL0: 111,
              sensitive_DecimalFormatL0: 222.3,
            },
            sensitive_StringArrayMultiType: ["sensitivedata2a", "verysensitivedata2a"],
            sensitive_ArrayMultiTypeDecimalFormat: 9876.2,
            sensitive_IntArrayMultiType: [1, 2],
          },
          {
            sensitive_NestedObjectFormatL0: {
              sensitive_IntFormatL0: 878,
              sensitive_DecimalFormatL0: 188.1,
            },
            sensitive_StringArrayMultiType: ["sensitivedata2b", "verysensitivedata2b"],
            sensitive_ArrayMultiTypeDecimalFormat: 14.2,
            sensitive_IntArrayMultiType: [929, 1050],
          },
        ],
      ],
      sensitive_NestedObjectFormatL1: {
        sensitive_IntArrayL1: [999, 100],
        sensitive_IntFormatL1: 1999,
        sensitive_DecimalFormatL1: 1999.1,
        sensitive_ArrayFormatL1: [
          { sensitive_ArrayIntFormat: 1, sensitive_ArrayDecimalFormat: 2.1 },
          { sensitive_ArrayIntFormat: 2, sensitive_ArrayDecimalFormat: 3.1 },
        ],
        sensitive_NestedObjectFormatL2: {
          sensitive_StringFormatL2: "sensitiveData",
          sensitive_DecimalFormatL2: 2000.1,
          sensitive_ArrayFormatL2: [
            { sensitive_ArrayIntFormat: 2, sensitive_ArrayDecimalFormat: 3.1 },
          ],
          sensitive_NestedObjectFormatL3: {
            sensitive_IntFormatL3: 3000,
            sensitive_DecimalFormatL3: 3000.1,
            sensitive_ArrayFormatL3: [
              { sensitive_ArrayIntFormat: 3, sensitive_ArrayDecimalFormat: 4.1 },
            ],
            sensitive_ArrayWithObjectFormat: [
              {
                sensitive_ArrayIntFormat: 4,
                sensitive_ArrayDecimalFormat: 5.1,
                sensitive_NestedObjectFormatL0: {
                  sensitive_IntFormatL0: 888,
                  sensitive_DecimalFormatL0: 888.1,
                },
              },
            ],
          },
        },
      },
    };
  }
}

export class SensitiveArrayData {
  sensitive_ArrayIntFormat: number;
  sensitive_ArrayDecimalFormat: number;
}

export class SensitiveArrayMultiType {
  sensitive_NestedObjectFormatL0: SensitiveNestedObjectL0;
  sensitive_StringArrayMultiType: (string | null)[];
  sensitive_ArrayMultiTypeDecimalFormat: number;
  sensitive_IntArrayMultiType: number[];
}

export class SensitiveNestedObjectL0 {
  sensitive_IntFormatL0: number;
  sensitive_DecimalFormatL0: number;
}

export class SensitiveNestedObjectL1 {
  sensitive_NestedObjectFormatL2?: SensitiveNestedObjectL2;
  sensitive_IntFormatL1: number;
  sensitive_IntArrayL1: number[];
  sensitive_DecimalFormatL1: number;
  sensitive_ArrayFormatL1: SensitiveArrayData[];
}

export class SensitiveNestedObjectL2 {
  sensitive_StringFormatL2: string;
  sensitive_DecimalFormatL2: number;
  sensitive_ArrayFormatL2: SensitiveArrayData[];
  sensitive_NestedObjectFormatL3: SensitiveNestedObjectL3;
}

export class SensitiveNestedObjectL3 {
  sensitive_IntFormatL3: number;
  sensitive_ArrayFormatL3: SensitiveArrayData[];
  sensitive_DecimalFormatL3: number;
  sensitive_ArrayWithObjectFormat: SensitiveArrayDataWithObject[];
}

export class SensitiveArrayDataWithObject {
  sensitive_ArrayIntFormat: number;
  sensitive_ArrayDecimalFormat: number;
  sensitive_NestedObjectFormatL0: SensitiveNestedObjectL0;
}

export async function testCreateClientEncryptionKey(
  database: Database,
  cekId: string,
  encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata,
): Promise<ClientEncryptionKeyResponse> {
  const response = await database.createClientEncryptionKey(
    cekId,
    EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256,
    encryptionKeyWrapMetadata,
  );
  assert.equal(StatusCodes.Created, response.statusCode);
  assert.ok(response.requestCharge > 0);
  assert.isNotNull(response.etag);
  return response;
}

export async function testRewrapClientEncryptionKey(
  database: Database,
  cekId: string,
  encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata,
): Promise<ClientEncryptionKeyResponse> {
  const response = await database.rewrapClientEncryptionKey(cekId, encryptionKeyWrapMetadata);
  assert.equal(StatusCodes.Ok, response.statusCode);
  assert.ok(response.requestCharge > 0);
  assert.isNotNull(response.etag);
  return response;
}

export async function testCreateItem(
  container: Container,
  partitionKey: string = null,
): Promise<ItemResponse<ItemDefinition>> {
  const testDoc = TestDoc.create(partitionKey);
  const response = await container.items.create(testDoc);
  assert.equal(response.statusCode, StatusCodes.Created);
  verifyExpectedDocResponse(testDoc, response.resource);
  return response;
}

export async function testUpsertItem(
  container: Container,
  testDoc: any,
  expectedStatusCode: StatusCode,
): Promise<ItemResponse<ItemDefinition>> {
  const response = await container.items.upsert(testDoc);
  assert.equal(expectedStatusCode, response.statusCode);
  verifyExpectedDocResponse(testDoc, response.resource);
  return response;
}

export async function testPatchItem(
  container: Container,
  patchOperations: PatchOperation[],
  expectedTestDoc: any,
  expectedStatusCode: StatusCode,
): Promise<ItemResponse<ItemDefinition>> {
  const response = await container
    .item(expectedTestDoc.id, expectedTestDoc.PK)
    .patch(patchOperations);
  assert.equal(expectedStatusCode, response.statusCode);
  verifyExpectedDocResponse(expectedTestDoc, response.resource);
  return response;
}

export async function testDeleteItem(
  container: Container,
  testDoc: any,
): Promise<ItemResponse<ItemDefinition>> {
  const response = await container.item(testDoc.id, testDoc.PK).delete();
  assert.equal(StatusCodes.NoContent, response.statusCode);
  assert.isNull(response.resource);
  return response;
}

export function verifyExpectedDocResponse(expectedDoc: TestDoc, verifyDoc: any) {
  assert.equal(expectedDoc.id, verifyDoc.id);
  assert.equal(expectedDoc.sensitive_StringFormat, verifyDoc.sensitive_StringFormat);

  if (expectedDoc.sensitive_ArrayFormat != null) {
    assert.equal(
      expectedDoc.sensitive_ArrayFormat[0].sensitive_ArrayDecimalFormat,
      verifyDoc.sensitive_ArrayFormat[0].sensitive_ArrayDecimalFormat,
    );
    assert.equal(
      expectedDoc.sensitive_ArrayFormat[0].sensitive_ArrayIntFormat,
      verifyDoc.sensitive_ArrayFormat[0].sensitive_ArrayIntFormat,
    );
  } else {
    assert.equal(expectedDoc.sensitive_ArrayFormat, verifyDoc.sensitive_ArrayFormat);
  }

  if (expectedDoc.sensitive_IntArray != null) {
    for (let i = 0; i < expectedDoc.sensitive_IntArray.length; i++) {
      assert.equal(expectedDoc.sensitive_IntArray[i], verifyDoc.sensitive_IntArray[i]);
    }
  } else {
    assert.equal(expectedDoc.sensitive_IntArray, verifyDoc.sensitive_IntArray);
  }

  if (expectedDoc.sensitive_IntMultiDimArray != null) {
    for (let i = 0; i < expectedDoc.sensitive_IntMultiDimArray.length; i++) {
      for (let j = 0; j < expectedDoc.sensitive_IntMultiDimArray[i].length; j++) {
        assert.equal(
          expectedDoc.sensitive_IntMultiDimArray[i][j],
          verifyDoc.sensitive_IntMultiDimArray[i][j],
        );
      }
    }
  } else {
    assert.equal(expectedDoc.sensitive_IntMultiDimArray, verifyDoc.sensitive_IntMultiDimArray);
  }

  if (expectedDoc.sensitive_ObjectArrayType != null) {
    const expectedValue = expectedDoc.sensitive_ObjectArrayType[0];
    const test = verifyDoc.sensitive_ObjectArrayType[0];

    assert.equal(expectedValue.sensitive_ArrayDecimalFormat, test.sensitive_ArrayDecimalFormat);
    assert.equal(expectedValue.sensitive_ArrayIntFormat, test.sensitive_ArrayIntFormat);
    assert.equal(expectedDoc.sensitive_ObjectArrayType[1], verifyDoc.sensitive_ObjectArrayType[1]);
  } else {
    assert.equal(expectedDoc.sensitive_ObjectArrayType, verifyDoc.sensitive_ObjectArrayType);
  }

  if (expectedDoc.sensitive_ArrayMultiTypes != null) {
    for (let i = 0; i < expectedDoc.sensitive_ArrayMultiTypes.length; i++) {
      for (let j = 0; j < expectedDoc.sensitive_ArrayMultiTypes[i].length; j++) {
        const expectedItem = expectedDoc.sensitive_ArrayMultiTypes[i][j];
        const verifyItem = verifyDoc.sensitive_ArrayMultiTypes[i][j];
        assert.equal(
          expectedItem.sensitive_NestedObjectFormatL0.sensitive_DecimalFormatL0,
          verifyItem.sensitive_NestedObjectFormatL0.sensitive_DecimalFormatL0,
        );
        assert.equal(
          expectedItem.sensitive_NestedObjectFormatL0.sensitive_IntFormatL0,
          verifyItem.sensitive_NestedObjectFormatL0.sensitive_IntFormatL0,
        );
        assert.deepEqual(
          expectedItem.sensitive_StringArrayMultiType,
          verifyItem.sensitive_StringArrayMultiType,
        );
        assert.equal(
          expectedItem.sensitive_ArrayMultiTypeDecimalFormat,
          verifyItem.sensitive_ArrayMultiTypeDecimalFormat,
        );
        assert.deepEqual(
          expectedItem.sensitive_IntArrayMultiType,
          verifyItem.sensitive_IntArrayMultiType,
        );
      }
    }
  } else {
    assert.equal(expectedDoc.sensitive_ArrayMultiTypes, verifyDoc.sensitive_ArrayMultiTypes);
  }
  if (expectedDoc.sensitive_NestedObjectFormatL1 != null) {
    assert.equal(
      expectedDoc.sensitive_NestedObjectFormatL1.sensitive_IntFormatL1,
      verifyDoc.sensitive_NestedObjectFormatL1.sensitive_IntFormatL1,
    );

    if (expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2 != null) {
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_StringFormatL2,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_StringFormatL2,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_IntFormatL3,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_IntFormatL3,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_DecimalFormatL3,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_DecimalFormatL3,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayFormatL3[0].sensitive_ArrayIntFormat,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayFormatL3[0].sensitive_ArrayIntFormat,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayFormatL3[0].sensitive_ArrayDecimalFormat,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayFormatL3[0].sensitive_ArrayDecimalFormat,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_ArrayDecimalFormat,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_ArrayDecimalFormat,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_ArrayIntFormat,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_ArrayIntFormat,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_NestedObjectFormatL0.sensitive_IntFormatL0,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_NestedObjectFormatL0.sensitive_IntFormatL0,
      );
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_NestedObjectFormatL0.sensitive_DecimalFormatL0,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2
          .sensitive_NestedObjectFormatL3.sensitive_ArrayWithObjectFormat[0]
          .sensitive_NestedObjectFormatL0.sensitive_DecimalFormatL0,
      );
    } else {
      assert.equal(
        expectedDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2,
        verifyDoc.sensitive_NestedObjectFormatL1.sensitive_NestedObjectFormatL2,
      );
    }
  } else {
    assert.equal(
      expectedDoc.sensitive_NestedObjectFormatL1,
      verifyDoc.sensitive_NestedObjectFormatL1,
    );
  }
  // Todo: The type of date does not match, first one is object and other one is string since serializer used to encrypt date is stringSerializer. Convert it back to date and compare.
  // assert.equal(expectedDoc.sensitive_DateFormat, verifyDoc.sensitive_DateFormat);
  assert.equal(expectedDoc.sensitive_DecimalFormat, verifyDoc.sensitive_DecimalFormat);
  assert.equal(expectedDoc.sensitive_IntFormat, verifyDoc.sensitive_IntFormat);
  assert.equal(expectedDoc.sensitive_FloatFormat, verifyDoc.sensitive_FloatFormat);
  assert.equal(expectedDoc.sensitive_BoolFormat, verifyDoc.sensitive_BoolFormat);
  assert.equal(expectedDoc.nonsensitive, verifyDoc.nonsensitive);
  assert.equal(expectedDoc.nonsensitiveInt, verifyDoc.nonsensitiveInt);
}

export function compareMetadata(expected: any, actual: any): boolean {
  return (
    expected.type === actual.type &&
    expected.name === actual.name &&
    expected.value === actual.value &&
    expected.algorithm === actual.algorithm
  );
}

export async function verifyItemByRead(
  container: Container,
  testDoc: any,
  requestOptions?: RequestOptions,
): Promise<void> {
  const readResponse = await container.item(testDoc.id, testDoc.PK).read(requestOptions);
  assert.equal(StatusCodes.Ok, readResponse.statusCode);
  verifyExpectedDocResponse(testDoc, readResponse.resource);
}

export async function validateQueryResults(
  container: Container,
  query: EncryptionQueryBuilder | SqlQuerySpec,
  expectedDocList: TestDoc[],
  decryptOperation: boolean = true,
  expectedPropertiesDecryptedCount: number = 12,
  options?: RequestOptions,
): Promise<void> {
  let iterator: QueryIterator<any>;
  if (query instanceof EncryptionQueryBuilder) {
    iterator = await container.items.getEncryptionQueryIterator(query, options);
  } else {
    iterator = container.items.query(query, options);
  }
  let totalDocs = 0;
  const docs: TestDoc[] = [];
  while (iterator.hasMoreResults()) {
    const response = await iterator.fetchNext();
    totalDocs += response.resources.length;
    if (response.resources.length !== 0) {
      verifyDiagnostics(
        response.diagnostics,
        false,
        decryptOperation,
        undefined,
        expectedPropertiesDecryptedCount,
      );
    }
    for (let i = 0; i < response.resources.length; i++) {
      docs.push(response.resources[i]);
    }
  }
  if (expectedDocList != null) {
    assert.ok(totalDocs >= expectedDocList.length);
    for (const expectedDoc of expectedDocList) {
      const readDoc = docs.find((doc1) => doc1.id === expectedDoc.id);
      assert.isNotNull(expectedDoc);
      verifyExpectedDocResponse(expectedDoc, readDoc);
    }
  }
}
export async function testReplaceItem(
  container: Container,
  testDoc: any,
): Promise<ItemResponse<ItemDefinition>> {
  const response = await container.item(testDoc.id, testDoc.PK).replace(testDoc);
  assert.equal(StatusCodes.Ok, response.statusCode);
  verifyExpectedDocResponse(testDoc, response.resource);
  return response;
}

export function verifyDiagnostics(
  diagnostics: CosmosDiagnostics,
  encryptOperation: boolean = true,
  decryptOperation: boolean = true,
  expectedPropertiesEncryptedCount?: number,
  expectedPropertiesDecryptedCount?: number,
): void {
  assert.isNotNull(diagnostics);
  const encryptionDiagnostics = diagnostics.clientSideRequestStatistics.encryptionDiagnostics;
  assert.isNotNull(encryptionDiagnostics);
  if (encryptOperation) {
    const encryptContent = encryptionDiagnostics.encryptContent;
    assert.isNotNull(encryptContent);
    assert.isNotNull(encryptContent[Constants.Encryption.DiagnosticsStartTime]);
    // assert.ok(encryptContent[Constants.Encryption.DiagnosticsDuration] > 0);
    assert.equal(
      expectedPropertiesEncryptedCount,
      encryptContent[Constants.Encryption.DiagnosticsPropertiesEncryptedCount],
    );
  }
  if (decryptOperation) {
    const decryptContent = encryptionDiagnostics.decryptContent;
    assert.isNotNull(decryptContent);
    assert.isNotNull(decryptContent[Constants.Encryption.DiagnosticsStartTime]);
    // assert.ok(decryptContent[Constants.Encryption.DiagnosticsDuration] > 0);
    assert.equal(
      expectedPropertiesDecryptedCount,
      decryptContent[Constants.Encryption.DiagnosticsPropertiesDecryptedCount],
    );
  }
}
