let nock = require('nock');

module.exports.hash = "633700e3e2a3b1de7af398b91020ac50";

module.exports.testInfo = {"uniqueName":{"share":"share167818185726205895","dir":"dir167818185751609290","file":"file167818185777701297","destfile":"destfile167818185803406260","destfile1":"destfile1167818185903005086"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185726205895')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:37 GMT',
  'ETag',
  '"0x8DB1EEF969EBEC6"',
  'x-ms-request-id',
  '790792e6-a01a-0005-49d8-50f0c9000000',
  'x-ms-client-request-id',
  'f65356bf-9d85-4e7c-8ad7-1a0e96c738c1',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185726205895/dir167818185751609290....')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:37 GMT',
  'ETag',
  '"0x8DB1EEF96C72ECC"',
  'x-ms-request-id',
  '790792e9-a01a-0005-4ad8-50f0c9000000',
  'x-ms-client-request-id',
  '398eeac3-1bee-422b-a1b8-5163f9c46a2b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:37.8710220Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:37.8710220Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:37.8710220Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 07 Mar 2023 09:37:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185726205895/dir167818185751609290..../file167818185777701297....')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:38 GMT',
  'ETag',
  '"0x8DB1EEF96EE6588"',
  'x-ms-request-id',
  '790792ea-a01a-0005-4bd8-50f0c9000000',
  'x-ms-client-request-id',
  'deb1014e-ece1-4422-babe-d18a33140564',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:38.1280136Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:38.1280136Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:38.1280136Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 07 Mar 2023 09:37:37 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185726205895/destfile167818185803406260....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:38 GMT',
  'ETag',
  '"0x8DB1EEF9716AE57"',
  'x-ms-request-id',
  '790792eb-a01a-0005-4cd8-50f0c9000000',
  'x-ms-client-request-id',
  'c658226e-6fb1-43f6-aeca-631e741ef1c2',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:38.3920215Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:38.1280136Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:38.1280136Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 07 Mar 2023 09:37:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167818185726205895/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167818185726205895\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><File><Name>destfile167818185803406260</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>1024</Content-Length></Properties></File><Directory><Name>dir167818185751609290</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '790792ec-a01a-0005-4dd8-50f0c9000000',
  'x-ms-client-request-id',
  'a847d2cc-533a-4e36-ac9a-323ea56eee05',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167818185726205895/destfile167818185803406260....')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:38 GMT',
  'ETag',
  '"0x8DB1EEF9716AE57"',
  'x-ms-request-id',
  '790792ed-a01a-0005-4ed8-50f0c9000000',
  'x-ms-client-request-id',
  '08bcbece-182e-4b3d-8f89-67ccfdff52c3',
  'x-ms-version',
  '2022-11-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-03-07T09:37:38.3920215Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:38.1280136Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:38.1280136Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 07 Mar 2023 09:37:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167818185726205895/dir167818185751609290..../file167818185777701297....')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '790792ee-a01a-0005-4fd8-50f0c9000000',
  'x-ms-client-request-id',
  '9b999a39-a7a8-4eba-a494-767e48bdc65b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Tue, 07 Mar 2023 09:37:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167818185726205895/destfile1167818185903005086.....')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:39 GMT',
  'ETag',
  '"0x8DB1EEF97ACD45B"',
  'x-ms-request-id',
  '790792ef-a01a-0005-50d8-50f0c9000000',
  'x-ms-client-request-id',
  'ff18452e-e8d6-4235-adc2-aebef4241079',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-07T09:37:39.3760347Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:38.1280136Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:38.1280136Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 07 Mar 2023 09:37:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167818185726205895/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share167818185726205895\" DirectoryPath=\"\"><DirectoryId>0</DirectoryId><Entries><File><Name>destfile1167818185903005086</Name><FileId>11529285414812647424</FileId><Properties><Content-Length>1024</Content-Length></Properties></File><Directory><Name>dir167818185751609290</Name><FileId>13835128424026341376</FileId><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '790792f0-a01a-0005-51d8-50f0c9000000',
  'x-ms-client-request-id',
  'bdd07ebb-1f5a-4263-8124-17269d7a3684',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167818185726205895/destfile1167818185903005086.....')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 07 Mar 2023 09:37:39 GMT',
  'ETag',
  '"0x8DB1EEF97ACD45B"',
  'x-ms-request-id',
  '790792f1-a01a-0005-52d8-50f0c9000000',
  'x-ms-client-request-id',
  '638b4e79-150e-4e9d-8f87-3f3ecd830c5c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-03-07T09:37:39.3760347Z',
  'x-ms-file-last-write-time',
  '2023-03-07T09:37:38.1280136Z',
  'x-ms-file-creation-time',
  '2023-03-07T09:37:38.1280136Z',
  'x-ms-file-permission-key',
  '18144810169125879831*1871445747569276785',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Date',
  'Tue, 07 Mar 2023 09:37:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167818185726205895/destfile167818185803406260....')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '790792f3-a01a-0005-53d8-50f0c9000000',
  'x-ms-client-request-id',
  'bfce2ab9-7ec2-470c-aa72-cdea6387eb0a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Tue, 07 Mar 2023 09:37:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167818185726205895')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '790792f4-a01a-0005-54d8-50f0c9000000',
  'x-ms-client-request-id',
  '2c185087-1ff7-403a-8957-c0299038e57c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 07 Mar 2023 09:37:39 GMT'
]);
