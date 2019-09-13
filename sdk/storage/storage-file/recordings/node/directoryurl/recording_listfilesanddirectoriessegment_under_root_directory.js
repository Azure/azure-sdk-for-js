let nock = require('nock');

module.exports.testInfo = {"share":"share156775315700903428","dir":"dir156775315741003825","date":"2019-09-06T06:59:17.822Z","pre1567753157822":"pre1567753157822156775315782201180","pre1567753157822156775315782201180dir0":"pre1567753157822156775315782201180dir0156775315782201583","pre1567753157822156775315782201180dir1":"pre1567753157822156775315782201180dir1156775315822007219","pre1567753157822156775315782201180dir2":"pre1567753157822156775315782201180dir2156775315863402617","pre1567753157822156775315782201180file0":"pre1567753157822156775315782201180file0156775315903803946","pre1567753157822156775315782201180file1":"pre1567753157822156775315782201180file1156775315944002380","pre1567753157822156775315782201180file2":"pre1567753157822156775315782201180file2156775315989106616"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315700903428')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:17 GMT',
  'ETag',
  '"0x8D73297BC0FC8D7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8767314-301a-012e-8080-645b99000000',
  'x-ms-client-request-id',
  '97dce252-845e-4854-a3af-4d25dc49462a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315700903428/dir156775315741003825')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:17 GMT',
  'ETag',
  '"0x8D73297BC4EA27B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1f9af5da-501a-0117-2680-64a085000000',
  'x-ms-client-request-id',
  '924cc205-2a00-4683-89ed-ce9fd7ec8c9d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:17.6935035Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:17.6935035Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:17.6935035Z',
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
  'Fri, 06 Sep 2019 06:59:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315700903428/pre1567753157822156775315782201180dir0156775315782201583')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:18 GMT',
  'ETag',
  '"0x8D73297BC8B6C2E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9071c1e7-801a-00c0-2480-640fbd000000',
  'x-ms-client-request-id',
  '1b52a3fc-2cbf-400a-8faf-fb74504756d8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:18.0918830Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:18.0918830Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:18.0918830Z',
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
  'Fri, 06 Sep 2019 06:59:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315700903428/pre1567753157822156775315782201180dir1156775315822007219')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:18 GMT',
  'ETag',
  '"0x8D73297BCCA5932"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fdd31200-601a-005e-5d80-641c63000000',
  'x-ms-client-request-id',
  '08ea29d5-5d7a-47d7-84ad-6e709888bf48',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:18.5042738Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:18.5042738Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:18.5042738Z',
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
  'Fri, 06 Sep 2019 06:59:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315700903428/pre1567753157822156775315782201180dir2156775315863402617')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:18 GMT',
  'ETag',
  '"0x8D73297BD083490"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '67105a46-f01a-0143-6580-64efd2000000',
  'x-ms-client-request-id',
  '64779753-6655-4f1b-b4d1-84e3af6116ba',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:18.9096592Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:18.9096592Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:18.9096592Z',
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
  'Fri, 06 Sep 2019 06:59:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315700903428/pre1567753157822156775315782201180file0156775315903803946')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:19 GMT',
  'ETag',
  '"0x8D73297BD45738D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6d64e2e-501a-00a1-7680-642cfe000000',
  'x-ms-client-request-id',
  '5d0ac305-5038-4a05-a9c7-ed35e6131655',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:19.3110413Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:19.3110413Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:19.3110413Z',
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
  'Fri, 06 Sep 2019 06:59:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315700903428/pre1567753157822156775315782201180file1156775315944002380')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:19 GMT',
  'ETag',
  '"0x8D73297BD8A2E66"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '64d1b2b0-101a-00fd-7480-6479a6000000',
  'x-ms-client-request-id',
  '19946dce-588c-430f-80bb-a1180089958d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:19.7614694Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:19.7614694Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:19.7614694Z',
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
  'Fri, 06 Sep 2019 06:59:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775315700903428/pre1567753157822156775315782201180file2156775315989106616')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:20 GMT',
  'ETag',
  '"0x8D73297BDC7E2AB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '698d89c9-601a-0013-3980-64d38f000000',
  'x-ms-client-request-id',
  '380ff5ec-395f-4988-a4b6-871d67ae29fa',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:20.1658539Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:20.1658539Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:20.1658539Z',
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
  'Fri, 06 Sep 2019 06:59:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775315700903428/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156775315700903428\" DirectoryPath=\"\"><Prefix>pre1567753157822156775315782201180</Prefix><Entries><Directory><Name>pre1567753157822156775315782201180dir0156775315782201583</Name><Properties /></Directory><Directory><Name>pre1567753157822156775315782201180dir1156775315822007219</Name><Properties /></Directory><Directory><Name>pre1567753157822156775315782201180dir2156775315863402617</Name><Properties /></Directory><File><Name>pre1567753157822156775315782201180file0156775315903803946</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1567753157822156775315782201180file1156775315944002380</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1567753157822156775315782201180file2156775315989106616</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '79054326-801a-00ff-5d80-64c71e000000',
  'x-ms-client-request-id',
  '4e03f85e-93ce-45cb-baf9-7107c0614193',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 06:59:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775315700903428/pre1567753157822156775315782201180file0156775315903803946')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d1b8504-f01a-005c-4180-64a2db000000',
  'x-ms-client-request-id',
  '3b9cdcb6-27a0-46d3-be22-bdc2168c557a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775315700903428/pre1567753157822156775315782201180file1156775315944002380')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '288b12f5-c01a-0105-2980-64db55000000',
  'x-ms-client-request-id',
  '34e2c235-fc2c-47df-b5ca-67f407701aa6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775315700903428/pre1567753157822156775315782201180file2156775315989106616')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbc98c6d-501a-015a-3680-646f69000000',
  'x-ms-client-request-id',
  '812635ac-4707-4a3b-950a-27153877b3a0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775315700903428/pre1567753157822156775315782201180dir0156775315782201583')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58587bd2-401a-0156-8080-64f861000000',
  'x-ms-client-request-id',
  '45d2f2bc-2ab2-4f49-b156-f00640b61e3e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775315700903428/pre1567753157822156775315782201180dir1156775315822007219')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7fe12449-701a-001f-5980-644487000000',
  'x-ms-client-request-id',
  'c6023b0e-bbce-4d8e-a87b-cd7bd55761a4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775315700903428/pre1567753157822156775315782201180dir2156775315863402617')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd4fa5556-501a-00c3-4b80-64eed9000000',
  'x-ms-client-request-id',
  '6c07c874-b40d-413b-8696-93d432247725',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775315700903428')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fe6e7a26-a01a-009a-7180-64695a000000',
  'x-ms-client-request-id',
  '94ed97fc-0a9e-4577-919f-a1b25c2e4afd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:22 GMT',
  'Connection',
  'close' ]);

