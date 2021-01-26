// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as Constants from "../../../src/Declarations/Constants";
import { ConnectionStringParser } from "../../../src/utils/connectionStringParser";

describe("ConnectionStringParser", () => {
  describe("#parse()", () => {
    it("should parse all valid fields", () => {
      const authorization = "ikey";
      const instrumentationKey = "instr_key";
      const ingestionEndpoint = "ingest";
      const liveEndpoint = "live";
      const connectionString = `Authorization=${authorization};InstrumentationKey=${instrumentationKey};IngestionEndpoint=${ingestionEndpoint};LiveEndpoint=${liveEndpoint}`;

      const result = ConnectionStringParser.parse(connectionString);

      assert.deepEqual(result.authorization, authorization);
      assert.deepEqual(result.instrumentationkey, instrumentationKey);
      assert.deepEqual(result.ingestionendpoint, ingestionEndpoint);
      assert.deepEqual(result.liveendpoint, liveEndpoint);
    });

    it("should ignore invalid fields", () => {
      const authorization = "ikey";
      const instrumentationKey = "ikey";
      const ingestionEndpoint = "ingest";
      const liveEndpoint = "live";
      const connectionString = `Autho.rization=${authorization};Instrume.ntationKey=${instrumentationKey};Ingestion.Endpoint=${ingestionEndpoint};LiveEnd.point=${liveEndpoint}`;

      const result = ConnectionStringParser.parse(connectionString);

      assert.deepEqual(result.authorization, undefined);
      assert.deepEqual(result.instrumentationkey, undefined);
      assert.deepEqual(result.ingestionendpoint, Constants.DEFAULT_BREEZE_ENDPOINT);
      assert.deepEqual(result.liveendpoint, Constants.DEFAULT_LIVEMETRICS_ENDPOINT);
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
        assert.deepEqual(result.authorization, options.expectedAuthorization);
      }
      if (options.expectedInstrumentationKey) {
        assert.deepEqual(result.instrumentationkey, options.expectedInstrumentationKey);
      }
      assert.deepEqual(result.ingestionendpoint, options.expectedBreezeEndpoint);
      assert.deepEqual(result.liveendpoint, options.expectedLiveMetricsEndpoint);
    };

    it("should use correct default endpoints", () => {
      runTest({
        connectionString: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
        expectedAuthorization: undefined,
        expectedInstrumentationKey: "00000000-0000-0000-0000-000000000000",
        expectedBreezeEndpoint: Constants.DEFAULT_BREEZE_ENDPOINT,
        expectedLiveMetricsEndpoint: Constants.DEFAULT_LIVEMETRICS_ENDPOINT
      });
    });

    it("should use correct endpoints when using EndpointSuffix", () => {
      runTest({
        connectionString:
          "InstrumentationKey=00000000-0000-0000-0000-000000000000;EndpointSuffix=ai.contoso.com",
        expectedBreezeEndpoint: "https://dc.ai.contoso.com",
        expectedLiveMetricsEndpoint: "https://live.ai.contoso.com"
      });
    });

    it("should use correct endpoints when using EndpointSuffix with explicit override", () => {
      runTest({
        connectionString:
          "InstrumentationKey=00000000-0000-0000-0000-000000000000;EndpointSuffix=ai.contoso.com;LiveEndpoint=https://custom.live.contoso.com:444",
        expectedBreezeEndpoint: "https://dc.ai.contoso.com",
        expectedLiveMetricsEndpoint: "https://custom.live.contoso.com:444"
      });
    });

    it("should parse EndpointSuffix + Location", () => {
      runTest({
        connectionString:
          "InstrumentationKey=00000000-0000-0000-0000-000000000000;EndpointSuffix=ai.contoso.com;Location=westus2",
        expectedBreezeEndpoint: "https://westus2.dc.ai.contoso.com",
        expectedLiveMetricsEndpoint: "https://westus2.live.ai.contoso.com"
      });
    });

    it("should parse EndpointSuffix + Location + Endpoint Override", () => {
      runTest({
        connectionString:
          "InstrumentationKey=00000000-0000-0000-0000-000000000000;EndpointSuffix=ai.contoso.com;Location=westus2;LiveEndpoint=https://custom.contoso.com:444",
        expectedBreezeEndpoint: "https://westus2.dc.ai.contoso.com",
        expectedLiveMetricsEndpoint: "https://custom.contoso.com:444"
      });
    });

    it("should parse Endpoint Override", () => {
      runTest({
        connectionString:
          "InstrumentationKey=00000000-0000-0000-0000-000000000000;LiveEndpoint=http://custom.live.endpoint.com:444",
        expectedBreezeEndpoint: Constants.DEFAULT_BREEZE_ENDPOINT,
        expectedLiveMetricsEndpoint: "http://custom.live.endpoint.com:444"
      });
    });
  });
});
