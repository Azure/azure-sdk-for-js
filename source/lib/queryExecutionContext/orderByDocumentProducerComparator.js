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
    , DocumentProducer = require("./documentProducer")
    , assert = require("assert")
    , util = require("util");

//SCRIPT START
var OrderByDocumentProducerComparator = Base.defineClass(
    function (sortOrder) {
        this.sortOrder = sortOrder;
        this.targetPartitionKeyRangeDocProdComparator = function () {
            return function (docProd1, docProd2) {
                var a = docProd1.getTargetParitionKeyRange()['minInclusive'];
                var b = docProd2.getTargetParitionKeyRange()['minInclusive'];
                return (a == b ? 0 : (a > b ? 1 : -1));
            };
        };
        
        this._typeOrdComparator = Object.freeze({
            NoValue: {
                ord: 0
            },
            undefined: {
                ord: 1
            },
            boolean: {
                ord: 2,
                compFunc: function (a, b) {
                    return (a == b ? 0 : (a > b ? 1 : -1));
                }
            },
            number: {
                ord: 4,
                compFunc: function (a, b) {
                    return (a == b ? 0 : (a > b ? 1 : -1));
                }
            },
            string: {
                ord: 5,
                compFunc: function (a, b) {
                    return (a == b ? 0 : (a > b ? 1 : -1));
                }
            }
        });
    },
    {
        compare: function (docProd1, docProd2) {
            // Need to check for split, since we don't want to dereference "item" of undefined / exception
            if (docProd1.gotSplit()) {
                return -1;
            }
            if (docProd2.gotSplit()) {
                return 1;
            }

            var orderByItemsRes1 = this.getOrderByItems(docProd1.peekBufferedItems()[0]);
            var orderByItemsRes2 = this.getOrderByItems(docProd2.peekBufferedItems()[0]);
            
            // validate order by items and types
            // TODO: once V1 order by on different types is fixed this need to change
            this.validateOrderByItems(orderByItemsRes1, orderByItemsRes2);
            
            // no async call in the for loop
            for (var i = 0; i < orderByItemsRes1.length; i++) {
                // compares the orderby items one by one
                var compRes = this.compareOrderByItem(orderByItemsRes1[i], orderByItemsRes2[i]);
                if (compRes !== 0) {
                    if (this.sortOrder[i] === 'Ascending') {
                        return compRes;
                    } else if (this.sortOrder[i] === 'Descending') {
                        return -compRes;
                    }
                }
            }
            
            return this.targetPartitionKeyRangeDocProdComparator(docProd1, docProd2);
        },
        
        compareValue: function (item1, type1, item2, type2) {
            var type1Ord = this._typeOrdComparator[type1].ord;
            var type2Ord = this._typeOrdComparator[type2].ord;
            var typeCmp = type1Ord - type2Ord;
            
            if (typeCmp !== 0) {
                // if the types are different, use type ordinal
                return typeCmp;
            }
            
            // both are of the same type 
            if ((type1Ord === this._typeOrdComparator['undefined'].ord) || (type1Ord === this._typeOrdComparator['NoValue'].ord)) {
                // if both types are undefined or Null they are equal
                return 0;
            }
            
            var compFunc = this._typeOrdComparator[type1].compFunc;
            assert.notEqual(compFunc, undefined, "cannot find the comparison function");
            // same type and type is defined compare the items
            return compFunc(item1, item2);
        },
        
        compareOrderByItem: function (orderByItem1, orderByItem2) {
            var type1 = this.getType(orderByItem1);
            var type2 = this.getType(orderByItem2);
            return this.compareValue(orderByItem1['item'], type1, orderByItem2['item'], type2);
        },
        
        validateOrderByItems: function (res1, res2) {
            this._throwIf(res1.length != res2.length, util.format("Expected %s, but got %s.", type1, type2));
            this._throwIf(res1.length != this.sortOrder.length, 'orderByItems cannot have a different size than sort orders.');
            
            for (var i = 0; i < this.sortOrder.length; i++) {
                var type1 = this.getType(res1[i]);
                var type2 = this.getType(res2[i]);
                this._throwIf(type1 !== type2, util.format("Expected %s, but got %s.", type1, type2));
            }
        },
        
        getType: function (orderByItem) {
            if (!'item' in orderByItem) {
                return 'NoValue';
            }
            var type = typeof (orderByItem['item']);
            this._throwIf(!type in this._typeOrdComparator, util.format("unrecognizable type %s", type));
            return type;
        },
        
        getOrderByItems: function (res) {
            return res['orderByItems'];
        },
        
        _throwIf: function (condition, msg) {
            if (condition) {
                throw Error(msg);
            }
        }
    }
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = OrderByDocumentProducerComparator;
}