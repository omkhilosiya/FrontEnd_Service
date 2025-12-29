// Wallet.jsx
import React from "react";
import { useSelector } from "react-redux";
import "./wallet.css";

export default function Wallet() {
  const auth = useSelector((state) => state.auth); // based on your screenshot
  const wallet = auth?.dashboard?.walletDetails ?? {};
  const balance = wallet.balance ?? 0;
  const transactions = Array.isArray(wallet.transactions) ? wallet.transactions : [];

  return (
    <div className="wallet-page">
      {/* Balance Card */}
      <div className="balance-card">
        <p className="balance-title">Total Balance</p>
        <h1>₹ {balance}</h1>
        <span>My Wallet · Last updated just now</span>
      </div>

      {/* Transactions */}
      <div className="transactions">
        <h3>Transactions</h3>

        {transactions.length === 0 && (
          <p className="no-transactions">No transactions found</p>
        )}

        {transactions.map((tx, idx) => {
          // tx shape (from screenshot): { amount, createdAt, fromEntity, metadata:{...}, reason, type }
          const key = tx.id ?? idx;
          const amount = Number(tx.amount ?? 0);
          const isCredit = (tx.type || "").toUpperCase() === "CREDIT";
          const displaySign = isCredit ? "+" : "-";
          const title = tx.reason || tx.metadata?.note || "Wallet Transaction";
          const dateStr = tx.createdAt || tx.updatedAt || tx.metadata?.createdAt || null;
          const formattedDate = dateStr ? new Date(dateStr).toLocaleString() : "—";
          const fromEntity = tx.fromEntity ?? tx.toEntity ?? "SYSTEM";
          const note = tx.metadata?.note ?? "";

          return (
            <div key={key} className="transaction-row">
              <div>
                <p className="tx-title">{title}</p>
                <span className="tx-meta">
                  <span className="tx-date">{formattedDate}</span>
                </span>
                {note && <div className="tx-note">{note}</div>}
              </div>

              <p className={`tx-amount ${isCredit ? "credit" : "debit"}`}>
                {displaySign}₹{Math.abs(amount)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
