let nock = require('nock');

module.exports.hash = "8cab9c9ecdbb667b357edc9f0e2eeed7";

module.exports.testInfo = {"uniqueName":{"container":"container160680784074004550"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160680784074004550')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 01 Dec 2020 07:30:43 GMT',
  'ETag',
  '"0x8D895CB02D19263"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c0e47edb-a01e-002a-28b3-c78aed000000',
  'x-ms-client-request-id',
  'a8cea6cd-a1c2-43b9-9c43-04fd688ea1da',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 01 Dec 2020 07:30:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160680784074004550')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c0e5017e-a01e-002a-64b4-c78aed000000',
  'x-ms-client-request-id',
  '802b25c6-4abb-4682-b919-ba45404a09f4',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 01 Dec 2020 07:31:36 GMT'
]);
