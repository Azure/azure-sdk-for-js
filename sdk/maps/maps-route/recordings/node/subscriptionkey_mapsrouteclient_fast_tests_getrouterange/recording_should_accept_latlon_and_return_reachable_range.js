let nock = require('nock');

module.exports.hash = "e6a5ce799eeee9ea80058fc5d653c55e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/range/json')
  .query(true)
  .reply(200, {"formatVersion":"0.0.1","reachableRange":{"center":{"latitude":50.97452,"longitude":5.86605},"boundary":[{"latitude":52.12126,"longitude":5.7986},{"latitude":52.16801,"longitude":5.57244},{"latitude":52.19146,"longitude":5.4398},{"latitude":52.26774,"longitude":5.20307},{"latitude":52.27031,"longitude":5.1982},{"latitude":52.28511,"longitude":4.94919},{"latitude":52.10143,"longitude":4.7179},{"latitude":51.95517,"longitude":4.56052},{"latitude":51.94604,"longitude":4.50464},{"latitude":51.70039,"longitude":4.29778},{"latitude":51.57881,"longitude":4.28619},{"latitude":51.49769,"longitude":3.77494},{"latitude":51.21234,"longitude":3.63894},{"latitude":50.68888,"longitude":3.95021},{"latitude":50.49503,"longitude":3.93788},{"latitude":50.45372,"longitude":3.89953},{"latitude":50.28611,"longitude":4.48031},{"latitude":50.2172,"longitude":4.5947},{"latitude":50.09927,"longitude":5.00383},{"latitude":50.09283,"longitude":5.02918},{"latitude":49.93559,"longitude":5.23559},{"latitude":49.88887,"longitude":5.28987},{"latitude":49.77595,"longitude":5.54465},{"latitude":49.71547,"longitude":5.60123},{"latitude":49.77879,"longitude":5.7544},{"latitude":49.93375,"longitude":5.91705},{"latitude":49.97193,"longitude":6.0899},{"latitude":50.02451,"longitude":6.14069},{"latitude":50.08942,"longitude":6.2758},{"latitude":50.08797,"longitude":6.43644},{"latitude":50.00492,"longitude":6.6107},{"latitude":49.94872,"longitude":6.87406},{"latitude":50.22259,"longitude":6.66638},{"latitude":50.36904,"longitude":6.79277},{"latitude":50.18304,"longitude":7.59194},{"latitude":50.33281,"longitude":7.61559},{"latitude":50.45243,"longitude":7.77803},{"latitude":50.94666,"longitude":8.00281},{"latitude":51.067,"longitude":7.70357},{"latitude":51.38782,"longitude":7.72302},{"latitude":51.52811,"longitude":7.80757},{"latitude":51.65305,"longitude":7.36155},{"latitude":51.84194,"longitude":7.25252},{"latitude":51.95025,"longitude":7.04601},{"latitude":51.82713,"longitude":6.67268},{"latitude":51.81133,"longitude":6.48424},{"latitude":51.91398,"longitude":6.33695},{"latitude":52.01718,"longitude":6.14419},{"latitude":52.21659,"longitude":6.12043},{"latitude":52.25314,"longitude":6.00489}]}}, [
  'Cache-Control',
  'no-transform, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '2196',
  'Content-Type',
  'application/json; charset=utf-8',
  'Vary',
  'Accept-Encoding',
  'x-ms-azuremaps-region',
  'West US 2',
  'X-Content-Type-Options',
  'nosniff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-MSEdge-Ref',
  'Ref A: 6CE41BE8422543D98B5F9FCBAAD50028 Ref B: TPE30EDGE0518 Ref C: 2022-03-14T03:12:24Z',
  'Date',
  'Mon, 14 Mar 2022 03:12:24 GMT'
]);
