import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserIncome, updateIncome, deleteIncome } from "../services/incomeService";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";

const IncomeList = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [editIncome, setEditIncome] = useState(null);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Fixed");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    const data = await getUserIncome();
    setIncomeList(data);
  };

  const handleEdit = (income) => {
    setEditIncome(income);
    setAmount(income.amount);
    setType(income.type);
    setNotes(income.notes);
  };

  const handleUpdate = async () => {
    if (!editIncome || amount <= 0) {
      alert("⚠️ Please enter a valid amount.");
      return;
    }

    setLoading(true);
    const updatedIncome = {
      Amount: parseFloat(amount),
      Type: type,
      Notes: notes.trim(),
    };

    try {
      const success = await updateIncome(editIncome.incomeId, updatedIncome);
      if (success) {
        alert("✅ Income updated successfully!");
        setEditIncome(null);
        fetchIncome();
      } else {
        alert("❌ Failed to update income.");
      }
    } catch (error) {
      alert("⚠️ An error occurred while updating income.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (incomeId) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      const success = await deleteIncome(incomeId);
      if (success) {
        alert("✅ Income deleted successfully!");
        fetchIncome();
      } else {
        alert("❌ Failed to delete income.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-primary">My Income</h2>
        <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
          <FaArrowLeft className="me-2" /> Back to Dashboard
        </button>
      </div>

      {editIncome ? (
        <div className="card shadow-lg p-4 mt-4">
          <h4 className="text-center text-warning">Edit Income</h4>
          <div className="mb-3">
            <label className="form-label fw-bold">Amount</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Type</label>
            <select className="form-control" value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="Fixed">Fixed</option>
              <option value="Additional">Additional</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Notes</label>
            <textarea className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div className="text-center">
            <button className="btn btn-success me-2" onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
            <button className="btn btn-secondary" onClick={() => setEditIncome(null)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="card shadow-lg p-4 mt-4">
          <h4 className="text-center text-info">Income List</h4>
          {incomeList.length === 0 ? (
            <p className="text-center text-muted">No income records found.</p>
          ) : (
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incomeList.map((income) => (
                  <tr key={income.incomeId}>
                    <td><strong>₹{income.amount.toFixed(2)}</strong></td>
                    <td>{income.type}</td>
                    <td>{income.notes || "N/A"}</td>
                    <td>
                      <button className="btn btn-warning me-2" onClick={() => handleEdit(income)}>
                        <FaEdit /> Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(income.incomeId)}>
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default IncomeList;
