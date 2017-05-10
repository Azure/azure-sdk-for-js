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

var Client = require("./documentclient")
  , Hash = require("./hash/hashPartitionResolver")
  , Range = require("./range")
  , UriFactory = require("./uriFactory");

if (typeof exports !== "undefined") {
    exports.DocumentClient = Client.DocumentClient;
    exports.DocumentBase = Client.DocumentBase;
    exports.Base = Client.Base;
    exports.Constants = Client.Constants;
    exports.RetryOptions = Client.RetryOptions;
    exports.Range = Range.Range;
    exports.RangePartitionResolver = Range.RangePartitionResolver;
    exports.HashPartitionResolver = Hash.HashPartitionResolver;
    exports.UriFactory = UriFactory.UriFactory;
}