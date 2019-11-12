import { ServiceSubmitBatchResponseModel } from "./generatedModels";
import { streamToBuffer2 } from "./utils/utils.node";
import { BATCH_MAX_PAYLOAD_IN_BYTES } from "./utils/constants";

export async function getBodyAsText(
  batchResponse: ServiceSubmitBatchResponseModel
): Promise<string> {
  let buffer = Buffer.alloc(BATCH_MAX_PAYLOAD_IN_BYTES);

  let responseLength = await streamToBuffer2(
    batchResponse.readableStreamBody as NodeJS.ReadableStream,
    buffer
  );

  // Slice the buffer to trim the empty ending.
  buffer = buffer.slice(0, responseLength);

  return buffer.toString();
}

export function utf8ByteLength(str: string): number {
  return Buffer.byteLength(str);
}
