let nock = require('nock');

module.exports.hash = "e86ac6a1523adf0041735328c0b4404c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","dimensionName":"city"})
  .reply(200, {"value":["Karachi","__SUM__","Los Angeles","Delhi","Manila","Seoul","Mumbai","Beijing","New York","Miami","Mexico City","Tianjin","Philadelphia","Osaka","Moscow","Santiago","Istanbul","Taipei","Madrid","Kolkata","Rio de Janeiro","Shenzhen","Belo Horizonte","Jakarta","Lahore","Dallas","Wuhan","Cairo","Hyderabad","Lima","Dhaka","Bogota","Shanghai","Paris","Bangkok","Houston","Buenos Aires","Kinshasa","London","Chennai","Bengaluru","Lagos","Tokyo","Sao Paulo","Chicago","Hong Kong","Chongqing","Guangzhou","Tehran","Boston","Ho Chi Minh City","Khartoum","Barcelona","Washington","Pune","Shenyang","Saint Petersburg","Toronto","Guadalajara","Singapore","Dongguan","Luanda","Baghdad","Haora"],"@nextLink":null}, [
  'Content-Length',
  '710',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5ec4961a-0dbb-4ebf-9d9b-e4a5f7f4ef01',
  'x-envoy-upstream-service-time',
  '230',
  'apim-request-id',
  '5ec4961a-0dbb-4ebf-9d9b-e4a5f7f4ef01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:13 GMT'
]);
