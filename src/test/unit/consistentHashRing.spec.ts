import * as assert from "assert";
import { ConsistentHashRing } from "../../hash/consistentHashRing";
describe("ConsistentHashRing", function () {
    describe("#.constructor", function () {
        it("valid arguments does not throw", function () {
            const ring = new ConsistentHashRing(["bar"]);
            assert(ring);
            assert.strictEqual(ring.partitions.length, 128);
        });

        it("invalid nodes throws", function () {
            assert.throws(
                function () {
                    const ring = new ConsistentHashRing(undefined);
                },
                /Invalid argument: 'nodes' has to be an array./,
            );
        });
    });

    describe("#.getNode", function () {
        const test = function (key: string, expected: string) {
            const nodes = ["A", "B", "C"];
            const options = {
                partitionsPerNode: 1,
                computeHash: (innerKey: string) => {
                    if (innerKey === "A") { return 10; }
                    if (innerKey === "B") { return 20; }
                    if (innerKey === "C") { return 30; }

                    if (innerKey === "a") { return 15; }
                    if (innerKey === "b") { return 25; }
                    if (innerKey === "c") { return 35; }

                    return 0;
                },
            };

            const ring = new ConsistentHashRing(nodes, options);
            const actual = ring.getNode(key);

            const message = {
                key,
                expected,
                actual,
            };
            assert.strictEqual(expected, actual, JSON.stringify(message));
        };

        it("A(10), B(20), C(30)", function () {
            test("a", "A");
        });

        it("A(10), B(20), C(30)", function () {
            test("b", "B");
        });
        it("A(10), B(20), C(30)", function () {
            test("c", "C");
        });
        it("A(10), B(20), C(30)", function () {
            test("d", "C");
        });
    });
});

// TODO: bad test, testing implementation details
//       should move any test coverage these offer to the public methods.
// describe("ConsistentHashRing._constructPartitions", function () {
//     it("construct ring", function () {
//         const fixedHashValue = 123;
//         const partitionsPerNode = 2;
//         const nodes = ["A", "B", "C"];
//         let timesComputeHashCalled = 0;
//         const computeHash = function () {
//             timesComputeHashCalled++;
//             return fixedHashValue;
//         };
//         const totalPartitions = partitionsPerNode * nodes.length;
//         const totalCalls = (partitionsPerNode + 1) * nodes.length;

//         const partitions = ConsistentHashRing.constructPartitions(nodes, partitionsPerNode, computeHash);

//         assert.strictEqual(totalPartitions, partitions.length);
//         assert.strictEqual(totalCalls, timesComputeHashCalled);

//         partitions.forEach(function (partition) {
//             assert(partition.node);
//             assert.strictEqual(fixedHashValue, partition.hashValue);
//         });
//     });
// });

// describe("ConsistentHashRing._compareHashes", function () {
//     const test = function (a, b, result) {
//         const actual = ConsistentHashRing._compareHashes(a, b);
//         assert.strictEqual(result, actual);
//     }

//     it("a=b", function () {
//         test(0, 0, 0);
//     });

//     it("a>b", function () {
//         test(1, 0, 1);
//     });

//     it("a<b", function () {
//         test(0, 1, -1);
//     });
// });

// describe("ConsistentHashRing._search", function () {
//     const test = function (nodes, key, expected) {
//         const result = ConsistentHashRing._search(nodes, key);
//         const actual = nodes[result].hashValue;

//         const message = {
//             key: key,
//             expected: expected,
//             actual: actual
//         };

//         assert.strictEqual(expected, actual, JSON.stringify(message));
//     }

//     it("10", function () {
//         const test1 = function (key, expected) {
//             const nodes = [
//                 { hashValue: 10 }
//             ];

//             test(nodes, key, expected);
//         }

//         test1(Number.NEGATIVE_INFINITY, 10);
//         test1(9, 10);
//         test1(10, 10);
//         test1(11, 10);
//         test1(Number.POSITIVE_INFINITY, 10);
//     });

//     it("10, 20", function () {
//         const test2 = function (key, expected) {
//             const nodes = [
//                 { hashValue: 10 },
//                 { hashValue: 20 }
//             ];

//             test(nodes, key, expected);
//         }

//         test2(Number.NEGATIVE_INFINITY, 20);
//         test2(10, 10);
//         test2(11, 10);
//         test2(19, 10);
//         test2(20, 20);
//         test2(Number.POSITIVE_INFINITY, 20);
//     });

//     it("10, 20, 30", function () {
//         const test3 = function (key, expected) {
//             const nodes = [
//                 { hashValue: 10 },
//                 { hashValue: 20 },
//                 { hashValue: 30 }
//             ];

//             test(nodes, key, expected);
//         }

//         test3(Number.NEGATIVE_INFINITY, 30);
//         test3(10, 10);
//         test3(11, 10);
//         test3(19, 10);
//         test3(20, 20);
//         test3(21, 20);
//         test3(29, 20);
//         test3(30, 30);
//         test3(31, 30);
//         test3(Number.POSITIVE_INFINITY, 30);
//     });
// });

// describe("ConsistentHashRing._throwIfInvalidNodes", function () {
//     it("does not throw", function () {
//         assert.doesNotThrow(function () {
//             ConsistentHashRing._throwIfInvalidNodes([]);
//         });
//     });

//     it("throws", function () {
//         const test = function (nodes) {
//             assert.throws(
//                 function () {
//                     ConsistentHashRing._throwIfInvalidNodes(nodes);
//                 },
//                 /Invalid argument: 'nodes' has to be an array./
//             );
//         };

//         const values = [
//             undefined,
//             null,
//             "string",
//             0,
//             true,
//             {},
//             function () { }
//         ];

//         values.forEach(function (nodes) {
//             test(nodes);
//         });
//     });
// });
