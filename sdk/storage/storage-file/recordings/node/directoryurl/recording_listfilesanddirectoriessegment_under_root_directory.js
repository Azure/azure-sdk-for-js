let nock = require('nock');

module.exports.testInfo = {"share":"share156767535360207097","dir":"dir156767535399807608","date":"2019-09-05T09:22:34.395Z","pre1567675354395":"pre1567675354395156767535439505557","pre1567675354395156767535439505557dir0":"pre1567675354395156767535439505557dir0156767535439504584","pre1567675354395156767535439505557dir1":"pre1567675354395156767535439505557dir1156767535482603045","pre1567675354395156767535439505557dir2":"pre1567675354395156767535439505557dir2156767535523302652","pre1567675354395156767535439505557file0":"pre1567675354395156767535439505557file0156767535562802072","pre1567675354395156767535439505557file1":"pre1567675354395156767535439505557file1156767535603002987","pre1567675354395156767535439505557file2":"pre1567675354395156767535439505557file2156767535643804955"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767535360207097')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:33 GMT',
  'ETag',
  '"0x8D731E2959BA0BE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e3ad5d8d-b01a-0142-6fcb-63b00e000000',
  'x-ms-client-request-id',
  'f95b116b-7319-4e8e-b96c-534bddb9ef31',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767535360207097/dir156767535399807608')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:34 GMT',
  'ETag',
  '"0x8D731E295D7EA93"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2a8dd731-901a-0137-78cb-63db22000000',
  'x-ms-client-request-id',
  'c4c0649b-1652-43c6-b645-0d236dfb348a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:34.2539923Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:34.2539923Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:34.2539923Z',
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
  'Thu, 05 Sep 2019 09:22:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767535360207097/pre1567675354395156767535439505557dir0156767535439504584')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:34 GMT',
  'ETag',
  '"0x8D731E29615509F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '63c122b6-101a-008f-32cb-637ee9000000',
  'x-ms-client-request-id',
  '678388ca-a917-4ec5-a22b-f9409ebff725',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:34.6563743Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:34.6563743Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:34.6563743Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:22:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767535360207097/pre1567675354395156767535439505557dir1156767535482603045')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:35 GMT',
  'ETag',
  '"0x8D731E29656FD68"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8518e962-c01a-00b3-71cb-63572e000000',
  'x-ms-client-request-id',
  '2f02a1c4-b774-43a6-98bb-5c242cf89745',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:35.0867816Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:35.0867816Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:35.0867816Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:22:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767535360207097/pre1567675354395156767535439505557dir2156767535523302652')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:35 GMT',
  'ETag',
  '"0x8D731E296946370"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54811caa-501a-0128-17cb-636826000000',
  'x-ms-client-request-id',
  'a0996264-aeb0-449b-98b6-dc16ab23ae17',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:35.4891632Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:35.4891632Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:35.4891632Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835075647468208128',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:22:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767535360207097/pre1567675354395156767535439505557file0156767535562802072')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:35 GMT',
  'ETag',
  '"0x8D731E296D15427"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6cc03e32-e01a-0050-60cb-6335d3000000',
  'x-ms-client-request-id',
  '0a843f94-9515-413d-a6c6-ee044192d2c1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:35.8885415Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:35.8885415Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:35.8885415Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835146016212385792',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:22:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767535360207097/pre1567675354395156767535439505557file1156767535603002987')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:36 GMT',
  'ETag',
  '"0x8D731E2970E44E1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f12c88d1-701a-00d4-75cb-6347d2000000',
  'x-ms-client-request-id',
  'be5d79b2-2c7f-4559-9102-676b75567e18',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:36.2879201Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:36.2879201Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:36.2879201Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835110831840296960',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:22:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767535360207097/pre1567675354395156767535439505557file2156767535643804955')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:36 GMT',
  'ETag',
  '"0x8D731E2974C9580"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54144e94-001a-00ac-64cb-63e42a000000',
  'x-ms-client-request-id',
  '20ad1564-dc1c-4e43-85bd-d58e134c3f4e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:36.6963072Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:36.6963072Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:36.6963072Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835181200584474624',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 05 Sep 2019 09:22:35 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767535360207097/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156767535360207097\" DirectoryPath=\"\"><Prefix>pre1567675354395156767535439505557</Prefix><Entries><Directory><Name>pre1567675354395156767535439505557dir0156767535439504584</Name><Properties /></Directory><Directory><Name>pre1567675354395156767535439505557dir1156767535482603045</Name><Properties /></Directory><Directory><Name>pre1567675354395156767535439505557dir2156767535523302652</Name><Properties /></Directory><File><Name>pre1567675354395156767535439505557file0156767535562802072</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1567675354395156767535439505557file1156767535603002987</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1567675354395156767535439505557file2156767535643804955</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'abe486c1-201a-004f-6bcb-6386d7000000',
  'x-ms-client-request-id',
  'ff6cbfb0-4e6c-4925-9554-66bf86849748',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:22:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767535360207097/pre1567675354395156767535439505557file0156767535562802072')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aa4c5793-b01a-00a9-4ecb-6336f1000000',
  'x-ms-client-request-id',
  '1533a3e1-3aaf-4d67-9947-1ffd8e769238',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767535360207097/pre1567675354395156767535439505557file1156767535603002987')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '516f9f6e-b01a-011f-73cb-63ba8a000000',
  'x-ms-client-request-id',
  '7a100879-9701-44cf-8239-1b6d2f719b4f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767535360207097/pre1567675354395156767535439505557file2156767535643804955')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d8be7f6-b01a-0120-0ccb-637229000000',
  'x-ms-client-request-id',
  '20ce949a-e0cb-499d-a5c3-bf22590e2e64',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767535360207097/pre1567675354395156767535439505557dir0156767535439504584')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a95b6ba8-c01a-013a-4bcb-6313f6000000',
  'x-ms-client-request-id',
  '65e13cf2-b59d-401a-992f-b965ca15df7b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767535360207097/pre1567675354395156767535439505557dir1156767535482603045')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '989d720f-601a-00aa-49cb-63d795000000',
  'x-ms-client-request-id',
  '394dd5b9-6651-4584-8924-83b85c11f542',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767535360207097/pre1567675354395156767535439505557dir2156767535523302652')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '89a2658b-401a-00f0-6fcb-63b172000000',
  'x-ms-client-request-id',
  '4a68cc46-4aad-4fde-a307-416e1bc29590',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767535360207097')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09516ed4-001a-0015-1ccb-63e030000000',
  'x-ms-client-request-id',
  '75a12a41-3309-435f-b393-1016204b57f6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:39 GMT',
  'Connection',
  'close' ]);

