let nock = require('nock');

module.exports.testInfo = {"container":"container156929858180809859","blob":"blob156929858306004268","blob_move":"blob_move156929858534008484"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929858180809859')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:59 GMT',
  'ETag',
  '"0x8D740A558CE9405"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21c3dd69-a01e-002b-698e-723126000000',
  'x-ms-client-request-id',
  'd7d9ef08-7651-4e53-ad9b-904eac3b846d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:59 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929858180809859/blob156929858306004268', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:12:01 GMT',
  'ETag',
  '"0x8D740A5598E48A2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fe1043a8-e01e-002c-708e-72c7a3000000',
  'x-ms-client-request-id',
  '61ece8d5-eaa6-4a6b-a631-3f14a81148d8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Sep 2019 04:12:00 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156929858180809859/blob156929858306004268')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:12:01 GMT',
  'ETag',
  '"0x8D740A5598E48A2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '2642c13d-201f-0013-028e-72707f000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f0f6b93e-6100-4cc5-a71a-5f92e7fc3f82',
  'Date',
  'Tue, 24 Sep 2019 04:12:02 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929858180809859/blob_move156929858534008484')
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9aa84b35-701f-0029-568e-7233dc000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6fd8a1b1-704d-4b61-8563-e6c143ccbb6a',
  'Date',
  'Tue, 24 Sep 2019 04:12:03 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929858180809859/blob_move156929858534008484')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:12:01 GMT',
  'ETag',
  '"0x8D740A5598E48A2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-rw-rw-',
  'x-ms-acl',
  'user::rw-,group::rw-,other::rw-',
  'x-ms-request-id',
  'fd4187bd-401f-004c-648e-728281000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8281c6bb-4220-4d35-8c79-2bc976e97d52',
  'Date',
  'Tue, 24 Sep 2019 04:12:04 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929858180809859/blob_move156929858534008484')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:12:01 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D740A5598E48A2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3c44762-d01e-00a7-1e8e-727c7d000000',
  'x-ms-client-request-id',
  'a5ec1f86-0241-4719-920e-17a4e5692506',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Tue, 24 Sep 2019 04:12:01 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Tue, 24 Sep 2019 04:12:05 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929858180809859')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3bcdf19f-901e-00a0-268e-728af8000000',
  'x-ms-client-request-id',
  '9e23afd1-ae7b-4666-a63c-aba97f34cb2c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:12:07 GMT' ]);
