import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addIncome } from "../services/incomeService";
import { FaMoneyBillWave, FaStickyNote, FaWallet } from "react-icons/fa";

const AddIncome = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Fixed");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    const incomeData = {
      Amount: parseFloat(amount),
      Type: type,
      Notes: notes.trim(),
    };

    try {
      const success = await addIncome(incomeData);
      if (success) {
        alert("✅ Income added successfully!");
        navigate("/income-list");
      } else {
        alert("❌ Failed to add income. Please try again.");
      }
    } catch (error) {
      alert("⚠️ An error occurred while adding income.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center text-primary mb-4">Add Income</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <FaMoneyBillWave className="me-2 text-success" /> Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter income amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <FaWallet className="me-2 text-warning" /> Type
                </label>
                <select className="form-control" value={type} onChange={(e) => setType(e.target.value)} required>
                  <option value="Fixed">Fixed Income</option>
                  <option value="Additional">Additional Income</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <FaStickyNote className="me-2 text-info" /> Notes (Optional)
                </label>
                <textarea
                  className="form-control"
                  placeholder="Enter any notes (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div className="text-center">
  <button type="submit" className="btn btn-primary w-40 d-inline-block mx-2" disabled={loading}>
    {loading ? "Adding..." : "Add Income"}
  </button>
  <button type="button" className="btn btn-secondary w-40 d-inline-block mx-2" onClick={() => navigate("/")}>
    Cancel
  </button>
</div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;
