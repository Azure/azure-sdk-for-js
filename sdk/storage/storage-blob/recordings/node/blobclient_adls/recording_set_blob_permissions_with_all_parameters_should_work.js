let nock = require('nock');

module.exports.testInfo = {"container":"container157113257971500971","blob":"blob157113258087100048"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113257971500971')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:38:06 GMT',
  'ETag',
  '"0x8D7515361CA62C2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f7f4a09f-401e-0008-7c3c-835eed000000',
  'x-ms-client-request-id',
  '3468bba7-91e8-40a8-ac94-e01a4308befc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:38:05 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113257971500971/blob157113258087100048', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:38:07 GMT',
  'ETag',
  '"0x8D75153627C1CE4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f8004f7d-801e-0096-473c-8327aa000000',
  'x-ms-client-request-id',
  '78e68439-b1e4-4e7c-90d4-53b2209780e2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 15 Oct 2019 09:38:06 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container157113257971500971/blob157113258087100048')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:38:07 GMT',
  'ETag',
  '"0x8D75153627C1CE4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '01c634fa-001f-0026-193c-83de2a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b7b14676-9deb-4de0-998b-f42e0dad80ed',
  'Date',
  'Tue, 15 Oct 2019 09:38:07 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113257971500971/blob157113258087100048')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:38:07 GMT',
  'ETag',
  '"0x8D75153627C1CE4"',
  'Vary',
  'Origin',
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
  'dd72d875-701f-0000-693c-83459e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e927b637-6be3-4669-9183-53832b2c87f2',
  'Date',
  'Tue, 15 Oct 2019 09:38:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113257971500971')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2cebf61e-001e-0069-743c-831a32000000',
  'x-ms-client-request-id',
  'd619f9cb-b0ff-48b5-8ee3-328ac75f773f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:38:10 GMT',
  'Connection',
  'close' ]);

