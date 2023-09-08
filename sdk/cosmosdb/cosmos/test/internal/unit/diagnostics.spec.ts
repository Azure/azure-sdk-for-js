// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

describe("Diagnostic Unit Tests", function (this: Suite) {
  describe("Test withDiagnostics utility function", function () {
    const clientOps: CosmosClientOptions = {
      endpoint: "",
      diagnosticLevel: CosmosDbDiagnosticLevel.debugUnsafe,
      connectionPolicy: {
        enableEndpointDiscovery: false,
        preferredLocations: ["https://localhhost"],
      },
    };
    const globalEndpointManager = new GlobalEndpointManager(
      clientOps,
      async (diagnosticNode: DiagnosticNodeInternal, opts: RequestOptions) => {
        expect(opts).to.exist; // eslint-disable-line no-unused-expressions
        const dummyAccount: any = diagnosticNode;
        return dummyAccount;
      }
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
      diagnosticLevel: CosmosDbDiagnosticLevel.info,
      pluginsConfigured: true,
      sDKVersion: Constants.SDKVersion,
    };
    const clientContext = new ClientContext(clientOps, globalEndpointManager, clientConfig);

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
        null
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
          childNodeType
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
              null
            );
            const childNodeType = DiagnosticNodeType.METADATA_REQUEST_NODE;
            const testResponse = await addDignosticChild(
              async (childNode) => {
                expect(childNode).to.exist; // eslint-disable-line no-unused-expressions
                return testValue;
              },
              diagnosticNode,
              childNodeType
            );

            // Test the returned value matches.
            expect(testResponse).to.eql(testValue);
            // Test a child diagnostic Node is added.
            expect(diagnosticNode.children.length).to.equal(1);
            // Test a child diagnostic Node is for the correct type.
            expect(diagnosticNode.children[0].nodeType).to.equal(childNodeType);
          }
        )
      );
    });
    it("Test in info diagnostic level child diagnostic nodes are not added.", async function () {
      const diagnosticNode = new DiagnosticNodeInternal(
        CosmosDbDiagnosticLevel.info,
        DiagnosticNodeType.CLIENT_REQUEST_NODE,
        null
      );
      const childNodeType = DiagnosticNodeType.METADATA_REQUEST_NODE;
      // Ensure that addDignosticChild throws an exception by wrapping it in a function
      await addDignosticChild(
        async (childNode) => {
          expect(childNode).to.exist; // eslint-disable-line no-unused-expressions
        },
        diagnosticNode,
        childNodeType
      );

      // Test a child diagnostic Node is added.
      expect(diagnosticNode.children.length).to.equal(0);
    });
  });

  describe("Test ClientConfigDiagnostic initialization", function () {
    it("Check for endpoint", async function () {
      const testEndpoint = "AccountEndpoint=https://localhost:8081/;AccountKey=key";
      const client = new CosmosClient({
        endpoint: testEndpoint, 
        diagnosticLevel: CosmosDbDiagnosticLevel.debug,
      });
      const clientContext: ClientContext = (client as any).clientContext;
      const clientConfigDiagnostic: ClientConfigDiagnostic = clientContext.getClientConfig();
      expect(clientConfigDiagnostic.endpoint).to.eq("https://localhost:8081/");
    });
  });

  it("Test Ordering of Diagnostic Level", function () {
    expect(allowTracing(CosmosDbDiagnosticLevel.info, CosmosDbDiagnosticLevel.info)).to.be.true; // eslint-disable-line no-unused-expressions
    expect(allowTracing(CosmosDbDiagnosticLevel.debug, CosmosDbDiagnosticLevel.info)).to.be.false; // eslint-disable-line no-unused-expressions
    expect(allowTracing(CosmosDbDiagnosticLevel.debugUnsafe, CosmosDbDiagnosticLevel.info)).to.be
      .false; // eslint-disable-line no-unused-expressions

    expect(allowTracing(CosmosDbDiagnosticLevel.info, CosmosDbDiagnosticLevel.debug)).to.be.true; // eslint-disable-line no-unused-expressions
    expect(allowTracing(CosmosDbDiagnosticLevel.debug, CosmosDbDiagnosticLevel.debug)).to.be.true; // eslint-disable-line no-unused-expressions
    expect(allowTracing(CosmosDbDiagnosticLevel.debugUnsafe, CosmosDbDiagnosticLevel.debug)).to.be
      .false; // eslint-disable-line no-unused-expressions

    expect(allowTracing(CosmosDbDiagnosticLevel.info, CosmosDbDiagnosticLevel.debugUnsafe)).to.be
      .true; // eslint-disable-line no-unused-expressions
    expect(allowTracing(CosmosDbDiagnosticLevel.debug, CosmosDbDiagnosticLevel.debugUnsafe)).to.be
      .true; // eslint-disable-line no-unused-expressions
    expect(allowTracing(CosmosDbDiagnosticLevel.debugUnsafe, CosmosDbDiagnosticLevel.debugUnsafe))
      .to.be.true; // eslint-disable-line no-unused-expressions
  });
});
