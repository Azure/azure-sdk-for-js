let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157898059919103669","blob":"blob157898059949907059"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157898059919103669')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 14 Jan 2020 05:43:19 GMT',
  'ETag',
  '"0x8D798B4A90C9E12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbfb1011-001e-00b1-209d-ca09c5000000',
  'x-ms-client-request-id',
  'b64dfaf6-0e5f-4f19-9913-dd49211fd538',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 14 Jan 2020 05:43:18 GMT' ]);
