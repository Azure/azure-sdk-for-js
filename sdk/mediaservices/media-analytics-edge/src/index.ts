export * from "./generated/models"; //add omit
import { MediaGraphTopology, MediaGraphInstance } from "./generated/models";
import {
  MethodRequest as MethodRequestInternal,
  MediaGraphTopologySetRequest,
  MediaGraphTopologyGetRequest,
  MediaGraphTopologyDeleteRequest,
  MediaGraphTopologyListRequest,
  MediaGraphInstanceListRequest,
  MediaGraphInstanceSetRequest,
  MediaGraphInstanceGetRequest,
  MediaGraphInstanceDeleteRequest,
  MediaGraphInstanceActivateRequest,
  MediaGraphInstanceDeActivateRequest,
} from "./generated/models/mappers";

export type Payload = (MediaGraphTopology | MediaGraphInstance | {name: string} | {} ) & {"@apiVersion": string;};
export interface Request {
  MethodName: string;
  Payload: Payload
}


const apiVersion =  MethodRequestInternal.type.modelProperties!.apiVersion.defaultValue;

function addApiVersion(payload: MediaGraphTopology | MediaGraphInstance | string | {} = {}): Payload {
  return {
    ...(typeof payload === 'string' ? {name: payload} : payload),
    "@apiVersion": apiVersion
  };
}

/**
 * @public Create a set request for a media graph topology used to invoke a method using an Azure IoT Client
 * @param graph - The MediaGraphTopology
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphTopologySetRequest(graph: MediaGraphTopology): Request {
  return {
    MethodName: MediaGraphTopologySetRequest.serializedName!,
    Payload: addApiVersion(graph)
  };
}

/**
 * @public Create a get request for a media graph topology used to invoke a method using an Azure IoT Client
 * @param name - The name of graph topology
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphTopologyGetRequest(name: string): Request {
  return {
    MethodName: MediaGraphTopologyGetRequest.serializedName!,
    Payload: addApiVersion({name})
  };
}

/**
 * Create a delete request for a media graph topology used to invoke a method using an Azure IoT Client
 * @param name - The name of graph topology
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphTopologyDeleteRequest(name: string): Request {
  return {
    MethodName: MediaGraphTopologyDeleteRequest.serializedName!,
    Payload: addApiVersion({name})
  };
}

/**
 * @public Create a list request for media graph topologies used to invoke a method using an Azure IoT Client
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphTopologyListRequest(): Request {
  return {
    MethodName: MediaGraphTopologyListRequest.serializedName!,
    Payload: addApiVersion()
  };
}

/**
 * @public Create a set request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param instance - The MediaGraphInstance
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphInstanceSetRequest(instance: MediaGraphInstance): Request {
  return {
    MethodName: MediaGraphInstanceSetRequest.serializedName!,
    Payload: addApiVersion(instance)
  };
}

/**
 * @public Create a get request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param name - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphInstanceGetRequest(name: string): Request {
  return {
    MethodName: MediaGraphInstanceGetRequest.serializedName!,
    Payload: addApiVersion({name})
  };
}

/**
 * @public Create a delete request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param name - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphInstanceDeleteRequest(name: string): Request {
  return {
    MethodName: MediaGraphInstanceDeleteRequest.serializedName!,
    Payload: addApiVersion({name})
  };
}

/**
 * @public Create a list request for media graph instances used to invoke a method using an Azure IoT Client
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphInstanceListRequest(): Request {
  return {
    MethodName: MediaGraphInstanceListRequest.serializedName!,
    Payload: addApiVersion()
  };
}

/**
 * @public Create an activate request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param name - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphInstanceActivateRequest(name: string): Request {
  return {
    MethodName: MediaGraphInstanceActivateRequest.serializedName!,
    Payload: addApiVersion({name})
  };
}

/**
 * @public Create a deactivate request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param name - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphInstanceDeActivateRequest(name: string): Request {
  return {
    MethodName: MediaGraphInstanceDeActivateRequest.serializedName!,
    Payload: addApiVersion({name})
  };
}
