let nock = require('nock');

module.exports.hash = "5905d858b290841ea0efe98e961fc7fb";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158350677663209788","file":"file158350677949409553"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350677663209788')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:59:36 GMT',
  'ETag',
  '"0x8D7C1DEFD027D18"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009ff455-001e-0087-69c7-f310b1000000',
  'x-ms-client-request-id',
  '71c4d83d-4669-4b96-a01e-6328db274ae4',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:59:36 GMT'
]);
