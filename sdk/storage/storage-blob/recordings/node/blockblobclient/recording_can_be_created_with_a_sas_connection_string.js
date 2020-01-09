let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370408039302496","blob":"blob157370408073602691"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370408039302496')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:01:20 GMT',
  'ETag',
  '"0x8D768B74ECF28C0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ea56b21b-301e-003a-63a0-9a255f000000',
  'x-ms-client-request-id',
  '3357fea5-81e6-4aeb-bb62-7ec755a8e6f9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:01:20 GMT' ]);
