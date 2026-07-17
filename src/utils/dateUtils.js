/**
 * Splits an ISO DOB string into distinct day, month, and year components.
 * @param {string} dobString - The ISO date string from the database.
 * @returns {object} An object containing day, month, and year as strings, or null if invalid.
 */
export const splitDateOfBirth = (dobString) => {
  // 1. Safety Guard: Return null or default values if the date string doesn't exist
  if (!dobString) {
    return { day: "", month: "", year: "" };
  }

  // 2. Convert the ISO string into a true JavaScript Date object
  const dateObj = new Date(dobString);

  // 3. Fallback: Check if the date conversion resulted in an "Invalid Date"
  if (isNaN(dateObj.getTime())) {
    return { day: "", month: "", year: "" };
  }

  // 4. Extract components cleanly using UTC to prevent timezone shifts
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getUTCDate()).padStart(2, "0");

  // 5. Return the packaged data back to whoever called the function
  return { day, month, year };
};
