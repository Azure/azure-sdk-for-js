let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157534361911809216"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157534361911809216')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:01 GMT',
  'ETag',
  '"0x8D7779FD2E192C4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '88bc6bf8-001e-0087-6388-a910b1000000',
  'x-ms-client-request-id',
  '6cdf1f86-cc21-4a0b-a1be-03c00c71524e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:01 GMT' ]);
