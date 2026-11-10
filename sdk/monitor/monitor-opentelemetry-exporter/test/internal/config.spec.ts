// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";
import type {
  ApplicationInsightsClientOptionalParams,
  AzureMonitorExporterOptions,
} from "../../src/config.js";
import { describe, expectTypeOf, it } from "vitest";

describe("ApplicationInsightsClientOptionalParams", () => {
  it("preserves the legacy and REST client options contract", () => {
    type LegacyClientOptions = ClientOptions & {
      baseUri?: string;
      credentialScopes?: string | string[];
      requestContentType?: string;
      credential?: TokenCredential;
      host?: string;
      endpoint?: string;
    };

    expectTypeOf<ApplicationInsightsClientOptionalParams>().toEqualTypeOf<{
      [K in keyof LegacyClientOptions]: LegacyClientOptions[K];
    }>();
    expectTypeOf<AzureMonitorExporterOptions>().toExtend<ApplicationInsightsClientOptionalParams>();
  });
});
