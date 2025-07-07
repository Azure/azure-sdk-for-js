// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Computes a deterministic hash code from a string input (typically a trace ID) 
 * and returns a value between 0 and 100 for sampling decisions.
 * 
 * This function replicates the C# hash algorithm used in Application Insights
 * to ensure consistent sampling decisions across different SDKs and languages.
 * The same trace ID will always produce the same hash value, enabling
 * distributed sampling where all spans in a trace are sampled consistently.
 * 
 * @param input - The input string to hash (usually a trace ID)
 * @returns A number between 0 and 100 representing the hash-based sampling score
 */
export function getSamplingHashCode(input: string): number {
  const csharpMin = -2147483648;
  const csharpMax = 2147483647;
  let hash = 5381;

  if (!input) {
    return 0;
  }

  // Ensure input is at least 8 characters long by repeating it
  let processedInput = input;
  while (processedInput.length < 8) {
    processedInput = processedInput + processedInput;
  }

  // Compute hash using a variation of djb2 algorithm with C# integer overflow simulation
  // This uses hash * 33 + c (where hash << 5 + hash equals hash * 33)
  for (let i = 0; i < processedInput.length; i++) {
    // JS doesn't respond to integer overflow by wrapping around. Simulate it with bitwise operators ( | 0)
    hash = ((((hash << 5) + hash) | 0) + processedInput.charCodeAt(i)) | 0;
  }

  // Normalize hash to positive value and convert to 0-100 range
  hash = hash <= csharpMin ? csharpMax : Math.abs(hash);
  return (hash / csharpMax) * 100;
}

export function roundDownToNearest(samplingPercentage: number): number {
  if (samplingPercentage === 0) {
    return 0;
  }
  const itemCount = 100 / samplingPercentage;
  return 100.0 / Math.ceil(itemCount);
}

export function shouldSample(samplingPercentage: number, traceId: string): boolean {
  if (samplingPercentage === 100) {
    return true;
  } else if (samplingPercentage === 0) {
    return false;
  } else {
    const samplingHashCode = getSamplingHashCode(traceId);
    return samplingHashCode < samplingPercentage;
  }
}
