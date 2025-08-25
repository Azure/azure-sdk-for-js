// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { parseServiceBusConnectionString } from "@azure/service-bus";
import { describe, it } from "vitest";
import { assert } from "../../public/utils/chai.js";

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

  it("Extracts Service Bus properties for 0:0:0:0:0:0:0:1 with port", () => {
    const connectionString = `Endpoint=sb://0:0:0:0:0:0:0:1:6765`;
    const connectionStringProperties = parseServiceBusConnectionString(connectionString);
    assert.equal(connectionStringProperties.endpoint, "sb://0:0:0:0:0:0:0:1:6765");
    assert.equal(connectionStringProperties.fullyQualifiedNamespace, "0:0:0:0:0:0:0:1");
  });

  it("Extracts Service Bus properties for 127.0.0.1 with port", () => {
    const connectionString = `Endpoint=sb://127.0.0.1:6765`;
    const connectionStringProperties = parseServiceBusConnectionString(connectionString);
    assert.equal(connectionStringProperties.endpoint, "sb://127.0.0.1:6765");
    assert.equal(connectionStringProperties.fullyQualifiedNamespace, "127.0.0.1");
  });

  it("Extracts Service Bus properties for ::1 with port", () => {
    const connectionString = `Endpoint=sb://::1:6765`;
    const connectionStringProperties = parseServiceBusConnectionString(connectionString);
    assert.equal(connectionStringProperties.endpoint, "sb://::1:6765");
    assert.equal(connectionStringProperties.fullyQualifiedNamespace, "::1");
  });

  it("Extracts Service Bus properties for localhost with port", () => {
    const connectionString = `Endpoint=sb://localhost:6765`;
    const connectionStringProperties = parseServiceBusConnectionString(connectionString);
    assert.equal(connectionStringProperties.endpoint, "sb://localhost:6765");
    assert.equal(connectionStringProperties.fullyQualifiedNamespace, "localhost");
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

  it("Extracts UseDevelopmentEmulator property", () => {
    const connectionString = "Endpoint=sb://192.168.y.z;UseDevelopmentEmulator=true;";
    const parsed = parseServiceBusConnectionString(connectionString);
    assert.equal(parsed.useDevelopmentEmulator, true);
  });

  it("sets UseDevelopmentEmulator default value", () => {
    const connectionString = `Endpoint=${expectedEndpoint};`;
    const parsed = parseServiceBusConnectionString(connectionString);
    assert.equal(parsed.useDevelopmentEmulator, false);
  });
});
