import * as Models from "./generated/src/models";
import { blobToString } from "./utils/utils.browser";

export async function getBodyAsText(
  batchResponse: Models.ServiceSubmitBatchResponse
): Promise<string> {
  const blob = (await batchResponse.blobBody) as Blob;
  return await blobToString(blob);
}

export function utf8ByteLength(str: string): number {
  return new Blob([str]).size;
}
