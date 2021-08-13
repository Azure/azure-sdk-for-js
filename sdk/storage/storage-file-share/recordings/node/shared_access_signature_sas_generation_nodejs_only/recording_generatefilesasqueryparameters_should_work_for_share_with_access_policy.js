let nock = require('nock');

module.exports.hash = "5f413948b50993a7cb3655d78f239619";

module.exports.testInfo = {"uniqueName":{"share":"share161069085477203632","dir":"dir161069085633007045","file":"file161069085664605354"},"newDate":{"now":"2021-01-15T06:07:34.769Z","tmr":"2021-01-15T06:07:34.772Z"}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share161069085477203632')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 06:07:36 GMT',
  'ETag',
  '"0x8D8B91BDAEB933A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '590805c2-501a-0063-5804-ebc806000000',
  'x-ms-client-request-id',
  'b1d38584-fd18-4511-a74a-ddde1cfcfb02',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 06:07:35 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share161069085477203632/dir161069085633007045')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 06:07:36 GMT',
  'ETag',
  '"0x8D8B91BDB1F81B0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '590805cf-501a-0063-6004-ebc806000000',
  'x-ms-client-request-id',
  'fbc4decc-450d-482c-bc33-cbb5d834976b',
  'x-ms-version',
  '2020-04-08',
  'x-ms-file-change-time',
  '2021-01-15T06:07:36.4455856Z',
  'x-ms-file-last-write-time',
  '2021-01-15T06:07:36.4455856Z',
  'x-ms-file-creation-time',
  '2021-01-15T06:07:36.4455856Z',
  'x-ms-file-permission-key',
  '18253506462963126402*10775527834424002315',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 15 Jan 2021 06:07:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share161069085477203632/dir161069085633007045/file161069085664605354')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 06:07:36 GMT',
  'ETag',
  '"0x8D8B91BDB4D50AA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '590805d7-501a-0063-6604-ebc806000000',
  'x-ms-client-request-id',
  '4b4a2e3c-9f08-45d1-b4b5-9ef917ffa219',
  'x-ms-version',
  '2020-04-08',
  'x-ms-file-change-time',
  '2021-01-15T06:07:36.7457962Z',
  'x-ms-file-last-write-time',
  '2021-01-15T06:07:36.7457962Z',
  'x-ms-file-creation-time',
  '2021-01-15T06:07:36.7457962Z',
  'x-ms-file-permission-key',
  '4407534441384161157*10775527834424002315',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 15 Jan 2021 06:07:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share161069085477203632', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2021-01-15T06:02:34.7690000Z</Start><Expiry>2021-01-16T06:07:34.7720000Z</Expiry><Permission>rcwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 15 Jan 2021 06:07:37 GMT',
  'ETag',
  '"0x8D8B91BDB89C1FA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '590805de-501a-0063-6d04-ebc806000000',
  'x-ms-client-request-id',
  'd4bcd15f-f3d2-4b8b-8257-e6057bc08a98',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 06:07:36 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share161069085477203632/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"share161069085477203632\" DirectoryPath=\"\"><Entries><Directory><Name>dir161069085633007045</Name><Properties /></Directory></Entries><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59080ad1-501a-0063-3804-ebc806000000',
  'x-ms-client-request-id',
  '97ed3315-31b3-4ee2-bf26-c8a4635488e2',
  'x-ms-version',
  '2020-04-08',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Jan 2021 06:08:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share161069085477203632')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '59080aef-501a-0063-5404-ebc806000000',
  'x-ms-client-request-id',
  '2a3a571d-97b1-405d-8441-79b7f8edb9b1',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 15 Jan 2021 06:08:07 GMT'
]);
