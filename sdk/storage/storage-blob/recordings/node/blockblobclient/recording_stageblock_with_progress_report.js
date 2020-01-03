let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157592665262709328","blob":"blob157592665274204998"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157592665262709328')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:24:12 GMT',
  'ETag',
  '"0x8D77CEE22FBAACD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8c855354-f01e-0001-33d7-ae318b000000',
  'x-ms-client-request-id',
  '403528b7-4cb5-46d7-94b2-a190ead2bb33',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 09 Dec 2019 21:24:12 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157592665262709328/blob157592665274204998', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ffe57e7-301e-007a-2ad7-ae5a3b000000',
  'x-ms-client-request-id',
  '33215447-bc71-4ad9-a6b9-0c3832818788',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 09 Dec 2019 21:24:12 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157592665262709328/blob157592665274204998', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ffe5808-301e-007a-46d7-ae5a3b000000',
  'x-ms-client-request-id',
  '769b1511-4971-4db0-879b-fc35d01a6f5b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 09 Dec 2019 21:24:12 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157592665262709328/blob157592665274204998', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:24:12 GMT',
  'ETag',
  '"0x8D77CEE231B5DC1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ffe5824-301e-007a-5dd7-ae5a3b000000',
  'x-ms-client-request-id',
  'e179c681-275e-4e37-8960-84dd733dae91',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'GFi/o1BSQtU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 09 Dec 2019 21:24:12 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157592665262709328/blob157592665274204998')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><CommittedBlocks><Block><Name>MQ==</Name><Size>10</Size></Block><Block><Name>Mg==</Name><Size>10</Size></Block></CommittedBlocks></BlockList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:24:12 GMT',
  'ETag',
  '"0x8D77CEE231B5DC1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ffe5841-301e-007a-75d7-ae5a3b000000',
  'x-ms-client-request-id',
  'bfad6724-9dc6-4610-9ea7-6ce37c7d28fe',
  'x-ms-version',
  '2019-02-02',
  'x-ms-blob-content-length',
  '20',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-blob-content-length,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 09 Dec 2019 21:24:12 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157592665262709328')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8c8553b2-f01e-0001-09d7-ae318b000000',
  'x-ms-client-request-id',
  '017cac2b-87cf-4978-9099-c58b61e861bc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 09 Dec 2019 21:24:12 GMT' ]);
