import { BlobClient, GenerateSASUrlOptions } from "./BlobClient";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { isNode } from "@azure/core-http";
import { generateBlobSASQueryParameters } from "./BlobSASSignatureValues";

BlobClient.prototype.generateSASUrl = function(
  options: GenerateSASUrlOptions,
  sharedKeyCredential: SharedKeyCredential
): string {
  if (isNode) {
    return `${this.url}?${generateBlobSASQueryParameters(
      {
        blobName: this.blobName,
        containerName: this.containerName,
        ...options
      },
      sharedKeyCredential
    )}`;
  } else {
    throw new Error("generateSASUrl is only supported in Node.js environment");
  }
};
