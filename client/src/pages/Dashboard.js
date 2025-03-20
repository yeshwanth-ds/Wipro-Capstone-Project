import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getTotalIncome, getTotalExpense, getCurrentBalance } from "../services/authService";
import { getUserExpenses, updateExpense, deleteExpense } from "../services/expenseService";
import { FaEdit, FaTrash, FaMoneyBillWave, FaArrowUp, FaArrowDown } from "react-icons/fa";

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);
  const [newExpenseData, setNewExpenseData] = useState({ amount: "", notes: "", categoryId: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchFinanceData = async () => {
      try {
        const [income, expense, balance, expensesData] = await Promise.all([
          getTotalIncome(),
          getTotalExpense(),
          getCurrentBalance(),
          getUserExpenses(),
        ]);

        setTotalIncome(income);
        setTotalExpense(expense);
        setCurrentBalance(balance);
      setExpenses(expensesData);
      } catch (error) {
        console.error("Error fetching finance data:", error);
        alert("Session expired, please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchFinanceData();
  }, [navigate]);

  const handleEdit = (expense) => {
    setEditExpense(expense);
    setNewExpenseData({ amount: expense.amount, notes: expense.notes, categoryId: expense.categoryId });
  };

  const handleSave = async () => {
    if (!editExpense) return;

    const updated = await updateExpense(editExpense.expenseId, newExpenseData);
    if (updated) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) => (exp.expenseId === editExpense.expenseId ? { ...exp, ...newExpenseData } : exp))
      );
      setEditExpense(null);
      setNewExpenseData({ amount: "", notes: "", categoryId: "" });
    } else {
      alert("Failed to update expense.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      const deleted = await deleteExpense(id);
      if (deleted) {
        setExpenses(expenses.filter((expense) => expense.expenseId !== id));
      } else {
        alert("Failed to delete expense.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary fw-bold mb-4">Dashboard</h2>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card text-white bg-success shadow-lg p-3 text-center">
            <h5 className="fw-bold"><FaArrowUp /> Total Income</h5>
            <h3>₹{totalIncome.toLocaleString()}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger shadow-lg p-3 text-center">
            <h5 className="fw-bold"><FaArrowDown /> Total Expense</h5>
            <h3>₹{totalExpense.toLocaleString()}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-dark shadow-lg p-3 text-center">
            <h5 className="fw-bold"><FaMoneyBillWave /> Current Balance</h5>
            <h3>₹{currentBalance.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Alert when balance is low */}
      {currentBalance < 10000 && (
        <div className="alert alert-warning mt-3 text-center">
          ⚠️ <strong>Warning:</strong> Your balance is low (₹{currentBalance.toLocaleString()}). Consider reducing expenses.
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/add-income" className="btn btn-success me-2">+ Add Income</Link>
        <Link to="/add-expense" className="btn btn-primary">+ Add Expense</Link>
        <Link to="/expense-chart" className="btn btn-info ms-2"> View Charts</Link>
        <Link to="/search-expenses" className="btn btn-secondary ms-2">  Search Expenses</Link>
      </div>

      <h3 className="mt-4">Recent Expenses</h3>
      <div className="table-responsive">
        <table className="table table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense.expenseId}>
                  <td>{expense.categoryName}</td>
                  <td className="fw-bold text-danger">₹{expense.amount.toLocaleString()}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.notes}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(expense)}>
                      <FaEdit /> Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(expense.expenseId)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Expense Form */}
      {editExpense && (
        <div className="card p-3 mt-4 shadow">
          <h4 className="text-center">Edit Expense</h4>
          <div className="mb-2">
            <label className="fw-bold">Amount:</label>
            <input
              type="number"
              className="form-control"
              value={newExpenseData.amount}
              onChange={(e) => setNewExpenseData({ ...newExpenseData, amount: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="fw-bold">Notes:</label>
            <input
              type="text"
              className="form-control"
              value={newExpenseData.notes}
              onChange={(e) => setNewExpenseData({ ...newExpenseData, notes: e.target.value })}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={() => setEditExpense(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
