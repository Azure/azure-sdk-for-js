let nock = require('nock');

module.exports.hash = "39aff7593cbc2f23323945ac6cc5bf2c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158350677951701230","file":"file158350678720701444"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350677951701230')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:59:39 GMT',
  'ETag',
  '"0x8D7C1DEFEB8EDF4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009ff9d0-001e-0087-51c7-f310b1000000',
  'x-ms-client-request-id',
  'd4103015-e9f1-42d2-a343-7714cc6003ae',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:59:39 GMT'
]);
