// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PathUncheckedResponse,
  RequestParameters,
  StreamableMethod,
} from "@azure-rest/core-client";
import {
  createTracingClient,
  OperationTracingOptions,
  TracingSpan,
  TracingSpanKind,
} from "@azure/core-tracing";
import {
  GetChatCompletionsBodyParam,
  GetEmbeddingsBodyParam,
  GetImageEmbeddingsBodyParam,
} from "./parameters.js";
import {
  ChatRequestAssistantMessage,
  ChatRequestMessage,
  ChatRequestSystemMessage,
  ChatRequestToolMessage,
} from "./models.js";
import { ChatChoiceOutput, ChatCompletionsToolCallOutput } from "./outputModels.js";
import { isError } from "@azure/core-util";
import { isUnexpected } from "./isUnexpected.js";
import { PipelinePolicy } from "@azure/core-rest-pipeline";

const INFERENCE_GEN_AI_SYSTEM_NAME = "az.ai.inference";
const isContentRecordingEnabled = () =>
  Boolean(process.env["AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED"]);

/**
 * Copied over verbatim from core-tracing
 */
function traceAsync<
  Arguments,
  ResolvedReturn,
  PromiseReturn extends Promise<ResolvedReturn> | PromiseLike<ResolvedReturn>,
>(
  name: string,
  args: Arguments,
  methodToTrace: () => PromiseReturn,
  onStartTracing?: (span: TracingSpan, args: Arguments) => void,
  onEndTracing?: (span: TracingSpan, args: Arguments, rt?: ResolvedReturn, error?: unknown) => void,
  options?: OperationTracingOptions,
  spanKind?: TracingSpanKind,
): PromiseReturn {
  const { span, updatedOptions } = traceClient.startSpan(
    name,
    { tracingOptions: options },
    { spanKind },
  );
  options = updatedOptions.tracingOptions;
  onStartTracing?.(span, args);

  try {
    return traceClient
      .withContext(updatedOptions.tracingOptions.tracingContext, methodToTrace)
      .then(
        (response) => {
          onEndTracing?.(span, args, response);
          return response;
        },
        (error) => {
          onEndTracing?.(span, args, undefined, error);
          throw error;
        },
      ) as PromiseReturn;
  } catch (err) {
    onEndTracing?.(span, args, undefined, err);
    throw err;
  }
}

const traceClient = {
  ...createTracingClient({
    namespace: "Microsoft.CognitiveServices",
    packageName: "ai-inference-rest",
  }),
  traceAsync,
};

type RequestParameterWithBodyType = RequestParameters &
  GetImageEmbeddingsBodyParam &
  GetEmbeddingsBodyParam &
  GetChatCompletionsBodyParam &
  GetImageEmbeddingsBodyParam;

export function traceInference(
  routePath: string,
  url: string,
  args: RequestParameters,
  methodToTrace: () => StreamableMethod,
): StreamableMethod {
  //TODO: if model is not provided, we probably should parse from the URL
  const model = (args as RequestParameterWithBodyType).body?.model;

  const request = args as RequestParameterWithBodyType;

  /// TODO: the code for streaming needs to be clean up.   We will implement tracing for streaming later
  if (!traceClient || request.body?.stream == true) {
    return methodToTrace();
  }
  const operationName = getOperationName(routePath);
  const name = `${operationName} ${model ?? ""}`.trim();
  return traceClient.traceAsync(
    name,
    [request, operationName, url],
    methodToTrace,
    onStartTracing,
    onEndTracing,
    args.tracingOptions,
  );
}

enum TracingAttributesEnum {
  Operation_Name = "gen_ai.operation.name",
  Request_Model = "gen_ai.request.model",
  System = "gen_ai.system",
  Error_Type = "error.type",
  Server_Port = "server.port",
  Request_Frequency_Penalty = "gen_ai.request.frequency_penalty",
  Request_Max_Tokens = "gen_ai.request.max_tokens",
  Request_Presence_Penalty = "gen_ai.request.presence_penalty",
  Request_Stop_Sequences = "gen_ai.request.stop_sequences",
  Request_Temperature = "gen_ai.request.temperature",
  Request_Top_P = "gen_ai.request.top_p",
  Response_Finish_Reasons = "gen_ai.response.finish_reasons",
  Response_Id = "gen_ai.response.id",
  Response_Model = "gen_ai.response.model",
  Usage_Input_Tokens = "gen_ai.usage.input_tokens",
  Usage_Output_Tokens = "gen_ai.usage.output_tokens",
  Server_Address = "server.address",
}

const getOperationName = (path: string) => {
  if (path.endsWith("/chat/completions")) {
    return "chat";
  }
  if (path.endsWith("/info")) {
    return "info";
  }
  if (path.endsWith("/embeddings")) {
    return "text_embeddings";
  }
  if (path.endsWith("/images/embeddings")) {
    return "image_embeddings";
  }
  throw new Error(`Unknown path for span name: ${path}`);
};

export function onStartTracing(
  span: TracingSpan,
  [request, operationName, url]: [RequestParameters, string, string],
) {
  const urlObj = new URL(url);
  const port = urlObj.port || (urlObj.protocol === "https:" ? 443 : 80);

  span.setAttribute(TracingAttributesEnum.Server_Address, urlObj.hostname);
  span.setAttribute(TracingAttributesEnum.Server_Port, port);
  span.setAttribute(TracingAttributesEnum.Operation_Name, operationName);
  span.setAttribute(TracingAttributesEnum.System, "az.ai.inference");
  span.setAttribute("spanKind", (request as RequestParameterWithBodyType).body?.model);

  const body = (request as RequestParameterWithBodyType).body;
  if (!body) return;

  span.setAttribute(TracingAttributesEnum.Request_Model, body.model);
  span.setAttribute(TracingAttributesEnum.Request_Frequency_Penalty, body.frequency_penalty);
  span.setAttribute(TracingAttributesEnum.Request_Max_Tokens, body.max_tokens);
  span.setAttribute(TracingAttributesEnum.Request_Presence_Penalty, body.presence_penalty);
  span.setAttribute(TracingAttributesEnum.Request_Stop_Sequences, body.stop);
  span.setAttribute(TracingAttributesEnum.Request_Temperature, body.temperature);
  span.setAttribute(TracingAttributesEnum.Request_Top_P, body.top_p);

  if (body.messages) {
    addRequestChatMessageEvent(span, body.messages);
  }
}

export function onEndTracing(
  span: TracingSpan,
  _: [RequestParameters, string, string],
  response?: PathUncheckedResponse,
  error?: unknown,
) {
  if (error) {
    span.setStatus({
      status: "error",
      error: isError(error) ? error : undefined,
    });
  }
  if (response && response.body) {
    let body = response.body;
    if (isUnexpected(response)) {
      span.setStatus({
        status: "error",
        error: body?.error ?? body?.messages,
      });
    }
    span.setAttribute(TracingAttributesEnum.Response_Id, body.id);
    span.setAttribute(TracingAttributesEnum.Response_Model, body.model);
    if (body.usage) {
      span.setAttribute(TracingAttributesEnum.Usage_Input_Tokens, body.usage.prompt_tokens);
      span.setAttribute(TracingAttributesEnum.Usage_Output_Tokens, body.usage.completion_tokens);
    }
    addResponseChatMessageEvent(span, response);
  }
}

/*
* Add event to span.  Sample:
    {
    name: 'gen_ai.user.message',
    attributes: {
      'gen_ai.system': 'INFERENCE_GEN_AI_SYSTEM_NAME',
      'gen_ai.event.content': `{"role":"user","content":"What's the weather like in Boston?"}`  
    },
    time: [ 1725666879, 622695900 ],
    droppedAttributesCount: 0
  },
*/
function addRequestChatMessageEvent(span: TracingSpan, messages: Array<ChatRequestMessage>) {
  messages.forEach((message: any) => {
    if (message.role) {
      let content: {
        content?: string;
        tool_calls?: Array<ChatCompletionsToolCallOutput>;
        id?: string;
      } = {};

      const chatMsg = message as ChatRequestSystemMessage;
      if (chatMsg.content) {
        content.content = chatMsg.content;
      }
      if (!isContentRecordingEnabled()) {
        content.content = "";
      }

      const assistantMsg = message as ChatRequestAssistantMessage;
      if (assistantMsg.tool_calls) {
        content.tool_calls = assistantMsg.tool_calls;
        if (!isContentRecordingEnabled()) {
          const toolCalls: Array<ChatCompletionsToolCallOutput> = JSON.parse(
            JSON.stringify(content.tool_calls),
          );
          toolCalls.forEach((toolCall) => {
            if (toolCall.function.arguments) {
              toolCall.function.arguments = "";
            }
            toolCall.function.name = "";
          });
          content.tool_calls = toolCalls;
        }
      }

      const toolMsg: ChatRequestToolMessage = message;
      if (toolMsg.tool_call_id) {
        content.id = toolMsg.tool_call_id;
      }

      span.addEvent(`gen_ai.${message.role}.message`, {
        "gen_ai.system": INFERENCE_GEN_AI_SYSTEM_NAME,
        "gen_ai.event.content": JSON.stringify(content),
      });
    }
  });
}

/*
* Add event to span.  Sample:
{
  name: 'gen_ai.choice',
  attributes: {
    'gen_ai.system': 'INFERENCE_GEN_AI_SYSTEM_NAME',
    'gen_ai.event.content': '{"finish_reason":"tool_calls","index":0,"message":{"content":""}}'
  },
  time: [ 1725666881, 780608000 ],
  droppedAttributesCount: 0
}  
*/
function addResponseChatMessageEvent(span: TracingSpan, response: PathUncheckedResponse) {
  response.body?.choices?.forEach((choice: ChatChoiceOutput) => {
    let attributes;
    let message: { content?: string; toolCalls?: Array<ChatCompletionsToolCallOutput> } = {};

    if (choice.message.content) {
      message.content = choice.message.content;
    }
    if (choice.message.tool_calls) {
      message.toolCalls = choice.message.tool_calls;
    }

    if (!isContentRecordingEnabled()) {
      message = JSON.parse(JSON.stringify(message));
      message.content = "";
      if (message.toolCalls) {
        message.toolCalls.forEach((toolCall) => {
          if (toolCall.function.arguments) {
            toolCall.function.arguments = "";
          }
          toolCall.function.name = "";
        });
      }
    }

    const response = {
      finish_reason: choice.finish_reason,
      index: choice.index,
      message,
    };
    attributes = {
      "gen_ai.system": INFERENCE_GEN_AI_SYSTEM_NAME,
      "gen_ai.event.content": JSON.stringify(response),
    };

    span.addEvent("gen_ai.choice", attributes);
  });
}

export const tracingPolicy: PipelinePolicy = {
  name: "tracingPolicyAI",
  async sendRequest(pipelineRequest, next) {
    const url = new URL(pipelineRequest.url);

    // /// TODO: the code for streaming needs to be clean up.   We will implement tracing for streaming later
    // if (!traceClient || request.body?.stream == true) {
    //   return methodToTrace();
    // }
    const operationName = getOperationName(url.pathname);
    const name = `${operationName}`.trim();
    const { span, updatedOptions } = traceClient.startSpan(name, {
      tracingOptions: pipelineRequest.tracingOptions,
    });
    pipelineRequest.tracingOptions = updatedOptions.tracingOptions;
    onStartTracing?.(span, [{ ...pipelineRequest, headers: {} }, name, pipelineRequest.url]);

    return traceClient
      .withContext(updatedOptions.tracingOptions.tracingContext, () => next(pipelineRequest))
      .then(
        (response) => {
          onEndTracing?.(span, [] as any, {
            ...response,
            body: response.bodyAsText,
            headers: {},
            status: response.status.toString(),
          });
          return response;
        },
        (error) => {
          onEndTracing?.(span, [] as any, undefined, error);
          throw error;
        },
      )
      .finally(() => span.end());
  },
};
