import { Progress } from "antd";
import React from "react";
import "../resources/anal.css";
function Analytices({ transactions }) {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpensesTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage =
    (totalExpensesTransactions.length / totalTransactions) * 100;

  const totalamount = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeAmount = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseAmount = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeAmountper = (totalIncomeAmount / totalamount) * 100;
  const totalExpenseAmountper = (totalExpenseAmount / totalamount) * 100;
  const categories = [
    "salary",
    "food",
    "travel",
    "bank",
    "education",
    "entertainment",
    "shopping",
    "others",
  ];
  return (
    <div className="anal">
      <div className="row">
        <div className="col-md-4 mt-4">
          <div className="transactions-count">
            <h3>Total Transaction: {totalTransactions}</h3>
            <hr />
            <h4>Income: {totalIncomeTransactions.length}</h4>
            <h4>Expense: {totalExpensesTransactions.length}</h4>
            <div className="progress-bars">
              <Progress
                className="mx-5"
                type="circle"
                strokeColor={"#009efd"}
                percent={totalIncomeTransactionsPercentage.toFixed(1)}
              />
              <Progress
                type="circle"
                strokeColor={"#2af598"}
                percent={totalExpenseTransactionsPercentage.toFixed(1)}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="transactions-count mx-5">
            <h3>Total Exchange: {totalamount}</h3>
            <hr />
            <h4>Income: {totalIncomeAmount}</h4>
            <h4>Expense: {totalExpenseAmount}</h4>
            <div className="progress-bars">
              <Progress
                className="mx-5"
                type="circle"
                strokeColor={"#009efd"}
                percent={totalIncomeAmountper.toFixed(1)}
              />
              <Progress
                type="circle"
                strokeColor={"#2af598"}
                percent={totalExpenseAmountper.toFixed(1)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="category-analysis">
            <h3>Income -Category Wise</h3>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
                const per=(amount/totalIncomeAmount) * 100;
              return (
                <div className="category-card">
                  <h4>{category}</h4>
                  <Progress
                    strokeColor={"#009efd"}
                    percent={per.toFixed(1)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-6">
          <div className="category-analysis">
            <h3>Expense -Category Wise</h3>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "expense" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
                const per=(amount/totalExpenseAmount) * 100;
              return (
                <div className="category-card">
                  <h4>{category}</h4>
                  <Progress
                    strokeColor={"#2af598"}
                    percent={per.toFixed(1)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytices;
