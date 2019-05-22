import { TimeSpan } from "./timeSpan";

export function parseDelimitedString(delimitedString: string) {
  if (delimitedString == null) {
    throw new Error("delimitedString is null or undefined");
  }

  const metrics: { [key: string]: any } = {};

  const headerAttributes = delimitedString.split(";");
  for (const attribute of headerAttributes) {
    const attributeKeyValue = attribute.split("=");

    if (attributeKeyValue.length !== 2) {
      throw new Error("recieved a malformed delimited string");
    }

    const attributeKey = attributeKeyValue[0];
    const attributeValue = parseFloat(attributeKeyValue[1]);

    metrics[attributeKey] = attributeValue;
  }

  return metrics;
}

export function timeSpanFromMetrics(metrics: { [key: string]: any } /* TODO: any */, key: string) {
  if (key in metrics) {
    return TimeSpan.fromMilliseconds(metrics[key]);
  }

  return TimeSpan.zero;
}

export function isNumeric(input: any) {
  return !isNaN(parseFloat(input)) && isFinite(input);
}
