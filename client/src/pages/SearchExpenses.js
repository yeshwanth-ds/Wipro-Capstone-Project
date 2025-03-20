import { useState } from "react";
import { filterExpenses } from "../services/expenseService";
import { FaSearch } from "react-icons/fa";

const categories = [
  { id: 1, name: "Food" },
  { id: 2, name: "Rent" },
  { id: 3, name: "Travel" },
  { id: 4, name: "Online Subscriptions" },
  { id: 5, name: "Fuel" },
  { id: 6, name: "Shopping" },
  { id: 7, name: "Entertainment" },
  { id: 8, name: "Healthcare" },
  { id: 9, name: "Education" },
  { id: 10, name: "Other" },
];

const SearchExpenses = () => {
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const handleSearch = async () => {
    try {
      const expenses = await filterExpenses(categoryId, date);
      setFilteredExpenses(expenses);
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching expenses.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary fw-bold mb-3">Search Expenses</h2>
      
      <div className="card shadow-sm p-3 border-0">
        <div className="row g-2 align-items-center">
          <div className="col-md-5">
            <select 
              className="form-select form-select-sm" 
              value={categoryId} 
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-5">
            <input 
              type="date" 
              className="form-control form-control-sm" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-primary btn-sm" onClick={handleSearch}>
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </div>
      
      <h4 className="mt-3 text-center">Filtered Expenses</h4>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-sm shadow-sm">
          <thead className="table-dark text-center">
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <tr key={expense.expenseId} className="text-center">
                  <td>{expense.categoryName}</td>
                  <td className="fw-bold text-danger">₹{expense.amount.toLocaleString()}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted py-2">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchExpenses;