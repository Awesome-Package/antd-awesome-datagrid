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
import React, { useState } from "react";
import {
  SearchOutlined,
  CloudDownloadOutlined,
  PlusOutlined,
  SyncOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
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

interface AwesomeDataGridProps {
  overview?: {
    title: string;
    value: string;
  };
  tableProps: TableBaseProps<any>;
}

const AwesomeDataGrid = ({
  children,
  overview,
  tableProps,
}: AwesomeDataGridProps) => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  function getTitleByKey(filter) {
    const columns = tableProps.columns;
    const keys = Object.keys(filter);
    const values = Object.values(filter);

    if (!columns?.length || !keys?.length) return [];

    const titles = columns.map((e) => ({ title: e?.title, key: e?.key }));

    const t = [];
    keys.forEach((key, index) => {
      const item = titles.find((e) => e.key === key);
      t.push({ title: item.title, value: values[index] });
    });

    return t;
  }

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

  const onSearch = (newValue: string) => {
    console.log(newValue);
  };

  return (
    <Card
      title="All Tasks"
      extra={
        <Space>
          <Button type="primary" icon={<PlusOutlined />} />
          <Button type="primary" icon={<CloudDownloadOutlined />} />
          <Button type="primary" icon={<ReloadOutlined />}>
            Refresh
          </Button>
        </Space>
      }
      style={{ marginTop: 20 }}
    >
      <Row style={{ marginBottom: 20 }} gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title="Filter"
            extra={
              <Button type="primary" icon={<SyncOutlined />}>
                Reset
              </Button>
            }
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>{children}</Col>
              {children ? <Divider /> : null}
              {getTitleByKey(filteredInfo)?.length
                ? getTitleByKey(filteredInfo).map((e) => (
                    <Col key={e.title} span={24}>
                      <Typography.Text strong>{e.title}: </Typography.Text>
                      {e?.value?.length >1 ? (
                        <>
                          {tableProps.columns
                            .find((f) => f.title === e.title)
                            ?.filters?.map((item) => (
                              <Tag key={item.value}>{item.text}</Tag>
                            ))}
                        </>
                      ) : !e?.value?.length ? null : (
                        <Tag>{e.value[0]}</Tag>
                      )}
                    </Col>
                  ))
                : null}
              {/* <Col span={24}>
                <Typography.Text strong>Created at: </Typography.Text>
                <Tag>12/12/2023 - 12/12/2024</Tag>
              </Col>
              <Col span={24}>
                <Typography.Text strong>Cities: </Typography.Text>
                {[
                  { text: "London", value: "L" },
                  { text: "New York", value: "N" },
                ]
                  .filter((e) => filteredInfo?.address?.includes(e.value))
                  .map((e) => (
                    <Tag key={e.value}>{e.text}</Tag>
                  ))}
              </Col>
              <Col span={24}>
                <Typography.Text strong>Status: </Typography.Text>
                <Tag>ACTIVE</Tag>
                <Tag>POSTED</Tag>
              </Col>
              <Col span={24}>
                <Typography.Text strong>Searching by phone: </Typography.Text>
                <Tag>0123456789</Tag>
              </Col>
              <Col span={24}>
                <Typography.Text strong>Sorting by name: </Typography.Text>
                <Tag>Desc</Tag>
              </Col> */}
            </Row>
          </Card>
        </Col>
        {overview?.length ? (
          <Col span={12}>
            <Card title="Overview">
              <Row gutter={[16, 16]}>
                {overview.map((e) => (
                  <Col key={e.title} span={8}>
                    <Card>
                      <Statistic
                        title={e?.title}
                        value={e?.value}
                        precision={2}
                        valueStyle={{ color: "#3f8600" }}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        ) : null}
      </Row>
      <Table size="large" onChange={handleChange} {...tableProps} />
    </Card>
  );
};

export default AwesomeDataGrid;
