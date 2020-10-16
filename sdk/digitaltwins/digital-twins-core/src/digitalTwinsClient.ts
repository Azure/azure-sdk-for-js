// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import {
  TokenCredential,
  RestResponse,
  OperationOptions,
  RequestOptionsBase,
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  generateUuid,
  PipelineOptions
} from "@azure/core-http";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import { AzureDigitalTwinsAPI as GeneratedClient } from "./generated/azureDigitalTwinsAPI";
import {
  DigitalTwinsGetByIdOptionalParams,
  DigitalTwinsGetByIdResponse,
  DigitalTwinsAddOptionalParams,
  DigitalTwinsAddResponse,
  DigitalTwinsUpdateOptionalParams,
  DigitalTwinsUpdateResponse,
  DigitalTwinsDeleteOptionalParams,
  DigitalTwinsGetComponentOptionalParams,
  DigitalTwinsGetComponentResponse,
  DigitalTwinsUpdateComponentResponse,
  DigitalTwinsUpdateComponentOptionalParams,
  DigitalTwinsAddRelationshipResponse,
  DigitalTwinsAddRelationshipOptionalParams,
  DigitalTwinsUpdateRelationshipOptionalParams,
  DigitalTwinsUpdateRelationshipResponse,
  DigitalTwinsDeleteRelationshipOptionalParams,
  DigitalTwinsSendTelemetryOptionalParams,
  DigitalTwinsSendComponentTelemetryOptionalParams,
  DigitalTwinsListRelationshipsOptionalParams,
  DigitalTwinsListRelationshipsResponse,
  IncomingRelationship,
  DigitalTwinsListIncomingRelationshipsOptionalParams,
  DigitalTwinsListIncomingRelationshipsResponse,
  DigitalTwinsGetRelationshipByIdResponse,
  DigitalTwinsGetRelationshipByIdOptionalParams,
  DigitalTwinsModelData,
  DigitalTwinModelsGetByIdResponse,
  DigitalTwinModelsGetByIdOptionalParams,
  DigitalTwinModelsAddResponse,
  DigitalTwinModelsAddOptionalParams,
  DigitalTwinModelsListResponse,
  DigitalTwinModelsListOptionalParams,
  DigitalTwinModelsUpdateOptionalParams,
  DigitalTwinModelsDeleteOptionalParams,
  EventRoutesGetByIdOptionalParams,
  EventRoutesGetByIdResponse,
  EventRoute,
  EventRoutesAddOptionalParams,
  EventRoutesDeleteOptionalParams,
  EventRoutesListNextResponse,
  EventRoutesListOptionalParams,
  QueryQueryTwinsOptionalParams,
  QueryQueryTwinsResponse,
  QuerySpecification
} from "./generated/models";
import { getTracer } from "@azure/core-tracing";
import { CanonicalCode } from "@opentelemetry/api";
import { Span } from "@opentelemetry/api";
import { logger } from "./logger";

export const SDK_VERSION: string = "1.0.0-preview.1";

export interface DigitalTwinsClientOptions extends PipelineOptions {
  /**
   * Api Version
   */
  apiVersion?: string;
}

const DEFAULT_DIGITALTWINS_SCOPE = "https://digitaltwins.azure.net/.default";

/**
 * Client for Azure IoT DigitalTwins API.
 */
export class DigitalTwinsClient {
  /**
   * @internal
   * @ignore
   * A reference to the auto-generated AzureDigitalTwinsAPI
   */
  private readonly client: GeneratedClient;

  /**
   * Creates an instance of AzureDigitalTwinsAPI.
   *
   * Example usage:
   * ```ts
   * const { DigitalTwinsClient, ServiceClientCredentials } = require("@azure/digital-twins-core");
   *
   * const client = new DigitalTwinsClient(
   *   "<endpoint>",
   *   new DefaultAzureCredential();
   * );
   * ```
   * @param endpointUrl The endpoint URL of the service.
   * @param credential Used to authenticate requests to the service.
   * @param options Used to configure the service client.
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential,
    options: DigitalTwinsClientOptions = {}
  ) {
    const authPolicy = bearerTokenAuthenticationPolicy(credential, DEFAULT_DIGITALTWINS_SCOPE);
    const libInfo = `azsdk-js-digital-twins-core/${SDK_VERSION}`;

    const { apiVersion, ...pipelineOptions } = options;
    if (!pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions = {};
    }
    if (pipelineOptions.userAgentOptions.userAgentPrefix) {
      pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      pipelineOptions.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          allowedHeaderNames: ["x-ms-request-id"]
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new GeneratedClient({
      endpoint: endpointUrl,
      apiVersion,
      ...pipeline
    });
  }

  /**
   * Get a digital twin
   *
   * @param digitalTwinId The Id of the digital twin.
   * @param options The operation options
   * @returns The application/json digital twin and the http response.
   */
  public getDigitalTwin(
    digitalTwinId: string,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsGetByIdResponse> {
    const digitalTwinsGetByIdOptionalParams: DigitalTwinsGetByIdOptionalParams = options;
    const span = this.createSpan(
      "DigitalTwinsClient-getDigitalTwin",
      digitalTwinsGetByIdOptionalParams
    );
    try {
      return this.client.digitalTwins.getById(digitalTwinId, digitalTwinsGetByIdOptionalParams);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Create or update a digital twin
   *
   * @param digitalTwinId The Id of the digital twin to create or update.
   * @param digitalTwinJson The application/json digital twin to create.
   * @param enableUpdate If true then update of an existing digital twin is enabled.
   * @param options The operation options
   * @returns The created application/json digital twin and the http response.
   */
  public upsertDigitalTwin(
    digitalTwinId: string,
    digitalTwinJson: string,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsAddResponse> {
    const digitalTwinsAddOptionalParams: DigitalTwinsAddOptionalParams = options;
    const span = this.createSpan(
      "DigitalTwinsClient-upsertDigitalTwin",
      digitalTwinsAddOptionalParams
    );
    try {
      return this.client.digitalTwins.add(
        digitalTwinId,
        digitalTwinJson,
        digitalTwinsAddOptionalParams
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Update a digital twin using a json patch.
   *
   * @param digitalTwinId The Id of the digital twin.
   * @param jsonPatch An update specification described by JSON Patch. Updates to property values
   * and $model elements may happen in the same request. Operations are limited to add, replace and
   * remove.
   * @param etag Only perform the operation if the entity's etag matches one of the etags provided or * is
   * provided
   * @param options The operation options
   * @returns The http response.
   */
  public updateDigitalTwin(
    digitalTwinId: string,
    jsonPatch: any,
    etag: string = "*",
    options: OperationOptions = {}
  ): Promise<DigitalTwinsUpdateResponse> {
    var digitalTwinsUpdateOptionalParams: DigitalTwinsUpdateOptionalParams = options;
    digitalTwinsUpdateOptionalParams = {
      digitalTwinsUpdateOptions: {
        ifMatch: etag,
        ...options
      }
    };
    const span = this.createSpan(
      "DigitalTwinsClient-updateDigitalTwin",
      digitalTwinsUpdateOptionalParams
    );
    try {
      return this.client.digitalTwins.update(
        digitalTwinId,
        jsonPatch,
        digitalTwinsUpdateOptionalParams
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Delete a digital twin
   *
   * @param digitalTwinId The Id of the digital twin to delete.
   * @param etag Only perform the operation if the entity's etag matches one of the etags provided or * is
   * provided
   * @param options The operation options
   * @returns The http response.
   */
  public deleteDigitalTwin(
    digitalTwinId: string,
    etag: string = "*",
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    var digitalTwinsDeleteOptionalParams: DigitalTwinsDeleteOptionalParams = options;
    digitalTwinsDeleteOptionalParams = {
      digitalTwinsDeleteOptions: {
        ifMatch: etag,
        ...options
      }
    };
    const span = this.createSpan(
      "DigitalTwinsClient-deleteDigitalTwin",
      digitalTwinsDeleteOptionalParams
    );
    try {
      return this.client.digitalTwins.delete(digitalTwinId, digitalTwinsDeleteOptionalParams);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get a component on a digital twin.
   *
   * @param digitalTwinId The Id of the digital twin.
   * @param componentName The component being retrieved.
   * @param options The operation options
   * @returns Json string representation of the component corresponding to the provided componentName and the HTTP response.
   */
  public getComponent(
    digitalTwinId: string,
    componentName: string,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsGetComponentResponse> {
    const digitalTwinsGetComponentOptionalParams: DigitalTwinsGetComponentOptionalParams = options;
    const span = this.createSpan(
      "DigitalTwinsClient-getComponent",
      digitalTwinsGetComponentOptionalParams
    );
    try {
      return this.client.digitalTwins.getComponent(
        digitalTwinId,
        componentName,
        digitalTwinsGetComponentOptionalParams
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Update properties of a component on a digital twin using a JSON patch.
   *
   * @param digitalTwinId The Id of the digital twin.
   * @param componentName The component being updated.
   * @param jsonPatch The application/json-patch+json operations to be performed on the specified digital twin's component.
   * @param enableUpdate If true then update of an existing digital twin is enabled.
   * @param options The operation options
   * @param etag The etag of the component to update. Only perform the operation if the entity's etag matches one of the etags provided or * is provided.
   * @returns The http response.
   */
  public updateComponent(
    digitalTwinId: string,
    componentName: string,
    jsonPatch: any[],
    etag: string = "*",
    options: OperationOptions = {}
  ): Promise<DigitalTwinsUpdateComponentResponse> {
    var digitalTwinsUpdateComponentOptionalParams: DigitalTwinsUpdateComponentOptionalParams = options;
    digitalTwinsUpdateComponentOptionalParams = {
      digitalTwinsUpdateComponentOptions: {
        ifMatch: etag,
        ...options
      }
    };
    const span = this.createSpan(
      "DigitalTwinsClient-updateComponent",
      digitalTwinsUpdateComponentOptionalParams
    );
    try {
      return this.client.digitalTwins.updateComponent(
        digitalTwinId,
        componentName,
        jsonPatch,
        digitalTwinsUpdateComponentOptionalParams
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get a relationship on a digital twin.
   *
   * @param digitalTwinId The Id of the source digital twin.
   * @param relationshipId The Id of the relationship to retrieve.
   * @param options The operation options
   * @returns The pageable list of application/json relationships belonging to the specified digital twin and the http response.
   */
  public getRelationship(
    digitalTwinId: string,
    relationshipId: string,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsGetRelationshipByIdResponse> {
    const digitalTwinsGetRelationshipByIdOptionalParams: DigitalTwinsGetRelationshipByIdOptionalParams = options;
    const span = this.createSpan(
      "DigitalTwinsClient-getRelationship",
      digitalTwinsGetRelationshipByIdOptionalParams
    );
    try {
      return this.client.digitalTwins.getRelationshipById(
        digitalTwinId,
        relationshipId,
        digitalTwinsGetRelationshipByIdOptionalParams
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Create or update a relationship on a digital twin.
   *
   * @param digitalTwinId The Id of the source digital twin.
   * @param relationshipId The Id of the relationship to create.
   * @param relationship: The application/json relationship to be created.
   * @param options The operation options
   */
  public upsertRelationship(
    digitalTwinId: string,
    relationshipId: string,
    relationship: any,
    options: OperationOptions = {}
  ): Promise<DigitalTwinsAddRelationshipResponse> {
    const digitalTwinsAddRelationshipOptionalParams: DigitalTwinsAddRelationshipOptionalParams = options;
    const span = this.createSpan(
      "DigitalTwinsClient-upsertRelationship",
      digitalTwinsAddRelationshipOptionalParams
    );
    try {
      return this.client.digitalTwins.addRelationship(
        digitalTwinId,
        relationshipId,
        relationship,
        digitalTwinsAddRelationshipOptionalParams
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Updates the properties of a relationship on a digital twin using a JSON patch.
   *
   * @param digitalTwinId The Id of the digital twin to delete.
   * @param relationshipId The Id of the relationship to be updated.
   * @param jsonPatch The application/json-patch+json operations to be performed on the specified digital twin's relationship.
   * @param etag Only perform the operation if the entity's etag matches one of the etags provided or * is
   * @param options The operation options
   * provided
   */
  public updateRelationship(
    digitalTwinId: string,
    relationshipId: string,
    jsonPatch: any[],
    etag: string = "*",
    options: OperationOptions = {}
  ): Promise<DigitalTwinsUpdateRelationshipResponse> {
    var digitalTwinsUpdateRelationshipOptionalParams: DigitalTwinsUpdateRelationshipOptionalParams = options;
    digitalTwinsUpdateRelationshipOptionalParams = {
      digitalTwinsUpdateRelationshipOptions: {
        ifMatch: etag,
        ...options
      }
    };
    const span = this.createSpan(
      "DigitalTwinsClient-updateRelationship",
      digitalTwinsUpdateRelationshipOptionalParams
    );
    try {
      return this.client.digitalTwins.updateRelationship(
        digitalTwinId,
        relationshipId,
        jsonPatch,
        digitalTwinsUpdateRelationshipOptionalParams
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Delete a relationship on a digital twin.
   *
   * @param digitalTwinId The Id of the source digital twin.
   * @param relationshipId The Id of the relationship to delete.
   * @param etag Only perform the operation if the entity's etag matches one of the etags provided or * is
   * @param options The operation options
   * @returns The http response.
   */
  public deleteRelationship(
    digitalTwinId: string,
    relationshipId: string,
    etag: string = "*",
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    var digitalTwinsDeleteRelationshipOptionalParams: DigitalTwinsDeleteRelationshipOptionalParams = options;
    digitalTwinsDeleteRelationshipOptionalParams = {
      digitalTwinsDeleteRelationshipOptions: {
        ifMatch: etag,
        ...options
      }
    };
    const span = this.createSpan(
      "DigitalTwinsClient-deleteRelationship",
      digitalTwinsDeleteRelationshipOptionalParams
    );
    try {
      return this.client.digitalTwins.deleteRelationship(
        digitalTwinId,
        relationshipId,
        digitalTwinsDeleteRelationshipOptionalParams
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link listRelationships}.
   *
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {DigitalTwinsListRelationshipsOptionalParams} [options] Common options for the iterative endpoints.
   *
   */
  private async *listRelationshipsPage(
    digitalTwinId: string,
    options: OperationOptions,
    continuationState: PageSettings
  ): AsyncIterableIterator<DigitalTwinsListRelationshipsResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: OperationOptions = {
        ...options
      };
      const listRelationshipResponse = await this.client.digitalTwins.listRelationships(
        digitalTwinId,
        optionsComplete
      );
      continuationState.continuationToken = listRelationshipResponse.nextLink;
      yield listRelationshipResponse;
    }
    while (continuationState.continuationToken) {
      const listRelationshipResponse = await this.client.digitalTwins.listRelationshipsNext(
        "",
        continuationState.continuationToken,
        options
      );

      continuationState.continuationToken = listRelationshipResponse.nextLink;
      yield listRelationshipResponse;
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link listRelationships}.
   * @param {DigitalTwinsListRelationshipsOptionalParams} [options] Common options for the iterative endpoints.
   */
  private async *listRelationshipsAll(
    digitalTwinId: string,
    options: OperationOptions
  ): AsyncIterableIterator<any> {
    for await (const page of this.listRelationshipsPage(digitalTwinId, options, {})) {
      const value = page.value || [];
      for (const item of value) {
        yield item;
      }
    }
  }

  /**
   * Retrieve relationships for a digital twin.
   *
   * @param digitalTwinId The Id of the digital twin.
   */
  public listRelationships(
    digitalTwinId: string,
    options: OperationOptions & PageSettings = {}
  ): PagedAsyncIterableIterator<any, DigitalTwinsListRelationshipsResponse> {
    const digitalTwinsListRelationshipsOptionalParams: DigitalTwinsListRelationshipsOptionalParams = options;
    const span = this.createSpan(
      "DigitalTwinsClient-listRelationships",
      digitalTwinsListRelationshipsOptionalParams
    );
    try {
      const iter = this.listRelationshipsAll(
        digitalTwinId,
        digitalTwinsListRelationshipsOptionalParams
      );

      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: PageSettings = {}) =>
          this.listRelationshipsPage(
            digitalTwinId,
            digitalTwinsListRelationshipsOptionalParams,
            settings
          )
      };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link listIncomingRelationships}.
   *
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {OperationOptions} [options] Common options for the iterative endpoints.
   *
   */
  private async *listIncomingRelationshipsPage(
    digitalTwinId: string,
    options: OperationOptions,
    continuationState: PageSettings
  ): AsyncIterableIterator<DigitalTwinsListIncomingRelationshipsResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: OperationOptions = {
        ...options
      };
      const listIncomingRelationshipsResponse = await this.client.digitalTwins.listIncomingRelationships(
        digitalTwinId,
        optionsComplete
      );
      continuationState.continuationToken = listIncomingRelationshipsResponse.nextLink;
      yield listIncomingRelationshipsResponse;
    }
    while (continuationState.continuationToken) {
      const listIncomingRelationshipsResponse = await this.client.digitalTwins.listIncomingRelationshipsNext(
        "",
        continuationState.continuationToken,
        options
      );

      continuationState.continuationToken = listIncomingRelationshipsResponse.nextLink;
      yield listIncomingRelationshipsResponse;
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link listIncomingRelationships}.
   * @param {OperationOptions} [options] Common options for the iterative endpoints.
   */
  private async *listIncomingRelationshipsAll(
    digitalTwinId: string,
    options: OperationOptions
  ): AsyncIterableIterator<IncomingRelationship> {
    for await (const page of this.listIncomingRelationshipsPage(digitalTwinId, options, {})) {
      const value = page.value || [];
      yield* value;
    }
  }

  /**
   * Retrieve all incoming relationships for a digital twin.
   *
   * @param digitalTwinId The Id of the digital twin.
   */
  public listIncomingRelationships(
    digitalTwinId: string,
    options: OperationOptions = {}
  ): PagedAsyncIterableIterator<
    IncomingRelationship,
    DigitalTwinsListIncomingRelationshipsResponse
  > {
    const digitalTwinsListIncomingRelationshipsOptionalParams: DigitalTwinsListIncomingRelationshipsOptionalParams = options;
    const span = this.createSpan(
      "DigitalTwinsClient-listIncomingRelationships",
      digitalTwinsListIncomingRelationshipsOptionalParams
    );
    try {
      const iter = this.listIncomingRelationshipsAll(
        digitalTwinId,
        digitalTwinsListIncomingRelationshipsOptionalParams
      );

      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: PageSettings = {}) =>
          this.listIncomingRelationshipsPage(
            digitalTwinId,
            digitalTwinsListIncomingRelationshipsOptionalParams,
            settings
          )
      };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Publish telemetry from a digital twin, which is then consumed by one or many destination endpoints (subscribers) defined under.
   *
   * @param digitalTwinId The Id of the digital twin to delete.
   * @param payload The application/json telemetry payload to be sent.
   * @param messageId The message Id.
   * @param options The operation options
   * @returns The http response.
   */
  public publishTelemetry(
    digitalTwinId: string,
    payload: any,
    messageId: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const digitalTwinsSendTelemetryOptionalParams: DigitalTwinsSendTelemetryOptionalParams = options;
    digitalTwinsSendTelemetryOptionalParams.telemetrySourceTime = new Date().getTime().toString();
    if (!messageId) {
      messageId = generateUuid();
    }
    const span = this.createSpan(
      "DigitalTwinsClient-publishTelemetry",
      digitalTwinsSendTelemetryOptionalParams
    );
    try {
      return this.client.digitalTwins.sendTelemetry(
        digitalTwinId,
        payload,
        messageId,
        digitalTwinsSendTelemetryOptionalParams
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Publish telemetry from a digital twin's component, which is then consumed by one or many destination endpoints (subscribers) defined under.
   *
   * @param digitalTwinId The Id of the digital twin to delete.
   * @param componentName The name of the DTDL component.
   * @param payload The application/json telemetry payload to be sent.
   * @param messageId The message Id.
   * @param options The operation options
   * @returns The http response.
   */
  public publishComponentTelemetry(
    digitalTwinId: string,
    componentName: string,
    payload: string,
    messageId?: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const digitalTwinsSendComponentTelemetryOptionalParams: DigitalTwinsSendComponentTelemetryOptionalParams = options;
    digitalTwinsSendComponentTelemetryOptionalParams.telemetrySourceTime = new Date()
      .getTime()
      .toString();
    if (!messageId) {
      messageId = generateUuid();
    }
    const span = this.createSpan(
      "DigitalTwinsClient-publishComponentTelemetry",
      digitalTwinsSendComponentTelemetryOptionalParams
    );
    try {
      return this.client.digitalTwins.sendComponentTelemetry(
        digitalTwinId,
        componentName,
        payload,
        messageId,
        digitalTwinsSendComponentTelemetryOptionalParams
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get a model, including the model metadata and the model definition.
   *
   * @param modelId The Id of the model.
   * @param includeModelDefinition When true the model definition will be returned as part of the result. Default value: false.
   * @param options The operation options
   * @returns The application/json model and the http response.
   */
  public getModel(
    modelId: string,
    includeModelDefinition?: boolean,
    options: OperationOptions = {}
  ): Promise<DigitalTwinModelsGetByIdResponse> {
    const digitalTwinModelsGetByIdOptionalParams: DigitalTwinModelsGetByIdOptionalParams = options;
    digitalTwinModelsGetByIdOptionalParams.includeModelDefinition = includeModelDefinition;
    const span = this.createSpan(
      "DigitalTwinsClient-getModel",
      digitalTwinModelsGetByIdOptionalParams
    );
    try {
      return this.client.digitalTwinModels.getById(modelId, digitalTwinModelsGetByIdOptionalParams);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link list}.
   *
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {DigitalTwinModelsListOptionalParams} [options] Common options for the iterative endpoints.
   *
   */
  private async *getModelsPage(
    options: DigitalTwinModelsListOptionalParams,
    continuationState: PageSettings
  ): AsyncIterableIterator<DigitalTwinModelsListResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: DigitalTwinModelsListOptionalParams = {
        digitalTwinModelsListOptions: {
          maxItemsPerPage: continuationState.maxPageSize
        },
        ...options
      };
      const listResponse = await this.client.digitalTwinModels.list(optionsComplete);
      continuationState.continuationToken = listResponse.nextLink;
      yield listResponse;
    }
    while (continuationState.continuationToken) {
      const listResponse = await this.client.digitalTwinModels.listNext(
        continuationState.continuationToken,
        options
      );

      continuationState.continuationToken = listResponse.nextLink;
      yield listResponse;
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link list}.
   * @param {DigitalTwinModelsListOptionalParams} [options] Common options for the iterative endpoints.
   */
  private async *getModelsAll(
    options: DigitalTwinModelsListOptionalParams
  ): AsyncIterableIterator<DigitalTwinsModelData> {
    const f = {};

    for await (const page of this.getModelsPage(options, f)) {
      const value = page.value || [];
      for (const item of value) {
        yield item;
      }
    }
  }

  /**
   * Get the list of models
   *
   * @param dependeciesFor The model Ids to have dependencies retrieved. If omitted, all models are retrieved.
   * @param includeModelDefinition Whether to include the model definition in the result. If false, only the model metadata will be returned.
   * @param resultsPerPage The maximum number of items to retrieve per request. The server may choose to return less than the requested max.
   * @returns A pageable set of application/json models and the http response.
   */
  public listModels(
    dependeciesFor?: string[],
    includeModelDefinition: boolean = false,
    resultsPerPage?: number,
    options: OperationOptions = {}
  ): PagedAsyncIterableIterator<DigitalTwinsModelData, DigitalTwinModelsListResponse> {
    var digitalTwinModelsListOptionalParams: DigitalTwinModelsListOptionalParams = options;
    digitalTwinModelsListOptionalParams = {
      digitalTwinModelsListOptions: {
        maxItemsPerPage: resultsPerPage
      },
      dependenciesFor: dependeciesFor,
      includeModelDefinition: includeModelDefinition,
      ...options
    };
    const span = this.createSpan(
      "DigitalTwinsClient-listModels",
      digitalTwinModelsListOptionalParams
    );
    try {
      const iter = this.getModelsAll(digitalTwinModelsListOptionalParams);

      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: PageSettings = {}) =>
          this.getModelsPage(digitalTwinModelsListOptionalParams, settings)
      };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Create one or many
   *
   * @param models The set of models to create. Each string corresponds to exactly one model.
   * @param options The operation options
   * @returns The created application/json models and the http response.
   */
  public createModels(
    models: any[],
    options: OperationOptions = {}
  ): Promise<DigitalTwinModelsAddResponse> {
    const digitalTwinModelsAddOptionalParams: DigitalTwinModelsAddOptionalParams = options;
    digitalTwinModelsAddOptionalParams.models = models;
    const span = this.createSpan(
      "DigitalTwinsClient-createModels",
      digitalTwinModelsAddOptionalParams
    );
    try {
      return this.client.digitalTwinModels.add(digitalTwinModelsAddOptionalParams);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Decommission a model using a json patch.
   *
   * @param modelId The Id of the model to decommission.
   * property can be replaced.
   * @param options The operation options
   * @returns The http response.
   * @summary When a model is decomissioned, new digital twins will no longer be able to be
   * defined by this model. However, existing digital twins may continue to use this model.
   * Once a model is decomissioned, it may not be recommissioned.
   */
  public decomissionModel(modelId: string, options: OperationOptions = {}): Promise<RestResponse> {
    const jsonPatch = [{ op: "replace", path: "/decommissioned", value: true }];

    const digitalTwinModelsUpdateOptionalParams: DigitalTwinModelsUpdateOptionalParams = options;
    const span = this.createSpan(
      "DigitalTwinsClient-decomissionModel",
      digitalTwinModelsUpdateOptionalParams
    );
    try {
      return this.client.digitalTwinModels.update(
        modelId,
        jsonPatch,
        digitalTwinModelsUpdateOptionalParams
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Delete a model.
   *
   * @param modelId The Id of the model to delete.
   * @param etag Only perform the operation if the entity's etag matches one of the etags provided or * is
   * provided
   * @param options The operation options
   * @returns The http response.
   */
  public deleteModel(modelId: string, options: OperationOptions = {}): Promise<RestResponse> {
    const digitalTwinModelsDeleteOptionalParams: DigitalTwinModelsDeleteOptionalParams = options;
    const span = this.createSpan(
      "DigitalTwinsClient-deleteModel",
      digitalTwinModelsDeleteOptionalParams
    );
    try {
      return this.client.digitalTwinModels.delete(modelId, digitalTwinModelsDeleteOptionalParams);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get an event route.
   *
   * @param modelId The Id of the event route.
   * @param options The operation options
   * @returns The application/json event route and the http response.
   */
  public getEventRoute(
    eventRouteId: string,
    options: OperationOptions = {}
  ): Promise<EventRoutesGetByIdResponse> {
    const eventRoutesGetByIdOptionalParams: EventRoutesGetByIdOptionalParams = options;
    const span = this.createSpan(
      "DigitalTwinsClient-getEventRoute",
      eventRoutesGetByIdOptionalParams
    );
    try {
      return this.client.eventRoutes.getById(eventRouteId, eventRoutesGetByIdOptionalParams);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link list}.
   *
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {EventRoutesListOptionalParams} [options] Common options for the iterative endpoints.
   *
   */
  private async *getEventRoutesPage(
    options: EventRoutesListOptionalParams,
    continuationState: PageSettings
  ): AsyncIterableIterator<EventRoutesListNextResponse> {
    if (continuationState.continuationToken == null) {
      const optionsComplete: EventRoutesListOptionalParams = {
        eventRoutesListOptions: {
          maxItemsPerPage: continuationState.maxPageSize
        },
        ...options
      };
      const listResponse = await this.client.eventRoutes.list(optionsComplete);
      continuationState.continuationToken = listResponse.nextLink;
      yield listResponse;
    }
    while (continuationState.continuationToken) {
      const listResponse = await this.client.eventRoutes.listNext(
        continuationState.continuationToken,
        options
      );

      continuationState.continuationToken = listResponse.nextLink;
      yield listResponse;
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link list}.
   * @param {EventRoutesListOptionalParams} [options] Common options for the iterative endpoints.
   */
  private async *getEventRoutesAll(
    options: EventRoutesListOptionalParams
  ): AsyncIterableIterator<EventRoute> {
    const f = {};
    for await (const page of this.getEventRoutesPage(options, f)) {
      const value = page.value || [];
      for (const item of value) {
        yield item;
      }
    }
  }

  /**
   * List the event routes in a digital twins instance.
   *
   * @param resultsPerPage The maximum number of items to retrieve per request. The server may choose to return less than
   * the requested max.
   * @returns The application/json event route and the http response.
   */
  public listEventRoutes(
    resultsPerPage?: number,
    options: OperationOptions = {}
  ): PagedAsyncIterableIterator<EventRoute, EventRoutesListNextResponse> {
    var eventRoutesListOptionalParams: EventRoutesListOptionalParams = options;
    eventRoutesListOptionalParams = {
      eventRoutesListOptions: {
        maxItemsPerPage: resultsPerPage
      },
      ...options
    };

    const span = this.createSpan(
      "DigitalTwinsClient-listEventRoutes",
      eventRoutesListOptionalParams
    );
    try {
      const iter = this.getEventRoutesAll(eventRoutesListOptionalParams);

      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: PageSettings = {}) =>
          this.getEventRoutesPage(eventRoutesListOptionalParams, settings)
      };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Create or update an event route.
   *
   * @param eventRouteId The Id of the event route to create or update.
   * @param endpointId The id of the endpoint this event route is bound to.
   * @param filter An expression which describes the events which are routed to the endpoint.
   * @param options The operation options
   * @returns The http response.
   */
  public upsertEventRoute(
    eventRouteId: string,
    endpointId: string,
    filter: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const eventRoutesAddOptionalParams: EventRoutesAddOptionalParams = options;
    const eventRoute: EventRoute = {
      endpointName: endpointId,
      filter: filter
    };
    eventRoutesAddOptionalParams.eventRoute = eventRoute;

    const span = this.createSpan("DigitalTwinsClient-getEventRoute", eventRoutesAddOptionalParams);
    try {
      return this.client.eventRoutes.add(eventRouteId, eventRoutesAddOptionalParams);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Delete an event route.
   *
   * @param eventRouteId The Id of the model to delete.
   * @param options The operation options
   * @returns The http response.
   */
  public deleteEventRoute(
    eventRouteId: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const eventRoutesDeleteOptionalParams: EventRoutesDeleteOptionalParams = options;
    const span = this.createSpan(
      "DigitalTwinsClient-getEventRoute",
      eventRoutesDeleteOptionalParams
    );
    try {
      return this.client.eventRoutes.delete(eventRouteId, eventRoutesDeleteOptionalParams);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the pagination of {@link query}.
   *
   * @param {PageSettings} continuationState An object that indicates the position of the paginated request.
   * @param {OperationOptions} [options] Common options for the iterative endpoints.
   *
   */
  private async *queryTwinsPage(
    query: string,
    options: QueryQueryTwinsOptionalParams,
    continuationState: PageSettings
  ): AsyncIterableIterator<QueryQueryTwinsResponse> {
    if (continuationState.continuationToken == null) {
      const querySpecification: QuerySpecification = {
        query: query,
        continuationToken: continuationState.continuationToken
      };
      const queryResult = await this.client.query.queryTwins(querySpecification, options);
      continuationState.continuationToken = queryResult.continuationToken;
      yield queryResult;
    }
    while (continuationState.continuationToken) {
      const querySpecification: QuerySpecification = {
        query: query,
        continuationToken: continuationState.continuationToken
      };
      const queryResult = await this.client.query.queryTwins(querySpecification, options);

      continuationState.continuationToken = queryResult.continuationToken;
      yield queryResult;
    }
  }

  /**
   * @internal
   * @ignore
   * Deals with the iteration of all the available results of {@link query}.
   * @param {OperationOptions} [options] Common options for the iterative endpoints.
   */
  private async *queryTwinsAll(
    query: string,
    options: QueryQueryTwinsOptionalParams
  ): AsyncIterableIterator<any> {
    const f = {};

    for await (const page of this.queryTwinsPage(query, options, f)) {
      if (page.value) {
        for (const item of page.value) {
          yield item;
        }
      }
    }
  }

  /**
   * Query for digital twins.
   *
   * @param query The query string, in SQL-like syntax.
   * @param resultsPerPage The maximum number of items to retrieve per request. The server may choose to return less than the requested max.
   * @returns The pageable list of query results.
   */
  public queryTwins(
    query: string,
    resultsPerPage?: number,
    options: OperationOptions = {}
  ): PagedAsyncIterableIterator<any, QueryQueryTwinsResponse> {
    var queryQueryTwinsOptionalParams: QueryQueryTwinsOptionalParams = options;
    queryQueryTwinsOptionalParams = {
      queryTwinsOptions: {
        maxItemsPerPage: resultsPerPage
      },
      ...options
    };

    const span = this.createSpan("DigitalTwinsClient-queryTwins", queryQueryTwinsOptionalParams);
    try {
      const iter = this.queryTwinsAll(query, queryQueryTwinsOptionalParams);

      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: PageSettings = {}) =>
          this.queryTwinsPage(query, queryQueryTwinsOptionalParams, settings)
      };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * @internal
   * @ignore
   * Creates a span using the tracer that was set by the user.
   * @param {string} methodName The name of the method creating the span.
   * @param {OperationOptions} [options] The options for the underlying HTTP request.
   */
  private createSpan(methodName: string, requestOptions?: RequestOptionsBase): Span {
    const tracer = getTracer();
    const span = tracer.startSpan(
      `DigitalTwinsClient ${methodName}`,
      requestOptions && requestOptions.spanOptions
    );
    span.setAttribute("az.namespace", "Microsoft.DigitalTwinsCore");
    return span;
  }
}
