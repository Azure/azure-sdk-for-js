let nock = require('nock');

module.exports.testInfo = {"share":"share156767535239102723","dir":"dir156767535278205324"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767535239102723')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:32 GMT',
  'ETag',
  '"0x8D731E294E25C42"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f26125b-d01a-0016-34cb-630154000000',
  'x-ms-client-request-id',
  '98c3ce9c-1116-49bd-bfa8-df4cd40972b1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767535239102723/dir156767535278205324')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:33 GMT',
  'ETag',
  '"0x8D731E295211867"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5df4d2f4-501a-007a-56cb-63eac3000000',
  'x-ms-client-request-id',
  '1b94c85e-fe65-4be3-8487-eeb603d1cb40',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:33.0558567Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:33.0558567Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:33.0558567Z',
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
  'Thu, 05 Sep 2019 09:22:32 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767535239102723')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dccb06fc-d01a-0039-05cb-630c9f000000',
  'x-ms-client-request-id',
  '79132642-4214-4bb5-a836-55df6de74202',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:32 GMT',
  'Connection',
  'close' ]);

