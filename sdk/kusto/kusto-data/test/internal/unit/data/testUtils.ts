// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


const loginTestEnv = "LOGIN_TEST";
const autoTestEnv = "AUTO_TEST";

export const testIfEnv = (definedEnv: string[], undefinedEnv: string[]) => {
  if (
    definedEnv.filter((x) => process.env[x]).length === definedEnv.length &&
    undefinedEnv.filter((x) => !process.env[x]).length === undefinedEnv.length
  ) {
    return it;
  } else {
    return it.skip;
  }
};

export const manualLoginTest = (...definedEnv: string[]) =>
  testIfEnv([loginTestEnv, ...definedEnv], [autoTestEnv]);
export const loginTest = (...definedEnv: string[]) => testIfEnv([loginTestEnv, ...definedEnv], []);
