let nock = require('nock');

module.exports.testInfo = {"container":"container156929855795205002","blob":"blob156929855909804199"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929855795205002')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:36 GMT',
  'ETag',
  '"0x8D740A54A95CD06"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d6b1bd2-701e-0022-088e-722ba8000000',
  'x-ms-client-request-id',
  'cbfdb30a-6922-4c5d-b011-46a909c4a22d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:35 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929855795205002/blob156929855909804199', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:37 GMT',
  'ETag',
  '"0x8D740A54B49CA91"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec2ab06f-901e-0023-798e-722a55000000',
  'x-ms-client-request-id',
  'ae6f2948-1577-4039-8d5d-48efdeadd208',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Sep 2019 04:11:37 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156929855795205002/blob156929855909804199')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:11:37 GMT',
  'ETag',
  '"0x8D740A54B49CA91"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '48fda6d2-901f-006c-308e-72ee4d000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8dce27ce-f41d-4bf8-9805-f3ff741c79a9',
  'Date',
  'Tue, 24 Sep 2019 04:11:37 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929855795205002/blob156929855909804199')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:11:37 GMT',
  'ETag',
  '"0x8D740A54B49CA91"',
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
  '80436891-e01f-0005-538e-72b1e1000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b96e4500-02a2-4afe-abc6-45ee36269793',
  'Date',
  'Tue, 24 Sep 2019 04:11:39 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929855795205002')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18dc356b-001e-008c-3f8e-7208c5000000',
  'x-ms-client-request-id',
  '2e2da942-e532-4569-9523-fcafe2488915',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:40 GMT' ]);
