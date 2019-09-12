let nock = require('nock');

module.exports.testInfo = {"container":"container156776211611409007","blob":"blob156776211651303455"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776211611409007')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:36 GMT',
  'ETag',
  '"0x8D732AC981DFD97"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c16f6be-301e-00c5-5e95-64dd66000000',
  'x-ms-client-request-id',
  'b7ba6623-3f53-4e5c-b110-766fc6eda50a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776211611409007')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9af365f6-a01e-000c-5f95-64608b000000',
  'x-ms-client-request-id',
  '4e0f570c-9342-48ff-b7fa-bc7e7cef1055',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:36 GMT',
  'Connection',
  'close' ]);

