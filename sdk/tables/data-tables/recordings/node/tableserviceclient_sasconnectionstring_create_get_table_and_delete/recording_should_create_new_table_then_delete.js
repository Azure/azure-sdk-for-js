let nock = require('nock');

module.exports.hash = "15e46ef53417a2bde0a0e06e18ec137e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"testTableSASConnectionStringnode"})
  .query(true)
  .reply(201, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables/@Element","TableName":"testTableSASConnectionStringnode"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Location',
  "https://fakeaccount.table.core.windows.net/Tables('testTableSASConnectionStringnode')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7f64e-c002-000d-29df-c16eb3000000',
  'x-ms-client-request-id',
  '4b067a74-e79f-4a44-8a0c-39441aea4597',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-content',
  'Date',
  'Fri, 15 Oct 2021 16:13:16 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"byPageTest"},{"TableName":"CreateSimpleEntityBatchPerf"},{"TableName":"createTableNew"},{"TableName":"createTableNew2"},{"TableName":"createTableOld"},{"TableName":"doublesTest"},{"TableName":"TestChars"},{"TableName":"TestChars2"},{"TableName":"TestChars3"},{"TableName":"testTable"},{"TableName":"testTableSASConnectionStringnode"},{"TableName":"TestTestTest"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7f66f-c002-000d-49df-c16eb3000000',
  'x-ms-client-request-id',
  '49d241e9-2f59-4fa2-a67f-6c65b1e87ce5',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 15 Oct 2021 16:13:16 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/Tables('testTableSASConnectionStringnode')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5af7f68c-c002-000d-64df-c16eb3000000',
  'x-ms-client-request-id',
  '50cd5f88-2dd7-4c7b-b4d5-950e965ec395',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 15 Oct 2021 16:13:16 GMT'
]);
