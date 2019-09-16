let nock = require('nock');

module.exports.testInfo = {"container":"container156816855729808643","blob":"blob156816855771702801"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816855729808643')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:37 GMT',
  'ETag',
  '"0x8D7365EE9F93BFE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2bc26f3f-e01e-0038-0947-6827a5000000',
  'x-ms-client-request-id',
  '3e2f3c43-4690-4451-a321-61030dda533e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:36 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816855729808643')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6ed88a2-601e-0029-4347-6810be000000',
  'x-ms-client-request-id',
  '018c248d-a351-42d7-9f31-e3eaf0af7787',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:38 GMT' ]);

