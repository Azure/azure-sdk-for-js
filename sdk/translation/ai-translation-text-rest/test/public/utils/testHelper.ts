// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function editDistance(s1: string, s2: string): number {
  const n1 = s1.length;
  const n2 = s2.length;
  return distance(s1, s2, n1, n2);
}

export function distance(s1: string, s2: string, n1: number, n2: number): number {
  if (n1 === 0) {
    return n2;
  }

  if (n2 === 0) {
    return n1;
  }

  if (s1[n1 - 1] === s2[n2 - 1]) {
    const d: number = distance(s1, s2, n1 - 1, n2 - 1);
    return d;
  }
  const nums: number[] = [
    distance(s1, s2, n1, n2 - 1),
    distance(s1, s2, n1 - 1, n2),
    distance(s1, s2, n1 - 1, n2 - 1),
  ];
  return 1 + Math.min(...nums);
}
