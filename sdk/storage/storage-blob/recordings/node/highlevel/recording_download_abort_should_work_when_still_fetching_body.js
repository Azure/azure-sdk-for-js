let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370434224407378","blob":"blob157370434258203955"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370434224407378')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:42 GMT',
  'ETag',
  '"0x8D768B7EAE27B14"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '44cd03b6-101e-0069-6da0-9a3950000000',
  'x-ms-client-request-id',
  '9fe27c22-705e-4646-ad0c-719e097a5c46',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:42 GMT' ]);
