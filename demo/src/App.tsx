// @ts-nocheck
import type { TableColumnsType, TableProps, TableColumnType } from "antd/lib";
import {
  Button,
  Card,
  Col,
  Statistic,
  Row,
  Space,
  Table,
  Select,
  Tag,
  Input,
  Typography,
} from "antd/lib";
import React, { useState, useRef } from "react";
import {
  SearchOutlined,
  CloudDownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./App.css";
import { Divider } from "antd";

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
];

const App: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  const onSearch = () => {};

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input.Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value: string, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value: string, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
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
        <Card
          title="All Tasks"
          extra={
            <Space>
              <Button icon={<PlusOutlined />} />
              <Button icon={<CloudDownloadOutlined />} />
            </Space>
          }
          style={{ marginTop: 20 }}
        >
          <Row style={{ marginBottom: 20 }} gutter={[16, 16]}>
            <Col span={12}>
              <Card
                title="Filter"
                extra={<Button type="text">Reset all</Button>}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Select
                      defaultValue="lucy"
                      style={{ width: 120 }}
                      onChange={handleChange}
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                        {
                          value: "disabled",
                          label: "Disabled",
                          disabled: true,
                        },
                      ]}
                    />
                    <Select
                      defaultValue="lucy"
                      style={{ width: 120 }}
                      disabled
                      options={[{ value: "lucy", label: "Lucy" }]}
                    />
                    <Select
                      defaultValue="lucy"
                      style={{ width: 120 }}
                      loading
                      options={[{ value: "lucy", label: "Lucy" }]}
                    />
                    <Select
                      defaultValue="lucy"
                      style={{ width: 120 }}
                      allowClear
                      options={[{ value: "lucy", label: "Lucy" }]}
                    />
                  </Col>
                  <Divider />
                  <Col span={24}>
                    <Typography.Text strong>Created at: </Typography.Text>
                    <Tag>12/12/2023 - 12/12/2024</Tag>
                  </Col>
                  <Col span={24}>
                    <Typography.Text strong>Cities: </Typography.Text>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                    <Tag>Ho Chi Minh</Tag>
                  </Col>
                  <Col span={24}>
                    <Typography.Text strong>Status: </Typography.Text>
                    <Tag>ACTIVE</Tag>
                    <Tag>POSTED</Tag>
                  </Col>
                  <Col span={24}>
                    <Typography.Text strong>
                      Searching by phone:{" "}
                    </Typography.Text>
                    <Tag>0123456789</Tag>
                  </Col>
                  <Col span={24}>
                    <Typography.Text strong>Sorting by name: </Typography.Text>
                    <Tag>Desc</Tag>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Summary"
                extra={<Button type="text">Refresh</Button>}
              >
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="Active"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: "#3f8600" }}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="Active"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: "#3f8600" }}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="Active"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: "#3f8600" }}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="Active"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: "#3f8600" }}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Table
            pagination={{
              total: 10,
              showTotal: (total) => `Total ${total} items`,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            size="large"
            columns={columns}
            dataSource={data}
            onChange={handleChange}
          />
        </Card>
      </div>
    </div>
  );
};

export default App;
