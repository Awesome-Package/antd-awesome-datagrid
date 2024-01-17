import type { TableProps, GetRef } from "antd/lib";
import React, { PropsWithChildren, useMemo, useState, useRef } from "react";
import {
  CloudDownloadOutlined,
  PlusOutlined,
  SyncOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Divider,
  Input,
  Button,
  Card,
  Col,
  Statistic,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { v4 as uuidv4 } from "uuid";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface AwesomeDataGridProps {
  overview?: Array<{
    title: string;
    value: string;
  }>;
  tableProps: TableProps<any>;
}

const AwesomeDataGrid = ({
  children,
  overview,
  tableProps,
}: PropsWithChildren<AwesomeDataGridProps>) => {
  const { onChange, columns, ...restTableProps } = tableProps;

  const [changedCol, setChangedCol] = useState<Array<any>>([]);
  const [filteredCol, setFilteredCol] = useState<any>({});
  const [sortedCol, setSortedCol] = useState<any>({});

  const handleChange: NonNullable<TableProps<DataType>["onChange"]> = (
    pagination,
    filters,
    sorter: any
  ) => {
    setFilteredCol(filters);
    setSortedCol(sorter);

    const sorterItem = sorter.column
      ? { title: sorter.column.title, value: [sorter.order] }
      : undefined;

    const filterItems = Object.keys(filters).map((key) => {
      const columnFiltered: any = tableProps?.columns?.find(
        (e) => e.key === key
      );

      // filter item
      if (columnFiltered?.filters?.length) {
        const value = filters[key]?.map((e) => {
          return columnFiltered.filters.find(
            (filter: any) => filter.value === e
          )?.text;
        });

        return value
          ? {
              title: columnFiltered.title,
              value: value,
            }
          : undefined;
      }
      // search item
      return filters[key]
        ? {
            title: columnFiltered.title,
            value: filters[key],
          }
        : undefined;
    });

    setChangedCol([sorterItem, ...filterItems].filter((e) => !!e));

    console.log(
      "debug local state: ",
      [sorterItem, ...filterItems].filter((e) => !!e)
    );

    // @ts-ignore
    onChange?.(pagination, filters, sorter);
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
        {children || changedCol.length ? (
          <Col span={12}>
            <Card
              title="Filter"
              // extra={
              //   <Button
              //     type="primary"
              //     icon={<SyncOutlined />}
              //     onClick={() => {
              //       setChangedCol([]);
              //       setFilteredCol({});
              //       setSortedCol({});
              //     }}
              //   >
              //     Reset
              //   </Button>
              // }
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  {children ? (
                    <>
                      {children}
                      <Divider />
                    </>
                  ) : null}
                </Col>
                {changedCol.map((item) =>
                  item?.value?.length ? (
                    <Col span={24} key={uuidv4()}>
                      <Typography.Text strong>{item.title}: </Typography.Text>
                      {item.value.map((e: string) => (
                        <Tag key={uuidv4()}>{e}</Tag>
                      ))}
                    </Col>
                  ) : (
                    <></>
                  )
                )}
              </Row>
            </Card>
          </Col>
        ) : null}
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
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        ) : null}
      </Row>
      <Table
        size="large"
        onChange={handleChange}
        columns={columns}
        {...restTableProps}
      />
    </Card>
  );
};

export default AwesomeDataGrid;
