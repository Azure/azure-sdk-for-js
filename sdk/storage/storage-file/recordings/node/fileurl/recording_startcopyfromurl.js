let nock = require('nock');

module.exports.testInfo = {"share":"share156404672615800002","dir":"dir156404672642706955","file":"file156404672670104534","copiedfile":"copiedfile156404672697400300"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672615800002')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:48 GMT',
  'ETag',
  '"0x8D710E1850BF121"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9332462a-a01a-0065-5fca-428fcb000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:21:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672615800002/dir156404672642706955')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:48 GMT',
  'ETag',
  '"0x8D710E18536207B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc724b81-401a-00c5-1aca-4240ad000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:21:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672615800002/dir156404672642706955/file156404672670104534')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:48 GMT',
  'ETag',
  '"0x8D710E1855F5AD1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '11cc7578-001a-00eb-34ca-42c06a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 25 Jul 2019 09:21:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156404672615800002/dir156404672642706955/copiedfile156404672697400300')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:49 GMT',
  'ETag',
  '"0x8D710E18597DA26"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '181b36da-601a-005a-66ca-423817000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  'f7bea8f7-a799-4fc4-8892-ea20b01cf2c9',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 25 Jul 2019 09:21:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156404672615800002/dir156404672642706955/file156404672670104534')
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:48 GMT',
  'ETag',
  '"0x8D710E1855F5AD1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '39092f45-901a-004f-17ca-42fa8e000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:21:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156404672615800002/dir156404672642706955/copiedfile156404672697400300')
  .reply(200, "", [ 'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Thu, 25 Jul 2019 09:21:49 GMT',
  'ETag',
  '"0x8D710E18597DA26"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e1c4057-d01a-0061-7fca-427a49000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-copy-id',
  'f7bea8f7-a799-4fc4-8892-ea20b01cf2c9',
  'x-ms-copy-source',
  'https://fakestorageaccount.file.core.windows.net/share156404672615800002/dir156404672642706955/file156404672670104534',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Thu, 25 Jul 2019 09:21:49 GMT',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Jul 2019 09:21:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156404672615800002')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f286b27c-b01a-00f9-08ca-42f476000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Thu, 25 Jul 2019 09:21:49 GMT',
  'Connection',
  'close' ]);

