// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  addDiagnosticChild,
  getEmptyCosmosDiagnostics,
  withDiagnostics,
} from "$internal/utils/diagnostics.js";
import { CosmosDbDiagnosticLevel } from "@azure/cosmos";
import type {
  ClientConfigDiagnostic,
  CosmosClientOptions,
  RequestOptions,
  Resource,
} from "@azure/cosmos";
import {
  ClientContext,
  ConsistencyLevel,
  Constants,
  CosmosClient,
  ErrorResponse,
  GlobalEndpointManager,
  ItemResponse,
} from "@azure/cosmos";
import { getCurrentTimestampInMs } from "$internal/utils/time.js";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "@azure/cosmos";
import { allowTracing } from "$internal/diagnostics/diagnosticLevelComparator.js";
import {
  determineDiagnosticLevel,
  getDiagnosticLevelFromEnvironment,
  setDiagnosticLevel,
} from "$internal/diagnostics/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Diagnostic Unit Tests", () => {
  describe("Test withDiagnostics utility function", () => {
    const clientContext = createTestClientContext({}, undefined);

    it("Test wrapped function's returned type is returned properly", async () => {
      const testValue = "testValue";
      const testResponse = await withDiagnostics(async (node: DiagnosticNodeInternal) => {
        assert.isDefined(node);
        return testValue;
      }, clientContext);
      assert.equal(testResponse, testValue);
    });

    it("Test CosmosDiagnostic getting injected for supported Response Types.", async () => {
      const itemResource: Resource = {
        id: "item1",
        _rid: "item1`",
        _etag: "etag",
        _ts: getCurrentTimestampInMs(),
        _self: "",
      };
      const emptyDiagnostics = getEmptyCosmosDiagnostics();
      const testValue = new ItemResponse(itemResource, {}, 200, 0, {} as any, emptyDiagnostics);
      const testResponse = await withDiagnostics(async (node: DiagnosticNodeInternal) => {
        assert.isDefined(node);
        return testValue;
      }, clientContext);
      assert.equal(testResponse, testValue);
      assert.notEqual(testResponse.diagnostics, emptyDiagnostics);
    });
  });

  describe("Test addDiagnosticChild utility function", async function () {
    it("Test in case of exception, exception Diagnostic Node is marked failed and exception is rethrown.", async function () {
      const diagnosticNode = new DiagnosticNodeInternal(
        CosmosDbDiagnosticLevel.debug,
        DiagnosticNodeType.CLIENT_REQUEST_NODE,
        null,
      );
      const childNodeType = DiagnosticNodeType.METADATA_REQUEST_NODE;
      // Ensure that addDiagnosticChild throws an exception by wrapping it in a function
      const wrapperFunction = async () => {
        await addDiagnosticChild(
          async (childNode) => {
            assert.isDefined(childNode);
            throw new ErrorResponse("Testing error handling in diagnostic child.");
          },
          diagnosticNode,
          childNodeType,
        );
      };

      try {
        await wrapperFunction();
        // If the function does not throw an error, fail the test
        throw new Error("Expected an error, but none was thrown");
      } catch (error) {
        assert.equal(error.message, "Testing error handling in diagnostic child.");
      }
    });

    it("Test in case debug and debug-unsafe diagnostic level child diagnostic nodes are added.", async () => {
      const testValue = "testValue";
      // Ensure that addDiagnosticChild throws an exception by wrapping it in a function
      await Promise.all(
        [CosmosDbDiagnosticLevel.debug, CosmosDbDiagnosticLevel.debugUnsafe].map(
          async (diagnosticLevel) => {
            const diagnosticNode = new DiagnosticNodeInternal(
              diagnosticLevel,
              DiagnosticNodeType.CLIENT_REQUEST_NODE,
              null,
            );
            const childNodeType = DiagnosticNodeType.METADATA_REQUEST_NODE;
            const testResponse = await addDiagnosticChild(
              async (childNode) => {
                assert.isDefined(childNode);
                return testValue;
              },
              diagnosticNode,
              childNodeType,
            );

            // Test the returned value matches.
            assert.equal(testResponse, testValue);
            // Test a child diagnostic Node is added.
            assert.equal(diagnosticNode.children.length, 1);
            // Test a child diagnostic Node is for the correct type.
            assert.equal(diagnosticNode.children[0].nodeType, childNodeType);
          },
        ),
      );
    });
    it("Test in info diagnostic level child diagnostic nodes are not added.", async () => {
      const diagnosticNode = new DiagnosticNodeInternal(
        CosmosDbDiagnosticLevel.info,
        DiagnosticNodeType.CLIENT_REQUEST_NODE,
        null,
      );
      const childNodeType = DiagnosticNodeType.METADATA_REQUEST_NODE;
      // Ensure that addDiagnosticChild throws an exception by wrapping it in a function
      await addDiagnosticChild(
        async (childNode) => {
          assert.isDefined(childNode);
        },
        diagnosticNode,
        childNodeType,
      );

      // Test a child diagnostic Node is added.
      assert.equal(diagnosticNode.children.length, 0);
    });
  });

  describe("Test ClientConfigDiagnostic initialization", () => {
    let savedDiagnosticLevel: CosmosDbDiagnosticLevel | undefined;

    beforeEach(async () => {
      savedDiagnosticLevel = getDiagnosticLevelFromEnvironment();
    });

    afterEach(async () => {
      setDiagnosticLevel(savedDiagnosticLevel);
    });

    it("Check for endpoint", async () => {
      setDiagnosticLevel(CosmosDbDiagnosticLevel.debug);
      const testEndpoint = "AccountEndpoint=https://localhost:8081/;AccountKey=key";
      const client = new CosmosClient(testEndpoint);
      const clientContext: ClientContext = (client as any).clientContext;
      const clientConfigDiagnostic: ClientConfigDiagnostic = clientContext.getClientConfig();

      assert.equal(clientConfigDiagnostic.endpoint, "https://localhost:8081/");
      assert.equal(clientContext.diagnosticLevel, CosmosDbDiagnosticLevel.debug);
    });

    it("Check initialization of diagnostic level", async () => {
      const possibleDiagnosticLevels = [
        CosmosDbDiagnosticLevel.info,
        CosmosDbDiagnosticLevel.debug,
        CosmosDbDiagnosticLevel.debugUnsafe,
      ];

      // Check default diagnostic level
      assert.equal(determineDiagnosticLevel(undefined, undefined), CosmosDbDiagnosticLevel.info);

      // Check value set from environment variable get's priority.
      possibleDiagnosticLevels.forEach((level) => {
        assert.equal(determineDiagnosticLevel(CosmosDbDiagnosticLevel.info, level), level);
      });

      // Check value set using client options.
      possibleDiagnosticLevels.forEach((level) => {
        assert.equal(determineDiagnosticLevel(level, undefined), level);
      });
    });

    it("Check setting of diagnostic level", async () => {
      // Testing scope of diagnostic level is limited to an instance of CosmosDB client.
      const clientInfo = new CosmosClient({
        endpoint: "https://localhost",
        diagnosticLevel: CosmosDbDiagnosticLevel.info,
      });
      const clientDebug = new CosmosClient({
        endpoint: "https://localhost",
        diagnosticLevel: CosmosDbDiagnosticLevel.debug,
      });
      const clientDebugUnsafe = new CosmosClient({
        endpoint: "https://localhost",
        diagnosticLevel: CosmosDbDiagnosticLevel.debugUnsafe,
      });

      assert.equal((clientInfo as any).clientContext.diagnosticLevel, CosmosDbDiagnosticLevel.info);
      assert.equal(
        (clientDebug as any).clientContext.diagnosticLevel,
        CosmosDbDiagnosticLevel.debug,
      );
      assert.equal(
        (clientDebugUnsafe as any).clientContext.diagnosticLevel,
        CosmosDbDiagnosticLevel.debugUnsafe,
      );
    });
  });

  it("Test Ordering of Diagnostic Level", () => {
    const info = CosmosDbDiagnosticLevel.info;
    const debug = CosmosDbDiagnosticLevel.debug;
    const debugUnsafe = CosmosDbDiagnosticLevel.debugUnsafe;

    assert.isTrue(allowTracing(info, info));
    assert.isFalse(allowTracing(debug, info));
    assert.isFalse(allowTracing(debugUnsafe, info));

    assert.isTrue(allowTracing(info, debug));
    assert.isTrue(allowTracing(debug, debug));
    assert.isFalse(allowTracing(debugUnsafe, debug));

    assert.isTrue(allowTracing(info, debugUnsafe));
    assert.isTrue(allowTracing(debug, debugUnsafe));
    assert.isTrue(allowTracing(debugUnsafe, debugUnsafe));
  });
});

function createTestClientContext(
  options: Partial<CosmosClientOptions>,
  diagnosticLevel: CosmosDbDiagnosticLevel,
): ClientContext {
  const clientOps: CosmosClientOptions = {
    endpoint: "",
    connectionPolicy: {
      enableEndpointDiscovery: false,
      preferredLocations: ["https://localhhost"],
    },
    ...options,
  };
  const globalEndpointManager = new GlobalEndpointManager(
    clientOps,
    async (diagnosticNode: DiagnosticNodeInternal, opts: RequestOptions) => {
      assert.isDefined(opts);
      const dummyAccount: any = diagnosticNode;
      return dummyAccount;
    },
  );
  const clientConfig: ClientConfigDiagnostic = {
    endpoint: "",
    resourceTokensConfigured: true,
    tokenProviderConfigured: true,
    aadCredentialsConfigured: true,
    connectionPolicyConfigured: true,
    consistencyLevel: ConsistencyLevel.BoundedStaleness,
    defaultHeaders: {},
    agentConfigured: true,
    userAgentSuffix: "",
    pluginsConfigured: true,
    sDKVersion: Constants.SDKVersion,
    ...options,
  };
  const clientContext = new ClientContext(
    clientOps,
    globalEndpointManager,
    clientConfig,
    diagnosticLevel,
  );
  return clientContext;
}
