// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Suite } from "mocha";
import {
  addDignosticChild,
  getEmptyCosmosDiagnostics,
  withDiagnostics,
} from "../../../src/utils/diagnostics";
import { CosmosDbDiagnosticLevel } from "../../../src/diagnostics/CosmosDbDiagnosticLevel";
import {
  ClientConfigDiagnostic,
  ClientContext,
  ConsistencyLevel,
  Constants,
  CosmosClient,
  CosmosClientOptions,
  ErrorResponse,
  GlobalEndpointManager,
  ItemResponse,
  RequestOptions,
  Resource,
} from "../../../src";
import { expect } from "chai";
import { getCurrentTimestampInMs } from "../../../src/utils/time";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "../../../src/diagnostics/DiagnosticNodeInternal";
import { allowTracing } from "../../../src/diagnostics/diagnosticLevelComparator";
import {
  determineDiagnosticLevel,
  getDiagnosticLevelFromEnvironment,
  setDiagnosticLevel,
} from "../../../src/diagnostics";

describe("Diagnostic Unit Tests", function (this: Suite) {
  describe("Test withDiagnostics utility function", function () {
    const clientContext = createTestClientContext({}, undefined);

    it("Test wrapped function's returned type is returned properly", async function () {
      const testValue = "testValue";
      const testResponse = await withDiagnostics(async (node: DiagnosticNodeInternal) => {
        expect(node).to.exist; // eslint-disable-line no-unused-expressions
        return testValue;
      }, clientContext);
      expect(testResponse).to.eql(testValue);
    });
    it("Test CosmosDiagnostic getting injected for supported Response Types.", async function () {
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
        expect(node).to.exist; // eslint-disable-line no-unused-expressions
        return testValue;
      }, clientContext);
      expect(testResponse).to.eql(testValue);
      expect(testResponse.diagnostics).to.not.eq(emptyDiagnostics);
    });
  });

  describe("Test addDignosticChild utility function", async function () {
    it("Test in case of exception, exception Diagnostic Node is marked failed and exception is rethrown.", async function () {
      const diagnosticNode = new DiagnosticNodeInternal(
        CosmosDbDiagnosticLevel.debug,
        DiagnosticNodeType.CLIENT_REQUEST_NODE,
        null,
      );
      const childNodeType = DiagnosticNodeType.METADATA_REQUEST_NODE;
      // Ensure that addDignosticChild throws an exception by wrapping it in a function
      const wrapperFunction = async () => {
        await addDignosticChild(
          async (childNode) => {
            expect(childNode).to.exist; // eslint-disable-line no-unused-expressions
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
        expect(error.message).to.equal("Testing error handling in diagnostic child.");
      }
    });
    it("Test in case debug and debug-unsafe diagnostic level child diagnostic nodes are added.", async function () {
      const testValue = "testValue";
      // Ensure that addDignosticChild throws an exception by wrapping it in a function
      await Promise.all(
        [CosmosDbDiagnosticLevel.debug, CosmosDbDiagnosticLevel.debugUnsafe].map(
          async (diagnosticLevel) => {
            const diagnosticNode = new DiagnosticNodeInternal(
              diagnosticLevel,
              DiagnosticNodeType.CLIENT_REQUEST_NODE,
              null,
            );
            const childNodeType = DiagnosticNodeType.METADATA_REQUEST_NODE;
            const testResponse = await addDignosticChild(
              async (childNode) => {
                expect(childNode).to.exist; // eslint-disable-line no-unused-expressions
                return testValue;
              },
              diagnosticNode,
              childNodeType,
            );

            // Test the returned value matches.
            expect(testResponse).to.eql(testValue);
            // Test a child diagnostic Node is added.
            expect(diagnosticNode.children.length).to.equal(1);
            // Test a child diagnostic Node is for the correct type.
            expect(diagnosticNode.children[0].nodeType).to.equal(childNodeType);
          },
        ),
      );
    });
    it("Test in info diagnostic level child diagnostic nodes are not added.", async function () {
      const diagnosticNode = new DiagnosticNodeInternal(
        CosmosDbDiagnosticLevel.info,
        DiagnosticNodeType.CLIENT_REQUEST_NODE,
        null,
      );
      const childNodeType = DiagnosticNodeType.METADATA_REQUEST_NODE;
      // Ensure that addDignosticChild throws an exception by wrapping it in a function
      await addDignosticChild(
        async (childNode) => {
          expect(childNode).to.exist; // eslint-disable-line no-unused-expressions
        },
        diagnosticNode,
        childNodeType,
      );

      // Test a child diagnostic Node is added.
      expect(diagnosticNode.children.length).to.equal(0);
    });
  });

  describe("Test ClientConfigDiagnostic initialization", function () {
    let savedDiagnosticLevel: CosmosDbDiagnosticLevel | undefined;
    beforeEach(async function () {
      savedDiagnosticLevel = getDiagnosticLevelFromEnvironment();
    });
    afterEach(function () {
      setDiagnosticLevel(savedDiagnosticLevel);
    });
    it("Check for endpoint", async function () {
      setDiagnosticLevel(CosmosDbDiagnosticLevel.debug);
      const testEndpoint = "AccountEndpoint=https://localhost:8081/;AccountKey=key";
      const client = new CosmosClient(testEndpoint);
      const clientContext: ClientContext = (client as any).clientContext;
      const clientConfigDiagnostic: ClientConfigDiagnostic = clientContext.getClientConfig();

      expect(clientConfigDiagnostic.endpoint).to.eq("https://localhost:8081/");
      expect(clientContext.diagnosticLevel).to.eq(CosmosDbDiagnosticLevel.debug);
    });
    it("Check initilization of diagnostic level", async function () {
      const possibleDiagnosticLevels = [
        CosmosDbDiagnosticLevel.info,
        CosmosDbDiagnosticLevel.debug,
        CosmosDbDiagnosticLevel.debugUnsafe,
      ];

      // Check default diagnostic level
      expect(determineDiagnosticLevel(undefined, undefined)).to.eql(CosmosDbDiagnosticLevel.info);

      // Check value set from environment variable get's priority.
      possibleDiagnosticLevels.forEach((level) => {
        expect(determineDiagnosticLevel(CosmosDbDiagnosticLevel.info, level)).to.eql(level);
      });

      // Check value set using client options.
      possibleDiagnosticLevels.forEach((level) => {
        expect(determineDiagnosticLevel(level, undefined)).to.eql(level);
      });
    });
    it("Check setting of diagnostic level", async function () {
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

      expect((clientInfo as any).clientContext.diagnosticLevel).to.be.eql(
        CosmosDbDiagnosticLevel.info,
      );
      expect((clientDebug as any).clientContext.diagnosticLevel).to.be.eql(
        CosmosDbDiagnosticLevel.debug,
      );
      expect((clientDebugUnsafe as any).clientContext.diagnosticLevel).to.be.eql(
        CosmosDbDiagnosticLevel.debugUnsafe,
      );
    });
  });

  it("Test Ordering of Diagnostic Level", function () {
    const info = CosmosDbDiagnosticLevel.info;
    const debug = CosmosDbDiagnosticLevel.debug;
    const debugUnsafe = CosmosDbDiagnosticLevel.debugUnsafe;

    expect(allowTracing(info, info)).to.be.true; // eslint-disable-line no-unused-expressions
    expect(allowTracing(debug, info)).to.be.false; // eslint-disable-line no-unused-expressions
    expect(allowTracing(debugUnsafe, info)).to.be.false; // eslint-disable-line no-unused-expressions

    expect(allowTracing(info, debug)).to.be.true; // eslint-disable-line no-unused-expressions
    expect(allowTracing(debug, debug)).to.be.true; // eslint-disable-line no-unused-expressions
    expect(allowTracing(debugUnsafe, debug)).to.be.false; // eslint-disable-line no-unused-expressions

    expect(allowTracing(info, debugUnsafe)).to.be.true; // eslint-disable-line no-unused-expressions
    expect(allowTracing(debug, debugUnsafe)).to.be.true; // eslint-disable-line no-unused-expressions
    expect(allowTracing(debugUnsafe, debugUnsafe)).to.be.true; // eslint-disable-line no-unused-expressions
  });
});
function createTestClientContext(
  options: Partial<CosmosClientOptions>,
  diagnosticLevel: CosmosDbDiagnosticLevel,
) {
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
      expect(opts).to.exist; // eslint-disable-line no-unused-expressions
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
