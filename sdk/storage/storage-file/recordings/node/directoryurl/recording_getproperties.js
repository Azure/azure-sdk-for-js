let nock = require('nock');

module.exports.testInfo = {"share":"share156767534045708316","dir":"dir156767534089705676"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534045708316')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:20 GMT',
  'ETag',
  '"0x8D731E28DC99A29"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7f1635c-b01a-0096-7ccb-63fe52000000',
  'x-ms-client-request-id',
  'a4209879-f5bb-4cf7-98a6-16d2923c9dd6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534045708316/dir156767534089705676')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:21 GMT',
  'ETag',
  '"0x8D731E28E0B16EE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be84ddf5-701a-0100-4acb-63098e000000',
  'x-ms-client-request-id',
  '35f20323-f2d5-4f0b-a85e-e8c80d150ad2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:21.1675886Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:21.1675886Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:21.1675886Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:22:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767534045708316/dir156767534089705676')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:21 GMT',
  'ETag',
  '"0x8D731E28E0B16EE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0ce51f31-a01a-0023-45cb-636d40000000',
  'x-ms-client-request-id',
  'b9b62c00-1743-450e-99f7-e027880a8960',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-05T09:22:21.1675886Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:21.1675886Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:21.1675886Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:22:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767534045708316')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '892bb886-601a-0095-30cb-631f36000000',
  'x-ms-client-request-id',
  'd0e4ee11-7fb5-4e39-b2bb-6594fe5fa08c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:21 GMT',
  'Connection',
  'close' ]);

