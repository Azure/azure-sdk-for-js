let nock = require('nock');

module.exports.testInfo = {"share":"share156767534541104681","dir":"dir156767534580909771","dir156767534580909771":"dir156767534580909771156767534665802209","now":"2019-09-05T09:22:26.658Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534541104681')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:25 GMT',
  'ETag',
  '"0x8D731E290BA37F2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aa4c5775-b01a-00a9-49cb-6336f1000000',
  'x-ms-client-request-id',
  '9d2674a1-e4d0-4040-ad7e-9152f2670ed4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534541104681/dir156767534580909771')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:26 GMT',
  'ETag',
  '"0x8D731E290F6DE60"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '57cc8814-601a-0151-2ccb-639402000000',
  'x-ms-client-request-id',
  '0a16fcb8-388f-4ccb-a419-337803ab2525',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:26.0682336Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:26.0682336Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:26.0682336Z',
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
  'Thu, 05 Sep 2019 09:22:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767534541104681')
  .query(true)
  .reply(200, {"permission":"O:SYG:SYD:(A;OICI;FA;;;BA)(A;OICI;FA;;;SY)(A;;0x1200a9;;;BU)(A;OICIIO;GXGR;;;BU)(A;OICI;0x1301bf;;;AU)(A;;FA;;;SY)(A;OICIIO;GA;;;CO)"}, [ 'Content-Length',
  '149',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab5a8885-901a-0091-21cb-639231000000',
  'x-ms-client-request-id',
  '1a635df9-5b6a-45e5-b0da-ae1da0c2567e',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:22:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767534541104681/dir156767534580909771156767534665802209')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:26 GMT',
  'ETag',
  '"0x8D731E29150DC20"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '08b5175a-601a-00ba-5dcb-6312fd000000',
  'x-ms-client-request-id',
  '5dbba826-7778-4df1-a402-adeab4f81fc6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:26.6580000Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:26.6580000Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:26.6580000Z',
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
  'Thu, 05 Sep 2019 09:22:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767534541104681/dir156767534580909771156767534665802209')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:26 GMT',
  'ETag',
  '"0x8D731E29150DC20"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '299d38ce-101a-00d2-09cb-63746d000000',
  'x-ms-client-request-id',
  'da490239-3b18-4037-a619-12f0165cdfb9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key',
  'value',
  'x-ms-file-change-time',
  '2019-09-05T09:22:26.6580000Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:26.6580000Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:26.6580000Z',
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
  'Thu, 05 Sep 2019 09:22:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767534541104681')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f080992-a01a-0103-5ecb-63e8ea000000',
  'x-ms-client-request-id',
  '0cec4d98-6d59-4f09-bb63-263f1cc84f78',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:26 GMT',
  'Connection',
  'close' ]);

