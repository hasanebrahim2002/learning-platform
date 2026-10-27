import type { TypeOfLanguage } from "../types/state";

interface RequestOptions extends RequestInit {
  lang?: TypeOfLanguage;
}
const BASE_URL = "https://education-37hi.onrender.com/api";
export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": options.lang || "en",
      ...options.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  return result as T;
};
