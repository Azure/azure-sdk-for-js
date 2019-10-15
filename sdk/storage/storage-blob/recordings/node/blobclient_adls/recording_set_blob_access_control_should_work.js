let nock = require('nock');

module.exports.testInfo = {"container":"container156929856366706287","blob":"blob156929856481300291"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929856366706287')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:41 GMT',
  'ETag',
  '"0x8D740A54DFDEA0E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a5c9f66-b01e-009e-408e-723cd9000000',
  'x-ms-client-request-id',
  'f5bd56de-fb4e-4aaa-a58f-456f70cc853d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:41 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929856366706287/blob156929856481300291', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:11:43 GMT',
  'ETag',
  '"0x8D740A54EBD03D2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6877bb09-601e-0072-6b8e-7234a0000000',
  'x-ms-client-request-id',
  '2c98abd0-5c02-4060-ab4f-5052146cf466',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 24 Sep 2019 04:11:42 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156929856366706287/blob156929856481300291')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:11:43 GMT',
  'ETag',
  '"0x8D740A54EBD03D2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'd5bc9b05-a01f-008a-038e-72ffbd000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '9be02868-3e5e-4eea-873a-05874e03ecc8',
  'Date',
  'Tue, 24 Sep 2019 04:11:44 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929856366706287/blob156929856481300291')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:11:43 GMT',
  'ETag',
  '"0x8D740A54EBD03D2"',
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
  '682f1b5e-701f-0000-1d8e-72459e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '537deb02-f54a-4621-9153-45d5364ff58c',
  'Date',
  'Tue, 24 Sep 2019 04:11:44 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929856366706287')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b5a35373-001e-002d-6d8e-72c65e000000',
  'x-ms-client-request-id',
  '4b3c4579-b5ee-47a9-913d-764787ff4702',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:11:46 GMT' ]);
