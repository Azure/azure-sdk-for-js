let nock = require('nock');

module.exports.hash = "58ef56ec78fb4a62cb531c5c9c07182a";

module.exports.testInfo = {"uniqueName":{"container":"container159842818519205722","blob":"blob159842818548502669"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842818519205722')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:44 GMT',
  'ETag',
  '"0x8D849949956B74C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb73cf65-401e-005a-177d-7b2b47000000',
  'x-ms-client-request-id',
  'a555dec4-45d2-4d51-96de-e204d3936e0e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 26 Aug 2020 07:49:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842818519205722/blob159842818548502669', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:45 GMT',
  'ETag',
  '"0x8D849949983D33E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dc51439-101e-000a-1d7d-7be917000000',
  'x-ms-client-request-id',
  'fe4e7c2d-6f53-4afa-97f9-4d15efef9abc',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-08-26T07:49:45.2475993Z',
  'Date',
  'Wed, 26 Aug 2020 07:49:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159842818519205722')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb73cfa9-401e-005a-447d-7b2b47000000',
  'x-ms-client-request-id',
  '71340256-faa1-4cac-a961-e96dddd9474b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 26 Aug 2020 07:49:45 GMT'
]);
