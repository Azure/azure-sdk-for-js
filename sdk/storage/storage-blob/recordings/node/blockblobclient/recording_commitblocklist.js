let nock = require('nock');

module.exports.testInfo = {"container":"container156816838396002678","blob":"blob156816838437801289"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816838396002678')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:44 GMT',
  'ETag',
  '"0x8D7365E82A81074"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b8ffcac-e01e-001a-4247-684993000000',
  'x-ms-client-request-id',
  '7284b64e-89af-45c6-92e5-406b4a8f6d19',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:44 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816838396002678/blob156816838437801289', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6524453-a01e-0034-5447-68c954000000',
  'x-ms-client-request-id',
  '762407aa-0faa-4ed4-95b0-dd30333e5267',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:44 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816838396002678/blob156816838437801289', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '42fa478d-101e-0062-3547-682124000000',
  'x-ms-client-request-id',
  'ff996b12-0aba-476f-9717-d8bed80280dd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:44 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816838396002678/blob156816838437801289', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:45 GMT',
  'ETag',
  '"0x8D7365E8367BA42"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd548b39-801e-0045-6147-68bb6d000000',
  'x-ms-client-request-id',
  '0d92c669-6566-42ec-92ad-a93d6b07f067',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'GFi/o1BSQtU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:45 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816838396002678/blob156816838437801289')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><CommittedBlocks><Block><Name>MQ==</Name><Size>10</Size></Block><Block><Name>Mg==</Name><Size>10</Size></Block></CommittedBlocks></BlockList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:45 GMT',
  'ETag',
  '"0x8D7365E8367BA42"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7e007be-501e-002a-2647-6813b9000000',
  'x-ms-client-request-id',
  '501444e5-4006-4b95-b101-ea537fed049b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-blob-content-length',
  '20',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-blob-content-length,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:45 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816838396002678')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a464c076-001e-001b-5847-68486e000000',
  'x-ms-client-request-id',
  '5e1ee46f-61e0-485b-a6c1-98af62811edf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:45 GMT' ]);

