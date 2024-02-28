export class MaxTimeToCheckInError extends Error {
  constructor() {
    super('Max time to check-in reached.');
  }
}
