import React, { useState } from "react";
import { Header } from "../components/Header";
import { Cards } from "../components/Cards";
import { Modal } from "antd";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";
import moment from "moment";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const Dashboard = () => {
  const[user] = useAuthState(auth);

  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.data).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      names: values.name,
    };
    addTransaction(newTransaction);
  }

  const addTransaction = async(transaction) => {
    try {
      const docRef = await addDoc(
        collection(db,`users/${user.uid}/transation`),
        transaction
      );
      console.log("Document written with ID: ",docRef.id);
      toast.success("Transaction Added!");
    }
    catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }

  return (
    <div>
      <Header />
      <Cards
        showIncomeModal={showIncomeModal}
        showExpenseModal={showExpenseModal}
      />
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
    </div>
  );
};

export default Dashboard;
