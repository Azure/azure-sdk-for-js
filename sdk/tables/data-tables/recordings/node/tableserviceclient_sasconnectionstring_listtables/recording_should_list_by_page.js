let nock = require('nock');

module.exports.hash = "49431c138ecffcaccd598ee952bd3503";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestSASConnectionStringnode0"},{"TableName":"ListTableTestSASConnectionStringnode1"},{"TableName":"ListTableTestSASConnectionStringnode10"},{"TableName":"ListTableTestSASConnectionStringnode11"},{"TableName":"ListTableTestSASConnectionStringnode12"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d82f7-7002-00b5-4acd-5c8c40000000',
  'x-ms-client-request-id',
  '20e53db8-0814-4155-ae19-5da810f58339',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!76!bGlzdHRhYmxldGVzdHNhc2Nvbm5lY3Rpb25zdHJpbmdub2RlMTMBMDFkNzVjY2QyYzcxYmQxZg--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:11 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestSASConnectionStringnode13"},{"TableName":"ListTableTestSASConnectionStringnode14"},{"TableName":"ListTableTestSASConnectionStringnode15"},{"TableName":"ListTableTestSASConnectionStringnode16"},{"TableName":"ListTableTestSASConnectionStringnode17"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d830e-7002-00b5-60cd-5c8c40000000',
  'x-ms-client-request-id',
  '77a9029e-cec3-4f8e-931c-c73db9ffde80',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!76!bGlzdHRhYmxldGVzdHNhc2Nvbm5lY3Rpb25zdHJpbmdub2RlMTgBMDFkNzVjY2QyYzk3MjY1Nw--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:11 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestSASConnectionStringnode18"},{"TableName":"ListTableTestSASConnectionStringnode19"},{"TableName":"ListTableTestSASConnectionStringnode2"},{"TableName":"ListTableTestSASConnectionStringnode3"},{"TableName":"ListTableTestSASConnectionStringnode4"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8322-7002-00b5-74cd-5c8c40000000',
  'x-ms-client-request-id',
  'be0ad103-9e0c-4872-9d19-13404078f8cb',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!72!bGlzdHRhYmxldGVzdHNhc2Nvbm5lY3Rpb25zdHJpbmdub2RlNQEwMWQ3NWNjZDJjMmY1MGE3',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:11 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#Tables","value":[{"TableName":"ListTableTestSASConnectionStringnode5"},{"TableName":"ListTableTestSASConnectionStringnode6"},{"TableName":"ListTableTestSASConnectionStringnode7"},{"TableName":"ListTableTestSASConnectionStringnode8"},{"TableName":"ListTableTestSASConnectionStringnode9"}]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d832e-7002-00b5-7fcd-5c8c40000000',
  'x-ms-client-request-id',
  'bfb08a84-c2eb-48e1-b9b2-97e390db9797',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-continuation-NextTableName',
  '1!76!dGFibGVjbGllbnR0ZXN0c2FzY29ubmVjdGlvbnN0cmluZ25vZGUBMDFkNzVjY2QyYTkyMWQyYw--',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,x-ms-continuation-NextTableName,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:11 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get('/Tables')
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#Tables","value":[]}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8341-7002-00b5-11cd-5c8c40000000',
  'x-ms-client-request-id',
  '87b1fc2b-b9f5-4d6e-93e7-294e9ed58d49',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:11 GMT'
]);
