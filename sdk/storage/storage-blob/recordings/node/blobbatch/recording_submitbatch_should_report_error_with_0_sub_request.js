let nock = require('nock');

module.exports.testInfo = {"container":"container156776185640807461"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776185640807461')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:24:16 GMT',
  'ETag',
  '"0x8D732ABFD52E2B0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fdbe2dd3-301e-0043-7494-6411df000000',
  'x-ms-client-request-id',
  'ecfa516d-29ae-465e-8d31-181eef104785',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776185640807461')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c5482bd0-301e-00fa-0d94-6415c5000000',
  'x-ms-client-request-id',
  '324e21b9-e2b1-410d-86a7-f3dfab882f15',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:16 GMT',
  'Connection',
  'close' ]);

