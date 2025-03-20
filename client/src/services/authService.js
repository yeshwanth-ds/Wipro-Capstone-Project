import API from "./api";

export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { Email: email, PasswordHash: password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await API.post("/auth/register", { Name: name, Email: email, PasswordHash: password });
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};


export const getTotalIncome = async () => {
    try {
      const response = await API.get("/auth/total-income");
      console.log("Total Income API Response:", response.data);
      return response.data.totalIncome || 0;  // Fix property name
    } catch (error) {
      console.error("Error fetching total income:", error);
      return 0;
    }
  };
  
  export const getTotalExpense = async () => {
    try {
      const response = await API.get("/auth/total-expense");
      console.log("Total Expense API Response:", response.data);
      return response.data.totalExpense || 0;  // Fix property name
    } catch (error) {
      console.error("Error fetching total expense:", error);
      return 0;
    }
  };
  
  export const getCurrentBalance = async () => {
    try {
      const response = await API.get("/auth/current-balance");
      console.log("Current Balance API Response:", response.data);
      return response.data.currentBalance || 0;
    } catch (error) {
      console.error("Error fetching current balance:", error);
      return 0;
    }
  };