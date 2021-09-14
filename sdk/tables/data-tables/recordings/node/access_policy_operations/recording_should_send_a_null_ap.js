let nock = require('nock');

module.exports.hash = "c2c79babdf0a75c701089dad1adeddf2";

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
  '6ced16bd-0002-0039-6bae-a9c11b000000',
  'x-ms-client-request-id',
  '516d4a95-fce4-443d-ba0b-d421d435c5d3',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Sep 2021 21:23:41 GMT'
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
  '6ced16e0-0002-0039-06ae-a9c11b000000',
  'x-ms-client-request-id',
  '55e78aa4-3d74-4c05-aaa1-0db8a5391dac',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 14 Sep 2021 21:23:42 GMT'
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
  '6ced16f9-0002-0039-1eae-a9c11b000000',
  'x-ms-client-request-id',
  '8922d7b6-6637-4207-b7c5-c270ca18d2fa',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:23:42 GMT'
]);
