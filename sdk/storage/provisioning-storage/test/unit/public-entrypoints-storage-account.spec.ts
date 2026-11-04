// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Storage/storageAccounts
 * Primary schema key: Microsoft.Storage/storageAccounts
 * Also covers: Microsoft.Storage/storageAccounts/accountMigrations, Microsoft.Storage/storageAccounts/blobServices, Microsoft.Storage/storageAccounts/blobServices/containers, Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies, Microsoft.Storage/storageAccounts/connectors, Microsoft.Storage/storageAccounts/dataShares, Microsoft.Storage/storageAccounts/encryptionScopes, Microsoft.Storage/storageAccounts/fileServices, Microsoft.Storage/storageAccounts/fileServices/shares, Microsoft.Storage/storageAccounts/fileServices/usages, Microsoft.Storage/storageAccounts/inventoryPolicies, Microsoft.Storage/storageAccounts/localUsers, Microsoft.Storage/storageAccounts/managementPolicies, Microsoft.Storage/storageAccounts/networkSecurityPerimeterConfigurations, Microsoft.Storage/storageAccounts/objectReplicationPolicies, Microsoft.Storage/storageAccounts/privateEndpointConnections, Microsoft.Storage/storageAccounts/queueServices, Microsoft.Storage/storageAccounts/queueServices/queues, Microsoft.Storage/storageAccounts/storageTaskAssignments, Microsoft.Storage/storageAccounts/tableServices, Microsoft.Storage/storageAccounts/tableServices/tables
 * Scenario: public-entrypoints/public-entrypoints-storage-account
 * provisioning API: AccountMigration, BlobService, Connector, Container, DataShare, EncryptionScope, FileService, ImmutabilityPolicy, InventoryPolicy, LocalUser, ManagementPolicy, NetworkSecurityPerimeterConfiguration, ObjectReplicationPolicy, PrivateEndpointConnection, Queue, QueueService, Share, StorageAccount, StorageTaskAssignment, Table, TableService, Usage
 * Source: packages\services\storage\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-storage-account.test.baseline.bicep and public-entrypoints-storage-account.test.baseline.json
 * Gap/reduction: none
 */

import {
  AccountMigration,
  BlobService,
  Connector,
  Container,
  DataShare,
  EncryptionScope,
  FileService,
  ImmutabilityPolicy,
  InventoryPolicy,
  LocalUser,
  ManagementPolicy,
  NetworkSecurityPerimeterConfiguration,
  ObjectReplicationPolicy,
  PrivateEndpointConnection,
  Queue,
  QueueService,
  Share,
  StorageAccount,
  StorageTaskAssignment,
  Table,
  TableService,
  Usage,
} from "@azure/provisioning-storage";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../utils/index.js";

type BuildScenarioHelpers = {
  createResourceGroupStack: (name?: string) => import("@azure/provisioning-core").Stack;
  createSubscriptionStack: (name?: string) => import("@azure/provisioning-core").Stack;
  values: {
    subscriptionId: string;
    tenantId: string;
    objectId: string;
    principalId: string;
    clientId: string;
    resourceGroupName: string;
    location: string;
    secondaryLocation: string;
  };
};

const values = {
  subscriptionId: "00000000-0000-0000-0000-000000000000",
  tenantId: "11111111-1111-1111-1111-111111111111",
  objectId: "22222222-2222-2222-2222-222222222222",
  principalId: "33333333-3333-3333-3333-333333333333",
  clientId: "44444444-4444-4444-4444-444444444444",
  resourceGroupName: "rg-cdk-package-test",
  location: "eastus",
  secondaryLocation: "westus",
};

function buildScenarioStack({
  createResourceGroupStack,
  createSubscriptionStack,
  values,
}: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const storageAccount = new StorageAccount(stack, {
    name: "sttest01",
    location: "eastus",
    sku: {
      name: "Standard_LRS",
    },
    kind: "StorageV2",
  });
  new AccountMigration(storageAccount, { name: "default", existing: true });
  const blobService = new BlobService(storageAccount, {});
  const container = new Container(blobService, {
    name: "container1",
  });
  new ImmutabilityPolicy(container, {
    properties: {
      allowProtectedAppendWrites: false,
      immutabilityPeriodSinceCreationInDays: 4,
    },
  });
  new Connector(storageAccount, {
    name: "connector1",
    location: "eastus",
    properties: {
      description: "Example connector",
      dataSourceType: "Azure_DataShare",
      source: {
        authProperties: {
          type: "ManagedIdentity",
        },
        connection: {
          dataShareUri: "azds://eastus:demo-share:demo-source",
          type: "DataShare",
        },
        type: "DataShare",
      },
    },
  });
  new DataShare(storageAccount, {
    name: "datashare1",
    location: "eastus",
    properties: {
      description: "Dummy data share",
      accessPolicies: [
        {
          principalId: "00000000-0000-0000-0000-000000000000",
          tenantId: "00000000-0000-0000-0000-000000000000",
          permission: "Read",
        },
      ],
      assets: [
        {
          assetPath: "/container/folder/foo",
          displayName: "virtualFoo",
        },
      ],
    },
  });
  new EncryptionScope(storageAccount, {
    name: "encryptionscope1",
  });
  const fileService = new FileService(storageAccount, {});
  new Share(fileService, {
    name: "share1",
  });
  new Usage(fileService, {
    existing: true,
  });
  new InventoryPolicy(storageAccount, {
    name: "default",
    properties: {
      policy: {
        type: "Inventory",
        enabled: true,
        rules: [
          {
            name: "inventoryPolicyRule1",
            definition: {
              format: "Csv",
              objectType: "Blob",
              schedule: "Daily",
              schemaFields: ["Name", "Creation-Time"],
              filters: {
                blobTypes: ["blockBlob"],
              },
            },
            destination: "container1",
            enabled: true,
          },
        ],
      },
    },
  });
  new LocalUser(storageAccount, {
    name: "localuser1",
  });
  new ManagementPolicy(storageAccount, { name: "default" });
  new NetworkSecurityPerimeterConfiguration(storageAccount, {
    existing: true,
    name: "nspconfig1",
  });
  new ObjectReplicationPolicy(storageAccount, {
    name: "objectreplicationpolicy1",
  });
  new PrivateEndpointConnection(storageAccount, {
    name: "privateendpointconnection1",
  });
  const queueService = new QueueService(storageAccount, {});
  new Queue(queueService, {
    name: "queue1",
  });
  new StorageTaskAssignment(storageAccount, {
    name: "taskassignment1",
  });
  const tableService = new TableService(storageAccount, {});
  new Table(tableService, {
    name: "table1",
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-storage-account", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
