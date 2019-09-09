let nock = require('nock');

module.exports.testInfo = {"container":"container156776184722703317"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776184722703317')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:24:07 GMT',
  'ETag',
  '"0x8D732ABF7D823C2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9647b257-e01e-0050-1194-6435d3000000',
  'x-ms-client-request-id',
  '3e685933-fdee-4e35-b755-e1b566a047d7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:06 GMT',
  'Connection',
  'close' ]);

