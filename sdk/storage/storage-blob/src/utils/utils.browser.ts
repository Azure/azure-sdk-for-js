/**
 * Convert a Browser Blob object into ArrayBuffer.
 *
 * @export
 * @param {Blob} blob
 * @returns {Promise<ArrayBuffer>}
 */
export async function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  const fileReader = new FileReader();
  return new Promise<ArrayBuffer>((resolve, reject) => {
    fileReader.onloadend = (ev: any) => {
      resolve(ev.target!.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(blob);
  });
}

/**
 * Convert a Browser Blob object into string.
 *
 * @export
 * @param {Blob} blob
 * @returns {Promise<ArrayBuffer>}
 */
export async function blobToString(blob: Blob): Promise<string> {
  const fileReader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    fileReader.onloadend = (ev: any) => {
      resolve(ev.target!.result);
    };
    fileReader.onerror = reject;
    fileReader.readAsText(blob);
  });
}
