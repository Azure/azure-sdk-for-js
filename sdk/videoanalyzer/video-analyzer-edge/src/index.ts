export * from "./generated/models";
import { PipelineTopology, LivePipeline } from "./generated/models";
import { MethodRequest } from "./generated/models/mappers";

export interface Request<T> {
  methodName: string;
  payload: T & { "@apiVersion": string };
}

export interface NameObject {
  name: string;
}

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
  | "livePipelineDeactivate";

const apiVersion = MethodRequest.type.modelProperties!.apiVersion.defaultValue;

/**
 * Create a request to set a pipeline topology.
 * @param request The string which determines the type of request. In this case a PipelineTopologySet request.
 * @param payload The data to send in the request. PipelineTopologySet requests require a pipeline topology.
 */
export function createRequest(
  request: "pipelineTopologySet",
  payload: PipelineTopology
): Request<PipelineTopology>;
/**
 * Create a request to get a pipeline topology.
 * @param request The string which determines the type of request. In this case a PipelineTopologyGet request.
 * @param payload The data to send in the request. PipelineTopologyGet requests require the name of a pipeline topology.
 */
export function createRequest(request: "pipelineTopologyGet", payload: string): Request<NameObject>;
/**
 * Create a request to list all pipeline topologies.
 * @param request The string which determines the type of request. In this case a PipelineTopologyList request.
 */
export function createRequest(request: "pipelineTopologyList"): Request<{}>;
/**
 * Create a request to delete a pipeline topology.
 * @param request The string which determines the type of request. In this case a PipelineTopologyDelete request.
 * @param payload The data to send in the request. PipelineTopologyDelete requests require the name of a pipeline topology.
 */
export function createRequest(
  request: "pipelineTopologyDelete",
  payload: string
): Request<NameObject>;
/**
 * Create a request to set a live pipeline.
 * @param request The string which determines the type of request. In this case a LivePipelineSet request.
 * @param payload The data to send in the request. LivePipelineSet requests require a live pipeline.
 */
export function createRequest(
  request: "livePipelineSet",
  payload: LivePipeline
): Request<LivePipeline>;
/**
 * Create a request to get a live pipeline.
 * @param request The string which determines the type of request. In this case a LivePipelineGet request.
 * @param payload The data to send in the request. LivePipelineGet requests require a live pipeline name.
 */
export function createRequest(request: "livePipelineGet", payload: string): Request<NameObject>;
/**
 * Create a request to list all live pipelines.
 * @param request The string which determines the type of request. In this case a LivePipelineList request.
 */
export function createRequest(request: "livePipelineList"): Request<{}>;
/**
 * Create a request to delete a live pipeline
 * @param request The string which determines the type of request. In this case a LivePipelineDelete request.
 * @param payload The data to send in the request. LivePipelineDelete requests require a live pipeline name.
 */
export function createRequest(request: "livePipelineDelete", payload: string): Request<NameObject>;
/**
 * Create a request to activate a live pipeline
 * @param request The string which determines the type of request. In this case a LivePipelineActivate request.
 * @param payload The data to send in the request. LivePipelineActivate requests require a live pipeline name.
 */
export function createRequest(
  request: "livePipelineActivate",
  payload: string
): Request<NameObject>;
/**
 * Create a request to deactivate a live pipeline
 * @param request The string which determines the type of request. In this case a LivePipelineDeactivate request.
 * @param payload The data to send in the request. LivePipelineDeactivate requests require a live pipeline name.
 */
export function createRequest(
  request: "livePipelineDeactivate",
  payload: string
): Request<NameObject>;
export function createRequest<T extends object>(request: RequestType, payload?: any): Request<T> {
  return {
    methodName: request,
    payload: {
      ...(typeof payload === "string" ? { name: payload } : payload ?? {}),
      "@apiVersion": apiVersion
    }
  };
}
