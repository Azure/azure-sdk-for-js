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
  methodName: string;
  payload: Payload;
}

const apiVersion = MethodRequestInternal.type.modelProperties!.apiVersion.defaultValue;

function addApiVersion(payload: PipelineTopology | LivePipeline | string | {} = {}): Payload {
  return {
    ...(typeof payload === "string" ? { name: payload } : payload),
    "@apiVersion": apiVersion
  };
}

export type RequestType = "PipelineTopologySet" | "PipelineTopologyGet" | "PipelineTopologyDelete" | "LivePipelineTopologyGet"


export function createRequest(request: "PipelineTopologySet", payload: PipelineTopology): Request;
export function createRequest(request: RequestType, payload: LivePipeline): Request;
export function createRequest(request: "PipelineTopologyDelete", payload: string): Request;
export function createRequest(request: "PipelineTopologyGet", payload: string): Request;
export function createRequest(request: "LivePipelineTopologyGet", payload: string): Request;
export function createRequest(request: RequestType): Request;
export function createRequest(request: RequestType, payload?: any): Request {
  //const payloadData = typeof payload === "string" ? {name: payload} : payload
  return {
    methodName: request,
    payload: addApiVersion(payload ?? {})
  }
}


// export function createRequest(request: "PipelineTopologySet", pipelineTopology: PipelineTopology): Request;
// export function createRequest(request: RequestType, livePipeline: LivePipeline): Request;
// export function createRequest(request: "PipelineTopologyDelete", name: string): Request;
// export function createRequest(request: "PipelineTopologyGet", name: string): Request;
// export function createRequest(request: "LivePipelineTopologyGet", name: string): Request;
// export function createRequest(request: RequestType): Request;
// export function createRequest(request: RequestType, payloadData?: any): Request {
//   switch (request) {
//     case "PipelineTopologySet": 
//       return {
//         methodName: PipelineTopologySetRequest.serializedName!,
//         payload: addApiVersion(payloadData)
//       }
//     case "PipelineTopologyGet": 
//     case "PipelineTopologyDelete":
//       return {
//         methodName: PipelineTopologyGetRequest.serializedName!,
//         payload: addApiVersion(payloadData)
//       }
//     default:
//       return {methodName: "", payload: addApiVersion()}
//   }

//   return {
//     methodName: request,
//     payload: addApiVersion(payloadData)
//   }
// }

/**
 * @public Create a set request for a media graph topology used to invoke a method using an Azure IoT Client
 * @param graph - The PipelineTopology
 * @returns A JSON object containing the method name and payload
 */
export function createPipelineTopologySetRequest(graph: PipelineTopology): Request {
  return {
    methodName: PipelineTopologySetRequest.serializedName!,
    payload: addApiVersion(graph)
  };
}

/**
 * @public Create a get request for a media graph topology used to invoke a method using an Azure IoT Client
 * @param name - The name of graph topology
 * @returns A JSON object containing the method name and payload
 */
export function createPipelineTopologyGetRequest(name: string): Request {
  return {
    methodName: PipelineTopologyGetRequest.serializedName!,
    payload: addApiVersion({ name })
  };
}

/**
 * Create a delete request for a media graph topology used to invoke a method using an Azure IoT Client
 * @param name - The name of graph topology
 * @returns A JSON object containing the method name and payload
 */
export function createPipelineTopologyDeleteRequest(name: string): Request {
  return {
    methodName: PipelineTopologyDeleteRequest.serializedName!,
    payload: addApiVersion({ name })
  };
}

/**
 * @public Create a list request for media graph topologies used to invoke a method using an Azure IoT Client
 * @returns A JSON object containing the method name and payload
 */
export function createPipelineTopologyListRequest(): Request {
  return {
    methodName: PipelineTopologyListRequest.serializedName!,
    payload: addApiVersion()
  };
}

/**
 * @public Create a set request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param instance - The LivePipeline
 * @returns A JSON object containing the method name and payload
 */
export function createLivePipelineSetRequest(instance: LivePipeline): Request {
  return {
    methodName: LivePipelineSetRequest.serializedName!,
    payload: addApiVersion(instance)
  };
}

/**
 * @public Create a get request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param name - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createLivePipelineGetRequest(name: string): Request {
  return {
    methodName: LivePipelineGetRequest.serializedName!,
    payload: addApiVersion({ name })
  };
}

/**
 * @public Create a delete request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param name - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createLivePipelineDeleteRequest(name: string): Request {
  return {
    methodName: LivePipelineDeleteRequest.serializedName!,
    payload: addApiVersion({ name })
  };
}

/**
 * @public Create a list request for media graph instances used to invoke a method using an Azure IoT Client
 * @returns A JSON object containing the method name and payload
 */
export function createLivePipelineListRequest(): Request {
  return {
    methodName: LivePipelineListRequest.serializedName!,
    payload: addApiVersion()
  };
}

/**
 * @public Create an activate request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param name - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createLivePipelineActivateRequest(name: string): Request {
  return {
    methodName: LivePipelineActivateRequest.serializedName!,
    payload: addApiVersion({ name })
  };
}

/**
 * @public Create a deactivate request for a media graph instance used to invoke a method using an Azure IoT Client
 * @param name - The name of graph instance
 * @returns A JSON object containing the method name and payload
 */
export function createLivePipelineDeActivateRequest(name: string): Request {
  return {
    methodName: LivePipelineDeactivateRequest.serializedName!,
    payload: addApiVersion({ name })
  };
}
