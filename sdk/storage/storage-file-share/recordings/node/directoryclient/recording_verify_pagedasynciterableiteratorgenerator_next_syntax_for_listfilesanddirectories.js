let nock = require('nock');

module.exports.testInfo = {"share":"share156816831626300864","dir":"dir156816831668705952","now":"2019-09-11T02:18:37.116Z","pre1568168317116":"pre1568168317116156816831711609370","pre1568168317116156816831711609370dir0":"pre1568168317116156816831711609370dir0156816831711605371","pre1568168317116156816831711609370dir1":"pre1568168317116156816831711609370dir1156816831753208665","pre1568168317116156816831711609370dir2":"pre1568168317116156816831711609370dir2156816831805709550","pre1568168317116156816831711609370file0":"pre1568168317116156816831711609370file0156816831848906940","pre1568168317116156816831711609370file1":"pre1568168317116156816831711609370file1156816831893006045","pre1568168317116156816831711609370file2":"pre1568168317116156816831711609370file2156816831935007512"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816831626300864')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:36 GMT',
  'ETag',
  '"0x8D7365E5A4F26A1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5fbd1cf0-c01a-0049-7247-68559c000000',
  'x-ms-client-request-id',
  '7d046a54-6563-4100-a1b5-8c47996a0e06',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:35 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816831626300864/dir156816831668705952')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:37 GMT',
  'ETag',
  '"0x8D7365E5A8ECFC5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '700efcba-901a-001e-5047-68bc11000000',
  'x-ms-client-request-id',
  '213614cf-1d24-472e-af3e-c6ae81c4e92b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:37.0348997Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:37.0348997Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:37.0348997Z',
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
  'Wed, 11 Sep 2019 02:18:36 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816831626300864/pre1568168317116156816831711609370dir0156816831711605371')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:37 GMT',
  'ETag',
  '"0x8D7365E5ACF8E0D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7cc66fc-c01a-0024-6247-68ffb2000000',
  'x-ms-client-request-id',
  '95a5679b-d0e0-4dd9-a7e2-1e5f96a99e32',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:37.4592013Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:37.4592013Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:37.4592013Z',
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
  'Wed, 11 Sep 2019 02:18:36 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816831626300864/pre1568168317116156816831711609370dir1156816831753208665')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:37 GMT',
  'ETag',
  '"0x8D7365E5B1E58A7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd8fa29c-b01a-0046-5947-68b86a000000',
  'x-ms-client-request-id',
  'dd38e208-4850-4e01-86c8-caf9d292aa5c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:37.9755687Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:37.9755687Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:37.9755687Z',
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
  'Wed, 11 Sep 2019 02:18:37 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816831626300864/pre1568168317116156816831711609370dir2156816831805709550')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:38 GMT',
  'ETag',
  '"0x8D7365E5B61885D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '199c96e1-201a-0048-7a47-685461000000',
  'x-ms-client-request-id',
  '24bb30e3-c5a3-4670-b7ee-e5ba41f10ca9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:38.4158813Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:38.4158813Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:38.4158813Z',
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
  'Wed, 11 Sep 2019 02:18:38 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816831626300864/pre1568168317116156816831711609370file0156816831848906940')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:38 GMT',
  'ETag',
  '"0x8D7365E5BA49102"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd8fa29f-b01a-0046-5a47-68b86a000000',
  'x-ms-client-request-id',
  '36ff3a67-7aa2-4889-ba82-864c2233b936',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:38.8551938Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:38.8551938Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:38.8551938Z',
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
  'Wed, 11 Sep 2019 02:18:38 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816831626300864/pre1568168317116156816831711609370file1156816831893006045')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:39 GMT',
  'ETag',
  '"0x8D7365E5BE52839"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70bc07bf-601a-0066-5647-68d4a6000000',
  'x-ms-client-request-id',
  '30ad64f2-bd52-4850-b356-3d9dfa2feee1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:39.2784953Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:39.2784953Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:39.2784953Z',
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
  'Wed, 11 Sep 2019 02:18:38 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816831626300864/pre1568168317116156816831711609370file2156816831935007512')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:39 GMT',
  'ETag',
  '"0x8D7365E5C2682C6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '009a52f5-601a-0000-7047-6866fc000000',
  'x-ms-client-request-id',
  '35b9be72-839e-4328-9b4c-c50d3a48d4bd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:39.7067974Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:39.7067974Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:39.7067974Z',
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
  'Wed, 11 Sep 2019 02:18:39 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816831626300864/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share156816831626300864\" DirectoryPath=\"\"><Prefix>pre1568168317116156816831711609370</Prefix><Entries><Directory><Name>pre1568168317116156816831711609370dir0156816831711605371</Name><Properties /></Directory><Directory><Name>pre1568168317116156816831711609370dir1156816831753208665</Name><Properties /></Directory><Directory><Name>pre1568168317116156816831711609370dir2156816831805709550</Name><Properties /></Directory><File><Name>pre1568168317116156816831711609370file0156816831848906940</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1568168317116156816831711609370file1156816831893006045</Name><Properties><Content-Length>1024</Content-Length></Properties></File><File><Name>pre1568168317116156816831711609370file2156816831935007512</Name><Properties><Content-Length>1024</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cefd34c4-a01a-003f-3c47-68d120000000',
  'x-ms-client-request-id',
  'cf614edb-7cd7-4cfb-9b6f-f6fc0dbe9fb4',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:39 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816831626300864/pre1568168317116156816831711609370file0156816831848906940')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66fa8a51-401a-001c-3847-68beeb000000',
  'x-ms-client-request-id',
  'c0083ac3-7beb-47ba-b39c-68044abd7f2a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:39 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816831626300864/pre1568168317116156816831711609370file1156816831893006045')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c659b974-401a-0053-2247-687af3000000',
  'x-ms-client-request-id',
  'cd7fd3a8-c980-4229-a5b6-4b2d35153a37',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:40 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816831626300864/pre1568168317116156816831711609370file2156816831935007512')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b621b48f-901a-0037-2047-68ca53000000',
  'x-ms-client-request-id',
  'eede5d7a-a9c3-4a53-85d9-25344707b1bf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:41 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816831626300864/pre1568168317116156816831711609370dir0156816831711605371')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d851056-301a-005c-7d47-689705000000',
  'x-ms-client-request-id',
  '90845f8e-23d3-457b-8846-7687f35f4131',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:41 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816831626300864/pre1568168317116156816831711609370dir1156816831753208665')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf4a3321-e01a-0055-7647-688d8b000000',
  'x-ms-client-request-id',
  '7f765f93-4c01-4b5e-af81-d2a6c317ff19',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:41 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816831626300864/pre1568168317116156816831711609370dir2156816831805709550')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81abde0a-801a-0067-4347-68d55b000000',
  'x-ms-client-request-id',
  '5c5a5bc8-ae6d-4fff-b0a8-923652f6d83e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:42 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816831626300864')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '18b2d5a6-c01a-0006-0a47-689184000000',
  'x-ms-client-request-id',
  '0ad8d475-4fb8-4c71-91a8-1fa389ba6e82',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:42 GMT' ]);

