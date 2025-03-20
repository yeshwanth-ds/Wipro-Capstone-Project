import API from "./api";

export const getUserExpenses = async () => {
  try {
    const response = await API.get("/expenses/my-expenses");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching user expenses:", error);
    return [];
  }
};

export const addExpense = async (expenseData) => {
  try {
    const response = await API.post("/expenses", expenseData);
    return response.status === 201;
  } catch (error) {
    console.error("Error adding expense:", error);
    return false;
  }
};

export const updateExpense = async (id, expenseData) => {
  try {
    const response = await API.put(`/expenses/${id}`, expenseData);
    return response.status === 200;
  } catch (error) {
    console.error("Error updating expense:", error);
    return false;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await API.delete(`/expenses/${id}`);
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting expense:", error);
    return false;
  }
};


export const filterExpenses = async (categoryId, date) => {
  try {
    console.log("🔍 Sending request to: /expenses/filter");

    const response = await API.get("/expenses/filter", {
      params: { categoryId, date },
    });

    console.log("API Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
    throw error; 
  }
};