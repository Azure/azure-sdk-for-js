let nock = require('nock');

module.exports.hash = "73b0974f129ce6b9294d339d9061160b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158350665304503953","file":"file158350665340006279"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158350665304503953')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Mar 2020 14:57:33 GMT',
  'ETag',
  '"0x8D7C1DEB355AA3D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009f1f6b-001e-0087-09c7-f310b1000000',
  'x-ms-client-request-id',
  '6352c79e-62e1-4333-ae44-e78d6e2675b3',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:57:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158350665304503953')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009fed9f-001e-0087-2fc7-f310b1000000',
  'x-ms-client-request-id',
  '9565e8b7-d4f7-489f-9bfe-45f6edc9dcbb',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Fri, 06 Mar 2020 14:59:32 GMT'
]);
