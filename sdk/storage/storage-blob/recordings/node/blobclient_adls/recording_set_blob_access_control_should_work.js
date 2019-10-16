let nock = require('nock');

module.exports.testInfo = {"container":"container157113258545706672","blob":"blob157113258661308996"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113258545706672')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:38:11 GMT',
  'ETag',
  '"0x8D751536536B02D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '255f1b6d-f01e-00b0-433c-83bc1e000000',
  'x-ms-client-request-id',
  '7ad59221-b20c-4410-be26-3972000361d2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:38:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113258545706672/blob157113258661308996', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:38:13 GMT',
  'ETag',
  '"0x8D7515365E8D493"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'de61d284-e01e-0027-373c-83dfd7000000',
  'x-ms-client-request-id',
  'c8853fc9-85a5-4e1f-9783-5cf2c250a8fb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 15 Oct 2019 09:38:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container157113258545706672/blob157113258661308996')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:38:13 GMT',
  'ETag',
  '"0x8D7515365E8D493"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '1882d314-b01f-0034-1f3c-83ea36000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'dc230c97-3c56-4d2e-a592-52ccb2d5796a',
  'Date',
  'Tue, 15 Oct 2019 09:38:14 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113258545706672/blob157113258661308996')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:38:13 GMT',
  'ETag',
  '"0x8D7515365E8D493"',
  'Vary',
  'Origin',
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
  '116e11d0-501f-001c-063c-839d89000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8eab05f9-4181-4b0c-a6ff-3ebafedca150',
  'Date',
  'Tue, 15 Oct 2019 09:38:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113258545706672')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '84751936-e01e-000e-243c-83a995000000',
  'x-ms-client-request-id',
  'ac6f9045-216e-4dda-9e05-6e7d65e2c74e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:38:16 GMT',
  'Connection',
  'close' ]);

