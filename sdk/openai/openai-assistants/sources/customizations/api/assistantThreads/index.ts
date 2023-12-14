import { AssistantThreadCreationOptions } from "../../rest/models.js";
import {
  AssistantsContext as Client,
  CreateThread200Response,
} from "../../../generated/src/rest/index.js";
import { AssistantThreadsCreateThreadOptions } from "../../../generated/src/models/index.js";
import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createThreadSend(
  context: Client,
  body: AssistantThreadCreationOptions,
  options: AssistantThreadsCreateThreadOptions = { requestOptions: {} }
): StreamableMethod<CreateThread200Response> {
  return context.path("/threads").post({
    ...operationOptionsToRequestParameters(options),
    body: {
      messages: (body["messages"] ?? []).map((p) => ({
        role: p["role"],
        content: p["content"],
      })),
      metadata: body["metadata"],
    },
  });
}
