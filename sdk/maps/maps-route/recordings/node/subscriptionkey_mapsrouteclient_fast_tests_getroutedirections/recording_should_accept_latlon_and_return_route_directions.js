let nock = require('nock');

module.exports.hash = "7afd9623ba1ed79f160a1ce6497f5d77";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://atlas.microsoft.com:443', {"encodedQueryParams":true})
  .get('/route/directions/json')
  .query(true)
  .reply(200, {"formatVersion":"0.0.12","routes":[{"summary":{"lengthInMeters":1147,"travelTimeInSeconds":137,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:07+01:00","arrivalTime":"2022-03-15T06:39:24+01:00"},"legs":[{"summary":{"lengthInMeters":1147,"travelTimeInSeconds":137,"trafficDelayInSeconds":0,"trafficLengthInMeters":0,"departureTime":"2022-03-15T06:37:07+01:00","arrivalTime":"2022-03-15T06:39:24+01:00"},"points":[{"latitude":52.5093,"longitude":13.42937},{"latitude":52.50904,"longitude":13.42913},{"latitude":52.50895,"longitude":13.42904},{"latitude":52.50868,"longitude":13.4288},{"latitude":52.5084,"longitude":13.42857},{"latitude":52.50816,"longitude":13.42839},{"latitude":52.50791,"longitude":13.42825},{"latitude":52.50757,"longitude":13.42772},{"latitude":52.50752,"longitude":13.42785},{"latitude":52.50742,"longitude":13.42809},{"latitude":52.50735,"longitude":13.42824},{"latitude":52.5073,"longitude":13.42837},{"latitude":52.50696,"longitude":13.4291},{"latitude":52.50673,"longitude":13.42961},{"latitude":52.50619,"longitude":13.43092},{"latitude":52.50608,"longitude":13.43116},{"latitude":52.50574,"longitude":13.43195},{"latitude":52.50564,"longitude":13.43218},{"latitude":52.50528,"longitude":13.43299},{"latitude":52.50513,"longitude":13.43336},{"latitude":52.505,"longitude":13.43366},{"latitude":52.50464,"longitude":13.43451},{"latitude":52.50451,"longitude":13.43482},{"latitude":52.50444,"longitude":13.43499},{"latitude":52.50418,"longitude":13.43564},{"latitude":52.50364,"longitude":13.4369},{"latitude":52.50343,"longitude":13.43738},{"latitude":52.5033,"longitude":13.43767},{"latitude":52.50275,"longitude":13.43873}]}],"sections":[{"startPointIndex":0,"endPointIndex":28,"sectionType":"TRAVEL_MODE","travelMode":"car"}]}]}, [
  'Cache-Control',
  'no-transform, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1796',
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
  'Ref A: F1E97320E5004D1AB91F4DC26A702CD1 Ref B: TPE30EDGE0421 Ref C: 2022-03-15T05:37:07Z',
  'Date',
  'Tue, 15 Mar 2022 05:37:07 GMT'
]);
