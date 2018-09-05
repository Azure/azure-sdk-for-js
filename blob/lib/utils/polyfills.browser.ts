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
    while (count-- > 0) {
      arr.push(str);
    }
    return arr.join("");
  };
}
/* String.prototype.includes */
if (!String.prototype.includes) {
  String.prototype.includes = function(
    searchString: string,
    position: number = 0
  ): boolean {
    if (typeof position !== "number") {
      position = 0;
    }

    if (position + searchString.length > this.length) {
      return false;
    } else {
      return -1 !== this.indexOf(searchString, position);
    }
  };
}
