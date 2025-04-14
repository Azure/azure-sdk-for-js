// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Similar to Promise.allSettled which isn't available in all of our supported environments.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
 */
export async function settleAllTasks(tasks: Promise<any>[]): Promise<any[]> {
  // add no-op catch to each task to prevent unhandled promise rejection in node 15+
  for (const task of tasks) {
    task.catch(() => {
      /* no-op */
    });
  }
  const results = [];
  for (const task of tasks) {
    try {
      const result = await task;
      results.push(result);
    } catch (err) {
      results.push(err);
    }
  }
  return results;
}
