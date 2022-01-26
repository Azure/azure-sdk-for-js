// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export * from "./generated/models";
import {
  PipelineTopology,
  LivePipeline,
  RemoteDeviceAdapter,
  UnsecuredEndpoint,
  OnvifDevice,
} from "./generated/models";
import { MethodRequest } from "./generated/models/mappers";

/**
 * Method name and payload to send with a pipeline request. Method name determinds request type.
 */
export interface Request<T = Record<string, unknown>> {
  /**
   * Method name which determines type of request
   */
  methodName: string;
  /**
   * Payload  data to send with request
   */
  payload: T & { "@apiVersion": string };
}

/**
 * Name of pipeline or live pipeline
 */
export interface NameObject {
  /**
   * name
   */
  name: string;
}

/**
 * All of the options for type of request to send
 */
export type RequestType =
  | "pipelineTopologySet"
  | "pipelineTopologyGet"
  | "pipelineTopologyList"
  | "pipelineTopologyDelete"
  | "livePipelineSet"
  | "livePipelineGet"
  | "livePipelineList"
  | "livePipelineDelete"
  | "livePipelineActivate"
  | "livePipelineDeactivate"
  | "onvifDeviceDiscover"
  | "onvifDeviceGet"
  | "remoteDeviceAdapterSet"
  | "remoteDeviceAdapterList"
  | "remoteDeviceAdapterGet"
  | "remoteDeviceAdapterDelete";

const apiVersion = MethodRequest.type.modelProperties!.apiVersion.defaultValue;

/**
 * Create a request to set a pipeline topology.
 * @param request - The string which determines the type of request. In this case a PipelineTopologySet request.
 * @param payload - The data to send in the request. PipelineTopologySet requests require a pipeline topology.
 */
export function createRequest(
  request: "pipelineTopologySet",
  payload: PipelineTopology
): Request<PipelineTopology>;
/**
 * Create a request to get a pipeline topology.
 * @param request - The string which determines the type of request. In this case a PipelineTopologyGet request.
 * @param payload - The data to send in the request. PipelineTopologyGet requests require the name of a pipeline topology.
 */
export function createRequest(request: "pipelineTopologyGet", payload: string): Request<NameObject>;
/**
 * Create a request to list all pipeline topologies.
 * @param request - The string which determines the type of request. In this case a PipelineTopologyList request.
 */
export function createRequest(request: "pipelineTopologyList"): Request;
/**
 * Create a request to delete a pipeline topology.
 * @param request - The string which determines the type of request. In this case a PipelineTopologyDelete request.
 * @param payload - The data to send in the request. PipelineTopologyDelete requests require the name of a pipeline topology.
 */
export function createRequest(
  request: "pipelineTopologyDelete",
  payload: string
): Request<NameObject>;
/**
 * Create a request to set a live pipeline.
 * @param request - The string which determines the type of request. In this case a LivePipelineSet request.
 * @param payload - The data to send in the request. LivePipelineSet requests require a live pipeline.
 */
export function createRequest(
  request: "livePipelineSet",
  payload: LivePipeline
): Request<LivePipeline>;
/**
 * Create a request to get a live pipeline.
 * @param request - The string which determines the type of request. In this case a LivePipelineGet request.
 * @param payload - The data to send in the request. LivePipelineGet requests require a live pipeline name.
 */
export function createRequest(request: "livePipelineGet", payload: string): Request<NameObject>;
/**
 * Create a request to list all live pipelines.
 * @param request - The string which determines the type of request. In this case a LivePipelineList request.
 */
export function createRequest(request: "livePipelineList"): Request;
/**
 * Create a request to delete a live pipeline
 * @param request - The string which determines the type of request. In this case a LivePipelineDelete request.
 * @param payload - The data to send in the request. LivePipelineDelete requests require a live pipeline name.
 */
export function createRequest(request: "livePipelineDelete", payload: string): Request<NameObject>;
/**
 * Create a request to activate a live pipeline
 * @param request - The string which determines the type of request. In this case a LivePipelineActivate request.
 * @param payload - The data to send in the request. LivePipelineActivate requests require a live pipeline name.
 */
export function createRequest(
  request: "livePipelineActivate",
  payload: string
): Request<NameObject>;
/**
 * Create a request to deactivate a live pipeline
 * @param request - The string which determines the type of request. In this case a LivePipelineDeactivate request.
 * @param payload - The data to send in the request. LivePipelineDeactivate requests require a live pipeline name.
 */
export function createRequest(
  request: "livePipelineDeactivate",
  payload: string
): Request<NameObject>;
/**
 * Create a request to list all of the onvif devices on the network
 * @param request - The string which determines the type of request. In this case a OnvifDeviceDiscoverRequest request.
 */
export function createRequest(request: "onvifDeviceDiscover"): Request;
/**
 * Create a request to get an onvif device
 * @param request - The string which determines the type of request. In this case a OnvifDeviceGetRequest request.
 * @param payload - The data to send in the request. OnvifDeviceGet requests require an onvif device name.
 */
export function createRequest(
  request: "onvifDeviceGet",
  payload: UnsecuredEndpoint
): Request<UnsecuredEndpoint>;
/**
 * Create a request to set a remote device adapter
 * @param request - The string which determines the type of request. In this case a RemoteDeviceAdapterSetRequest request.
 * @param payload - The data to send in the request. RemoteDeviceAdapterSet requests require a remote device adapter.
 */
export function createRequest(
  request: "remoteDeviceAdapterSet",
  payload: RemoteDeviceAdapter
): Request<RemoteDeviceAdapter>;
/**
 * Create a request to list all remote device adapters on the network
 * @param request - The string which determines the type of request. In this case a RemoteDeviceAdapterListRequest request.
 */
export function createRequest(request: "remoteDeviceAdapterList"): Request;
/**
 * Create a request to get a remote device adapter
 * @param request - The string which determines the type of request. In this case a RemoteDeviceAdapterGetRequest request.
 * @param payload - The data to send in the request. RemoteDeviceAdapterGet requests require a remote device adapter name.
 */
export function createRequest(
  request: "remoteDeviceAdapterGet",
  payload: string
): Request<NameObject>;
/**
 * Create a request to delete a remote device adapter
 * @param request - The string which determines the type of request. In this case a RemoteDeviceAdapterDeleteRequest request.
 * @param payload - The data to send in the request. RemoteDeviceAdapterDelete requests require a remote device adapter name.
 */
export function createRequest(
  request: "remoteDeviceAdapterDelete",
  payload: string
): Request<NameObject>;
export function createRequest<
  T extends PipelineTopology | NameObject | LivePipeline | RemoteDeviceAdapter | OnvifDevice
>(
  request: RequestType,
  payload?: string | PipelineTopology | LivePipeline | UnsecuredEndpoint | RemoteDeviceAdapter
): Request<T> | Request {
  let finalPayload = {};
  if (typeof payload === "string") {
    finalPayload = { name: payload };
  } else if (
    payload &&
    (payload as UnsecuredEndpoint)["@type"] === "#Microsoft.VideoAnalyzer.UnsecuredEndpoint"
  ) {
    finalPayload = { endpoint: payload };
  } else {
    finalPayload = payload ?? {};
  }
  return {
    methodName: request,
    payload: {
      ...finalPayload,
      "@apiVersion": apiVersion,
    },
  };
}
