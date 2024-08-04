import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import searchImg from "../../assets/search.svg";
import "./styles.css";

const TransactionsTable = ({ transactions }) => {
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
    return (
      item.names.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
    );
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
            <h2 style={{fontWeight:"500"}}>My Transactions</h2>
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
              <button
                className="btn"
                // onClick={exportToCsv}
              >
                Export to CSV
              </button>
              <label for="file-csv" className="btn btn-blue">
                Import from CSV
              </label>
              <input
                // onChange={importFromCsv}
                id="file-csv"
                type="file"
                accept=".csv"
                required
                style={{ display: "none" }}
              />
            </div>
          </div>
          <Table columns={columns} dataSource={filteredTransactions} />;
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;
