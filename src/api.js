const BASE_URL = "http://localhost:5188/api";

export const loginUser = async (data) => {
  const response = await fetch(`${BASE_URL}/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return response.json();
};

export const placeOrder = async (orderData, token) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

export const getOrderHistory = async (token) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};
