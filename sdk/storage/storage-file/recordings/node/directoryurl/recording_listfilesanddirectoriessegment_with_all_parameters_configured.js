let nock = require('nock');

module.exports.testInfo = {"share":"share156775316362100125","dir":"dir156775316402005847","date":"2019-09-06T06:59:24.423Z","pre1567753164423":"pre1567753164423156775316442304607","pre1567753164423156775316442304607dir0":"pre1567753164423156775316442304607dir0156775316442301504","pre1567753164423156775316442304607dir1":"pre1567753164423156775316442304607dir1156775316483001647","pre1567753164423156775316442304607dir2":"pre1567753164423156775316442304607dir2156775316523706472","pre1567753164423156775316442304607file0":"pre1567753164423156775316442304607file0156775316563407173","pre1567753164423156775316442304607file1":"pre1567753164423156775316442304607file1156775316603309391","pre1567753164423156775316442304607file2":"pre1567753164423156775316442304607file2156775316643608560"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775316362100125')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:23 GMT',
  'ETag',
  '"0x8D73297C0008554"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f21bb7ac-501a-0128-6780-646826000000',
  'x-ms-client-request-id',
  '17440f26-f125-445f-b00d-3856e94b503e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775316362100125/dir156775316402005847')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:24 GMT',
  'ETag',
  '"0x8D73297C03DE8D6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fadd7e8-801a-001b-6d80-64c980000000',
  'x-ms-client-request-id',
  'a988d972-240c-450f-9cb0-bcbfddbcff76',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:24.2947798Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:24.2947798Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:24.2947798Z',
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
  'Fri, 06 Sep 2019 06:59:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775316362100125/pre1567753164423156775316442304607dir0156775316442301504')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:24 GMT',
  'ETag',
  '"0x8D73297C07B760C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ac284ed-d01a-0154-7980-6446d9000000',
  'x-ms-client-request-id',
  'fc833a9d-d96f-4d8e-8083-15e5bfd1b802',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:24.6981644Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:24.6981644Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:24.6981644Z',
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
  'Fri, 06 Sep 2019 06:59:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775316362100125/pre1567753164423156775316442304607dir1156775316483001647')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:25 GMT',
  'ETag',
  '"0x8D73297C0B9EDCC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1224006-801a-00ef-5a80-640276000000',
  'x-ms-client-request-id',
  '36067a32-2489-49b3-a667-4942dec70b2e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:25.1075532Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:25.1075532Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:25.1075532Z',
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
  'Fri, 06 Sep 2019 06:59:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775316362100125/pre1567753164423156775316442304607dir2156775316523706472')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:25 GMT',
  'ETag',
  '"0x8D73297C0F69062"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '72b02ad6-e01a-007f-5980-643818000000',
  'x-ms-client-request-id',
  'b1b03fa8-fca8-4a55-a1a1-041a59f33250',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:25.5049314Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:25.5049314Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:25.5049314Z',
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
  'Fri, 06 Sep 2019 06:59:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775316362100125/pre1567753164423156775316442304607file0156775316563407173')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:25 GMT',
  'ETag',
  '"0x8D73297C1335A11"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb5010dd-b01a-005d-3180-64fd07000000',
  'x-ms-client-request-id',
  'c9fd74b5-6edd-4d1a-b2a4-156387814dad',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:25.9033105Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:25.9033105Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:25.9033105Z',
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
  'Fri, 06 Sep 2019 06:59:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775316362100125/pre1567753164423156775316442304607file1156775316603309391')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:26 GMT',
  'ETag',
  '"0x8D73297C1710E52"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be6a6f26-101a-0139-4e80-64f292000000',
  'x-ms-client-request-id',
  'ed666483-3d3f-408d-b962-7a4c5c03c6ca',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:26.3076946Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:26.3076946Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:26.3076946Z',
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
  'Fri, 06 Sep 2019 06:59:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775316362100125/pre1567753164423156775316442304607file2156775316643608560')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:26 GMT',
  'ETag',
  '"0x8D73297C1AD89CB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed20c481-201a-004f-1580-6486d7000000',
  'x-ms-client-request-id',
  '1b868b59-bebf-43df-b66a-b0100f6d089b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:26.7040715Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:26.7040715Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:26.7040715Z',
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
  'Fri, 06 Sep 2019 06:59:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775316362100125/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156775316362100125\" DirectoryPath=\"\"><Prefix>pre1567753164423156775316442304607</Prefix><MaxResults>3</MaxResults><Entries><Directory><Name>pre1567753164423156775316442304607dir0156775316442301504</Name><Properties /></Directory><Directory><Name>pre1567753164423156775316442304607dir1156775316483001647</Name><Properties /></Directory><Directory><Name>pre1567753164423156775316442304607dir2156775316523706472</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU2Nzc1MzE2NDQyMzE1Njc3NTMxNjQ0MjMwNDYwN2ZpbGUwMTU2Nzc1MzE2NTYzNDA3MTcz</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '296770aa-b01a-0142-4f80-64b00e000000',
  'x-ms-client-request-id',
  'ed79e21f-ab46-4567-807a-34ea05705ee1',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 06:59:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775316362100125/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156775316362100125\" DirectoryPath=\"\"><Prefix>pre1567753164423156775316442304607</Prefix><Marker>1!76!cHJlMTU2Nzc1MzE2NDQyMzE1Njc3NTMxNjQ0MjMwNDYwN2ZpbGUwMTU2Nzc1MzE2NTYzNDA3MTcz</Marker><MaxResults>6</MaxResults><Entries><File><Name>pre1567753164423156775316442304607file0156775316563407173</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1567753164423156775316442304607file1156775316603309391</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1567753164423156775316442304607file2156775316643608560</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ac284fc-d01a-0154-0480-6446d9000000',
  'x-ms-client-request-id',
  'f9eb2b5c-381b-47e2-ad12-9aedf82c0711',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 06:59:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775316362100125/pre1567753164423156775316442304607file0156775316563407173')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17a2a11b-901a-00ae-1a80-645a92000000',
  'x-ms-client-request-id',
  'bcb49e19-f9b7-4532-9f60-6ee6c71e9636',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775316362100125/pre1567753164423156775316442304607file1156775316603309391')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2e901c0f-901a-0091-7d80-649231000000',
  'x-ms-client-request-id',
  'ace60749-7158-4704-b6ec-3ec18ac6e781',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775316362100125/pre1567753164423156775316442304607file2156775316643608560')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '47fefb8c-201a-0150-5380-64cbde000000',
  'x-ms-client-request-id',
  '47464bdf-cb11-4b78-8256-08416c757d20',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:28 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775316362100125/pre1567753164423156775316442304607dir0156775316442301504')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5235861-101a-006b-3780-647077000000',
  'x-ms-client-request-id',
  'd7b84780-b786-4a6e-a971-235c7d56d526',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:28 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775316362100125/pre1567753164423156775316442304607dir1156775316483001647')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1956c99c-901a-0075-3580-649caf000000',
  'x-ms-client-request-id',
  '830a10ad-e2cc-41d1-b04d-1fdf5e3edd23',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:28 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775316362100125/pre1567753164423156775316442304607dir2156775316523706472')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '698d89e0-601a-0013-3c80-64d38f000000',
  'x-ms-client-request-id',
  '18058644-8db6-47d1-a5a7-ee05fbdf1f87',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775316362100125')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24152ca5-601a-0151-5280-649402000000',
  'x-ms-client-request-id',
  '4486b364-fcf5-414c-9c6f-89b51d700055',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:30 GMT',
  'Connection',
  'close' ]);

