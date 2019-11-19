let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370433896900475","blob":"blob157370433929300149"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370433896900475')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:39 GMT',
  'ETag',
  '"0x8D768B7E8EC834F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9a3e44b1-801e-0001-7aa0-9a6701000000',
  'x-ms-client-request-id',
  '04f01e0e-a97b-48c3-9e37-9a4987bd8121',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:38 GMT' ]);
