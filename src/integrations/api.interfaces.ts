/**
 * Represents the response from the API Service.
 *
 * @interface
 * @property {Status} status - The status of the response, either "Success" or "Failed".
 * @property {object} result - The result object containing the action, message, and additional data.
 * @property {object} result.data - An additional data object that may contain extra details about the result.
 *
 * @example
 * const response: ApiResponse = {
 *   status: Status.Success,
 *   result: {
 *     action: 'query',
 *     message: 'Query successfully processed',
 *     data: {
 *       result: 'Some data here',
 *     },
 *   },
 * };
 */
export interface ApiResponse<T> {
  status: Status;
  data: T;
}

/**
 * Enum representing the status of a CDC AI Agent response.
 *
 * @enum {string}
 * @property {string} Success - The request was successful.
 * @property {string} Failed - The request failed.
 */
export enum Status {
  Success = 'Success',
  Failed = 'Failed',
}

/**
 * Represents the options for a fetch request.
 *
 * @template T - The type of the body object to be sent in the request (e.g., JSON payload).
 * @interface
 * @property {string} [method] - The HTTP method to be used (e.g., GET, POST, PUT, DELETE). Default is 'GET'.
 * @property {Record<string, string>} [headers] - Optional headers to include in the request.
 * @property {T} [body] - Optional body data to be sent with the request.
 *
 * @example
 * const options: FetchOptions<MyRequestBodyType> = {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *   },
 *   body: { name: 'John Doe' },
 * };
 */
export type FetchOptions<T> = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: T;
};

/**
 * Enum representing the HTTP methods that can be used in API requests.
 *
 * @enum {string}
 * @property {string} GET - HTTP GET method.
 * @property {string} POST - HTTP POST method.
 * @property {string} PUT - HTTP PUT method.
 * @property {string} DELETE - HTTP DELETE method.
 *
 * @example
 * const method: Method = Method.GET;
 */
export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
