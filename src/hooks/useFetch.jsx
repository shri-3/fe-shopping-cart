import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const useFetch = (url, options = {}) => {
  const {
    method = "GET",
    body = null,
    headers = {},
    lazy = false, // If true, prevents immediate execution on component mount
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(
    async (customBody = null, customUrl = null) => {
      setLoading(true);
      setError("");
      try {
        const requestUrl = customUrl || url;
        const requestData = customBody || body;
        const response = await axios({
          url: requestUrl,
          method: method.toUpperCase(),
          data: requestData, // Axios uses 'data' property for POST/PUT request bodies
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        });

        setData(response.data);
        return response.data;
      } catch (err) {
        const errMsg =
          err.response?.data?.message || err.message || "An error occurred";
        setError(errMsg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, method, JSON.stringify(body), JSON.stringify(headers)],
  );

  useEffect(() => {
    if (!lazy) {
      fetchData();
    }
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
