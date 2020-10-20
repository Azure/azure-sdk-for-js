// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseServiceBusConnectionString } from "../../src/util/connectionStringUtils";
import chai from "chai";

const assert = chai.assert;

describe("Connection String", () => {
  const expectedNamespace = "my.servicebus.windows.net";
  const expectedEndpoint = `sb://${expectedNamespace}`;
  const expectedEntityPath = "my-entityPath";
  const expectedSharedAccessSignature = "my-shared-access-signature";
  const expectedSharedKey = "my-shared-key";
  const expectedSharedKeyName = "my-shared-key-name";
  const dummyErrorMsg = "You should not be seeing me";

  it("Extracts Service Bus properties with only Endpoint", () => {
    const connectionString = `Endpoint=${expectedEndpoint};`;
    const connectionStringProperties = parseServiceBusConnectionString(connectionString);
    assert.equal(connectionStringProperties.endpoint, expectedEndpoint);
    assert.equal(connectionStringProperties.fullyQualifiedNamespace, expectedNamespace);
  });

  it("Extracts Service Bus properties with Endpoint & EntityPath", () => {
    const connectionString = `Endpoint=${expectedEndpoint};EntityPath=${expectedEntityPath}`;
    const connectionStringProperties = parseServiceBusConnectionString(connectionString);
    assert.equal(connectionStringProperties.endpoint, expectedEndpoint);
    assert.equal(connectionStringProperties.fullyQualifiedNamespace, expectedNamespace);
    assert.equal(connectionStringProperties.entityPath, expectedEntityPath);
  });

  it("Extracts Service Bus properties with Endpoint & SAS", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessSignature=${expectedSharedAccessSignature}`;
    const connectionStringProperties = parseServiceBusConnectionString(connectionString);
    assert.equal(connectionStringProperties.endpoint, expectedEndpoint);
    assert.equal(connectionStringProperties.fullyQualifiedNamespace, expectedNamespace);
    assert.equal(connectionStringProperties.sharedAccessSignature, expectedSharedAccessSignature);
  });

  it("Extracts Service Bus properties with Endpoint & SharedKey", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessKey=${expectedSharedKey};SharedAccessKeyName=${expectedSharedKeyName}`;
    const connectionStringProperties = parseServiceBusConnectionString(connectionString);
    assert.equal(connectionStringProperties.endpoint, expectedEndpoint);
    assert.equal(connectionStringProperties.fullyQualifiedNamespace, expectedNamespace);
    assert.equal(connectionStringProperties.sharedAccessKey, expectedSharedKey);
    assert.equal(connectionStringProperties.sharedAccessKeyName, expectedSharedKeyName);
  });

  it("Throws when no Endpoint", () => {
    const connectionString = `EntityPath=${expectedEntityPath};SharedAccessSignature=${expectedSharedAccessSignature}`;
    try {
      parseServiceBusConnectionString(connectionString);
      throw new Error(dummyErrorMsg);
    } catch (error) {
      assert.notEqual(error.message, dummyErrorMsg);
    }
  });

  it("Throws when SharedKey with no SharedKeyName", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessKey=${expectedSharedKey}`;
    try {
      parseServiceBusConnectionString(connectionString);
      throw new Error(dummyErrorMsg);
    } catch (error) {
      assert.notEqual(error.message, dummyErrorMsg);
    }
  });

  it("Throws when SharedKeyName with no SharedKey", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessKeyName=${expectedSharedKeyName}`;
    try {
      parseServiceBusConnectionString(connectionString);
      throw new Error(dummyErrorMsg);
    } catch (error) {
      assert.notEqual(error.message, dummyErrorMsg);
    }
  });

  it("Throws when both SharedKey and SharedAccessSignature", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessKey=${expectedSharedKey};SharedAccessSignature=${expectedSharedAccessSignature}`;
    try {
      parseServiceBusConnectionString(connectionString);
      throw new Error(dummyErrorMsg);
    } catch (error) {
      assert.notEqual(error.message, dummyErrorMsg);
    }
  });

  it("Throws when both SharedKeyName and SharedAccessSignature", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessKeyName=${expectedSharedKeyName};SharedAccessSignature=${expectedSharedAccessSignature}`;
    try {
      parseServiceBusConnectionString(connectionString);
      throw new Error(dummyErrorMsg);
    } catch (error) {
      assert.notEqual(error.message, dummyErrorMsg);
    }
  });

  it("Throws when both SharedKey, SharedKeyName and SharedAccessSignature", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessKey=${expectedSharedKey};SharedAccessKeyName=${expectedSharedKeyName};SharedAccessSignature=${expectedSharedAccessSignature}`;
    try {
      parseServiceBusConnectionString(connectionString);
      throw new Error(dummyErrorMsg);
    } catch (error) {
      assert.notEqual(error.message, dummyErrorMsg);
    }
  });
});
