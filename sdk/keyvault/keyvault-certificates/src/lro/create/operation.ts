// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike, AbortSignal } from "@azure/abort-controller";
import { operationOptionsToRequestOptionsBase, RequestOptionsBase } from "@azure/core-http";
import {
  KeyVaultCertificateWithPolicy,
  CreateCertificateOptions,
  CertificatePolicy,
  GetCertificateOptions,
  GetPlainCertificateOperationOptions,
  CancelCertificateOperationOptions
} from "../../certificatesModels";
import {
  CertificateOperation,
  CreateCertificateResponse,
  GetCertificateOperationResponse,
  GetCertificateResponse,
  UpdateCertificateOperationResponse
} from "../../generated/models";
import {
  KeyVaultCertificatePollOperation,
  KeyVaultCertificatePollOperationState
} from "../keyVaultCertificatePoller";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  getCertificateOperationFromCoreOperation,
  getCertificateWithPolicyFromCertificateBundle,
  toCoreAttributes,
  toCorePolicy
} from "../../transformations";
import { createSpan } from "../../../../keyvault-common";
import { setParentSpan } from "../../../../keyvault-common";

/**
 * The public representation of the CreateCertificatePoller operation state.
 */
export type CreateCertificateState = KeyVaultCertificatePollOperationState<
  KeyVaultCertificateWithPolicy
>;

/**
 * An interface representing the state of a create certificate's poll operation
 */
export interface CreateCertificatePollOperationState
  extends KeyVaultCertificatePollOperationState<KeyVaultCertificateWithPolicy> {
  /**
   * The policy of the certificate.
   */
  certificatePolicy?: CertificatePolicy;
  /**
   * Optional parameters sent to createCertificates
   */
  createCertificateOptions: CreateCertificateOptions;
  /**
   * The operation of the certificate
   */
  certificateOperation?: CertificateOperation;
}

/**
 * An interface representing a create certificate's poll operation
 */
export class CreateCertificatePollOperation extends KeyVaultCertificatePollOperation<
  CreateCertificatePollOperationState,
  KeyVaultCertificateWithPolicy
> {
  constructor(
    public state: CreateCertificatePollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state);
  }

  /**
   * Creates a new certificate. If this is the first version, the certificate resource is created. This operation requires the certificates/create permission.
   */
  private async createCertificate(
    certificateName: string,
    certificatePolicy: CertificatePolicy,
    options: CreateCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("generatedClient.createCertificate", requestOptions);

    const id = options.id;
    const certificateAttributes = toCoreAttributes(options);
    const corePolicy = toCorePolicy(id, certificatePolicy, certificateAttributes);

    const updatedOptions = {
      ...setParentSpan(span, requestOptions),
      certificatePolicy: corePolicy,
      certificateAttributes
    };

    let result: CreateCertificateResponse;

    try {
      result = await this.client.createCertificate(this.vaultUrl, certificateName, updatedOptions);
    } finally {
      span.end();
    }

    return getCertificateWithPolicyFromCertificateBundle(result);
  }

  /**
   * Gets the latest information available from a specific certificate, including the certificate's policy. This operation requires the certificates/get permission.
   */
  private async getCertificate(
    certificateName: string,
    options: GetCertificateOptions = {}
  ): Promise<KeyVaultCertificateWithPolicy> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("generatedClient.getCertificate", requestOptions);

    let result: GetCertificateResponse;

    try {
      result = await this.client.getCertificate(
        this.vaultUrl,
        certificateName,
        "",
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return getCertificateWithPolicyFromCertificateBundle(result);
  }

  /**
   * Gets the certificate operation.
   */
  private async getPlainCertificateOperation(
    certificateName: string,
    options?: GetPlainCertificateOperationOptions
  ): Promise<CertificateOperation> {
    const span = createSpan("generatedClient.getPlainCertificateOperation", options);

    let result: GetCertificateOperationResponse;

    try {
      result = await this.client.getCertificateOperation(
        this.vaultUrl,
        certificateName,
        setParentSpan(span, options)
      );
    } finally {
      span.end();
    }

    return getCertificateOperationFromCoreOperation(
      certificateName,
      this.vaultUrl,
      result._response.parsedBody
    );
  }

  /**
   * Cancels a certificate creation operation that is already in progress. This operation requires the certificates/update permission.
   */
  private async cancelCertificateOperation(
    certificateName: string,
    options: CancelCertificateOperationOptions = {}
  ): Promise<CertificateOperation> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("generatedClient.cancelCertificateOperation", requestOptions);

    let result: UpdateCertificateOperationResponse;
    try {
      result = await this.client.updateCertificateOperation(
        this.vaultUrl,
        certificateName,
        true,
        setParentSpan(span, requestOptions)
      );
    } finally {
      span.end();
    }

    return getCertificateOperationFromCoreOperation(
      certificateName,
      this.vaultUrl,
      result._response.parsedBody
    );
  }

  /**
   * Reaches to the service and updates the create certificate's poll operation.
   */
  async update(
    this: CreateCertificatePollOperation,
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: CreateCertificatePollOperationState) => void;
    } = {}
  ): Promise<CreateCertificatePollOperation> {
    const state = this.state;
    const { certificateName, certificatePolicy, createCertificateOptions } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
      createCertificateOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      state.isStarted = true;
      state.result = await this.createCertificate(
        certificateName,
        certificatePolicy!,
        createCertificateOptions
      );
      this.state.certificateOperation = await this.getPlainCertificateOperation(
        certificateName,
        this.requestOptions
      );
    } else if (!state.isCompleted) {
      this.state.certificateOperation = await this.getPlainCertificateOperation(
        certificateName,
        this.requestOptions
      );
    }

    if (state.certificateOperation && state.certificateOperation.status !== "inProgress") {
      state.isCompleted = true;
      state.result = await this.getCertificate(certificateName, this.requestOptions);
      if (state.certificateOperation.error) {
        state.error = new Error(state.certificateOperation.error.message);
      }
    }

    return this;
  }

  /**
   * Reaches to the service and cancels the certificate's operation, also updating the certificate's poll operation
   */
  async cancel(
    this: CreateCertificatePollOperation,
    options: { abortSignal?: AbortSignal } = {}
  ): Promise<CreateCertificatePollOperation> {
    const state = this.state;
    const { certificateName } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    state.certificateOperation = await this.cancelCertificateOperation(
      certificateName,
      this.requestOptions
    );

    this.state.isCancelled = true;
    return this;
  }
}
