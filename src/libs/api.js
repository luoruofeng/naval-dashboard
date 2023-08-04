// lib/api.js

import {API_BASE_URL} from '../config';

export const fetchData = async (path, method = 'GET', params = null, body = null) => {
  try {
    let url = `${API_BASE_URL}${path}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    };

    if (params) {
      const queryParams = new URLSearchParams(params).toString();
      url = `${url}?${queryParams}`;
    }

    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // You can choose to handle the error here or let the calling code handle it.
  }
};
