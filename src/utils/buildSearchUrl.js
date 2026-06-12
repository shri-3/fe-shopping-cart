/**
 * Build a search URL with query parameters, automatically removing empty ones
 * @param {string} baseUrl - Base API endpoint (e.g., "/api/products/search")
 * @param {object} params - Object with search parameters
 * @returns {string} Complete URL with only non-empty parameters
 *
 * @example
 * buildSearchUrl("/api/products/search", {
 *   name: "phone",
 *   price: 499.99,
 *   rating: "", // empty, will be removed
 *   minPrice: 100,
 *   maxPrice: 500
 * })
 * // Returns: "/api/products/search?name=phone&price=499.99&minPrice=100&maxPrice=500"
 */
export const buildSearchUrl = (baseUrl, params = {}) => {
  const searchParams = new URLSearchParams();

  // Add only non-empty parameters
  Object.entries(params).forEach(([key, value]) => {
    // Skip if value is null, undefined, empty string, NaN, or empty array
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !Number.isNaN(value) &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      searchParams.append(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
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
