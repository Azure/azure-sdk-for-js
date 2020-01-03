let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370433929509590","blob":"blob157370433962405028"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370433929509590')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:39 GMT',
  'ETag',
  '"0x8D768B7E91E7396"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '533b81e5-e01e-005e-0aa0-9a95ff000000',
  'x-ms-client-request-id',
  'd8de6a07-5a85-4a65-bcbd-e761d609206a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:39 GMT' ]);
