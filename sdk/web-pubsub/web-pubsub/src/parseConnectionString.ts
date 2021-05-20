import { AzureKeyCredential } from "@azure/core-auth";
import { URL } from "./util/url";

interface ParsedConnectionString {
  credential: AzureKeyCredential;
  endpoint: string;
}

export function parseConnectionString(conn: string): ParsedConnectionString {
  let parsed: { [id: string]: string } = {};

  conn.split(";").forEach((i) => {
    const assignmentPos = i.indexOf("=");
    if (assignmentPos === -1) return;
    const key = i.substring(0, assignmentPos).toLowerCase();
    const value = i.substring(assignmentPos + 1);
    parsed[key] = value;
  });

  let endpointPart = parsed["endpoint"];
  if (!endpointPart) throw new TypeError("connection string missing endpoint");
  if (!endpointPart.startsWith("http")) {
    endpointPart = `https://${endpointPart}`;
  }
  const key = parsed["accesskey"];
  if (!key) throw new TypeError("connection string missing access key");
  const credential = new AzureKeyCredential(key);
  const port = parsed["port"];
  const url = new URL(endpointPart);
  url.port = port;
  const endpoint = url.toString();
  url.port = "";

  return { credential, endpoint };
}
