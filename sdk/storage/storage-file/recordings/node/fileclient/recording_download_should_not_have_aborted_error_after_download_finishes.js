let nock = require('nock');

module.exports.testInfo = {"share":"share156816840416106608","dir":"dir156816840458308505","file":"file156816840500709758"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840416106608')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:04 GMT',
  'ETag',
  '"0x8D7365E8EB2C399"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70bc0825-601a-0066-6c47-68d4a6000000',
  'x-ms-client-request-id',
  '046d4fde-2571-4e14-962a-6a2bcae469bf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:04 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840416106608/dir156816840458308505')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:04 GMT',
  'ETag',
  '"0x8D7365E8EF3343E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a7852ee-c01a-002f-6947-68e7c6000000',
  'x-ms-client-request-id',
  '1002a3d6-05ce-49f3-9717-352ec8efe6ae',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:04.9343550Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:04.9343550Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:04.9343550Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:04 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840416106608/dir156816840458308505/file156816840500709758')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:05 GMT',
  'ETag',
  '"0x8D7365E8F34199B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '71f5dc45-801a-0028-4c47-681143000000',
  'x-ms-client-request-id',
  '64282325-6b10-49eb-881e-d181fc348134',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:05.3596571Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:05.3596571Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:05.3596571Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:04 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840416106608/dir156816840458308505/file156816840500709758', "Hello World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:05 GMT',
  'ETag',
  '"0x8D7365E8F7685DF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45dc1b61-401a-0017-7a47-68a69f000000',
  'x-ms-client-request-id',
  'ba4e949e-a3ba-49b3-b71a-8fc942da4fdb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:05 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816840416106608/dir156816840458308505/file156816840500709758')
  .reply(200, "Hello World", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365E8F7685DF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f2f6391-601a-0044-1347-68ba90000000',
  'x-ms-client-request-id',
  'f129094f-4af7-464e-9b6c-1b1116f270a0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:20:05.3596571Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:05.3596571Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:05.3596571Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:05 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816840416106608')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '199c975c-201a-0048-1347-685461000000',
  'x-ms-client-request-id',
  '9543ac76-a77d-4cfa-863f-2208657a4192',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:06 GMT' ]);

