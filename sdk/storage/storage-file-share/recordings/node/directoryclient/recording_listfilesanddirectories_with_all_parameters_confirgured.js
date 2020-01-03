let nock = require('nock');

module.exports.testInfo = {"share":"share156816830177802797","dir":"dir156816830220202398","now":"2019-09-11T02:18:22.630Z","pre1568168302630":"pre1568168302630156816830263004269","pre1568168302630156816830263004269dir0":"pre1568168302630156816830263004269dir0156816830263000673","pre1568168302630156816830263004269dir1":"pre1568168302630156816830263004269dir1156816830305204054","pre1568168302630156816830263004269dir2":"pre1568168302630156816830263004269dir2156816830348000084","pre1568168302630156816830263004269file0":"pre1568168302630156816830263004269file0156816830391404910","pre1568168302630156816830263004269file1":"pre1568168302630156816830263004269file1156816830434207340","pre1568168302630156816830263004269file2":"pre1568168302630156816830263004269file2156816830476504739"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830177802797')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:22 GMT',
  'ETag',
  '"0x8D7365E51ACB973"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3b05164-101a-004b-6947-685766000000',
  'x-ms-client-request-id',
  '4062e493-aa56-4c26-8b84-645a134d70e6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:21 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830177802797/dir156816830220202398')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:22 GMT',
  'ETag',
  '"0x8D7365E51ED9987"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'af282798-f01a-0063-5c47-6820d9000000',
  'x-ms-client-request-id',
  'b4754fad-6f23-4343-8a41-1cefd23f3028',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:22.5566087Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:22.5566087Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:22.5566087Z',
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
  'Wed, 11 Sep 2019 02:18:22 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830177802797/pre1568168302630156816830263004269dir0156816830263000673')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:22 GMT',
  'ETag',
  '"0x8D7365E522E57CF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3115b868-501a-0065-5f47-68d7a1000000',
  'x-ms-client-request-id',
  'd7faf6b3-57d7-47a6-9928-3c922801a008',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:22.9809103Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:22.9809103Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:22.9809103Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:22 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830177802797/pre1568168302630156816830263004269dir1156816830305204054')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:23 GMT',
  'ETag',
  '"0x8D7365E526F8B5A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ef50973c-801a-000a-0a47-687f75000000',
  'x-ms-client-request-id',
  '0649f462-81d6-4beb-9d61-70cc0e186546',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:23.4082138Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:23.4082138Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:23.4082138Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:23 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830177802797/pre1568168302630156816830263004269dir2156816830348000084')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:23 GMT',
  'ETag',
  '"0x8D7365E52B1D085"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009a52d5-601a-0000-6b47-6866fc000000',
  'x-ms-client-request-id',
  'def70eff-2049-4eac-b903-6a5d35849bea',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:23.8425221Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:23.8425221Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:23.8425221Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835075647468208128',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:23 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830177802797/pre1568168302630156816830263004269file0156816830391404910')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:24 GMT',
  'ETag',
  '"0x8D7365E52F12EFF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5f716ea-b01a-0020-3347-680a30000000',
  'x-ms-client-request-id',
  '6fcec254-b328-4cbc-a5a5-089fbdc7e065',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:24.2578175Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:24.2578175Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:24.2578175Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835146016212385792',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:23 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830177802797/pre1568168302630156816830263004269file1156816830434207340')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:24 GMT',
  'ETag',
  '"0x8D7365E5333C25D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d13b566-101a-0026-6d47-68fd48000000',
  'x-ms-client-request-id',
  '93b2dfe9-c761-4ebb-b114-c8be045e6598',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:24.6941277Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:24.6941277Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:24.6941277Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835110831840296960',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:24 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816830177802797/pre1568168302630156816830263004269file2156816830476504739')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:25 GMT',
  'ETag',
  '"0x8D7365E537851E4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2515c7c2-701a-0036-4047-68cbae000000',
  'x-ms-client-request-id',
  'a43f01a4-fd15-4492-b9b3-40ed8cf3f680',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:25.1434468Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:25.1434468Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:25.1434468Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835181200584474624',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:25 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816830177802797/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156816830177802797\" DirectoryPath=\"\"><Prefix>pre1568168302630156816830263004269</Prefix><MaxResults>3</MaxResults><Entries><Directory><Name>pre1568168302630156816830263004269dir0156816830263000673</Name><Properties /></Directory><Directory><Name>pre1568168302630156816830263004269dir1156816830305204054</Name><Properties /></Directory><Directory><Name>pre1568168302630156816830263004269dir2156816830348000084</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU2ODE2ODMwMjYzMDE1NjgxNjgzMDI2MzAwNDI2OWZpbGUwMTU2ODE2ODMwMzkxNDA0OTEw</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a9445f7-201a-002e-3c47-68e63b000000',
  'x-ms-client-request-id',
  '5119e9f6-16c4-4d78-8b06-e464db8755f2',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:25 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816830177802797/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156816830177802797\" DirectoryPath=\"\"><Prefix>pre1568168302630156816830263004269</Prefix><Marker>1!76!cHJlMTU2ODE2ODMwMjYzMDE1NjgxNjgzMDI2MzAwNDI2OWZpbGUwMTU2ODE2ODMwMzkxNDA0OTEw</Marker><MaxResults>6</MaxResults><Entries><File><Name>pre1568168302630156816830263004269file0156816830391404910</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1568168302630156816830263004269file1156816830434207340</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1568168302630156816830263004269file2156816830476504739</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8ca535ce-e01a-0033-6747-683fd1000000',
  'x-ms-client-request-id',
  '01654736-01b9-405d-9028-5468d58b947b',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:25 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830177802797/pre1568168302630156816830263004269file0156816830391404910')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a01b405f-901a-0051-6947-687809000000',
  'x-ms-client-request-id',
  'cf64654e-d70b-4323-b8fd-28c80415b138',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:26 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830177802797/pre1568168302630156816830263004269file1156816830434207340')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6b980d-a01a-0052-2c47-687b0e000000',
  'x-ms-client-request-id',
  '0ed037c5-18fe-49d4-b509-4312deaabd9f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:26 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830177802797/pre1568168302630156816830263004269file2156816830476504739')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4704f28-f01a-000e-5d47-688af7000000',
  'x-ms-client-request-id',
  '195a12eb-aea1-489d-bb73-aaf10888237c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:26 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830177802797/pre1568168302630156816830263004269dir0156816830263000673')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f8c4b156-b01a-004d-7447-68a01e000000',
  'x-ms-client-request-id',
  '90733425-39e7-4029-97f8-2edb8773acaa',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:27 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830177802797/pre1568168302630156816830263004269dir1156816830305204054')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab525418-501a-0008-4447-687d8f000000',
  'x-ms-client-request-id',
  '86be1e91-6b35-42c7-8c46-ba31588098af',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:27 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830177802797/pre1568168302630156816830263004269dir2156816830348000084')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d13b56e-101a-0026-7147-68fd48000000',
  'x-ms-client-request-id',
  '086f23e8-0007-4718-8d6f-9db9a3de93e6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:28 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816830177802797')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3f8287eb-801a-0045-7047-68bb6d000000',
  'x-ms-client-request-id',
  '825ff775-a004-45f1-9aeb-8682a33e746d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:29 GMT' ]);

