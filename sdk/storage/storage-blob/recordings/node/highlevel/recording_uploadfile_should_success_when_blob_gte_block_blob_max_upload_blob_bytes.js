let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370433584601752","blob":"blob157370433638205654"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370433584601752')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 04:05:36 GMT',
  'ETag',
  '"0x8D768B7E72ED99C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99f63972-001e-001b-2ba0-9a486e000000',
  'x-ms-client-request-id',
  'df70fea1-6118-41d9-8b9c-da3f92fce22a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 04:05:36 GMT' ]);
