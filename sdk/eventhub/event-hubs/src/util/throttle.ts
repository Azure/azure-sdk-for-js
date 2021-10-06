// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function createThrottle(maxConcurrency: number) {
  const pendingPromises: { [key: string]: PromiseLike<any> } = {};
  let globalKey = 0;
  return {
    async add(p: PromiseLike<unknown>) {
      const pendingCount = Object.keys(pendingPromises).length;
      if (pendingCount >= maxConcurrency) {
        // wait for a slot to open up.
        await this.wait();
      }
      const key = globalKey++;
      pendingPromises[`${key}`] = p.then(() => Promise.resolve(`${key}`));
      // wait as necessary
      return this.wait();
    },
    async wait() {
      const pendingKeys = Object.keys(pendingPromises);
      // No need to wait, we can still add more promises
      if (pendingKeys.length < maxConcurrency) {
        return;
      }

      const promises = pendingKeys.map((key) => pendingPromises[key]);
      // delete the promise that completed the race
      const key = await Promise.race(promises);
      delete pendingPromises[key];
    },
    async waitForAll() {
      const pendingKeys = Object.keys(pendingPromises);
      const promises = pendingKeys.map((key) => pendingPromises[key]);
      await Promise.all(promises);
      pendingKeys.forEach((key) => delete pendingPromises[key]);
    }
  };
}
