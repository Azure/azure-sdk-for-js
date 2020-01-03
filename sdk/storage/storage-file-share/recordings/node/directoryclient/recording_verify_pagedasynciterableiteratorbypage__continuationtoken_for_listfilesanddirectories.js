let nock = require('nock');

module.exports.testInfo = {"share":"share156816833135202596","dir":"dir156816833177701942","now":"2019-09-11T02:18:52.200Z","pre1568168332200":"pre1568168332200156816833220005182","pre1568168332200156816833220005182dir0":"pre1568168332200156816833220005182dir0156816833220005744","pre1568168332200156816833220005182dir1":"pre1568168332200156816833220005182dir1156816833262504927","pre1568168332200156816833220005182dir2":"pre1568168332200156816833220005182dir2156816833304507590","pre1568168332200156816833220005182file0":"pre1568168332200156816833220005182file0156816833346507228","pre1568168332200156816833220005182file1":"pre1568168332200156816833220005182file1156816833389701788","pre1568168332200156816833220005182file2":"pre1568168332200156816833220005182file2156816833442904155"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816833135202596')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:51 GMT',
  'ETag',
  '"0x8D7365E634D564D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6183d72-401a-0058-4347-686287000000',
  'x-ms-client-request-id',
  '9f56c1b0-c4fa-4dff-b893-db3758ed2c12',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:50 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816833135202596/dir156816833177701942')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:52 GMT',
  'ETag',
  '"0x8D7365E638DA022"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70bc07cc-601a-0066-5947-68d4a6000000',
  'x-ms-client-request-id',
  '74d30a27-603c-4f0d-be97-829a325e7ca3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:52.1266210Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:52.1266210Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:52.1266210Z',
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
  'Wed, 11 Sep 2019 02:18:51 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816833135202596/pre1568168332200156816833220005182dir0156816833220005744')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:52 GMT',
  'ETag',
  '"0x8D7365E63CEAC99"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85a4356-301a-0018-6747-684b69000000',
  'x-ms-client-request-id',
  '7225d3eb-443c-4c17-b841-7ea3cd6e4835',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:52.5529241Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:52.5529241Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:52.5529241Z',
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
  'Wed, 11 Sep 2019 02:18:52 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816833135202596/pre1568168332200156816833220005182dir1156816833262504927')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:52 GMT',
  'ETag',
  '"0x8D7365E640F1CAE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e4a1f98-101a-0069-4947-683950000000',
  'x-ms-client-request-id',
  '9f23725d-3ac8-4e80-9074-094eefe18921',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:52.9752238Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:52.9752238Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:52.9752238Z',
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
  'Wed, 11 Sep 2019 02:18:52 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816833135202596/pre1568168332200156816833220005182dir2156816833304507590')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:53 GMT',
  'ETag',
  '"0x8D7365E644EF070"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8617354c-801a-0001-1047-686701000000',
  'x-ms-client-request-id',
  'ece0e2db-872a-49b0-8a47-07aa094d4f91',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:53.3935216Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:53.3935216Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:53.3935216Z',
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
  'Wed, 11 Sep 2019 02:18:52 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816833135202596/pre1568168332200156816833220005182file0156816833346507228')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:53 GMT',
  'ETag',
  '"0x8D7365E6490994B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3739f2e-b01a-002b-0347-681244000000',
  'x-ms-client-request-id',
  'a87d9f43-5f53-4bca-80b3-6222a18551fc',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:53.8238283Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:53.8238283Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:53.8238283Z',
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
  'Wed, 11 Sep 2019 02:18:53 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816833135202596/pre1568168332200156816833220005182file1156816833389701788')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:54 GMT',
  'ETag',
  '"0x8D7365E64E0C3A7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5da5fdac-f01a-0068-4747-6838ad000000',
  'x-ms-client-request-id',
  'ea6586fd-783a-4b67-b7d1-26adc58be7e7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:54.3492007Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:54.3492007Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:54.3492007Z',
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
  'Wed, 11 Sep 2019 02:18:54 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816833135202596/pre1568168332200156816833220005182file2156816833442904155')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:54 GMT',
  'ETag',
  '"0x8D7365E6521A923"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e4a1f9b-101a-0069-4a47-683950000000',
  'x-ms-client-request-id',
  '06a1f025-4926-4f8e-9281-033b83bad422',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:54.7745059Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:54.7745059Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:54.7745059Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529320599184736256',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:54 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816833135202596/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156816833135202596\" DirectoryPath=\"\"><Prefix>pre1568168332200156816833220005182</Prefix><MaxResults>3</MaxResults><Entries><Directory><Name>pre1568168332200156816833220005182dir0156816833220005744</Name><Properties /></Directory><Directory><Name>pre1568168332200156816833220005182dir1156816833262504927</Name><Properties /></Directory><Directory><Name>pre1568168332200156816833220005182dir2156816833304507590</Name><Properties /></Directory></Entries><NextMarker>1!76!cHJlMTU2ODE2ODMzMjIwMDE1NjgxNjgzMzIyMDAwNTE4MmZpbGUwMTU2ODE2ODMzMzQ2NTA3MjI4</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '42858a3f-101a-0004-1447-68937e000000',
  'x-ms-client-request-id',
  'd48854d0-8330-437f-92eb-d68fa638707a',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:55 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816833135202596/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156816833135202596\" DirectoryPath=\"\"><Prefix>pre1568168332200156816833220005182</Prefix><Marker>1!76!cHJlMTU2ODE2ODMzMjIwMDE1NjgxNjgzMzIyMDAwNTE4MmZpbGUwMTU2ODE2ODMzMzQ2NTA3MjI4</Marker><MaxResults>6</MaxResults><Entries><File><Name>pre1568168332200156816833220005182file0156816833346507228</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1568168332200156816833220005182file1156816833389701788</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1568168332200156816833220005182file2156816833442904155</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd31b2399-f01a-002c-0c47-68e4c1000000',
  'x-ms-client-request-id',
  '1e11ce77-9231-48ac-98f6-3db98432d4f1',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:55 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816833135202596/pre1568168332200156816833220005182file0156816833346507228')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6b982c-a01a-0052-3347-687b0e000000',
  'x-ms-client-request-id',
  '0c32d9fc-7f5c-44e4-a8ca-f953e0d6e360',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:55 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816833135202596/pre1568168332200156816833220005182file1156816833389701788')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ddf4b2ed-701a-003d-1d47-68d3da000000',
  'x-ms-client-request-id',
  '2886e2a6-c219-4d81-835b-7126058c828d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:56 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816833135202596/pre1568168332200156816833220005182file2156816833442904155')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009a5305-601a-0000-7547-6866fc000000',
  'x-ms-client-request-id',
  'db0e2be2-5e93-432f-96dc-4bf3d26f5847',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:56 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816833135202596/pre1568168332200156816833220005182dir0156816833220005744')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '199c9704-201a-0048-8047-685461000000',
  'x-ms-client-request-id',
  '774c339a-b574-42aa-9d28-dd1be0dd958d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:57 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816833135202596/pre1568168332200156816833220005182dir1156816833262504927')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a01b4093-901a-0051-0147-687809000000',
  'x-ms-client-request-id',
  '18d14771-5390-42fb-a292-447f123e45c8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:57 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816833135202596/pre1568168332200156816833220005182dir2156816833304507590')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '76d71bb4-301a-0057-6e47-688f71000000',
  'x-ms-client-request-id',
  '7dcf60b7-167b-4fe6-81f3-2723d09a1c04',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:58 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816833135202596')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e1ba695-001a-0010-0d47-68501a000000',
  'x-ms-client-request-id',
  '6105fd77-f997-4fb8-83cc-217e72ebde33',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:57 GMT' ]);

