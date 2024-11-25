export function msToDaysLeft(nanoseconds) {
  // Convert nanoseconds to milliseconds
  const timestampInMillis = nanoseconds / 1_000_000;

  // Get the current time in milliseconds
  const currentTimeInMillis = Date.now();

  // Calculate the difference in milliseconds
  const differenceInMillis = timestampInMillis - currentTimeInMillis;

  // Convert the difference from milliseconds to days
  const msInADay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  const daysLeft = Math.ceil(differenceInMillis / msInADay); // Rounds up to the nearest whole day

  return daysLeft >= 0 ? daysLeft : 0; // Return 0 if the timestamp is in the past
}
