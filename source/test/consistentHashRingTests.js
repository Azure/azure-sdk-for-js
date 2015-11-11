/*
The MIT License (MIT)
Copyright (c) 2014 Microsoft Corporation

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
var HashPartitionResolver = require("../lib/Hash/hashPartitionResolver").HashPartitionResolver;

describe("new HashPartitionResolver()", function () {
	it("not throws", function () {
		assert.doesNotThrow(
			function () {
				var resolver = new HashPartitionResolver("foo", ["A"]);
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
			/Invalid argument: 'collectionLinks' has to be an array./
		);
	});
});

describe("HashPartitionResolver.getPartitionKey", function () {
	it("string", function () {
		var resolver = new HashPartitionResolver("foo", ["A"]);
		var partitionKey = resolver.getPartitionKey({ foo: "bar" });
		assert.strictEqual("bar", partitionKey);
	});

	it("function", function () {
		var resolver = new HashPartitionResolver(function (document) { return document.foo; }, ["A"]);
		var partitionKey = resolver.getPartitionKey({ foo: "bar" });
		assert.strictEqual("bar", partitionKey);
	});
});

describe("HashPartitionResolver.resolveForRead", function () {
	it("found", function () {
		var resolver = new HashPartitionResolver("ignored", ["A", "B", "C"]);
		var links = resolver.resolveForRead("A");
		assert.deepEqual(["A"], links);
	});

	it("not found", function () {
		var resolver = new HashPartitionResolver("ignored", ["A", "B", "C"]);
		var links = resolver.resolveForRead("a");
		assert.deepEqual(["B"], links);
	});
});

describe("HashPartitionResolver.resolveForCreate", function () {
	it("found", function () {
		var resolver = new HashPartitionResolver("ignored", ["A", "B", "C"]);
		var links = resolver.resolveForCreate("A");
		assert.deepEqual("A", links);
	});
	
	it("not found", function () {
		var resolver = new HashPartitionResolver("ignored", ["A", "B", "C"]);
		var links = resolver.resolveForCreate("a");
		assert.deepEqual("B", links);
	});
});

describe("HashPartitionResolver._resolve", function () {
	it("throws", function () {
		assert.throws(
			function () {
				var resolver = new HashPartitionResolver(function (document) { return document.foo; }, ["A"]);
				resolver._resolve(1);
			},
			/Unsupported type for partitionKey: 'number'/
		);
	});

	it("found", function () {
		var resolver = new HashPartitionResolver("ignored", ["A", "B", "C"]);
		var link = resolver._resolve("x");
		assert.notStrictEqual(null, link);
	});
});

describe("HashPartitionResolver._throwIfInvalidCollectionLinks", function () {
	it("not throws", function () {
		assert.doesNotThrow(
			function () {
				HashPartitionResolver._throwIfInvalidCollectionLinks(["foo"]);
			}
		);
	});
	
	it("throws", function () {
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
				/Invalid argument: 'collectionLinks' has to be an array./
				);
			});
	});
});

describe("HashPartitionResolver._throwIfInvalidPartitionKeyExtractor", function () {
	it("not throws", function () {
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
				/partitionKeyExtractor has to have 'string' or 'function' type./
				);
			});
	});
});

describe("HashPartitionResolver._throwIfInvalidPartitionKey", function () {
	it("not throws", function () {
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
				/Unsupported type for partitionKey: '.*'/
				);
			});
	});
});
