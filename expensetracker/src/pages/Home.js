import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transaction.css";
import { DatePicker, message, Select, Table } from "antd";
import AddEditTrans from "../components/AddEditTrans";
import Spinner from "../components/Spinner";
import axios from "axios";
import moment from "moment";
import { UnorderedListOutlined, PieChartOutlined , EditOutlined , DeleteOutlined} from "@ant-design/icons";
import Analytices from "../components/Analytices";
const { RangePicker } = DatePicker;
function Home() {
  const [showAddEditTrans, setShowAddEditTrans] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tarnsactionsData, setTransactionsData] = useState();
  const [frequency, setFrequency] = useState("7");
  const [selectedRange, setSelectedRange] = useState([]);
  const [type, setType] = useState("all");
  const [viewType, setViewType] = useState("table");
  const [selectedItemForEdit,setSelectedItemForEdit] = useState(null);
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("expenses-user"));
      setLoading(true);
      const response = await axios.post(
        "/api/transactions/get-all-transactions",
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
        }
      );
      console.log(response.data);
      setTransactionsData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  const deleteTransaction = async (record) => {
    try {
     // const user = JSON.parse(localStorage.getItem("expenses-user"));
      setLoading(true);
      await axios.post(
        "/api/transactions/delete-transaction",
        {
         transactionId:record._id
        }
      );
      message.success("Transaction deleted successfully")
      getTransactions();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };








  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => (
        <label>{moment(date).utc().format("YYYY-MM-DD")}</label>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title:'Action',
      dataIndex: 'action',
      render:(text,record)=>{
        return (
          <div>
            <EditOutlined onClick={()=>{setSelectedItemForEdit(record)
            setShowAddEditTrans(true);
            }}/>

            <DeleteOutlined className="mx-3" onClick={()=>deleteTransaction(record)}/>
          </div>
        )
      }
    }
  ];
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h3>Select Period</h3>
            <Select
              size="large"
              value={frequency}
              onChange={(value) => setFrequency(value)}
            >
              <Select.Option style={{ fontSize: 20 }} value="7">
                Last 1 Week
              </Select.Option>
              <Select.Option style={{ fontSize: 20 }} value="30">
                Last 1 Month
              </Select.Option>
              <Select.Option style={{ fontSize: 20 }} value="180">
                Last 6 Months
              </Select.Option>
              <Select.Option style={{ fontSize: 20 }} value="365">
                Last 1 Year
              </Select.Option>
              <Select.Option style={{ fontSize: 20 }} value="custom">
                Specific Range
              </Select.Option>
            </Select>
            {frequency === "custom" && (
              <div className="mt-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h3>Select Type</h3>
            <Select
              size="large"
              value={type}
              onChange={(value) => setType(value)}
            >
              <Select.Option style={{ fontSize: 20 }} value="income">
                Income
              </Select.Option>
              <Select.Option style={{ fontSize: 20 }} value="expense">
                Expense
              </Select.Option>
              <Select.Option style={{ fontSize: 20 }} value="all">
                Both
              </Select.Option>
            </Select>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <div className="view-switch mx-5 d-flex">

              <UnorderedListOutlined
                style={{ fontSize: 40 }}
                className={`mx-3 ${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                }`}
                onClick={()=>setViewType('table')}
                />

              <PieChartOutlined
                style={{ fontSize: 40 }}
                className={`${
                  viewType === "analtyics" ? "active-icon" : "inactive-icon"
                }`}
                onClick={()=>setViewType('analtyics')}
                  />
            </div>
          </div>
          <button className="primary" onClick={() => setShowAddEditTrans(true)}>
            ADD EXPENSE
          </button>
        </div>
      </div>
      <div className="table-analtics">
        {viewType==='table'?(<div className="table">
          <Table size="large" columns={columns} dataSource={tarnsactionsData} />
        </div>):<Analytices transactions={tarnsactionsData}/>}

      </div>
      {showAddEditTrans && (
        <AddEditTrans
          showAddEditTrans={showAddEditTrans}
          setShowAddEditTrans={setShowAddEditTrans}
          selectedItemForEdit={selectedItemForEdit}
          getTransactions={getTransactions}
          setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
