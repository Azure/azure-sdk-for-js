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

"use strict"

var Base = require("./base"),
    Regexes = require("./constants").RegularExpressions;


//SCRIPT START
var Helper = Base.defineClass(

    /**************************CONSTRUCTORS**************************/
    undefined,

    /************************INSTANCE MEMBERS************************/
    undefined,

    /*************************STATIC METHODS*************************/
    {
        isStringNullOrEmpty: function (inputString) {
            //checks whether string is null, undefined, empty or only contains space
            return !inputString || /^\s*$/.test(inputString);
        },

        trimSlashFromLeftAndRight: function (inputString) {
            if (typeof inputString != 'string') {
                throw "invalid input: input is not string";
            }

            return inputString.replace(Regexes.TrimLeftSlashes, "").replace(Regexes.TrimRightSlashes, "");
        },

        validateResourceId: function (resourceId) {
            // if resourceId is not a string or is empty throw an error
            if (typeof resourceId !== 'string' || this.isStringNullOrEmpty(resourceId)) {
                throw "Resource Id must be a string and cannot be undefined, null or empty";
            }

            // if resourceId starts or ends with space throw an error
            if (resourceId[resourceId.length - 1] == " ") {
                throw "Resource Id cannot end with space";
            }

            // if resource id contains illegal characters throw an error
            if (Regexes.IllegalResourceIdCharacters.test(resourceId)) {
                throw "Illegal characters ['/', '\\', '?', '#'] cannot be used in resourceId";
            }

            return true;

        }
    }

);
//SCRIPT END

if (typeof exports !== "undefined") {
    exports.Helper = Helper;
}