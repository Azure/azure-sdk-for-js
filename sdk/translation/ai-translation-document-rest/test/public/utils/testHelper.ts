// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function randomName(prefix: string, maxLen: number): string {
    return getValue(
      (readValue: string) => readValue,
      () => superRandomName(prefix, maxLen)
    );
  }
  
  function getValue(
    readValueFunc: (readValue: string) => string,
    superFunc: () => string
  ): string {
    // Example implementation of getValue, using the provided functions
    const readValue = "exampleReadValue";
    return Math.random() > 0.5 ? readValueFunc(readValue) : superFunc();
  }
  
  function superRandomName(prefix: string, maxLen: number): string {
    // Example implementation of the super class method
    return `${prefix}-${Math.random().toString(36).substr(2, maxLen)}`;
  }  
