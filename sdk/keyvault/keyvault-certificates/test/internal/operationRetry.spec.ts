// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { MockInstance } from "vitest";
import { CertificateOperationPollOperation } from "../../src/lro/operation/operation.js";
import type { KeyVaultClient } from "../../src/generated/src/keyVaultClient.js";
import { RestError } from "@azure/core-rest-pipeline";
import type { CertificateOperation } from "../../src/index.js";

describe("Certificate Operation Retry Logic", () => {
  let mockClient: KeyVaultClient;
  let updateCertificateOperationSpy: MockInstance;

  beforeEach(() => {
    mockClient = {
      updateCertificateOperation: vi.fn(),
    } as unknown as KeyVaultClient;
    updateCertificateOperationSpy = vi.spyOn(mockClient, "updateCertificateOperation");
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should retry on 409 conflict error and succeed", async () => {
    const certificateName = "test-cert";
    const mockSuccessResponse: CertificateOperation = {
      id: `https://vault.azure.net/certificates/${certificateName}/pending`,
      issuerName: "Self",
      cancellationRequested: true,
      status: "inProgress",
    };

    // Mock first call to fail with 409, second call to succeed
    updateCertificateOperationSpy
      .mockRejectedValueOnce(new RestError("Conflict", { statusCode: 409 }))
      .mockResolvedValueOnce(mockSuccessResponse);

    const operation = new CertificateOperationPollOperation(
      {
        certificateName,
        isStarted: true,
        isCompleted: false,
        isCancelled: false,
      },
      mockClient,
    );

    const result = await operation.cancel();

    // Should have retried once (2 total calls)
    expect(updateCertificateOperationSpy).toHaveBeenCalledTimes(2);
    expect(updateCertificateOperationSpy).toHaveBeenCalledWith(
      certificateName,
      { cancellationRequested: true },
      expect.any(Object),
    );
    expect(result.state.isCancelled).toBe(true);
  });

  it("should not retry on non-409 errors", async () => {
    const certificateName = "test-cert";

    // Mock call to fail with 404
    updateCertificateOperationSpy.mockRejectedValueOnce(
      new RestError("Not Found", { statusCode: 404 }),
    );

    const operation = new CertificateOperationPollOperation(
      {
        certificateName,
        isStarted: true,
        isCompleted: false,
        isCancelled: false,
      },
      mockClient,
    );

    await expect(operation.cancel()).rejects.toThrow("Not Found");

    // Should not have retried (1 total call)
    expect(updateCertificateOperationSpy).toHaveBeenCalledTimes(1);
  });

  it("should fail after max retries on repeated 409 errors", async () => {
    const certificateName = "test-cert";

    // Mock all calls to fail with 409
    updateCertificateOperationSpy.mockRejectedValue(
      new RestError("Conflict", { statusCode: 409 }),
    );

    const operation = new CertificateOperationPollOperation(
      {
        certificateName,
        isStarted: true,
        isCompleted: false,
        isCancelled: false,
      },
      mockClient,
    );

    await expect(operation.cancel()).rejects.toThrow("Conflict");

    // Should have attempted 3 times (max retries)
    expect(updateCertificateOperationSpy).toHaveBeenCalledTimes(3);
  });
});