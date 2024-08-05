import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import searchImg from "../../assets/search.svg";
import "./styles.css";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";

const TransactionsTable = ({
  transactions,
  addTransaction,
  fetchTransactions,
}) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "names",
      key: "names",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  let filteredTransactions = transactions.filter((item) => {
    const nameMatches = item.names
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const typeMatches = item.type?.includes(typeFilter);
    return nameMatches && typeMatches;
  });

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
  const dataSource = sortedTransactions.map((transaction, index) => ({
    key: index,
    ...transaction,
  }));

  const exportToCsv = () => {
    const csv = unparse( {
      fields: ["amount", "type", "names", "date",  "tag"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importFromCsv = (event) => {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <div
        style={{
          padding: "0rem 2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div className="input-flex">
            <img src={searchImg} width="16" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name"
            />
          </div>
          <Select
            className="select-input"
            value={typeFilter}
            onChange={(value) => setTypeFilter(value)}
            placeholder="Select type"
            allowClear
          >
            <Select.Option value="">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>
        <div className="my-table">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <h2 style={{ fontWeight: "500" }}>My Transactions</h2>
            <Radio.Group
              className="input-radio"
              onChange={(e) => setSortKey(e.target.value)}
              value={sortKey}
            >
              <Radio.Button value="">No Sort</Radio.Button>
              <Radio.Button value="date">Sort by Date</Radio.Button>
              <Radio.Button value="amount">Sort by Amount</Radio.Button>
            </Radio.Group>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                width: "400px",
              }}
            >
              <button className="btn" onClick={exportToCsv}>
                Export to CSV
              </button>
              <label for="file-csv" className="btn btn-blue">
                Import from CSV
              </label>
              <input
                onChange={importFromCsv}
                id="file-csv"
                type="file"
                accept=".csv"
                required
                style={{ display: "none" }}
              />
            </div>
          </div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;
