let nock = require('nock');

module.exports.testInfo = {"share":"share156758471066500330","dir":"dir156758471106608039","dir156758471106608039":"dir156758471106608039156758471148608395","now":"2019-09-04T08:11:51.486Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758471066500330')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:50 GMT',
  'ETag',
  '"0x8D7310F8A317F02"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c2c79164-401a-0092-30f8-627355000000',
  'x-ms-client-request-id',
  '764d9086-7e22-4519-a44f-a19ad54f3c40',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:11:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758471066500330/dir156758471106608039')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:51 GMT',
  'ETag',
  '"0x8D7310F8A710DF6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1ec6210a-c01a-012a-71f8-62d69e000000',
  'x-ms-client-request-id',
  '9d33dc06-fea7-469a-9f65-3dd1703923e3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:11:51.3149942Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:11:51.3149942Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:11:51.3149942Z',
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
  'Wed, 04 Sep 2019 08:11:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758471066500330/dir156758471106608039156758471148608395')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:51 GMT',
  'ETag',
  '"0x8D7310F8A8B25E0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c79199cf-e01a-007f-6bf8-623818000000',
  'x-ms-client-request-id',
  'd8872b01-13be-4280-80d5-cbd68fbb0ac9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:11:51.4860000Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:11:51.4860000Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:11:51.4860000Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:11:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156758471066500330/dir156758471106608039156758471148608395')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:51 GMT',
  'ETag',
  '"0x8D7310F8A8B25E0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c79199d1-e01a-007f-6cf8-623818000000',
  'x-ms-client-request-id',
  'b064cb67-8c2e-49a9-8d8d-f09580a9c4c3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key',
  'value',
  'x-ms-file-change-time',
  '2019-09-04T08:11:51.4860000Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:11:51.4860000Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:11:51.4860000Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:11:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758471066500330')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e53e9a5e-c01a-0105-70f8-62db55000000',
  'x-ms-client-request-id',
  'd547f45d-eef1-4ca6-bff8-278bd2f7cf78',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:11:51 GMT',
  'Connection',
  'close' ]);

