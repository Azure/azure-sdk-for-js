let nock = require('nock');

module.exports.hash = "067942f4c3d80b9135fe9a839778ea97";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"AccessPolicy"})
  .reply(201, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables/@Element","TableName":"AccessPolicy"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  "https://fakeaccount.table.core.windows.net/Tables('AccessPolicy')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f17422da-a002-00f3-1d4e-5d52d6000000',
  'x-ms-client-request-id',
  '6b9bac01-b7f6-4214-8f21-ddc8fa2de261',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 16:44:59 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .put('/AccessPolicy', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>null</Id><AccessPolicy/></SignedIdentifier><SignedIdentifier><Id>empty</Id><AccessPolicy/></SignedIdentifier><SignedIdentifier><Id>partial</Id><AccessPolicy><Permission>r</Permission></AccessPolicy></SignedIdentifier><SignedIdentifier><Id>full</Id><AccessPolicy><Start>2021-07-08T09:10:09Z</Start><Expiry>2021-07-08T09:10:09Z</Expiry><Permission>r</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f17422eb-a002-00f3-2a4e-5d52d6000000',
  'x-ms-client-request-id',
  'f5a0c1ec-306f-4e62-aebf-81d8d070aa96',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 09 Jun 2021 16:45:00 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
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
  'f1742343-a002-00f3-794e-5d52d6000000',
  'x-ms-client-request-id',
  'ec752160-bbbc-4284-9903-f7c46be99765',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 16:45:00 GMT'
]);
