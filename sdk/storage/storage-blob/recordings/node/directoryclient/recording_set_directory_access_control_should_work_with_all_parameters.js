let nock = require('nock');

module.exports.testInfo = {"container":"container156929889668508148","directory":"directory156929889782409893"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929889668508148')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:17:14 GMT',
  'ETag',
  '"0x8D740A6147C3A12"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '68f3916c-601e-0097-458e-722657000000',
  'x-ms-client-request-id',
  '3c018a64-02fc-4af2-a9b2-6ee482222565',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:17:14 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929889668508148/directory156929889782409893')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:17:16 GMT',
  'ETag',
  '"0x8D740A6152B79AF"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c0b5888d-501f-0071-2c8e-7237a7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '2b1e3aa2-00d9-4718-96af-75da3fe92afa',
  'Date',
  'Tue, 24 Sep 2019 04:17:16 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156929889668508148/directory156929889782409893')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:17:16 GMT',
  'ETag',
  '"0x8D740A6152B79AF"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'd0d2876c-701f-000b-1c8e-725dea000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd66da898-6f40-4b9f-a8e7-c386039d2665',
  'Date',
  'Tue, 24 Sep 2019 04:17:17 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929889668508148/directory156929889782409893')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:17:16 GMT',
  'ETag',
  '"0x8D740A6152B79AF"',
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
  'e91cf7cb-b01f-003f-388e-72f242000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'ccefae78-6c96-4a7d-befc-218813cc6a50',
  'Date',
  'Tue, 24 Sep 2019 04:17:17 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929889668508148')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25cb5310-f01e-0011-4b8e-727285000000',
  'x-ms-client-request-id',
  '712fbf3f-eb6c-46d1-93d4-c883484b5aa5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:17:19 GMT' ]);
