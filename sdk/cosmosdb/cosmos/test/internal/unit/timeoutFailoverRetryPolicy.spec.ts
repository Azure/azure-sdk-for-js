// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { TimeoutFailoverRetryPolicy } from "../../../src/retry/timeoutFailoverRetryPolicy";
import { GlobalEndpointManager } from "../../../src/globalEndpointManager";
import { HTTPMethod, OperationType, ResourceType } from "../../../src/common/constants";
import { DatabaseAccount } from "../../../src/documents/DatabaseAccount";
import { ResourceResponse } from "../../../src/request/ResourceResponse";
import { ErrorResponse } from "../../../src/request/ErrorResponse";
import { RetryContext } from "../../../src/retry/RetryContext";
import { StatusCodes } from "../../../src/common/statusCodes";
import { getEmptyCosmosDiagnostics } from "../../../src/CosmosDiagnostics";

describe("TimeoutFailoverRetryPolicy", function () {
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

  let gem = new GlobalEndpointManager(
    {
      endpoint: "https://test.documents.azure.com:443/",
      key: "masterKey",
      connectionPolicy: {
        enableEndpointDiscovery: true,
        preferredLocations: ["East US 2", "West US 2"],
      },
    },
    async () => {
      const response: ResourceResponse<DatabaseAccount> = new ResourceResponse(
        new DatabaseAccount(databaseAccountBody, headers),
        headers,
        200
      );
      return response;
    }
  );

  let retryPolicy: TimeoutFailoverRetryPolicy;

  beforeEach(async function () {
    retryPolicy = new TimeoutFailoverRetryPolicy(
      gem,
      headers,
      HTTPMethod.get,
      ResourceType.item,
      OperationType.Read,
      true
    );
  });

  it("should determine if retry should occur correctly", async function () {
    const err: ErrorResponse | undefined = undefined;
    const retryContext: RetryContext | undefined = undefined;
    const locationEndpoint: string | undefined = undefined;

    assert.equal(await retryPolicy.shouldRetry(err, retryContext, locationEndpoint), false);
    assert.equal(await retryPolicy.shouldRetry(null, retryContext, locationEndpoint), false);
    assert.equal(await retryPolicy.shouldRetry(err, retryContext, "locationEndpoint"), false);

    const serviceUnavailableErr: ErrorResponse = {
      statusCode: StatusCodes.ServiceUnavailable,
      name: "service unavailable",
      message: "error",
      diagnostics: getEmptyCosmosDiagnostics(),
    };
    const retryCtx: RetryContext = { retryCount: 2 };
    const locEndpoint: string = "endpoint";
    assert.equal(await retryPolicy.shouldRetry(serviceUnavailableErr, retryCtx, locEndpoint), true);

    //test maxServiceUnavailableRetryCount making value to 2
    await retryPolicy.shouldRetry(serviceUnavailableErr, retryCtx, locEndpoint);
    assert.equal(retryPolicy.shouldRetry(serviceUnavailableErr, retryCtx, locEndpoint), false);
  });
});
