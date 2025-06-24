// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function getSamplingHashCode(input: string): number {
  const csharpMin = -2147483648;
  const csharpMax = 2147483647;
  let hash = 5381;

  if (!input) {
    return 0;
  }

  while (input.length < 8) {
    input = input + input;
  }

  for (let i = 0; i < input.length; i++) {
    // JS doesn't respond to integer overflow by wrapping around. Simulate it with bitwise operators ( | 0)
    hash = ((((hash << 5) + hash) | 0) + input.charCodeAt(i)) | 0;
  }

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
