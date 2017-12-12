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

var Base = require("../base")
    , assert = require("assert")
    , util = require("util");

//SCRIPT START
var PartitionedQueryContants = {
    QueryInfoPath : 'queryInfo',
    TopPath: ['queryInfo', 'top'],
    OrderByPath: ['queryInfo', 'orderBy'],
    AggregatePath: ['queryInfo', 'aggregates'],
    QueryRangesPath : 'queryRanges',
    RewrittenQueryPath: ['queryInfo', 'rewrittenQuery']
};

var PartitionedQueryExecutionContextInfoParser = Base.defineClass(
    undefined, undefined,
    {
        parseRewrittenQuery: function (partitionedQueryExecutionInfo) {
            return this._extract(partitionedQueryExecutionInfo, PartitionedQueryContants.RewrittenQueryPath);
        },
        parseQueryRanges: function (partitionedQueryExecutionInfo) {
            return this._extract(partitionedQueryExecutionInfo, PartitionedQueryContants.QueryRangesPath);
        },
        parseOrderBy: function (partitionedQueryExecutionInfo) {
            return this._extract(partitionedQueryExecutionInfo, PartitionedQueryContants.OrderByPath);
        },
        parseAggregates: function (partitionedQueryExecutionInfo) {
            return this._extract(partitionedQueryExecutionInfo, PartitionedQueryContants.AggregatePath);
        },
        parseTop: function (partitionedQueryExecutionInfo) {
            return this._extract(partitionedQueryExecutionInfo, PartitionedQueryContants.TopPath);
        },
        _extract: function (partitionedQueryExecutionInfo, path) {
            var item = partitionedQueryExecutionInfo;
            if (typeof (path) === 'string') {
                return item[path];
            }
            assert.ok(Array.isArray(path),
                util.format("%s is expected to be an array", JSON.stringify(path)));
            for (var index = 0; index < path.length; index++) {
                item = item[path[index]];
                if (item === undefined) {
                    return undefined;
                }
            }
            return item;
        }
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = PartitionedQueryExecutionContextInfoParser;
}