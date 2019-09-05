let nock = require('nock');

module.exports.testInfo = {"share":"share156767536862805835","dir":"dir156767536905905488"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767536862805835')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:48 GMT',
  'ETag',
  '"0x8D731E29E945AC5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd3e2800c-201a-00bb-11cb-634d21000000',
  'x-ms-client-request-id',
  '044336b5-b2cc-4b57-bd1a-56f2a1dffd9b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767536862805835/dir156767536905905488')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:49 GMT',
  'ETag',
  '"0x8D731E29ED28AFC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'de7a56f2-101a-014b-37cb-63f5dd000000',
  'x-ms-client-request-id',
  '2ced6d2e-c94d-4f42-876c-9cf38fee9f72',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:49.3182716Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:49.3182716Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:49.3182716Z',
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
  'Thu, 05 Sep 2019 09:22:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767536862805835/dir156767536905905488')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86121f16-f01a-00ca-60cb-63ab0a000000',
  'x-ms-client-request-id',
  'b5d7cb1d-7c84-4c6d-a965-6a9e8749aaa5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '0',
  'Date',
  'Thu, 05 Sep 2019 09:22:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767536862805835')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '02d12acb-d01a-0126-57cb-634196000000',
  'x-ms-client-request-id',
  '0dd2a500-4488-498a-8417-b2150dd3c4f6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:49 GMT',
  'Connection',
  'close' ]);

