let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370433830003715","blob":"blob157370433862909094"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370433830003715')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:38 GMT',
  'ETag',
  '"0x8D768B7E886D5A9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '528f2cb0-b01e-0064-4fa0-9ad65c000000',
  'x-ms-client-request-id',
  '19ea4716-1d1f-4a2a-bab9-00f59b35aa0f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:37 GMT' ]);
