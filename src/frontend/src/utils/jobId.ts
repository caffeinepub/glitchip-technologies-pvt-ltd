/**
 * Validates that a job ID is 6-7 strictly alphanumeric characters (uppercase A-Z and digits 0-9)
 */
export function isValidJobId(jobId: string): boolean {
  const regex = /^[A-Z0-9]{6,7}$/;
  return regex.test(jobId);
}

/**
 * Formats a job ID validation error message
 */
export function getJobIdErrorMessage(): string {
  return 'Job ID must be 6-7 alphanumeric characters (uppercase letters and digits only)';
}
