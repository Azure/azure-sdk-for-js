let nock = require('nock');

module.exports.testInfo = {"share":"share156816846796001313","file":"file156816846838208637"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816846796001313')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:08 GMT',
  'ETag',
  '"0x8D7365EB4B98E6A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2515c894-701a-0036-6a47-68cbae000000',
  'x-ms-client-request-id',
  'f6b340f1-5a93-49a9-9e23-782307302512',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:07 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816846796001313/file156816846838208637')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:08 GMT',
  'ETag',
  '"0x8D7365EB4FE0713"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2e833a81-b01a-0002-3147-686406000000',
  'x-ms-client-request-id',
  '4b3798a7-fd53-4f9d-93be-456f61760c2f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:08.7587091Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:08.7587091Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:08.7587091Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:21:07 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156816846796001313/file156816846838208637')
  .reply(200, "", [ 'Content-Length',
  '256',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:08 GMT',
  'ETag',
  '"0x8D7365EB4FE0713"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '861735fc-801a-0001-3747-686701000000',
  'x-ms-client-request-id',
  '0a8b7f1d-01d7-4b5a-96f9-8fa922a7afc5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-key',
  'value',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:21:08.7587091Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:08.7587091Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:08.7587091Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-key,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:09 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816846796001313/file156816846838208637')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '333d7c6e-501a-0003-4b47-6865fb000000',
  'x-ms-client-request-id',
  '6d308d0d-0479-44b4-9b85-22dacb37660f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:08 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share156816846796001313/file156816846838208637')
  .reply(404, "", [ 'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c659ba3b-401a-0053-4b47-687af3000000',
  'x-ms-client-request-id',
  '5580ef50-8440-42f7-8d78-c70933056070',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:09 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816846796001313')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a53a29ca-501a-004c-5c47-68a1e3000000',
  'x-ms-client-request-id',
  'ca011925-3d9b-4332-badf-9252be7c0b5b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:10 GMT' ]);

