let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157559166743906530","blob":"blob157559166755801679"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157559166743906530')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:07 GMT',
  'ETag',
  '"0x8D779E2303B0867"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e10ec06-601e-004b-7fcb-ab01ec000000',
  'x-ms-client-request-id',
  'a221a7cd-b512-4d81-9123-27411df913c4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Dec 2019 00:21:07 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157559166743906530/blob157559166755801679', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b6848e8c-e01e-009d-37cb-ab4a36000000',
  'x-ms-client-request-id',
  '97ac3540-10a2-47c0-85af-03f6ef82f31d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Dec 2019 00:21:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157559166743906530/blob157559166755801679', "HelloWorld")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b6848e98-e01e-009d-3ecb-ab4a36000000',
  'x-ms-client-request-id',
  '93cfde88-24e4-4811-b28d-eab2146b1be6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Dec 2019 00:21:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157559166743906530/blob157559166755801679', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:07 GMT',
  'ETag',
  '"0x8D779E2305CC8DB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b6848eaa-e01e-009d-4fcb-ab4a36000000',
  'x-ms-client-request-id',
  'ef088f9d-713b-448a-b4f0-5516e7e59140',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'GFi/o1BSQtU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Dec 2019 00:21:07 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157559166743906530/blob157559166755801679')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><BlockList><CommittedBlocks><Block><Name>MQ==</Name><Size>10</Size></Block><Block><Name>Mg==</Name><Size>10</Size></Block></CommittedBlocks></BlockList>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:07 GMT',
  'ETag',
  '"0x8D779E2305CC8DB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b6848ece-e01e-009d-6bcb-ab4a36000000',
  'x-ms-client-request-id',
  '6e6b11d3-dae9-4573-8e20-c4bac01e132d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-blob-content-length',
  '20',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-blob-content-length,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Dec 2019 00:21:07 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157559166743906530')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e10ec87-601e-004b-6fcb-ab01ec000000',
  'x-ms-client-request-id',
  'efd23594-4fef-4d9e-923f-2b41d5e8860a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Dec 2019 00:21:07 GMT' ]);
