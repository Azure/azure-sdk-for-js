let nock = require('nock');

module.exports.hash = "696dcf230d6f213e7bcafda589c44963";

module.exports.testInfo = {"uniqueName":{"share":"share160223286231007564","newshare":"newshare160223286388702010"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160223286231007564')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 09 Oct 2020 08:41:03 GMT',
  'ETag',
  '"0x8D86C2F0E95EA45"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99321ef9-901a-003e-7e17-9ef9d9000000',
  'x-ms-client-request-id',
  'b75fd907-794e-4395-a1af-e3e4d210afbf',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Fri, 09 Oct 2020 08:41:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/newshare160223286388702010')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 09 Oct 2020 08:41:04 GMT',
  'ETag',
  '"0x8D86C2F0ECE69AE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99321efc-901a-003e-7f17-9ef9d9000000',
  'x-ms-client-request-id',
  '9319bdab-9496-43a5-b30b-60bd9deb24c2',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Fri, 09 Oct 2020 08:41:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>newshare160223286388702010</Prefix><Shares><Share><Name>newshare160223286388702010</Name><Properties><Last-Modified>Fri, 09 Oct 2020 08:41:04 GMT</Last-Modified><Etag>\"0x8D86C2F0ECE69AE\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><Quota>5120</Quota><AccessTier>Hot</AccessTier><AccessTierChangeTime>Fri, 09 Oct 2020 08:41:04 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share></Shares><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99321efe-901a-003e-8017-9ef9d9000000',
  'x-ms-client-request-id',
  '0364136a-2286-42b0-8ecc-b659911855e1',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 09 Oct 2020 08:41:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/newshare160223286388702010')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99321f00-901a-003e-0217-9ef9d9000000',
  'x-ms-client-request-id',
  '082a4bf4-eae5-4924-b189-ace4b20458c5',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Fri, 09 Oct 2020 08:41:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160223286231007564')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '99321f03-901a-003e-0317-9ef9d9000000',
  'x-ms-client-request-id',
  '71feaee9-7b0d-4a86-a1bd-ffc4afcf64e7',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Fri, 09 Oct 2020 08:41:04 GMT'
]);
