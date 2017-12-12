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

//SCRIPT START

var StatusCodes = {
    // Success
    "Ok": 200,
    "Created": 201,
    "Accepted": 202,
    "NoContent": 204,
    "NotModified": 304,

    // Client error
    "BadRequest": 400,
    "Unauthorized": 401,
    "Forbidden": 403,
    "NotFound": 404,
    "MethodNotAllowed": 405,
    "RequestTimeout": 408,
    "Conflict": 409,
    "Gone": 410,
    "PreconditionFailed": 412,
    "RequestEntityTooLarge": 413, 
    "TooManyRequests": 429,
    "RetryWith": 449,
        
    "InternalServerError": 500,
    "ServiceUnavailable": 503,

    //Operation pause and cancel. These are FAKE status codes for QOS logging purpose only.
    "OperationPaused": 1200,
    "OperationCancelled": 1201
};

var SubStatusCodes = {
    "Unknown": 0,

    // 400: Bad Request Substatus 
    "CrossPartitionQueryNotServable": 1004,

    // 410: StatusCodeType_Gone: substatus 
    "PartitionKeyRangeGone": 1002,
}

//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports.StatusCodes = StatusCodes;
    module.exports.SubStatusCodes = SubStatusCodes;
}
