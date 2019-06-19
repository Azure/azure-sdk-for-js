let nock = require('nock');

module.exports.testInfo = {"share":"share156093649118207719","dir":"dir156093649558809812","file":"file156093649586000399"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093649118207719')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:12 GMT',
  'ETag',
  '"0x8D6F49808310819"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd46b25ce-f01a-0114-5b80-26bba7000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093649118207719/dir156093649558809812')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:14 GMT',
  'ETag',
  '"0x8D6F49808DBC3B9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '494bc6ae-001a-00c9-6180-26ae5c000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093649118207719/dir156093649558809812/file156093649586000399')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:14 GMT',
  'ETag',
  '"0x8D6F498090461AA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a7ad7602-f01a-0098-0780-26b0a9000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093649118207719/dir156093649558809812/file156093649586000399')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:14 GMT',
  'ETag',
  '"0x8D6F498092DC30F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3baf8648-501a-013b-6c80-263a9d000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156093649118207719/dir156093649558809812/file156093649586000399')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:14 GMT',
  'ETag',
  '"0x8D6F498092DC30F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '903ef96f-501a-0112-2e80-264cdf000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 19 Jun 2019 09:25:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156093649118207719')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9563b435-d01a-00ad-6a80-261efc000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:14 GMT',
  'Connection',
  'close' ]);

