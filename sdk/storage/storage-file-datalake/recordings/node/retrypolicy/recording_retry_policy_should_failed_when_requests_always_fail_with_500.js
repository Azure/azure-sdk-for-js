let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157534389672500741"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157534389672500741')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:39 GMT',
  'ETag',
  '"0x8D777A078589DC4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '835725b5-901e-004e-1f89-a9807b000000',
  'x-ms-client-request-id',
  '9a229d15-d850-45e0-bc46-891bfc4e4318',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:39 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157534389672500741')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '83572dc5-901e-004e-0589-a9807b000000',
  'x-ms-client-request-id',
  'ec93cfd9-7a15-40ea-ae0b-fde0cb937f43',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:43 GMT' ]);
