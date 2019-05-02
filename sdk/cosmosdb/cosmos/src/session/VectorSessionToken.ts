/**
 * Models vector clock bases session token. Session token has the following format:
 * {Version}#{GlobalLSN}#{RegionId1}={LocalLsn1}#{RegionId2}={LocalLsn2}....#{RegionIdN}={LocalLsnN}
 * 'Version' captures the configuration number of the partition which returned this session token.
 * 'Version' is incremented everytime topology of the partition is updated (say due to Add/Remove/Failover).
 *
 * The choice of separators '#' and '=' is important. Separators ';' and ',' are used to delimit
 * per-partitionKeyRange session token
 * @hidden
 * @private
 *
 */
export class VectorSessionToken {
  private static readonly SEGMENT_SEPARATOR = "#";
  private static readonly REGION_PROGRESS_SEPARATOR = "=";

  constructor(
    private readonly version: number,
    private readonly globalLsn: number,
    private readonly localLsnByregion: Map<number, string>,
    private readonly sessionToken?: string
  ) {
    if (!this.sessionToken) {
      const regionAndLocalLsn = [];
      for (const [key, value] of this.localLsnByregion.entries()) {
        regionAndLocalLsn.push(`${key}${VectorSessionToken.REGION_PROGRESS_SEPARATOR}${value}`);
      }
      const regionProgress = regionAndLocalLsn.join(VectorSessionToken.SEGMENT_SEPARATOR);
      if (regionProgress === "") {
        this.sessionToken = `${this.version}${VectorSessionToken.SEGMENT_SEPARATOR}${this.globalLsn}`;
      } else {
        this.sessionToken = `${this.version}${VectorSessionToken.SEGMENT_SEPARATOR}${this.globalLsn}${
          VectorSessionToken.SEGMENT_SEPARATOR
        }${regionProgress}`;
      }
    }
  }

  public static create(sessionToken: string): VectorSessionToken {
    if (!sessionToken) {
      return null;
    }

    const [versionStr, globalLsnStr, ...regionSegments] = sessionToken.split(VectorSessionToken.SEGMENT_SEPARATOR);

    const version = parseInt(versionStr, 10);
    const globalLsn = parseFloat(globalLsnStr);

    if (typeof version !== "number" || typeof globalLsn !== "number") {
      return null;
    }

    const lsnByRegion = new Map<number, string>();
    for (const regionSegment of regionSegments) {
      const [regionIdStr, localLsnStr] = regionSegment.split(VectorSessionToken.REGION_PROGRESS_SEPARATOR);

      if (!regionIdStr || !localLsnStr) {
        return null;
      }

      const regionId = parseInt(regionIdStr, 10);
      let localLsn: string;
      try {
        localLsn = localLsnStr;
      } catch (err) {
        // TODO: log error
        return null;
      }
      if (typeof regionId !== "number") {
        return null;
      }

      lsnByRegion.set(regionId, localLsn);
    }

    return new VectorSessionToken(version, globalLsn, lsnByRegion, sessionToken);
  }

  public equals(other: VectorSessionToken): boolean {
    return !other
      ? false
      : this.version === other.version &&
          this.globalLsn === other.globalLsn &&
          this.areRegionProgressEqual(other.localLsnByregion);
  }

  public merge(other: VectorSessionToken): VectorSessionToken {
    if (other == null) {
      throw new Error("other (Vector Session Token) must not be null");
    }

    if (this.version === other.version && this.localLsnByregion.size !== other.localLsnByregion.size) {
      throw new Error(`Compared session tokens ${this.sessionToken} and ${other.sessionToken} have unexpected regions`);
    }

    const [higherVersionSessionToken, lowerVersionSessionToken]: [VectorSessionToken, VectorSessionToken] =
      this.version < other.version ? [other, this] : [this, other];

    const highestLocalLsnByRegion = new Map<number, string>();

    for (const [regionId, highLocalLsn] of higherVersionSessionToken.localLsnByregion.entries()) {
      const lowLocalLsn = lowerVersionSessionToken.localLsnByregion.get(regionId);
      if (lowLocalLsn) {
        highestLocalLsnByRegion.set(regionId, max(highLocalLsn, lowLocalLsn));
      } else if (this.version === other.version) {
        throw new Error(
          `Compared session tokens have unexpected regions. Session 1: ${this.sessionToken} - Session 2: ${
            this.sessionToken
          }`
        );
      } else {
        highestLocalLsnByRegion.set(regionId, highLocalLsn);
      }
    }

    return new VectorSessionToken(
      Math.max(this.version, other.version),
      Math.max(this.globalLsn, other.globalLsn),
      highestLocalLsnByRegion
    );
  }

  public toString() {
    return this.sessionToken;
  }

  private areRegionProgressEqual(other: Map<number, string>): boolean {
    if (this.localLsnByregion.size !== other.size) {
      return false;
    }

    for (const [regionId, localLsn] of this.localLsnByregion.entries()) {
      const otherLocalLsn = other.get(regionId);

      if (localLsn !== otherLocalLsn) {
        return false;
      }
    }
    return true;
  }
}

function max(int1: string, int2: string) {
  // NOTE: This only works for positive numbers
  if (int1.length === int2.length) {
    return int1 > int2 ? int1 : int2;
  } else if (int1.length > int2.length) {
    return int1;
  } else {
    return int2;
  }
}
