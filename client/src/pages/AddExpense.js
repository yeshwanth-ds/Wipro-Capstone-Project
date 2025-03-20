import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../services/expenseService";
import { FaTags, FaMoneyBillWave, FaStickyNote } from "react-icons/fa";


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

const AddExpense = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || amount <= 0) {
      alert(" Please select a valid category and enter a positive amount.");
      return;
    }

    setLoading(true);
    const selectedCategory = categories.find((c) => c.name === category);
    const expenseData = {
      CategoryId: selectedCategory.id,
      Amount: parseFloat(amount),
      Notes: notes.trim(),
    };

    try {
      const success = await addExpense(expenseData);
      if (success) {
        alert("✅ Expense added successfully!");
        navigate("/dashboard");
      } else {
        alert("❌ Failed to add expense. Try again.");
      }
    } catch (error) {
      alert("⚠️ An error occurred while adding expense.");
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
            <h2 className="text-center text-danger mb-4">Add Expense</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <FaTags className="me-2 text-primary" /> Category
                </label>
                <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <FaMoneyBillWave className="me-2 text-success" /> Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter expense amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
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
  <button type="submit" className="btn btn-danger w-40 d-inline-block mx-2" disabled={loading}>
    {loading ? "Adding..." : "Add Expense"}
  </button>
  <button type="button" className="btn btn-secondary w-40 d-inline-block mx-2" onClick={() => navigate("/dashboard")}>
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

export default AddExpense;
