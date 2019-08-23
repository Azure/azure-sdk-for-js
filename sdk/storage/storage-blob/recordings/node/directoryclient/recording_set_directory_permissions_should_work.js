let nock = require('nock');

module.exports.testInfo = {"container":"container156654450710806022","directory":"directory156654450827808874"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654450710806022')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:11:09 GMT',
  'ETag',
  '"0x8D72799130F8871"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74ba78fe-101e-000a-4f81-59368c000000',
  'x-ms-client-request-id',
  '63c06c8e-9870-462a-bdf0-bff5fad74f50',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654450710806022/directory156654450827808874')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:11 GMT',
  'ETag',
  '"0x8D7279913C0D953"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e7a5746-901f-0049-3f81-59d0d0000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a413e8f2-07ef-4099-93cc-a36a0bc6394a',
  'Date',
  'Fri, 23 Aug 2019 07:11:10 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156654450710806022/directory156654450827808874')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:11 GMT',
  'ETag',
  '"0x8D7279913C0D953"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '71f375f7-701f-0023-7181-5908f8000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '1a409982-3090-40c9-9352-644d0f75b2fe',
  'Date',
  'Fri, 23 Aug 2019 07:11:11 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654450710806022/directory156654450827808874')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:11 GMT',
  'ETag',
  '"0x8D7279913C0D953"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  '---------',
  'x-ms-acl',
  'user::---,group::---,other::---',
  'x-ms-request-id',
  '34fb8c8f-301f-0040-4881-599503000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e63b3ce9-d0b5-4ea8-8e2e-eb920a9be24a',
  'Date',
  'Fri, 23 Aug 2019 07:11:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156654450710806022/directory156654450827808874')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:11 GMT',
  'ETag',
  '"0x8D7279913C0D953"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'd6bc0b2e-101f-0047-4181-59f960000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0fd883a3-02bb-47ee-8d42-ac09969402b7',
  'Date',
  'Fri, 23 Aug 2019 07:11:14 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654450710806022/directory156654450827808874')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:11 GMT',
  'ETag',
  '"0x8D7279913C0D953"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  '---------',
  'x-ms-acl',
  'user::---,group::---,other::---',
  'x-ms-request-id',
  '34fb8c91-301f-0040-4981-599503000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b3ac5cc0-9e07-4d03-b1c6-e016ffcd208a',
  'Date',
  'Fri, 23 Aug 2019 07:11:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654450710806022')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7752e8c5-201e-002e-3e81-59c02c000000',
  'x-ms-client-request-id',
  'acfdcbff-a813-4525-afd7-4b2495cd714b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:16 GMT',
  'Connection',
  'close' ]);

