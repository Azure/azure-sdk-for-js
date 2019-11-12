let nock = require('nock');

module.exports.testInfo = {"share":"share156816847049708249"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816847049708249')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:10 GMT',
  'ETag',
  '"0x8D7365EB63AE9F4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54a3ccbe-801a-0023-6f47-680937000000',
  'x-ms-client-request-id',
  'd02e2d0e-6348-4557-8cf5-666aa403bb8a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:10 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816847049708249/')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:11 GMT',
  'ETag',
  '"0x8D7365EB679531E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3f8288fc-801a-0045-5b47-68bb6d000000',
  'x-ms-client-request-id',
  '2252aaa0-5849-49aa-819f-fb5aa80d445f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'false',
  'x-ms-file-change-time',
  '2019-09-11T02:21:11.2444702Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:11.2444702Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:11.2444702Z',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '0',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:10 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816847049708249')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcc18c6d-b01a-0064-2047-68d65c000000',
  'x-ms-client-request-id',
  'd1fa8dc4-08e8-48f6-90d3-0e90fbf47ec4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:10 GMT' ]);

