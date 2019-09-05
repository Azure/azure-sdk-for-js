let nock = require('nock');

module.exports.testInfo = {"share":"share156767533833503723","dir":"dir156767533876609004"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767533833503723')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:18 GMT',
  'ETag',
  '"0x8D731E28C85E88B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43bb02ba-301a-0088-62cb-63128a000000',
  'x-ms-client-request-id',
  '5356758e-500c-4b7d-846d-80b27d8017ab',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767533833503723/dir156767533876609004')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:19 GMT',
  'ETag',
  '"0x8D731E28CC9965C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '65d5cec8-001a-0058-1bcb-632fdc000000',
  'x-ms-client-request-id',
  'cbc19199-8b45-4ba2-a64a-4d966a7cfed7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:19.0605916Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:19.0605916Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:19.0605916Z',
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
  'Thu, 05 Sep 2019 09:22:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767533833503723/dir156767533876609004')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:19 GMT',
  'ETag',
  '"0x8D731E28D074A8C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a5ed8d7-d01a-0080-1acb-630885000000',
  'x-ms-client-request-id',
  'ef603381-e24b-4e08-abcb-b83d37237ba1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:22:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767533833503723/dir156767533876609004')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:19 GMT',
  'ETag',
  '"0x8D731E28D074A8C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '13b74c36-301a-013e-40cb-639ef1000000',
  'x-ms-client-request-id',
  '7046465c-a9b1-4bad-b11c-81b57c4215f9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key0',
  'val0',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'x-ms-file-change-time',
  '2019-09-05T09:22:19.4649740Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:19.0605916Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:19.0605916Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key0,x-ms-meta-keya,x-ms-meta-keyb,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:22:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767533833503723')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a711eb0e-f01a-0153-60cb-632aba000000',
  'x-ms-client-request-id',
  'ca7fa520-07f2-46b4-abce-80fd9ee0346a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:20 GMT',
  'Connection',
  'close' ]);

