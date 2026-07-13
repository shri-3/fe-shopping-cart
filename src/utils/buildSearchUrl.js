/**
 * Build a POST search payload by removing empty values
 * @param {object} params - Object with search parameters
 * @returns {object} Object with only non-empty parameters
 */
export const buildSearchUrl = (params = {}) => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      const isEmptyArray = Array.isArray(value) && value.length === 0;
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !Number.isNaN(value) &&
        !isEmptyArray
      );
    }),
  );
};

/**
 * Extract non-empty parameters from an object
 * @param {object} params - Object with search parameters
 * @returns {object} Object with only non-empty parameters
 */
export const filterEmptyParams = (params = {}) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) =>
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !Number.isNaN(value),
    ),
  );
};
