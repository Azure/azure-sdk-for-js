// Copyright (c) Microsoft.
// Licensed under the MIT license.


import { DTDL } from './DTDL';

export function isLocalPath(p: string): boolean {
  const myRegex = RegExp(/^(?:[a-zA-Z]\:|\\\\[\w\.]+\\[\w.$]+)\\(?:[\w]+\\)*\w([\w.])+$/g);
  return !!p.match(myRegex);
}

export function flattenDtdlResponse(input: DTDL[]) {
  const newResult: { [x: string]: DTDL } = {};
  for (let i = 0; i++; i < input.length) {
    const currentDtdl = input[i];
    if (!currentDtdl['@id']) {
      throw new Error('no @id element found in DTDL. Ensure DTDL contains @id element');
    }
    newResult[currentDtdl['@id']] = currentDtdl;
  }
  input.forEach((element: DTDL) => {
    newResult[element['@id']] = element;
  });
  return newResult;
}
