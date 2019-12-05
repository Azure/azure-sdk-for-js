let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157559166650501151","blob":"blob157559166663906577"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157559166650501151')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:06 GMT',
  'ETag',
  '"0x8D779E22FAEC578"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7975dad3-701e-0032-5ccb-ab68a6000000',
  'x-ms-client-request-id',
  '1f425a14-3943-4d57-bace-283533f5dd6c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Dec 2019 00:21:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157559166650501151/blob157559166663906577', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:06 GMT',
  'ETag',
  '"0x8D779E22FC34980"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'efe0cc43-201e-00cf-57cb-ab57c4000000',
  'x-ms-client-request-id',
  '896169e7-9920-46de-93a5-1efb0c97b4d2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Dec 2019 00:21:05 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157559166650501151/blob157559166663906577')
  .reply(200, "Hello World", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:06 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D779E22FC34980"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf99ee02-901e-00d6-67cb-ab7bac000000',
  'x-ms-client-request-id',
  'a5d6794c-5fe5-4845-8205-a64d4071de4f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Fri, 06 Dec 2019 00:21:06 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Dec 2019 00:21:06 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157559166650501151')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7975db96-701e-0032-02cb-ab68a6000000',
  'x-ms-client-request-id',
  '5f20ddd5-75dc-4fd6-8a3f-3a228eac7b0e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Dec 2019 00:21:06 GMT' ]);
