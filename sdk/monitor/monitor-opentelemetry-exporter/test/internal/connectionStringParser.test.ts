// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import * as Constants from "../../src/Declarations/Constants";
import { ConnectionStringParser } from "../../src/utils/connectionStringParser";

describe("ConnectionStringParser", () => {
  describe("#parse()", () => {
    it("should parse all valid fields", () => {
      const authorization = "ikey";
      const instrumentationKey = "instr_key";
      const ingestionEndpoint = "ingest";
      const liveEndpoint = "live";
      const aadAudience = "audience";
      const connectionString = `Authorization=${authorization};InstrumentationKey=${instrumentationKey};IngestionEndpoint=${ingestionEndpoint};LiveEndpoint=${liveEndpoint};AadAudience=${aadAudience}`;

      const result = ConnectionStringParser.parse(connectionString);

      assert.strictEqual(result.authorization, authorization);
      assert.strictEqual(result.instrumentationkey, instrumentationKey);
      assert.strictEqual(result.ingestionendpoint, ingestionEndpoint);
      assert.strictEqual(result.liveendpoint, liveEndpoint);
      assert.strictEqual(result.aadaudience, aadAudience);
    });

    it("should sanitize URLs", () => {
      const instrumentationKey = "instr_key";
      const ingestionEndpoint = "http://test.com/ ";
      const liveEndpoint = "http://livetest.net    ";
      const connectionString = `InstrumentationKey=${instrumentationKey};IngestionEndpoint=${ingestionEndpoint};LiveEndpoint=${liveEndpoint}`;

      const result = ConnectionStringParser.parse(connectionString);
      assert.strictEqual(result.instrumentationkey, instrumentationKey);
      assert.strictEqual(result.ingestionendpoint, "https://test.com");
      assert.strictEqual(result.liveendpoint, "https://livetest.net");
    });

    it("should ignore invalid fields", () => {
      const authorization = "ikey";
      const instrumentationKey = "ikey";
      const ingestionEndpoint = "ingest";
      const liveEndpoint = "live";
      const connectionString = `Autho.rization=${authorization};Instrume.ntationKey=${instrumentationKey};Ingestion.Endpoint=${ingestionEndpoint};LiveEnd.point=${liveEndpoint}`;

      const result = ConnectionStringParser.parse(connectionString);

      assert.strictEqual(result.authorization, undefined);
      assert.strictEqual(result.instrumentationkey, undefined);
      assert.strictEqual(result.ingestionendpoint, Constants.DEFAULT_BREEZE_ENDPOINT);
      assert.strictEqual(result.liveendpoint, Constants.DEFAULT_LIVEMETRICS_ENDPOINT);
    });

    const runTest = (options: {
      connectionString: string;
      expectedAuthorization?: string;
      expectedInstrumentationKey?: string;
      expectedBreezeEndpoint: string;
      expectedLiveMetricsEndpoint: string;
    }) => {
      const result = ConnectionStringParser.parse(options.connectionString);

      if (options.expectedAuthorization) {
        assert.strictEqual(result.authorization, options.expectedAuthorization);
      }
      if (options.expectedInstrumentationKey) {
        assert.strictEqual(result.instrumentationkey, options.expectedInstrumentationKey);
      }
      assert.strictEqual(result.ingestionendpoint, options.expectedBreezeEndpoint);
      assert.strictEqual(result.liveendpoint, options.expectedLiveMetricsEndpoint);
    };

    it("should use correct default endpoints", () => {
      runTest({
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
        expectedAuthorization: undefined,
        expectedInstrumentationKey: "00000000-0000-0000-0000-000000000000",
        expectedBreezeEndpoint: Constants.DEFAULT_BREEZE_ENDPOINT,
        expectedLiveMetricsEndpoint: Constants.DEFAULT_LIVEMETRICS_ENDPOINT,
      });
    });

    it("should use correct endpoints when using EndpointSuffix", () => {
      runTest({
        connectionString:
          "InstrumentationKey=00000000-0000-0000-0000-000000000000;EndpointSuffix=ai.contoso.com",
        expectedBreezeEndpoint: "https://dc.ai.contoso.com",
        expectedLiveMetricsEndpoint: "https://live.ai.contoso.com",
      });
    });

    it("should use correct endpoints when using EndpointSuffix with explicit override", () => {
      runTest({
        connectionString:
          "InstrumentationKey=00000000-0000-0000-0000-000000000000;EndpointSuffix=ai.contoso.com;LiveEndpoint=https://custom.live.contoso.com:444",
        expectedBreezeEndpoint: "https://dc.ai.contoso.com",
        expectedLiveMetricsEndpoint: "https://custom.live.contoso.com:444",
      });
    });

    it("should parse EndpointSuffix + Location", () => {
      runTest({
        connectionString:
          "InstrumentationKey=00000000-0000-0000-0000-000000000000;EndpointSuffix=ai.contoso.com;Location=westus2",
        expectedBreezeEndpoint: "https://westus2.dc.ai.contoso.com",
        expectedLiveMetricsEndpoint: "https://westus2.live.ai.contoso.com",
      });
    });

    it("should parse EndpointSuffix + Location + Endpoint Override", () => {
      runTest({
        connectionString:
          "InstrumentationKey=00000000-0000-0000-0000-000000000000;EndpointSuffix=ai.contoso.com;Location=westus2;LiveEndpoint=https://custom.contoso.com:444",
        expectedBreezeEndpoint: "https://westus2.dc.ai.contoso.com",
        expectedLiveMetricsEndpoint: "https://custom.contoso.com:444",
      });
    });

    it("should parse Endpoint Override", () => {
      runTest({
        connectionString:
          "InstrumentationKey=00000000-0000-0000-0000-000000000000;LiveEndpoint=https://custom.live.endpoint.com:444",
        expectedBreezeEndpoint: Constants.DEFAULT_BREEZE_ENDPOINT,
        expectedLiveMetricsEndpoint: "https://custom.live.endpoint.com:444",
      });
    });
  });
});
