let nock = require('nock');

module.exports.testInfo = {"share":"share156758470938206924","dir":"dir156758470983103227"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758470938206924')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:49 GMT',
  'ETag',
  '"0x8D7310F89727010"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c97416e-601a-0123-4cf8-62934d000000',
  'x-ms-client-request-id',
  'a1bad86b-b7c4-41c9-9b23-090ea75291d7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:11:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758470938206924/dir156758470983103227')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:11:50 GMT',
  'ETag',
  '"0x8D7310F89B4E354"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '545eeb5a-501a-00b1-09f8-62e996000000',
  'x-ms-client-request-id',
  '2e8713bb-906e-43e0-98d7-b8b8975ac8bf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:11:50.0818260Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:11:50.0818260Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:11:50.0818260Z',
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
  'Wed, 04 Sep 2019 08:11:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758470938206924')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c41f8d1-d01a-00cd-63f8-62c769000000',
  'x-ms-client-request-id',
  '22bd20bd-b014-4682-9b69-e01d63bf0855',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:11:49 GMT',
  'Connection',
  'close' ]);

