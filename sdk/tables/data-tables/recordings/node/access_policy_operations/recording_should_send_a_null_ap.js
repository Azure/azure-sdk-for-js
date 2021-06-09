let nock = require('nock');

module.exports.hash = "067942f4c3d80b9135fe9a839778ea97";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"AccessPolicy"})
  .reply(201, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#Tables/@Element","TableName":"AccessPolicy"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  "https://joheredistorage2.table.core.windows.net/Tables('AccessPolicy')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d7afb-7002-00b5-50cd-5c8c40000000',
  'x-ms-client-request-id',
  '43b198e7-9dba-4160-a15c-714c196db2fc',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:07 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .put('/AccessPolicy', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>null</Id><AccessPolicy/></SignedIdentifier><SignedIdentifier><Id>empty</Id><AccessPolicy/></SignedIdentifier><SignedIdentifier><Id>partial</Id><AccessPolicy><Permission>r</Permission></AccessPolicy></SignedIdentifier><SignedIdentifier><Id>full</Id><AccessPolicy><Start>2021-07-08T09:10:09.0000000Z</Start><Expiry>2021-07-08T09:10:09.0000000Z</Expiry><Permission>r</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d7b2d-7002-00b5-7dcd-5c8c40000000',
  'x-ms-client-request-id',
  '1800d430-ebdb-4887-8c2c-6fdfa307c6a2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 09 Jun 2021 01:17:07 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/AccessPolicy')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers><SignedIdentifier><Id>null</Id></SignedIdentifier><SignedIdentifier><Id>empty</Id></SignedIdentifier><SignedIdentifier><Id>partial</Id><AccessPolicy><Permission>r</Permission></AccessPolicy></SignedIdentifier><SignedIdentifier><Id>full</Id><AccessPolicy><Start>2021-07-08T09:10:09.0000000Z</Start><Expiry>2021-07-08T09:10:09.0000000Z</Expiry><Permission>r</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d7c5b-7002-00b5-1dcd-5c8c40000000',
  'x-ms-client-request-id',
  'b28114fa-7001-4997-b2bd-59b8e69b7fc9',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:07 GMT'
]);
