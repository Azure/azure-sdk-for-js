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

// [SuppressMessage("Microsoft.Security", "CS002:SecretInNextLine")]
var masterKey = process.env.ACCOUNT_KEY || "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
var host = process.env.ACCOUNT_HOST || "https://localhost:443";

var adminUtilitiesPath = "../../../../../bin/x64/Debug/Product/AdminUtilities/Microsoft.Azure.Documents.Tools.AdminUtilities.exe"

// This is needed to disable SSL verification for the tests running against emulator.
// This needs to be commented if you are running tests against production endpoint specified as host above.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

exports.host = host;
exports.masterKey = masterKey;
exports.adminUtilitiesPath = adminUtilitiesPath;
