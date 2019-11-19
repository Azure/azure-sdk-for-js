let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157370309620105705"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157370309620105705')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 03:44:56 GMT',
  'ETag',
  '"0x8D768B504311311"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1437bcd2-a01e-0034-669d-9ac954000000',
  'x-ms-client-request-id',
  '04449f14-42a8-4783-a53e-5964a8c3a7ac',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 03:44:55 GMT' ]);
