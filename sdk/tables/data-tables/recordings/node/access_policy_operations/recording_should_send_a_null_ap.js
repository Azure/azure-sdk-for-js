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
  '654eed68-9002-001e-234b-5d5b52000000',
  'x-ms-client-request-id',
  'e16842c2-ed4a-4f35-ab0b-d55a4b03ba8f',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 16:21:43 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .put('/AccessPolicy', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>null</Id><AccessPolicy/></SignedIdentifier><SignedIdentifier><Id>empty</Id><AccessPolicy/></SignedIdentifier><SignedIdentifier><Id>partial</Id><AccessPolicy><Permission>r</Permission></AccessPolicy></SignedIdentifier><SignedIdentifier><Id>full</Id><AccessPolicy><Start>2021-07-08T09:10:09.0000000Z</Start><Expiry>2021-07-08T09:10:09.0000000Z</Expiry><Permission>r</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '654eed8a-9002-001e-414b-5d5b52000000',
  'x-ms-client-request-id',
  '469d869a-a35c-4e40-9775-9d8049181300',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 09 Jun 2021 16:21:43 GMT'
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
  '654eedda-9002-001e-054b-5d5b52000000',
  'x-ms-client-request-id',
  'fb72b59d-69cb-42a9-b60d-ae055028f032',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 16:21:43 GMT'
]);
