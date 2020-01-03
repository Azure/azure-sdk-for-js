let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157534361777707657"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157534361777707657')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:00 GMT',
  'ETag',
  '"0x8D7779FD22E5A5A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f02dea4-601e-0097-5288-a92657000000',
  'x-ms-client-request-id',
  'f75b794e-0951-4d1b-854c-9136e4c40b8f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:20:59 GMT' ]);
