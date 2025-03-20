import API from "./api";

export const addIncome = async (incomeData) => {
  try {
    const response = await API.post("/income", incomeData);
    return response.status === 201;
  } catch (error) {
    console.error("Error adding income:", error);
    return false;
  }
};

export const getUserIncome = async () => {
  try {
    const response = await API.get("/income/my-income");
    console.log("Fetched Income Data:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching income:", error);
    return [];
  }
};

export const updateIncome = async (incomeId, updatedIncome) => {
  try {
    if (!incomeId) {
      console.error("Error: Missing income ID for update request.");
      return false;
    }

    console.log("Sending Update Request:", { incomeId, updatedIncome });

    const response = await API.put(`/income/${incomeId}`, updatedIncome);

    return response.status === 200;
  } catch (error) {
    console.error("Error updating income:", error.response ? error.response.data : error);
    return false;
  }
};

export const deleteIncome = async (incomeId) => {
  try {
    if (!incomeId) {
      console.error("Error: Missing income ID for delete request.");
      return false;
    }

    console.log("Deleting Income ID:", incomeId); 
    const response = await API.delete(`/income/${incomeId}`);
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting income:", error);
    return false;
  }
};
