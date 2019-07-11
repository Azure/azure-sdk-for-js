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

/**
 * String.prototype.padStart()
 *
 * @param {string} currentString
 * @param {number} targetLength
 * @param {string} [padString=" "]
 * @returns {string}
 */
function padStart(currentString: string, targetLength: number, padString: string = " "): string {
  if (String.prototype.padStart) {
    return currentString.padStart(targetLength, padString);
  }

  padString = padString || " ";
  if (currentString.length > targetLength) {
    return currentString;
  } else {
    targetLength = targetLength - currentString.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + currentString;
  }
}

export function getUniqueName(prefix: string): string {
  return `${prefix}${new Date().getTime()}${padStart(
    Math.floor(Math.random() * 10000).toString(),
    5,
    "00000"
  )}`;
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
