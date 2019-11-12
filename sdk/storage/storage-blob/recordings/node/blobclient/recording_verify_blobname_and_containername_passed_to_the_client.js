let nock = require('nock');

module.exports.testInfo = {"container":"container157022489756509418","blob":"blob157022490130307620"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157022489756509418')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 04 Oct 2019 21:35:01 GMT',
  'ETag',
  '"0x8D74912B648DBE4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8b16a289-201e-006a-2afb-7a3a57000000',
  'x-ms-client-request-id',
  'e3218f8e-6cb5-43b8-bfd5-722634271aab',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 21:35:00 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157022489756509418/blob157022490130307620', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 04 Oct 2019 21:35:01 GMT',
  'ETag',
  '"0x8D74912B68D0AD5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8a5f45be-201e-0061-1ffb-7a2223000000',
  'x-ms-client-request-id',
  'c0607760-3b71-40e3-bbe1-5e38717ab288',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 04 Oct 2019 21:35:01 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157022489756509418')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aaa04c6b-b01e-0064-63fb-7ad65c000000',
  'x-ms-client-request-id',
  'a4287b2f-e482-43a7-87e4-b14a2a9000c3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 04 Oct 2019 21:35:01 GMT' ]);

