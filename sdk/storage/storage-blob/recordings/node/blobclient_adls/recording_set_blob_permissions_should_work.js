let nock = require('nock');

module.exports.testInfo = {"container":"container156929855140504193","blob":"blob156929855282604254"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929855140504193')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:29 GMT',
  'ETag',
  '"0x8D740A546C78C9F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f9748cf-701e-0000-1e8e-72459e000000',
  'x-ms-client-request-id',
  'da344bb0-d2f7-480d-8afa-5b5c63cce1bd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:28 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929855140504193/blob156929855282604254', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:31 GMT',
  'ETag',
  '"0x8D740A54789233A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3a500fe-701e-0088-0d8e-72fd47000000',
  'x-ms-client-request-id',
  'fc895406-50c6-4940-a646-ea4daa733dd3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Sep 2019 04:11:30 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156929855140504193/blob156929855282604254')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:11:31 GMT',
  'ETag',
  '"0x8D740A54789233A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'db95f9e3-501f-007a-148e-722fd3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '355d62b6-a6fb-42ce-a66a-ed56fe17fcaa',
  'Date',
  'Tue, 24 Sep 2019 04:11:32 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929855140504193/blob156929855282604254')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:11:31 GMT',
  'ETag',
  '"0x8D740A54789233A"',
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
  'a562f9ec-901f-000a-588e-725c17000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '9454011a-3344-4740-8446-ad0da434ccdd',
  'Date',
  'Tue, 24 Sep 2019 04:11:33 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929855140504193')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23f0ef3f-d01e-0024-378e-72dcd0000000',
  'x-ms-client-request-id',
  'f1c2491f-31db-4997-865f-2f71b98f0354',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:34 GMT' ]);
