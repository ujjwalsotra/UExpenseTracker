import { Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import Spinner from "./Spinner";

function AddEditTrans({ showAddEditTrans, setShowAddEditTrans,getTransactions,selectedItemForEdit,setSelectedItemForEdit}) {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("expenses-user"));
      setLoading(true);
     if(selectedItemForEdit)
     {

      await axios.post("/api/transactions/edit-transaction", {
        payload:{...values,
        userid: user._id,},

        transactionId:selectedItemForEdit._id,
      });
      getTransactions();
      message.success("Transaction Updated Successfully");
     }
     else
     {
      await axios.post("/api/transactions/add-transaction", {
        ...values,
        userid: user._id,
      });
      getTransactions();
      message.success("Transaction added successfully");
     }
      setShowAddEditTrans(false);
      setSelectedItemForEdit(null);
      setLoading(false);
    } catch (err) {
      message.error("something went wrong!!");
    }
  };
  return (
    <Modal
      title={selectedItemForEdit ? 'Edit Transaction' : 'Add Transaction'}
      visible={showAddEditTrans}
      onCancel={() => setShowAddEditTrans(false)}
      footer={false}
      size="large"
    >
      {loading && <Spinner />}
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedItemForEdit}>
        <Form.Item label="Amount" name="amount">
          <Input type="text" size="large" />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select size="large">
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select size="large">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="bank">Tax/EMI</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="shopping">Shopping</Select.Option>
            <Select.Option value="others">Others</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date" name="date">
          <Input type="date" size="large" />
        </Form.Item>
        <Form.Item label="Payment Method" name="paymentmethod">
          <Select size="large">
            <Select.Option value="online">
              Online thorugh UPI/Netbanking
            </Select.Option>
            <Select.Option value="cash">Cash</Select.Option>
            <Select.Option value="cheque">cheque</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input type="text" size="large" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input type="text" size="large" />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            {" "}
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTrans;
