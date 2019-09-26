let nock = require('nock');

module.exports.testInfo = {"container":"container156776185462901042"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776185462901042')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:24:14 GMT',
  'ETag',
  '"0x8D732ABFC431CD2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ad4252b3-001e-00e1-0794-642bc6000000',
  'x-ms-client-request-id',
  '0fd7c517-d4d2-442d-b9ce-b3d141914d0b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776185462901042')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80f9265c-601e-00d8-1494-64d0da000000',
  'x-ms-client-request-id',
  '0f663f80-0eb6-41ce-a0e2-2ef741e2ac95',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:14 GMT',
  'Connection',
  'close' ]);

