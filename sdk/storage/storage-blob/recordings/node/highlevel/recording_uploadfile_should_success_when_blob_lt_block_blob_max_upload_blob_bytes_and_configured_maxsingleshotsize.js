let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370433673006841","blob":"blob157370433705500583"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370433673006841')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:36 GMT',
  'ETag',
  '"0x8D768B7E796B0C8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d979f11-701e-0036-74a0-9acbae000000',
  'x-ms-client-request-id',
  '25e4eedd-3e79-4395-9122-dac95ba53ab0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:36 GMT' ]);
