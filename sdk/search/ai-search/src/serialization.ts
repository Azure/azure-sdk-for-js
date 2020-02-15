// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function serialize<InputT, OutputT>(obj: InputT): OutputT {
  return walk(obj, (value) => {
    let result = serializeSpecialNumbers(value);
    return result;
  });
}

export function deserialize<InputT, OutputT>(obj: InputT): OutputT {
  return walk(obj, (value) => {
    let result = deserializeSpecialNumbers(value);
    return result;
  });
}

// function walk(start: unknown, mapper: (val: any) => any): any {
//   let result = mapper(start);

//   if (typeof result === "object" && result !== null) {
//     for (const key of Object.keys(result)) {
//       result[key] = walk(result[key], mapper);
//     }
//   }

//   return result;
// }

function walk(start: unknown, mapper: (val: any) => any): any {
  const seenMarker = new WeakMap<object, boolean>();
  const result = { value: undefined };
  const queue: { value: any; parent: any; key: string }[] = [
    { value: start, parent: result, key: "value" }
  ];

  while (queue.length) {
    let current = queue.shift()!;

    if (typeof current.value === "object" && current.value !== null) {
      if (seenMarker.has(current.value)) {
        throw new Error("Cannot map a recusive structure.");
      } else {
        seenMarker.set(current.value, true);
      }
    }

    let mapped = mapper(current.value);
    if (current?.parent && current.key) {
      current.parent[current.key] = mapped;
    }
    if (typeof mapped === "object" && mapped !== null) {
      for (const key of Object.keys(mapped)) {
        queue.push({
          value: mapped[key],
          parent: mapped,
          key
        });
      }
    }
  }

  return result.value;
}

function serializeSpecialNumbers(input: unknown): unknown {
  if (typeof input === "number") {
    if (isNaN(input)) {
      return "NaN";
    } else if (input === Infinity) {
      return "INF";
    } else if (input === -Infinity) {
      return "-INF";
    }
  }
  return input;
}

function deserializeSpecialNumbers(input: unknown): unknown {
  if (typeof input === "string") {
    if (input === "NaN") {
      return NaN;
    } else if (input === "INF") {
      return Infinity;
    } else if (input === "-INF") {
      return -Infinity;
    }
  }
  return input;
}
