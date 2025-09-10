// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TimeoutFailoverRetryPolicy } from "../../../src/retry/timeoutFailoverRetryPolicy.js";
import { GlobalEndpointManager } from "../../../src/globalEndpointManager.js";
import { HTTPMethod, OperationType, ResourceType } from "../../../src/common/constants.js";
import { DatabaseAccount } from "../../../src/documents/DatabaseAccount.js";
import { ResourceResponse } from "../../../src/request/ResourceResponse.js";
import type { ErrorResponse } from "../../../src/request/ErrorResponse.js";
import type { RetryContext } from "../../../src/retry/RetryContext.js";
import { StatusCodes } from "../../../src/common/statusCodes.js";
import { TimeoutError } from "../../../src/request/TimeoutError.js";
import { getEmptyCosmosDiagnostics } from "../../../src/utils/diagnostics.js";
import { createDummyDiagnosticNode } from "../../public/common/TestHelpers.js";
import { describe, it, assert, beforeEach } from "vitest";
import { GlobalPartitionEndpointManager } from "../../../src/globalPartitionEndpointManager.js";

describe("TimeoutFailoverRetryPolicy", () => {
  const databaseAccountBody: any = {
    writableLocations: [
      {
        name: "West US 2",
        databaseAccountEndpoint: "https://test-westus2.documents.azure.com:443/",
      },
    ],
    readableLocations: [
      {
        name: "West US 2",
        databaseAccountEndpoint: "https://test-westus2.documents.azure.com:443/",
      },
      {
        name: "East US 2",
        databaseAccountEndpoint: "https://test-eastus2.documents.azure.com:443/",
      },
    ],
    DatabasesLink: "/dbs/",
    MediaLink: "/media/",
    ConsistencyPolicy: "Session",
  };
  const headers = {};

  const gem = new GlobalEndpointManager(
    {
      endpoint: "https://test.documents.azure.com:443/",
      key: "masterKey",
      connectionPolicy: {
        enableEndpointDiscovery: true,
        preferredLocations: ["East US 2", "West US 2"],
        useMultipleWriteLocations: true,
      },
    },
    async () => {
      const response: ResourceResponse<DatabaseAccount> = new ResourceResponse(
        new DatabaseAccount(databaseAccountBody, headers),
        headers,
        200,
        getEmptyCosmosDiagnostics(),
        undefined,
      );
      return response;
    },
  );

  const gpem = new GlobalPartitionEndpointManager(
    {
      connectionPolicy: {
        enableEndpointDiscovery: true,
        preferredLocations: ["East US 2", "West US 2"],
        useMultipleWriteLocations: true,
      },
    },
    gem,
  );

  let retryPolicy: TimeoutFailoverRetryPolicy;
  let retryCtx: RetryContext;
  let timeoutErr: TimeoutError;
  let locEndpoint: string;

  beforeEach(async () => {
    retryPolicy = new TimeoutFailoverRetryPolicy(
      gem,
      headers,
      HTTPMethod.get,
      ResourceType.item,
      OperationType.Read,
      true,
      false,
      gpem,
    );
    retryCtx = { retryCount: 2 };
    timeoutErr = new TimeoutError();
    locEndpoint = "endpoint";
  });

  it("should determine if retry should occur correctly", async () => {
    const err: ErrorResponse = timeoutErr;
    const retryContext: RetryContext | undefined = undefined;
    const locationEndpoint: string | undefined = undefined;

    // retryContext, locationEndpoint are undefined
    assert.equal(
      await retryPolicy.shouldRetry(
        err,
        createDummyDiagnosticNode(),
        retryContext,
        locationEndpoint,
      ),
      false,
    );
    //  retryContext is undefined
    assert.equal(
      await retryPolicy.shouldRetry(
        err,
        createDummyDiagnosticNode(),
        retryContext,
        "locationEndpoint",
      ),
      false,
    );
  });
  it("should not retry when timeout error but the request is not valid for timeout error", async () => {
    const retryPolicy_post = new TimeoutFailoverRetryPolicy(
      gem,
      headers,
      HTTPMethod.post,
      ResourceType.item,
      OperationType.Read,
      true,
      false,
      gpem,
    );
    assert.equal(
      await retryPolicy_post.shouldRetry(
        timeoutErr,
        createDummyDiagnosticNode(),
        retryCtx,
        "locationEndpoint",
      ),
      false,
    );
  });
  it("should not retry when Endpoint discovery is disabled", async () => {
    const retryPolicy_endpointDiscoveryDisabled = new TimeoutFailoverRetryPolicy(
      gem,
      headers,
      HTTPMethod.get,
      ResourceType.item,
      OperationType.Read,
      false,
      false,
      gpem,
    );
    assert.equal(
      await retryPolicy_endpointDiscoveryDisabled.shouldRetry(
        timeoutErr,
        createDummyDiagnosticNode(),
        retryCtx,
        "locationEndpoint",
      ),
      false,
    );
  });
  it("should not retry when maxServiceUnavailableRetryCount exceeded", async () => {
    const serviceUnavailableErr: ErrorResponse = {
      code: StatusCodes.ServiceUnavailable,
      name: "service unavailable",
      message: "error",
      diagnostics: getEmptyCosmosDiagnostics(),
    };

    //  valid case
    assert.equal(
      await retryPolicy.shouldRetry(
        serviceUnavailableErr,
        createDummyDiagnosticNode(),
        retryCtx,
        locEndpoint,
      ),
      true,
    );

    //  test maxServiceUnavailableRetryCount exceeded
    await retryPolicy.shouldRetry(
      serviceUnavailableErr,
      createDummyDiagnosticNode(),
      retryCtx,
      locEndpoint,
    );
    assert.equal(
      await retryPolicy.shouldRetry(
        serviceUnavailableErr,
        createDummyDiagnosticNode(),
        retryCtx,
        locEndpoint,
      ),
      false,
    );
  });
  it("should not retry when Maximum retry attempt count exceeded", async () => {
    const retryPolicy_maxRetryAttemptCount = new TimeoutFailoverRetryPolicy(
      gem,
      headers,
      HTTPMethod.get,
      ResourceType.item,
      OperationType.Read,
      true,
      false,
      gpem,
    );

    for (let i = 0; i < 120; i++) {
      assert.equal(
        await retryPolicy_maxRetryAttemptCount.shouldRetry(
          timeoutErr,
          createDummyDiagnosticNode(),
          retryCtx,
          locEndpoint,
        ),
        true,
      );
    }
    assert.equal(
      await retryPolicy_maxRetryAttemptCount.shouldRetry(
        timeoutErr,
        createDummyDiagnosticNode(),
        retryCtx,
        locEndpoint,
      ),
      false,
    );
  });
  it("should not retry when multiple write locations are not allowed", async () => {
    const gem_test = new GlobalEndpointManager(
      {
        endpoint: "https://test.documents.azure.com:443/",
        key: "masterKey",
        connectionPolicy: {
          enableEndpointDiscovery: true,
          preferredLocations: ["East US 2", "West US 2"],
          useMultipleWriteLocations: false,
        },
      },
      async () => {
        const response: ResourceResponse<DatabaseAccount> = new ResourceResponse(
          new DatabaseAccount(databaseAccountBody, headers),
          headers,
          200,
          getEmptyCosmosDiagnostics(),
          undefined,
        );
        return response;
      },
    );
    const retryPolicy_multipleWriteLocationsDisabled = new TimeoutFailoverRetryPolicy(
      gem_test,
      headers,
      HTTPMethod.get,
      ResourceType.item,
      OperationType.Create,
      true,
      false,
      gpem,
    );
    assert.equal(
      await retryPolicy_multipleWriteLocationsDisabled.shouldRetry(
        timeoutErr,
        createDummyDiagnosticNode(),
        retryCtx,
        locEndpoint,
      ),
      false,
    );
  });
  it("should retry when prefered locations are not defined and failover count exceeds the number of read", async () => {
    const gem_test2 = new GlobalEndpointManager(
      {
        endpoint: "https://test.documents.azure.com:443/",
        key: "masterKey",
        connectionPolicy: {
          enableEndpointDiscovery: true,
          useMultipleWriteLocations: false,
        },
      },
      async () => {
        const response: ResourceResponse<DatabaseAccount> = new ResourceResponse(
          new DatabaseAccount(databaseAccountBody, headers),
          headers,
          200,
          getEmptyCosmosDiagnostics(),
          undefined,
        );
        return response;
      },
    );
    const retryPolicy_preferedLocationsNotDefined = new TimeoutFailoverRetryPolicy(
      gem_test2,
      headers,
      HTTPMethod.get,
      ResourceType.item,
      OperationType.Read,
      true,
      false,
      gpem,
    );
    //  initialising redable locations
    await gem_test2.resolveServiceEndpoint(
      createDummyDiagnosticNode(),
      ResourceType.item,
      OperationType.Read,
    );
    for (let i = 0; i < 120; i++) {
      assert.equal(
        await retryPolicy_preferedLocationsNotDefined.shouldRetry(
          timeoutErr,
          createDummyDiagnosticNode(),
          retryCtx,
          locEndpoint,
        ),
        true,
      );
    }
    //  retry count breached as only 2 endpoints were available
    assert.equal(
      await retryPolicy_preferedLocationsNotDefined.shouldRetry(
        timeoutErr,
        createDummyDiagnosticNode(),
        retryCtx,
        locEndpoint,
      ),
      false,
    );
  });
});
