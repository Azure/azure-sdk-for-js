let nock = require('nock');

module.exports.hash = "6011db43320d3c9201195bcf1852ff8f";

module.exports.testInfo = {"uniqueName":{"share":"share160716009299101180"},"newDate":{"now":"2020-12-05T09:21:32.990Z","tmr":"2020-12-05T09:21:32.990Z"}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160716009299101180')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 05 Dec 2020 09:21:34 GMT',
  'ETag',
  '"0x8D898FF28DE3169"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c82cdd56-301a-0065-08e8-cafbb9000000',
  'x-ms-client-request-id',
  '00122b86-3e97-4faa-a916-30a434de17f9',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 09:21:33 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160716009299101180/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share160716009299101180\" DirectoryPath=\"\"><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c82cdd5e-301a-0065-0ce8-cafbb9000000',
  'x-ms-client-request-id',
  'f002190b-7e8a-4eb2-8e5a-ca3ff99f210a',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 05 Dec 2020 09:21:34 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160716009299101180')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c82cdd6a-301a-0065-16e8-cafbb9000000',
  'x-ms-client-request-id',
  'de91625f-7c6a-4efb-93e9-911647a9e4bf',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 09:21:34 GMT'
]);
