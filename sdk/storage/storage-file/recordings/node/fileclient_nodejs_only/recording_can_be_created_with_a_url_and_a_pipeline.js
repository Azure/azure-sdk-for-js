let nock = require('nock');

module.exports.testInfo = {"share":"share156816852092008870","dir":"dir156816852132205992","file":"file156816852173602992"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816852092008870')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:01 GMT',
  'ETag',
  '"0x8D7365ED447B2F4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb1198d5-001a-0032-7e47-683e2c000000',
  'x-ms-client-request-id',
  '2dc7f3b6-b82b-4cf4-bd22-b3913b151bb1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:00 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816852092008870/dir156816852132205992')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:01 GMT',
  'ETag',
  '"0x8D7365ED485DD0E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '276e3c1f-a01a-0059-1947-68637a000000',
  'x-ms-client-request-id',
  '770c76e7-164e-485f-aff3-5ef72eab163b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:22:01.6582926Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:22:01.6582926Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:22:01.6582926Z',
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
  'Wed, 11 Sep 2019 02:22:01 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816852092008870/dir156816852132205992/file156816852173602992')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:02 GMT',
  'ETag',
  '"0x8D7365ED4C589B6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3b0527d-101a-004b-2047-685766000000',
  'x-ms-client-request-id',
  '5aa960bc-63e3-438e-8d7b-c07442e25e1a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:22:02.0755894Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:22:02.0755894Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:22:02.0755894Z',
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
  'Wed, 11 Sep 2019 02:22:01 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816852092008870/dir156816852132205992/file156816852173602992')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:02 GMT',
  'ETag',
  '"0x8D7365ED5092EBC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '661b9acb-201a-0007-2a47-689079000000',
  'x-ms-client-request-id',
  '55e72b2c-e4b7-4ad3-8e7a-3a08869f53d7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:22:01 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156816852092008870/dir156816852132205992/file156816852173602992')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:22:02 GMT',
  'ETag',
  '"0x8D7365ED5092EBC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53eb18d5-501a-0021-5a47-680bcd000000',
  'x-ms-client-request-id',
  '240f6980-f581-43af-abc3-cf6341e6d697',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:22:02.5189052Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:22:02.0755894Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:22:02.0755894Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:22:02 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816852092008870')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '388cf71a-a01a-0034-1347-68c954000000',
  'x-ms-client-request-id',
  '990c74d0-8624-4c43-adaa-34b156b9ce20',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:22:03 GMT' ]);

