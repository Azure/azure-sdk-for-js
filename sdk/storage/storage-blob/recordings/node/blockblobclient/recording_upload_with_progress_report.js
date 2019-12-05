let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157559166696905092","blob":"blob157559166710707982","randomstring":"randomstring157559166710703673"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157559166696905092')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:07 GMT',
  'ETag',
  '"0x8D779E22FF5E626"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5afc31fe-e01e-0037-58cb-ab9cd9000000',
  'x-ms-client-request-id',
  'a314e6ad-1e0b-4629-bc70-30453734f994',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Dec 2019 00:21:07 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157559166696905092/blob157559166710707982', "randomstring157559166710703673")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'O1LxMPxQnxg/3zcnGwAYcw==',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:07 GMT',
  'ETag',
  '"0x8D779E23008EF0D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9cd557cf-e01e-011a-77cb-ab594c000000',
  'x-ms-client-request-id',
  '8a3d599d-de30-4836-abb3-9cf2e8b52b05',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'xNYUMFIedqQ=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Dec 2019 00:21:06 GMT',
  'Connection',
  'close' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157559166696905092/blob157559166710707982')
  .reply(200, "randomstring157559166710703673", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'O1LxMPxQnxg/3zcnGwAYcw==',
  'Last-Modified',
  'Fri, 06 Dec 2019 00:21:07 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D779E23008EF0D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b1da2a1-c01e-004d-75cb-abf694000000',
  'x-ms-client-request-id',
  '4152031f-09b5-430e-a141-e3f285b05f40',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Fri, 06 Dec 2019 00:21:07 GMT',
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
  .delete('/container157559166696905092')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5afc32a5-e01e-0037-5dcb-ab9cd9000000',
  'x-ms-client-request-id',
  '18752e7b-7ab9-4bb8-ac7b-401dcb8697e5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Dec 2019 00:21:07 GMT' ]);
