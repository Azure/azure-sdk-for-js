let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370434258401251","blob":"blob157370434292007696"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370434258401251')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:42 GMT',
  'ETag',
  '"0x8D768B7EB15EA04"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3b46fe3-301e-0018-2ca0-9a4b69000000',
  'x-ms-client-request-id',
  'bd9e0913-116b-49a8-8132-36edc30037e7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:42 GMT' ]);
