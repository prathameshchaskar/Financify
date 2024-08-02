import { Select, Table } from "antd";
import React, { useState } from "react";

const TransactionsTable = ({ transactions }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
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

  return (
    <>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name"
      />
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
      <Table columns={columns} dataSource={filteredTransactions} />;
    </>
  );
};

export default TransactionsTable;
