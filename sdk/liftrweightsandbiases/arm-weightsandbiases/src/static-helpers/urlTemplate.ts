// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

//---------------------
// interfaces
//---------------------
interface ValueOptions {
  isFirst: boolean; // is first value in the expression
  op?: string; // operator
  varValue?: any; // variable value
  varName?: string; // variable name
  modifier?: string; // modifier e.g *
  reserved?: boolean; // if true we'll keep reserved words with not encoding
}

export interface UrlTemplateOptions {
  // if set to true, reserved characters will not be encoded
  allowReserved?: boolean;
}

// ---------------------
// helpers
// ---------------------
function encodeComponent(val: string, reserved?: boolean, op?: string) {
  return (reserved ?? op === "+") || op === "#"
    ? encodeReservedComponent(val)
    : encodeRFC3986URIComponent(val);
}

function encodeReservedComponent(str: string) {
  return str
    .split(/(%[0-9A-Fa-f]{2})/g)
    .map((part) => (!/%[0-9A-Fa-f]/.test(part) ? encodeURI(part) : part))
    .join("");
}

function encodeRFC3986URIComponent(str: string) {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function isDefined(val: any) {
  return val !== undefined && val !== null;
}

function getNamedAndIfEmpty(op?: string): [boolean, string] {
  return [!!op && [";", "?", "&"].includes(op), !!op && ["?", "&"].includes(op) ? "=" : ""];
}

function getFirstOrSep(op?: string, isFirst = false) {
  if (isFirst) {
    return !op || op === "+" ? "" : op;
  } else if (!op || op === "+" || op === "#") {
    return ",";
  } else if (op === "?") {
    return "&";
  } else {
    return op;
  }
}

function getExpandedValue(option: ValueOptions) {
  let isFirst = option.isFirst;
  const { op, varName, varValue: value, reserved } = option;
  const vals: string[] = [];
  const [named, ifEmpty] = getNamedAndIfEmpty(op);

  if (Array.isArray(value)) {
    for (const val of value.filter(isDefined)) {
      // prepare the following parts: separator, varName, value
      vals.push(`${getFirstOrSep(op, isFirst)}`);
      if (named && varName) {
        vals.push(`${encodeURIComponent(varName)}`);
        val === "" ? vals.push(ifEmpty) : vals.push("=");
      }
      vals.push(encodeComponent(val, reserved, op));
      isFirst = false;
    }
  } else if (typeof value === "object") {
    for (const key of Object.keys(value)) {
      const val = value[key];
      if (!isDefined(val)) {
        continue;
      }
      // prepare the following parts: separator, key, value
      vals.push(`${getFirstOrSep(op, isFirst)}`);
      if (key) {
        vals.push(`${encodeURIComponent(key)}`);
        named && val === "" ? vals.push(ifEmpty) : vals.push("=");
      }
      vals.push(encodeComponent(val, reserved, op));
      isFirst = false;
    }
  }
  return vals.join("");
}

function getNonExpandedValue(option: ValueOptions) {
  const { op, varName, varValue: value, isFirst, reserved } = option;
  const vals: string[] = [];
  const first = getFirstOrSep(op, isFirst);
  const [named, ifEmpty] = getNamedAndIfEmpty(op);
  if (named && varName) {
    vals.push(encodeComponent(varName, reserved, op));
    if (value === "") {
      if (!ifEmpty) {
        vals.push(ifEmpty);
      }
      return !vals.join("") ? undefined : `${first}${vals.join("")}`;
    }
    vals.push("=");
  }

  const items = [];
  if (Array.isArray(value)) {
    for (const val of value.filter(isDefined)) {
      items.push(encodeComponent(val, reserved, op));
    }
  } else if (typeof value === "object") {
    for (const key of Object.keys(value)) {
      if (!isDefined(value[key])) {
        continue;
      }
      items.push(encodeRFC3986URIComponent(key));
      items.push(encodeComponent(value[key], reserved, op));
    }
  }
  vals.push(items.join(","));
  return !vals.join(",") ? undefined : `${first}${vals.join("")}`;
}

function getVarValue(option: ValueOptions): string | undefined {
  const { op, varName, modifier, isFirst, reserved, varValue: value } = option;

  if (!isDefined(value)) {
    return undefined;
  } else if (["string", "number", "boolean"].includes(typeof value)) {
    let val = value.toString();
    const [named, ifEmpty] = getNamedAndIfEmpty(op);
    const vals: string[] = [getFirstOrSep(op, isFirst)];
    if (named && varName) {
      // No need to encode varName considering it is already encoded
      vals.push(varName);
      val === "" ? vals.push(ifEmpty) : vals.push("=");
    }
    if (modifier && modifier !== "*") {
      val = val.substring(0, parseInt(modifier, 10));
    }
    vals.push(encodeComponent(val, reserved, op));
    return vals.join("");
  } else if (modifier === "*") {
    return getExpandedValue(option);
  } else {
    return getNonExpandedValue(option);
  }
}

// ---------------------------------------------------------------------------------------------------
// This is an implementation of RFC 6570 URI Template: https://datatracker.ietf.org/doc/html/rfc6570.
// ---------------------------------------------------------------------------------------------------
export function expandUrlTemplate(
  template: string,
  context: Record<string, any>,
  option?: UrlTemplateOptions,
): string {
  return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, (_, expr, text) => {
    if (!expr) {
      return encodeReservedComponent(text);
    }
    let op;
    if (["+", "#", ".", "/", ";", "?", "&"].includes(expr[0])) {
      (op = expr[0]), (expr = expr.slice(1));
    }
    const varList = expr.split(/,/g);
    const result = [];
    for (const varSpec of varList) {
      const varMatch = /([^:\*]*)(?::(\d+)|(\*))?/.exec(varSpec);
      if (!varMatch || !varMatch[1]) {
        continue;
      }
      const varValue = getVarValue({
        isFirst: result.length === 0,
        op,
        varValue: context[varMatch[1]],
        varName: varMatch[1],
        modifier: varMatch[2] || varMatch[3],
        reserved: option?.allowReserved,
      });
      if (varValue) {
        result.push(varValue);
      }
    }
    return result.join("");
  });
}
