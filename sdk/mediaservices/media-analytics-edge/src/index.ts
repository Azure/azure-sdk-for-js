export * from "./generated/models";
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
  MediaGraphInstanceDeActivateRequest
} from "./generated/models/mappers";
export interface MethodRequest {
  MethodName: string;
  Payload: { "@apiVersion": string; [x: string]: any };
}

function addApiVersion(payload: MediaGraphInstance | MediaGraphTopology | string) {
  return {
    ...(typeof payload === "string" ? { name: payload } : payload),
    "@apiVersion": MethodRequestInternal.type.modelProperties!.apiVersion.defaultValue
  };
}

/**
 * @param graph - The MediaGraphTopology
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphTopologySetRequest(graph: MediaGraphTopology): MethodRequest {
  return {
    MethodName: MediaGraphTopologySetRequest.serializedName!,
    Payload: addApiVersion(graph)
  };
}

/**
 * @param graphName - The name of graph topology
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphTopologyGetRequest(graphName: string): MethodRequest {
  return {
    MethodName: MediaGraphTopologyGetRequest.serializedName!,
    Payload: addApiVersion(graphName)
  };
}

/**
 * @param graphName - The name of graph topology
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphTopologyDeleteRequest(graphName: string): MethodRequest {
  return {
    MethodName: MediaGraphTopologyDeleteRequest.serializedName!,
    Payload: addApiVersion(graphName)
  };
}

/**
 * @param graph - The MediaGraphTopology
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphTopologyListRequest(graph: MediaGraphTopology): MethodRequest {
  return {
    MethodName: MediaGraphTopologyListRequest.serializedName!,
    Payload: addApiVersion(graph)
  };
}

/**
 * @param graph - The MediaGraphInstance
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphInstanceSetRequest(graph: MediaGraphInstance): MethodRequest {
  return {
    MethodName: MediaGraphInstanceSetRequest.serializedName!,
    Payload: addApiVersion(graph)
  };
}

/**
 * @param graphName - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphInstanceGetRequest(graph: string): MethodRequest {
  return {
    MethodName: MediaGraphInstanceGetRequest.serializedName!,
    Payload: addApiVersion(graph)
  };
}

/**
 * @param graphName - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphInstanceDeleteRequest(graph: string): MethodRequest {
  return {
    MethodName: MediaGraphInstanceDeleteRequest.serializedName!,
    Payload: addApiVersion(graph)
  };
}

/**
 * @param graph - The MediaGraphInstance
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphInstanceListRequest(graph: MediaGraphInstance): MethodRequest {
  return {
    MethodName: MediaGraphInstanceListRequest.serializedName!,
    Payload: addApiVersion(graph)
  };
}

/**
 * @param graphName - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphInstanceActivateRequest(graph: string): MethodRequest {
  return {
    MethodName: MediaGraphInstanceActivateRequest.serializedName!,
    Payload: addApiVersion(graph)
  };
}

/**
 * @param graphName - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createMediaGraphInstanceDeActivateRequest(graph: string): MethodRequest {
  return {
    MethodName: MediaGraphInstanceDeActivateRequest.serializedName!,
    Payload: addApiVersion(graph)
  };
}
