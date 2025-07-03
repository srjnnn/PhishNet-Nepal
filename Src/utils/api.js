/**
 * Utility function to make API requests and handle responses comprehensively.
 * @param {string} url - The API endpoint.
 * @param {string} method - HTTP method (e.g., GET, POST, PUT, DELETE).
 * @param {Object} [body] - Request body for POST/PUT requests.
 * @param {Object} [headers] - Additional headers (e.g., Authorization, Content-Type).
 * @returns {Promise<Object>} - Resolves with the response data or rejects with an error object.
 */
async function apiRequest(url, method = "GET", body = null, headers = {}) {
  try {
    // Default headers
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    // Request options
    const options = {
      method,
      headers: defaultHeaders,
    };

    // Add body if present and method supports it
    if (body && (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE")) {
      options.body = JSON.stringify(body);
    }

    // Perform fetch request
    const response = await fetch(url, options);

    // Parse response JSON if possible
    let responseData;
    try {
      responseData = await response.json();
    } catch (e) {
      responseData = null; // Handle cases where response is not JSON
    }

    // Handle HTTP status codes
    if (response.ok) {
      return {
        status: response.status,
        ...responseData
      };
    } else {
      // Handle client and server errors
      let errorMessage = responseData?.message || "An error occurred.";
      switch (response.status) {
        case 400:
          errorMessage = "Bad Request. Please check your input.";
          break;
        case 401:
          errorMessage = "Unauthorized. Please log in.";
          break;
        case 403:
          errorMessage = "Forbidden. You don’t have permission to access this.";
          break;
        case 404:
          errorMessage =
            "Not Found. The requested resource could not be found.";
          break;
        case 500:
          errorMessage = "Internal Server Error. Please try again later.";
          break;
        case 503:
          errorMessage = "Service Unavailable. Please try again later.";
          break;
        default:
          errorMessage =
            responseData?.message || "An unexpected error occurred.";
      }
      throw {
        success: false,
        status: response.status,
        message: errorMessage,
        data: responseData,
      };
    }
  } catch (error) {
    // Handle network or unexpected errors
    throw {
      success: false,
      status: error.status || 0,
      message: error.message || "A network error occurred.",
      data: error.data || null,
    };
  }
}

export default apiRequest;
