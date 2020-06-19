import { AvroReadable, AvroReadableFromStream } from "../../../storage-internal-avro/src";

/**
 * Read body from downloading operation methods to string.
 * Work on both Node.js and browser environment.
 *
 * @param response Convenience layer methods response with downloaded body
 * @param length Length of Readable stream, needed for Node.js environment
 */
export async function bodyToString(
  response: {
    readableStreamBody?: NodeJS.ReadableStream;
    blobBody?: Promise<Blob>;
  },
  length?: number
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    response.readableStreamBody!.on("readable", () => {
      const chunk = response.readableStreamBody!.read(length);
      if (chunk) {
        resolve(chunk.toString());
      }
    });

    response.readableStreamBody!.on("error", reject);
    response.readableStreamBody!.on("end", () => {
      resolve("");
    });
  });
}

export function bodyToAvroReadable(response: {
  readableStreamBody?: NodeJS.ReadableStream;
  blobBody?: Promise<Blob>;
}): AvroReadable {
  return new AvroReadableFromStream(response.readableStreamBody!);
}
