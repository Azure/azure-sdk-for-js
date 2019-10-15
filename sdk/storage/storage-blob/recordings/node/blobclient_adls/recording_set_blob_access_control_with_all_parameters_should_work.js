let nock = require('nock');

module.exports.testInfo = {"container":"container156929856958606864","blob":"blob156929857097109945"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929856958606864')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:47 GMT',
  'ETag',
  '"0x8D740A551857757"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '600107e3-101e-0054-078e-72af14000000',
  'x-ms-client-request-id',
  '127e17ca-3228-4211-9fac-0134702cddfb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:47 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929856958606864/blob156929857097109945', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:49 GMT',
  'ETag',
  '"0x8D740A552591094"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d6b2f75-701e-0022-518e-722ba8000000',
  'x-ms-client-request-id',
  'd8bd0248-f685-474b-8145-d219ed70332e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Sep 2019 04:11:48 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156929856958606864/blob156929857097109945')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:11:49 GMT',
  'ETag',
  '"0x8D740A552591094"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'cf6b9e8c-201f-0018-3d8e-72680b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '69a4feb4-ad76-44ed-b6a2-872fa0491376',
  'Date',
  'Tue, 24 Sep 2019 04:11:50 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929856958606864/blob156929857097109945')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:11:49 GMT',
  'ETag',
  '"0x8D740A552591094"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'x-ms-request-id',
  '89bcaa1f-f01f-005e-2f8e-72b69d000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '72c0727f-2966-468e-a05d-72787f8cbc78',
  'Date',
  'Tue, 24 Sep 2019 04:11:51 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929856958606864')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3353a024-901e-0089-358e-72fcba000000',
  'x-ms-client-request-id',
  '65c8c8a2-eb20-4d2e-bce1-772fe89c1d1a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:51 GMT' ]);
