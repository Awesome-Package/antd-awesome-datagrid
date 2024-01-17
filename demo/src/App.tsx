// @ts-nocheck
import React from "react";
import AwesomeDataGrid from "./components/AwesomeDataGrid";
// import T from "./components/T";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "6",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "7",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "8",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "9",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "10",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "11",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "12",
    name: "TJim Red",
    age: 232,
    address: "London No. 2 Lake Park",
  },
];

const App: React.FC = () => {
  const columns: any = [
    {
      // colType: "search",
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ellipsis: true,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any) => (
        <div style={{ padding: 16 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input.Search
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            placeholder="Fill and Enter"
            onSearch={() => {
              confirm();
            }}
            enterButton
            onPressEnter={() => {
              confirm();
            }}
          />
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      filters: [
        { text: "London", value: "L" },
        { text: "New York", value: "N" },
      ],
      sorter: (a, b) => a.address.length - b.address.length,
      ellipsis: true,
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <div style={{ maxWidth: "1600px" }}>
        <AwesomeDataGrid
          tableProps={{
            pagination: {
              total: 10,
              showTotal: (total: number) => `Total ${total} items`,
              showSizeChanger: true,
              showQuickJumper: true,
            },
            dataSource: data,
            columns,
          }}
        >
          {/* Test */}
        </AwesomeDataGrid>
        {/* <T></T> */}
      </div>
    </div>
  );
};

export default App;
