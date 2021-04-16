// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Similar to Promise.allSettled which isn't available in all of our supported environments.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
 */
export async function settleAllTasks(tasks: Promise<any>[]): Promise<any[]> {
  const taskList = [...tasks];
  for (const task of taskList) {
    task
      .then(() => {
        taskList.splice(taskList.indexOf(task), 1);
        return;
      })
      .catch(() => {
        taskList.splice(taskList.indexOf(task), 1);
      });
  }

  // Keep settling each task in the list until they're all gone.
  while (taskList.length) {
    try {
      await Promise.race(taskList);
    } catch (err) {
      /* no-op */
    }
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
