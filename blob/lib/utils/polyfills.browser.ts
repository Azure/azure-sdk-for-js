/* Object.values */
if (!Object.values) {
  Object.values = function values(obj: any) {
    return Object.keys(obj).map(e => obj[e]);
  };
}

/* String.prototype.startsWith() */
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(str: string, pos: number): boolean {
    return str === this.substr(!pos || pos < 0 ? 0 : +pos, str.length);
  };
}

/* String.prototype.endsWith() */
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(str: string, thisLen: number): boolean {
    thisLen = !thisLen || thisLen > this.length ? this.length : thisLen;
    return str === this.substring(thisLen - str.length, thisLen);
  };
}

/* String.prototype.repeat() */
if (!String.prototype.repeat) {
  String.prototype.repeat = function(count: number): string {
    const str: string = String(this);
    if (count < 0 || count === Infinity) {
      throw new RangeError("Invalid count value");
    }
    if (this.length === 0 || count === 0) {
      return "";
    }
    const arr: string[] = [];
    while (count > 0) {
      arr.push(str);
    }
    return arr.join("");
  };
}

/* String.prototype.padStart() */
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(
    targetLength: number,
    padString: string = " "
  ): string {
    padString = padString || " ";
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}
