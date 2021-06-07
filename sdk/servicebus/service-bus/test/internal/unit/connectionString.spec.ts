// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseServiceBusConnectionString } from "../../../src/util/connectionStringUtils";
import chai from "chai";

const assert = chai.assert;

describe("Connection String", () => {
  const expectedNamespace = "my.servicebus.windows.net";
  const expectedEndpoint = `sb://${expectedNamespace}`;
  const expectedEntityPath = "my-entityPath";
  const expectedSharedAccessSignature = "my-shared-access-signature";
  const expectedSharedKey = "my-shared-key";
  const expectedSharedKeyName = "my-shared-key-name";

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

  it("Extracts Service Bus properties with Endpoint & SharedKey", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessKey=${expectedSharedKey};SharedAccessKeyName=${expectedSharedKeyName}`;
    const connectionStringProperties = parseServiceBusConnectionString(connectionString);
    assert.equal(connectionStringProperties.endpoint, expectedEndpoint);
    assert.equal(connectionStringProperties.fullyQualifiedNamespace, expectedNamespace);
    assert.equal(connectionStringProperties.sharedAccessKey, expectedSharedKey);
    assert.equal(connectionStringProperties.sharedAccessKeyName, expectedSharedKeyName);
  });

  it("Extracts Service Bus properties when properties are out of order", () => {
    const connectionString = `SharedAccessKey=${expectedSharedKey};Endpoint=${expectedEndpoint};SharedAccessKeyName=${expectedSharedKeyName}`;
    const connectionStringProperties = parseServiceBusConnectionString(connectionString);
    assert.equal(connectionStringProperties.endpoint, expectedEndpoint);
    assert.equal(connectionStringProperties.fullyQualifiedNamespace, expectedNamespace);
    assert.equal(connectionStringProperties.sharedAccessKey, expectedSharedKey);
    assert.equal(connectionStringProperties.sharedAccessKeyName, expectedSharedKeyName);
  });

  it("Throws when no Endpoint", () => {
    const connectionString = `EntityPath=${expectedEntityPath};SharedAccessSignature=${expectedSharedAccessSignature}`;
    assert.throws(() => {
      parseServiceBusConnectionString(connectionString);
    }, /Connection string/);
  });

  it("Throws when SharedKey with no SharedKeyName", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessKey=${expectedSharedKey}`;
    assert.throws(() => {
      parseServiceBusConnectionString(connectionString);
    }, /Connection string/);
  });

  it("Throws when SharedKeyName with no SharedKey", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessKeyName=${expectedSharedKeyName}`;
    assert.throws(() => {
      parseServiceBusConnectionString(connectionString);
    }, /Connection string/);
  });

  it("Throws when both SharedKey and SharedAccessSignature", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessKey=${expectedSharedKey};SharedAccessSignature=${expectedSharedAccessSignature}`;
    assert.throws(() => {
      parseServiceBusConnectionString(connectionString);
    }, /Connection string/);
  });

  it("Throws when both SharedKeyName and SharedAccessSignature", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessKeyName=${expectedSharedKeyName};SharedAccessSignature=${expectedSharedAccessSignature}`;
    assert.throws(() => {
      parseServiceBusConnectionString(connectionString);
    }, /Connection string/);
  });

  it("Throws when both SharedKey, SharedKeyName and SharedAccessSignature", () => {
    const connectionString = `Endpoint=${expectedEndpoint};SharedAccessKey=${expectedSharedKey};SharedAccessKeyName=${expectedSharedKeyName};SharedAccessSignature=${expectedSharedAccessSignature}`;
    assert.throws(() => {
      parseServiceBusConnectionString(connectionString);
    }, /Connection string/);
  });
});
