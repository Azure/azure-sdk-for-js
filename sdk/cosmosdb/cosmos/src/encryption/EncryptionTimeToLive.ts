export class EncryptionTimeToLive {
  static FromMinutes(minutes: number): number {
    return minutes * 60 * 1000;
  }

  static FromHours(hours: number): number {
    return hours * 60 * 60 * 1000;
  }

  static NoTtl(): number {
    return 0;
  }
}
