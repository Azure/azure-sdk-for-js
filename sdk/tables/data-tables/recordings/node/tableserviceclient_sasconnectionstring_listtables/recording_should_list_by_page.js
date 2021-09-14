let nock = require('nock');

module.exports.hash = "0645e2b17e9dfa27243e0947f4d8fed4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"CreateSimpleEntityBatchPerf"},{"TableName":"createTableNew"},{"TableName":"createTableNew2"},{"TableName":"createTableOld"},{"TableName":"ListTableTestSASConnectionStringnode0"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced2b95-0002-0039-55ae-a9c11b000000',
  'x-ms-client-request-id',
  'c97750f6-62f2-4b8a-897d-85731334b63b',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!72!bGlzdHRhYmxldGVzdHNhc2Nvbm5lY3Rpb25zdHJpbmdub2RlMQEwMWQ3YTlhZWRiNGRjNjJh',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestSASConnectionStringnode1"},{"TableName":"ListTableTestSASConnectionStringnode10"},{"TableName":"ListTableTestSASConnectionStringnode11"},{"TableName":"ListTableTestSASConnectionStringnode12"},{"TableName":"ListTableTestSASConnectionStringnode13"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced2b9f-0002-0039-5fae-a9c11b000000',
  'x-ms-client-request-id',
  '1d9d2c0a-32fa-417e-be30-8c597e1035bf',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!76!bGlzdHRhYmxldGVzdHNhc2Nvbm5lY3Rpb25zdHJpbmdub2RlMTQBMDFkN2E5YWVkYzE4NDBhMA--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestSASConnectionStringnode14"},{"TableName":"ListTableTestSASConnectionStringnode15"},{"TableName":"ListTableTestSASConnectionStringnode16"},{"TableName":"ListTableTestSASConnectionStringnode17"},{"TableName":"ListTableTestSASConnectionStringnode18"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced2bab-0002-0039-69ae-a9c11b000000',
  'x-ms-client-request-id',
  '5ff31ce0-255a-4e8e-98f7-57caaeca3b0f',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!76!bGlzdHRhYmxldGVzdHNhc2Nvbm5lY3Rpb25zdHJpbmdub2RlMTkBMDFkN2E5YWVkYzY2YmQ2Ng--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestSASConnectionStringnode19"},{"TableName":"ListTableTestSASConnectionStringnode2"},{"TableName":"ListTableTestSASConnectionStringnode3"},{"TableName":"ListTableTestSASConnectionStringnode4"},{"TableName":"ListTableTestSASConnectionStringnode5"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced2bb6-0002-0039-72ae-a9c11b000000',
  'x-ms-client-request-id',
  '8022e813-0593-4087-a9c5-38dfe88bed6e',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!72!bGlzdHRhYmxldGVzdHNhc2Nvbm5lY3Rpb25zdHJpbmdub2RlNgEwMWQ3YTlhZWRiOWJmNGJi',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:11 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestSASConnectionStringnode6"},{"TableName":"ListTableTestSASConnectionStringnode7"},{"TableName":"ListTableTestSASConnectionStringnode8"},{"TableName":"ListTableTestSASConnectionStringnode9"},{"TableName":"TestChars"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced2bc9-0002-0039-7fae-a9c11b000000',
  'x-ms-client-request-id',
  '12ffe9b7-593e-407f-a1ea-dc720786065b',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!36!dGVzdGNoYXJzMgEwMWQ3YThkYWUxMDc0NzY5',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:12 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://fakeaccount.table.core.windows.net/$metadata#Tables","value":[{"TableName":"TestChars2"},{"TableName":"TestChars3"},{"TableName":"testTable"},{"TableName":"TestTestTest"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6ced2bd8-0002-0039-0eae-a9c11b000000',
  'x-ms-client-request-id',
  '4e693ea6-42bb-4da3-a481-167f10ee2353',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 21:24:12 GMT'
]);
