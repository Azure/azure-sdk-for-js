// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// import assert from "assert";
// import { ReadWriteLock } from "../../../src/bulk/Limiter";

// describe("ReadWriteLock", () => {
//   let lock: ReadWriteLock;

//   beforeEach(() => {
//     lock = new ReadWriteLock();
//   });

//   /**
//    * Helper function to delay execution for a specified time.
//    * @param ms - Milliseconds to delay.
//    */
//   const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//   it("should allow multiple readers to acquire the lock simultaneously", async () => {
//     const results: string[] = [];

//     const reader1 = async () => {
//       await lock.acquireRead();
//       results.push("reader1 acquired");
//       await delay(100);
//       results.push("reader1 releasing");
//       lock.releaseRead();
//     };

//     const reader2 = async () => {
//       await lock.acquireRead();
//       results.push("reader2 acquired");
//       await delay(100);
//       results.push("reader2 releasing");
//       lock.releaseRead();
//     };

//     await Promise.all([reader1(), reader2()]);

//     assert.deepStrictEqual(results, [
//       "reader1 acquired",
//       "reader2 acquired",
//       "reader1 releasing",
//       "reader2 releasing",
//     ]);
//   });

//   it("should allow a writer to acquire the lock exclusively", async () => {
//     const results: string[] = [];

//     const reader = async () => {
//       await lock.acquireRead();
//       results.push("reader acquired");
//       await delay(200);
//       results.push("reader releasing");
//       lock.releaseRead();
//     };

//     const writer = async () => {
//       await delay(50); // Ensure writer attempts to acquire after reader
//       await lock.acquireWrite();
//       results.push("writer acquired");
//       await delay(100);
//       results.push("writer releasing");
//       lock.releaseWrite();
//     };

//     await Promise.all([reader(), writer()]);

//     assert.deepStrictEqual(results, [
//       "reader acquired",
//       "reader releasing",
//       "writer acquired",
//       "writer releasing",
//     ]);
//   });

//   it("writers should have priority over new readers", async () => {
//     const results: string[] = [];

//     const reader1 = async () => {
//       await lock.acquireRead();
//       results.push("reader1 acquired");
//       await delay(300);
//       results.push("reader1 releasing");
//       lock.releaseRead();
//     };

//     const writer = async () => {
//       await delay(50); // Writer attempts to acquire after reader1
//       await lock.acquireWrite();
//       results.push("writer acquired");
//       await delay(100);
//       results.push("writer releasing");
//       await lock.releaseWrite();
//     };

//     const reader2 = async () => {
//       await delay(100); // reader2 attempts to acquire while writer is waiting
//       await lock.acquireRead();
//       results.push("reader2 acquired");
//       await delay(100);
//       results.push("reader2 releasing");
//       lock.releaseRead();
//     };

//     await Promise.all([reader1(), writer(), reader2()]);

//     assert.deepStrictEqual(results, [
//       "reader1 acquired",
//       "reader1 releasing",
//       "writer acquired",
//       "writer releasing",
//       "reader2 acquired",
//       "reader2 releasing",
//     ]);
//   });

//   it("writer cannot acquire lock while another writer holds it", async () => {
//     const results: string[] = [];

//     const writer1 = async () => {
//       await lock.acquireWrite();
//       results.push("writer1 acquired");
//       await delay(200);
//       results.push("writer1 releasing");
//       lock.releaseWrite();
//     };

//     const writer2 = async () => {
//       await delay(50); // Writer2 attempts to acquire after writer1
//       await lock.acquireWrite();
//       results.push("writer2 acquired");
//       await delay(100);
//       results.push("writer2 releasing");
//       lock.releaseWrite();
//     };

//     await Promise.all([writer1(), writer2()]);

//     assert.deepStrictEqual(results, [
//       "writer1 acquired",
//       "writer1 releasing",
//       "writer2 acquired",
//       "writer2 releasing",
//     ]);
//   });

//   it("should release roomEmpty after all readers release the lock", async () => {
//     const results: string[] = [];

//     const reader1 = async () => {
//       await lock.acquireRead();
//       results.push("reader1 acquired");
//       await delay(100);
//       results.push("reader1 releasing");
//       lock.releaseRead();
//     };

//     const reader2 = async () => {
//       await lock.acquireRead();
//       results.push("reader2 acquired");
//       await delay(150);
//       results.push("reader2 releasing");
//       lock.releaseRead();
//     };

//     const writer = async () => {
//       await delay(50); // Writer attempts to acquire after readers
//       await lock.acquireWrite();
//       results.push("writer acquired");
//       await delay(100);
//       results.push("writer releasing");
//       lock.releaseWrite();
//     };

//     await Promise.all([reader1(), reader2(), writer()]);

//     assert.deepStrictEqual(results, [
//       "reader1 acquired",
//       "reader2 acquired",
//       "reader1 releasing",
//       "reader2 releasing",
//       "writer acquired",
//       "writer releasing",
//     ]);
//   });

//   it("should handle releasing write lock properly", async () => {
//     const results: string[] = [];

//     const writer = async () => {
//       await lock.acquireWrite();
//       results.push("writer acquired");
//       await delay(100);
//       results.push("writer releasing");
//       lock.releaseWrite();
//     };

//     const reader = async () => {
//       await delay(50); // Attempt to acquire after writer has begun
//       await lock.acquireRead();
//       results.push("reader acquired");
//       await delay(100);
//       results.push("reader releasing");
//       lock.releaseRead();
//     };

//     await Promise.all([writer(), reader()]);

//     assert.deepStrictEqual(results, [
//       "writer acquired",
//       "writer releasing",
//       "reader acquired",
//       "reader releasing",
//     ]);
//   });

//   it("should prevent new readers from acquiring the lock when a writer is waiting", async () => {
//     const results: string[] = [];

//     const reader1 = async () => {
//       await lock.acquireRead();
//       results.push("reader1 acquired");
//       await delay(300);
//       results.push("reader1 releasing");
//       lock.releaseRead();
//     };

//     const writer = async () => {
//       await delay(50); // Writer attempts to acquire after reader1
//       await lock.acquireWrite();
//       results.push("writer acquired");
//       await delay(100);
//       results.push("writer releasing");
//       lock.releaseWrite();
//     };

//     const reader2 = async () => {
//       await delay(100); // reader2 attempts to acquire while writer is waiting
//       await lock.acquireRead();
//       results.push("reader2 acquired");
//       await delay(100);
//       results.push("reader2 releasing");
//       lock.releaseRead();
//     };

//     await Promise.all([reader1(), writer(), reader2()]);

//     assert.deepStrictEqual(results, [
//       "reader1 acquired",
//       "reader1 releasing",
//       "writer acquired",
//       "writer releasing",
//       "reader2 acquired",
//       "reader2 releasing",
//     ]);
//   });

//   it("should allow writer to acquire lock after all readers have released", async () => {
//     const results: string[] = [];

//     const reader1 = async () => {
//       await lock.acquireRead();
//       results.push("reader1 acquired");
//       await delay(100);
//       results.push("reader1 releasing");
//       lock.releaseRead();
//     };

//     const writer = async () => {
//       await delay(50); // Writer attempts to acquire after reader1
//       await lock.acquireWrite();
//       results.push("writer acquired");
//       await delay(100);
//       results.push("writer releasing");
//       lock.releaseWrite();
//     };

//     await Promise.all([reader1(), writer()]);

//     assert.deepStrictEqual(results, [
//       "reader1 acquired",
//       "reader1 releasing",
//       "writer acquired",
//       "writer releasing",
//     ]);
//   });

//   it("should handle multiple writers correctly", async () => {
//     const results: string[] = [];

//     const writer1 = async () => {
//       await lock.acquireWrite();
//       results.push("writer1 acquired");
//       await delay(100);
//       results.push("writer1 releasing");
//       lock.releaseWrite();
//     };

//     const writer2 = async () => {
//       await delay(50); // Writer2 attempts to acquire after writer1
//       await lock.acquireWrite();
//       results.push("writer2 acquired");
//       await delay(100);
//       results.push("writer2 releasing");
//       lock.releaseWrite();
//     };

//     const writer3 = async () => {
//       await delay(75); // Writer3 attempts to acquire after writer2
//       await lock.acquireWrite();
//       results.push("writer3 acquired");
//       await delay(100);
//       results.push("writer3 releasing");
//       lock.releaseWrite();
//     };

//     await Promise.all([writer1(), writer2(), writer3()]);

//     assert.deepStrictEqual(results, [
//       "writer1 acquired",
//       "writer1 releasing",
//       "writer2 acquired",
//       "writer2 releasing",
//       "writer3 acquired",
//       "writer3 releasing",
//     ]);
//   });
// });
