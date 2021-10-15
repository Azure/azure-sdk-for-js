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
  '5af7c442-c002-000d-75df-c16eb3000000',
  'x-ms-client-request-id',
  '10f597a1-8621-4755-ab28-1309d8d31730',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:12:59 GMT'
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
  '5af7c46e-c002-000d-1cdf-c16eb3000000',
  'x-ms-client-request-id',
  '38c203a4-142e-48ee-9410-40d0c3ca0fc7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 15 Oct 2021 16:12:59 GMT'
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
  '5af7c47f-c002-000d-2bdf-c16eb3000000',
  'x-ms-client-request-id',
  '3ba480d9-d4bb-421c-aad4-0e1ffb0c21dc',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:12:59 GMT'
]);
