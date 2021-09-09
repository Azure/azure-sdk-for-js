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
  '0076595a-e002-0038-1304-a4c0e6000000',
  'x-ms-client-request-id',
  '2130fe9d-83f3-4159-a5ce-17060a20e37c',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-content',
  'Date',
  'Tue, 07 Sep 2021 16:24:13 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"CreateSimpleEntityBatchPerf"},{"TableName":"createTableNew"},{"TableName":"createTableNew2"},{"TableName":"createTableOld"},{"TableName":"testTable"},{"TableName":"testTableSASConnectionStringnode"},{"TableName":"TestTestTest"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00765970-e002-0038-2704-a4c0e6000000',
  'x-ms-client-request-id',
  '74482ca5-04e2-4835-aec3-9133485e4607',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 07 Sep 2021 16:24:13 GMT'
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
  '00765985-e002-0038-3a04-a4c0e6000000',
  'x-ms-client-request-id',
  '645e053a-2221-4006-a13c-e39be87eb75e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Sep 2021 16:24:13 GMT'
]);
