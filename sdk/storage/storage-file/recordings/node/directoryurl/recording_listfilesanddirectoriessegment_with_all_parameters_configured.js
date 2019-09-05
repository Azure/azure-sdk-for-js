let nock = require('nock');

module.exports.testInfo = {"share":"share156767536006107462","dir":"dir156767536047901709","date":"2019-09-05T09:22:40.891Z","pre1567675360891":"pre1567675360891156767536089101243","pre1567675360891156767536089101243dir0":"pre1567675360891156767536089101243dir0156767536089108019","pre1567675360891156767536089101243dir1":"pre1567675360891156767536089101243dir1156767536129709220","pre1567675360891156767536089101243dir2":"pre1567675360891156767536089101243dir2156767536171705447","pre1567675360891156767536089101243file0":"pre1567675360891156767536089101243file0156767536211404772","pre1567675360891156767536089101243file1":"pre1567675360891156767536089101243file1156767536251709843","pre1567675360891156767536089101243file2":"pre1567675360891156767536089101243file2156767536291701064"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767536006107462')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:40 GMT',
  'ETag',
  '"0x8D731E29977197F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f4c270c-201a-0002-2ecb-63493b000000',
  'x-ms-client-request-id',
  'f2ce1218-119f-45c7-b3cc-388b58d2213b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767536006107462/dir156767536047901709')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:40 GMT',
  'ETag',
  '"0x8D731E299B578AA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec72169c-f01a-004c-5ecb-6367b3000000',
  'x-ms-client-request-id',
  'ec9fe875-6182-4b5e-8f5b-9d52199b2cd3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:40.7391402Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:40.7391402Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:40.7391402Z',
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
  'Thu, 05 Sep 2019 09:22:40 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767536006107462/pre1567675360891156767536089101243dir0156767536089108019')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:41 GMT',
  'ETag',
  '"0x8D731E299F50210"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e52333f-c01a-0047-2bcb-639cd8000000',
  'x-ms-client-request-id',
  'c4e9f6d0-ceac-499f-a077-0f6f3318c24c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:41.1555344Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:41.1555344Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:41.1555344Z',
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
  'Thu, 05 Sep 2019 09:22:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767536006107462/pre1567675360891156767536089101243dir1156767536129709220')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:41 GMT',
  'ETag',
  '"0x8D731E29A32B64E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a09c9db8-f01a-0073-2acb-63af10000000',
  'x-ms-client-request-id',
  'f76f2a1e-5183-4655-9b62-019d5d9a3251',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:41.5599182Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:41.5599182Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:41.5599182Z',
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
  'Thu, 05 Sep 2019 09:22:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767536006107462/pre1567675360891156767536089101243dir2156767536171705447')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:41 GMT',
  'ETag',
  '"0x8D731E29A71F17F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dccb0705-d01a-0039-08cb-630c9f000000',
  'x-ms-client-request-id',
  '0cdaeeaa-4b90-496a-a197-5b083d76e3a3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:41.9743103Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:41.9743103Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:41.9743103Z',
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
  'Thu, 05 Sep 2019 09:22:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767536006107462/pre1567675360891156767536089101243file0156767536211404772')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:42 GMT',
  'ETag',
  '"0x8D731E29AAF094D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d6788cc-201a-0150-6fcb-63cbde000000',
  'x-ms-client-request-id',
  'ced709d3-7de0-4eb9-a30d-0db3d523957c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:42.3746893Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:42.3746893Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:42.3746893Z',
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
  'Thu, 05 Sep 2019 09:22:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767536006107462/pre1567675360891156767536089101243file1156767536251709843')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:42 GMT',
  'ETag',
  '"0x8D731E29AEC6F5F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1ac2ed20-b01a-004d-70cb-63386f000000',
  'x-ms-client-request-id',
  '44d2b79e-1551-4965-b13a-7d78c8e39d66',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:42.7770719Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:42.7770719Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:42.7770719Z',
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
  'Thu, 05 Sep 2019 09:22:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767536006107462/pre1567675360891156767536089101243file2156767536291701064')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:22:43 GMT',
  'ETag',
  '"0x8D731E29B2A71C4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '86121f01-f01a-00ca-5dcb-63ab0a000000',
  'x-ms-client-request-id',
  'a2b7f646-7e2d-420e-9c94-32e7250f8c65',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:22:43.1834564Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:22:43.1834564Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:22:43.1834564Z',
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
  'Thu, 05 Sep 2019 09:22:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767536006107462/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156767536006107462\" DirectoryPath=\"\"><Prefix>pre1567675360891156767536089101243</Prefix><MaxResults>3</MaxResults><Entries><Directory><Name>pre1567675360891156767536089101243dir0156767536089108019</Name><Properties /></Directory><Directory><Name>pre1567675360891156767536089101243dir1156767536129709220</Name><Properties /></Directory><Directory><Name>pre1567675360891156767536089101243dir2156767536171705447</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU2NzY3NTM2MDg5MTE1Njc2NzUzNjA4OTEwMTI0M2ZpbGUwMTU2NzY3NTM2MjExNDA0Nzcy</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c625cfbb-901a-00ae-67cb-635a92000000',
  'x-ms-client-request-id',
  '3a0ff09a-4086-4ea8-af45-5fda911312a0',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:22:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156767536006107462/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156767536006107462\" DirectoryPath=\"\"><Prefix>pre1567675360891156767536089101243</Prefix><Marker>1!76!cHJlMTU2NzY3NTM2MDg5MTE1Njc2NzUzNjA4OTEwMTI0M2ZpbGUwMTU2NzY3NTM2MjExNDA0Nzcy</Marker><MaxResults>6</MaxResults><Entries><File><Name>pre1567675360891156767536089101243file0156767536211404772</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1567675360891156767536089101243file1156767536251709843</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1567675360891156767536089101243file2156767536291701064</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e4ae7dc2-b01a-0000-13cb-63f783000000',
  'x-ms-client-request-id',
  'e03d0f7e-9f81-4895-8890-de0bbdde17a3',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 05 Sep 2019 09:22:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767536006107462/pre1567675360891156767536089101243file0156767536211404772')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e3ad5d9d-b01a-0142-74cb-63b00e000000',
  'x-ms-client-request-id',
  'a874e16f-72b7-4e02-88d4-a6a370d78981',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767536006107462/pre1567675360891156767536089101243file1156767536251709843')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5760e075-b01a-00cb-7bcb-63f4d6000000',
  'x-ms-client-request-id',
  '1bef8794-6e70-4dc1-8216-9a713528c529',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767536006107462/pre1567675360891156767536089101243file2156767536291701064')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '105c2036-901a-00dc-76cb-635ddd000000',
  'x-ms-client-request-id',
  'bceb2278-79bc-491b-81cc-42f74f0e8b32',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767536006107462/pre1567675360891156767536089101243dir0156767536089108019')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0032daba-801a-00c0-5ccb-630fbd000000',
  'x-ms-client-request-id',
  '458d4ddc-598e-4c1e-90aa-3bb5135bc1e4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767536006107462/pre1567675360891156767536089101243dir1156767536129709220')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2ca141f-e01a-013d-27cb-637f95000000',
  'x-ms-client-request-id',
  'b3bd1cbc-47cb-47a4-80c2-ed40cbc0c0b1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767536006107462/pre1567675360891156767536089101243dir2156767536171705447')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74a09f4a-101a-00fd-48cb-6379a6000000',
  'x-ms-client-request-id',
  'abfecc8f-814b-4d0d-9d65-052296eb367e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767536006107462')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f12c88db-701a-00d4-78cb-6347d2000000',
  'x-ms-client-request-id',
  'd211e301-894b-44ce-bf21-359c4387c2f2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:22:46 GMT',
  'Connection',
  'close' ]);

