  /**
   * @internal
   */
   export function splitDataToChunks(logs: Record<string, unknown>[]): string[] {
    let chunk: any[] = [];
    const chunkArray: any[] = [];
    let size = 0;
    const maxBytes = 1000000;
    for (const element of logs) {
      const elementSize = JSON.stringify(element).length * 4;

      if (size + elementSize < maxBytes) {
        chunk.push(element);
        size += elementSize;
      } else {
        chunkArray.push(chunk);
        chunk = [element];
        size = elementSize;
      }
    }

    if (chunk.length) {
      chunkArray.push(chunk);
    }

    return chunkArray;
  }