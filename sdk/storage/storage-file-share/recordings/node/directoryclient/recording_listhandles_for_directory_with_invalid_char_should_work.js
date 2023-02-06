let nock = require('nock');

module.exports.hash = "330c64727056aa653d660eb906525078";

module.exports.testInfo = {"uniqueName":{"share":"share167569196732709778","dir":"dir167569196782704897","dir￾":"dir￾167569196785709313"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569196732709778')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 13:59:27 GMT',
  'ETag',
  '"0x8DB084A5CA74647"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7091c9ed-c01a-0090-4e33-3a1807000000',
  'x-ms-client-request-id',
  'cdb5ab03-bdd4-4f5b-8660-72d8e0fc9050',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 13:59:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569196732709778/dir167569196782704897')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 13:59:27 GMT',
  'ETag',
  '"0x8DB084A5CAEEBD9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7091c9f1-c01a-0090-4f33-3a1807000000',
  'x-ms-client-request-id',
  '83045fac-0912-4d0c-b4f4-fbd98cfdb976',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T13:59:27.8626777Z',
  'x-ms-file-last-write-time',
  '2023-02-06T13:59:27.8626777Z',
  'x-ms-file-creation-time',
  '2023-02-06T13:59:27.8626777Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 13:59:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167569196732709778/dir%EF%BF%BE167569196785709313')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 06 Feb 2023 13:59:27 GMT',
  'ETag',
  '"0x8DB084A5CB1D1A5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7091c9f3-c01a-0090-5033-3a1807000000',
  'x-ms-client-request-id',
  '572eecb6-b9cd-44e7-881b-698b2a872b98',
  'x-ms-version',
  '2021-12-02',
  'x-ms-file-change-time',
  '2023-02-06T13:59:27.8816677Z',
  'x-ms-file-last-write-time',
  '2023-02-06T13:59:27.8816677Z',
  'x-ms-file-creation-time',
  '2023-02-06T13:59:27.8816677Z',
  'x-ms-file-permission-key',
  '9212185477508673717*1658283376881248060',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 06 Feb 2023 13:59:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167569196732709778/dir%EF%BF%BE167569196785709313')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7091c9f4-c01a-0090-5133-3a1807000000',
  'x-ms-client-request-id',
  '0fd39e5e-7290-4725-b35c-fe5b26fe69aa',
  'x-ms-version',
  '2021-12-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 06 Feb 2023 13:59:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167569196732709778')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7091c9f5-c01a-0090-5233-3a1807000000',
  'x-ms-client-request-id',
  '839f3c09-cc8f-48de-9ea6-6d6015dde959',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Mon, 06 Feb 2023 13:59:27 GMT'
]);
