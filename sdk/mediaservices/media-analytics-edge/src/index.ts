export * from "./generated/models"; //add omit
import { PipelineTopology, LivePipeline } from "./generated/models";
import {
  MethodRequest as MethodRequestInternal,
  PipelineTopologySetRequest,
  PipelineTopologyGetRequest,
  PipelineTopologyDeleteRequest,
  PipelineTopologyListRequest,
  LivePipelineListRequest,
  LivePipelineSetRequest,
  LivePipelineGetRequest,
  LivePipelineDeleteRequest,
  LivePipelineActivateRequest,
  LivePipelineDeactivateRequest
} from "./generated/models/mappers";

export type Payload = (PipelineTopology | LivePipeline | { name: string } | {}) & {
  "@apiVersion": string;
};
export interface Request {
  MethodName: string;
  Payload: Payload;
}

const apiVersion = MethodRequestInternal.type.modelProperties!.apiVersion.defaultValue;

function addApiVersion(
  payload: PipelineTopology | LivePipeline | string | {} = {}
): Payload {
  return {
    ...(typeof payload === "string" ? { name: payload } : payload),
    "@apiVersion": apiVersion
  };
}

/**
 * @public Create a set request for a media graph topology used to invoke a method using an Azure IoT Client
 * @param graph - The PipelineTopology
 * @returns A JSON object containing the method name and payload
 */
export function createPipelineTopologySetRequest(graph: PipelineTopology): Request {
  return {
    MethodName: PipelineTopologySetRequest.serializedName!,
    Payload: addApiVersion(graph)
  };
}

/**
 * @public Create a get request for a media graph topology used to invoke a method using an Azure IoT Client
 * @param name - The name of graph topology
 * @returns A JSON object containing the method name and payload
 */
export function createPipelineTopologyGetRequest(name: string): Request {
  return {
    MethodName: PipelineTopologyGetRequest.serializedName!,
    Payload: addApiVersion({ name })
  };
}

/**
 * Create a delete request for a media graph topology used to invoke a method using an Azure IoT Client
 * @param name - The name of graph topology
 * @returns A JSON object containing the method name and payload
 */
export function createPipelineTopologyDeleteRequest(name: string): Request {
  return {
    MethodName: PipelineTopologyDeleteRequest.serializedName!,
    Payload: addApiVersion({ name })
  };
}

/**
 * @public Create a list request for media graph topologies used to invoke a method using an Azure IoT Client
 * @returns A JSON object containing the method name and payload
 */
export function createPipelineTopologyListRequest(): Request {
  return {
    MethodName: PipelineTopologyListRequest.serializedName!,
    Payload: addApiVersion()
  };
}

/**
 * @public Create a set request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param instance - The LivePipeline
 * @returns A JSON object containing the method name and payload
 */
export function createLivePipelineSetRequest(instance: LivePipeline): Request {
  return {
    MethodName: LivePipelineSetRequest.serializedName!,
    Payload: addApiVersion(instance)
  };
}

/**
 * @public Create a get request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param name - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createLivePipelineGetRequest(name: string): Request {
  return {
    MethodName: LivePipelineGetRequest.serializedName!,
    Payload: addApiVersion({ name })
  };
}

/**
 * @public Create a delete request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param name - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createLivePipelineDeleteRequest(name: string): Request {
  return {
    MethodName: LivePipelineDeleteRequest.serializedName!,
    Payload: addApiVersion({ name })
  };
}

/**
 * @public Create a list request for media graph instances used to invoke a method using an Azure IoT Client
 * @returns A JSON object containing the method name and payload
 */
export function createLivePipelineListRequest(): Request {
  return {
    MethodName: LivePipelineListRequest.serializedName!,
    Payload: addApiVersion()
  };
}

/**
 * @public Create an activate request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param name - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createLivePipelineActivateRequest(name: string): Request {
  return {
    MethodName: LivePipelineActivateRequest.serializedName!,
    Payload: addApiVersion({ name })
  };
}

/**
 * @public Create a deactivate request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param name - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createLivePipelineDeActivateRequest(name: string): Request {
  return {
    MethodName: LivePipelineDeactivateRequest.serializedName!,
    Payload: addApiVersion({ name })
  };
}
