import React, { useEffect, useState } from "react";
import { getUserExpenses } from "../services/expenseService";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";

Chart.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenses = await getUserExpenses();
        if (expenses.length > 0) {
          const categories = {};
          expenses.forEach(({ categoryName, amount }) => {
            categories[categoryName] = (categories[categoryName] || 0) + amount;
          });

          const labels = Object.keys(categories);
          const data = Object.values(categories);

          setChartData({
            labels,
            datasets: [
              {
                label: "Expense Distribution",
                data,
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary">Expense Chart</h2>
      
      <div className="chart-container d-flex justify-content-center">
        {chartData ? (
          <div style={{ width: "300px", height: "300px" }}>
            <Pie data={chartData} />
          </div>
        ) : (
          <p>Loading Chart...</p>
        )}
      </div>
      <div className="text-center mt-4">
        <Link to="/dashboard" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ExpenseChart;
