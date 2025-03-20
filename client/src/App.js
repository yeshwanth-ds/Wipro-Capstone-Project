import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import AddIncome from "./pages/AddIncome";  
import IncomeList from "./pages/IncomeList"; 
import Register from "./pages/Register";
import ExpenseChart from "./pages/ExpenseChart";
import SearchExpenses from "./pages/SearchExpenses";
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/add-expense" element={<PrivateRoute element={<AddExpense />} />} />
        <Route path="/add-income" element={<PrivateRoute element={<AddIncome />} />} />
        <Route path="/income-list" element={<PrivateRoute element={<IncomeList />} />} />
        <Route path="/expense-chart" element={<PrivateRoute element={<ExpenseChart />} />} />
        <Route path="/search-expenses" element={<PrivateRoute element={<SearchExpenses></SearchExpenses>}></PrivateRoute>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
