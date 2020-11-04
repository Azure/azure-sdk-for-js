import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  TriggerGetTriggersByWorkspaceResponse,
  TriggerResource,
  TriggerCreateOrUpdateTriggerOptionalParams,
  TriggerCreateOrUpdateTriggerResponse,
  TriggerGetTriggerOptionalParams,
  TriggerGetTriggerResponse,
  TriggerSubscribeTriggerToEventsResponse,
  TriggerGetEventSubscriptionStatusResponse,
  TriggerUnsubscribeTriggerFromEventsResponse,
  TriggerGetTriggersByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a Trigger.
 */
export class Trigger {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class Trigger class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * Lists triggers.
   * @param options The options parameters.
   */
  getTriggersByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<TriggerGetTriggersByWorkspaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getTriggersByWorkspaceOperationSpec
    ) as Promise<TriggerGetTriggersByWorkspaceResponse>;
  }

  /**
   * Creates or updates a trigger.
   * @param triggerName The trigger name.
   * @param trigger Trigger resource definition.
   * @param options The options parameters.
   */
  async createOrUpdateTrigger(
    triggerName: string,
    trigger: TriggerResource,
    options?: TriggerCreateOrUpdateTriggerOptionalParams
  ): Promise<LROPoller<TriggerCreateOrUpdateTriggerResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      triggerName,
      trigger,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        TriggerCreateOrUpdateTriggerResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createOrUpdateTriggerOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createOrUpdateTriggerOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets a trigger.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  getTrigger(
    triggerName: string,
    options?: TriggerGetTriggerOptionalParams
  ): Promise<TriggerGetTriggerResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { triggerName, options: operationOptions },
      getTriggerOperationSpec
    ) as Promise<TriggerGetTriggerResponse>;
  }

  /**
   * Deletes a trigger.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  async deleteTrigger(
    triggerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      triggerName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      deleteTriggerOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deleteTriggerOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Subscribe event trigger to events.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  async subscribeTriggerToEvents(
    triggerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<TriggerSubscribeTriggerToEventsResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      triggerName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        TriggerSubscribeTriggerToEventsResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      subscribeTriggerToEventsOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: subscribeTriggerToEventsOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Get a trigger's event subscription status.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  getEventSubscriptionStatus(
    triggerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<TriggerGetEventSubscriptionStatusResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { triggerName, options: operationOptions },
      getEventSubscriptionStatusOperationSpec
    ) as Promise<TriggerGetEventSubscriptionStatusResponse>;
  }

  /**
   * Unsubscribe event trigger from events.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  async unsubscribeTriggerFromEvents(
    triggerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<TriggerUnsubscribeTriggerFromEventsResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      triggerName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        TriggerUnsubscribeTriggerFromEventsResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      unsubscribeTriggerFromEventsOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: unsubscribeTriggerFromEventsOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Starts a trigger.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  async startTrigger(
    triggerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      triggerName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      startTriggerOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: startTriggerOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Stops a trigger.
   * @param triggerName The trigger name.
   * @param options The options parameters.
   */
  async stopTrigger(
    triggerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      triggerName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      stopTriggerOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: stopTriggerOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * GetTriggersByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetTriggersByWorkspace method.
   * @param options The options parameters.
   */
  getTriggersByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<TriggerGetTriggersByWorkspaceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      getTriggersByWorkspaceNextOperationSpec
    ) as Promise<TriggerGetTriggersByWorkspaceNextResponse>;
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getTriggersByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateTriggerOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerResource
    },
    201: {
      bodyMapper: Mappers.TriggerResource
    },
    202: {
      bodyMapper: Mappers.TriggerResource
    },
    204: {
      bodyMapper: Mappers.TriggerResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.trigger,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept1,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const getTriggerOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteTriggerOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const subscribeTriggerToEventsOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}/subscribeToEvents",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    201: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    202: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    204: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const getEventSubscriptionStatusOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}/getEventSubscriptionStatus",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const unsubscribeTriggerFromEventsOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}/unsubscribeFromEvents",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    201: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    202: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    204: {
      bodyMapper: Mappers.TriggerSubscriptionOperationStatus
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const startTriggerOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}/start",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const stopTriggerOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}/stop",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const getTriggersByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
