let nock = require('nock');

module.exports.testInfo = {"container":"container156929888753708528","directory":"directory156929888868500582"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929888753708528')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:17:05 GMT',
  'ETag',
  '"0x8D740A60F09A5B8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a5efade-b01e-009e-338e-723cd9000000',
  'x-ms-client-request-id',
  'e6e3f44b-3f25-488b-96e4-229006a3f863',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:17:04 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929888753708528/directory156929888868500582')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:17:06 GMT',
  'ETag',
  '"0x8D740A60FB92BCB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b6b78894-c01f-0074-588e-72c3d8000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6b496ec3-39e4-4e35-ba09-84275cce8e51',
  'Date',
  'Tue, 24 Sep 2019 04:17:06 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929888753708528')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '39129780-a01e-006f-6a8e-72ed4a000000',
  'x-ms-client-request-id',
  'bf0b2909-5c0d-4458-acd7-763044faa9dc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:17:07 GMT' ]);
