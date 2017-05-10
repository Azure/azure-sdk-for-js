/*
The MIT License (MIT)
Copyright (c) 2017 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";

var assert = require("assert");
var HashPartitionResolver = require("../lib/hash/hashPartitionResolver").HashPartitionResolver;

describe("HashPartitionResolver new()", function () {
    it(" does not throw", function () {
        assert.doesNotThrow(
            function () {
                var resolver = new HashPartitionResolver("foo", ["dbs/foo/colls/A"]);
            }
        );
    });
    
    it("invalid partitionKeyResolver", function () {
        assert.throws(
            function () {
                var resolver = new HashPartitionResolver()
            },
            /partitionKeyExtractor cannot be null or undefined/
        );
    });

    it("invalid collectionLinks", function () {
        assert.throws(
            function () {
                var resolver = new HashPartitionResolver("foo")
            },
            /collectionLinks must be an array./
        );
    });
});

describe("HashPartitionResolver.getPartitionKey", function () {
    it("string", function () {
        var resolver = new HashPartitionResolver("foo", ["dbs/foo/colls/A"]);
        var partitionKey = resolver.getPartitionKey({ foo: "bar" });
        assert.strictEqual("bar", partitionKey);
    });

    it("function", function () {
        var resolver = new HashPartitionResolver(function (document) { return document.foo; }, ["dbs/foo/colls/A"]);
        var partitionKey = resolver.getPartitionKey({ foo: "bar" });
        assert.strictEqual("bar", partitionKey);
    });
});

describe("HashPartitionResolver.resolveForRead", function () {
    it("valid key", function () {
        var resolver = new HashPartitionResolver("ignored", ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
        var links = resolver.resolveForRead("a");
        assert.deepEqual(["dbs/foo/colls/A"], links);
    });

    it("null key", function () {
        var resolver = new HashPartitionResolver("ignored", ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
        var links = resolver.resolveForRead(null);
        assert.deepEqual(links, ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
    });

    it("undefined key", function () {
        var resolver = new HashPartitionResolver("ignored", ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
        var links = resolver.resolveForRead();
        assert.deepEqual(links, ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
    });
});

describe("HashPartitionResolver.resolveForCreate", function () {
    it("valid key", function () {
        var resolver = new HashPartitionResolver("ignored", ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
        var links = resolver.resolveForCreate("a");
        assert.deepEqual("dbs/foo/colls/A", links);
    });

    it("invalid key", function () {
        var resolver = new HashPartitionResolver("ignored", ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
        assert.throws(
            function () {
                resolver.resolveForCreate(0);
            },
            /partitionKey must be a 'string'/);
    });
});

describe("HashPartitionResolver._resolve", function () {
    it("throws", function () {
        var resolver = new HashPartitionResolver(function (document) { return document.foo; }, ["dbs/foo/colls/A"]);
        assert.throws(
            function () { resolver._resolve(1); },
            /partitionKey must be a 'string'/
        );
    });

    it("resolves to non-null", function () {
        var resolver = new HashPartitionResolver("ignoredPartitionKeyExtractor", ["dbs/foo/colls/A", "dbs/foo/colls/B", "dbs/foo/colls/C"]);
        var link = resolver._resolve("x");
        assert.notStrictEqual(null, link);
    });
});

describe("HashPartitionResolver._throwIfInvalidCollectionLinks", function () {
    it("non-array throws", function () {
        var links = [
            undefined,
            null,
            1,
            "foo",
            {},
            NaN,
            function () { }
        ];
        
        links.forEach(
            function (link) {
                assert.throws(
                    function () {
                        HashPartitionResolver._throwIfInvalidCollectionLinks(link);
                    },
                /collectionLinks must be an array./
                );
            });
    });

    it("invalid links throws", function () {
        assert.throws(
            function () {
                HashPartitionResolver._throwIfInvalidCollectionLinks(["foo"]);
            },
            /All elements of collectionLinks must be collection links./
        );
    });

    it("does not throw", function () {
        assert.doesNotThrow(
            function () {
                HashPartitionResolver._throwIfInvalidCollectionLinks(["dbs/a/colls/b"]);
            }
        );
    });
    
});

describe("HashPartitionResolver._throwIfInvalidPartitionKeyExtractor", function () {
    it(" does not throw", function () {
        var partitionKeyExtractors = [
            "foo",
            function () { }
        ];
        
        partitionKeyExtractors.forEach(
            function (partitionKeyExtractor) {
                assert.doesNotThrow(
                    function () {
                        HashPartitionResolver._throwIfInvalidPartitionKeyExtractor(partitionKeyExtractor);
                    }
                );
            });
    });
    
    it("null or undefined throws", function () {
        var partitionKeyExtractors = [
            undefined,
            null
        ];
        
        partitionKeyExtractors.forEach(
            function (partitionKeyExtractor) {
                assert.throws(
                    function () {
                        HashPartitionResolver._throwIfInvalidPartitionKeyExtractor(partitionKeyExtractor);
                    },
                /partitionKeyExtractor cannot be null or undefined/
                );
            });
    });

    it("throws", function () {
        var partitionKeyExtractors = [
            1,
            {},
            [],
            NaN
        ];
        
        partitionKeyExtractors.forEach(
            function (partitionKeyExtractor) {
                assert.throws(
                    function () {
                        HashPartitionResolver._throwIfInvalidPartitionKeyExtractor(partitionKeyExtractor);
                    },
                /partitionKeyExtractor must be either a 'string' or a 'function/
                );
            });
    });
});

describe("HashPartitionResolver._throwIfInvalidPartitionKey", function () {
    it(" does not throw", function () {
        assert.doesNotThrow(
            function () {
                HashPartitionResolver._throwIfInvalidPartitionKey("foo");
            }
        );
    });
    
    it("throws", function () {
        var keys = [
            undefined,
            null,
            1,
            {},
            [],
            NaN,
            function () { }
        ];
        
        keys.forEach(
            function (key) {
                assert.throws(
                    function () {
                        HashPartitionResolver._throwIfInvalidPartitionKey(key);
                    },
                    /partitionKey must be a 'string'/
                );
            });
    });
});
