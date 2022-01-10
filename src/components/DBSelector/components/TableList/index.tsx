import React, { useCallback, useEffect, useState } from 'react';
import Table from '@ali/wind-rc-table';
import { Intl } from '~/types';

interface Props {
  intl: Intl;
  dbList: any[];
  fetchTableList: ({ dbName, pageSize, pageNo, keyword }) => any;
  onSelectTable: (val: any) => void;
  selectedTable: any[];
}

const PAGE_SIZE = 10;
const INIT_PAGE = 1;
export default function ({ intl, dbList, fetchTableList, onSelectTable, selectedTable }: Props) {
  const [pageNo, setPageNo] = useState(INIT_PAGE);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [curDB, setCurDB] = useState(dbList[0]?.dbName);
  const [keyword, setKeyword] = useState('');

  const fetchList = useCallback(
    async ({ pageNo, keyword = '', dbName }) => {
      setLoading(true);
      const { total = 0, tableList } = await fetchTableList({
        dbName,
        pageSize: PAGE_SIZE,
        pageNo,
        keyword,
      });
      setLoading(false);
      setList(tableList);
      setTotal(total);
    },
    [fetchTableList],
  );

  useEffect(() => {
    onSelectTable([]);
  }, [dbList]);

  useEffect(() => {
    setPageNo(INIT_PAGE);
    setCurDB(dbList[0]?.dbName);
    setKeyword('');

    fetchList({ pageNo: INIT_PAGE, dbName: dbList[0]?.dbName, keyword: '' });
  }, [fetchList, dbList]);

  async function handlePageChange(current) {
    await fetchList({ pageNo: current, dbName: curDB, keyword: keyword.trim() });
    setPageNo(current);
  }

  async function handleFilterChange(val) {
    await fetchList({ pageNo: INIT_PAGE, dbName: val, keyword: keyword.trim() });
    setCurDB(val);
    setPageNo(INIT_PAGE);
  }

  async function handleSearch() {
    await fetchList({ pageNo: INIT_PAGE, dbName: curDB, keyword: keyword.trim() });
    setPageNo(INIT_PAGE);
  }

  function handleChange(val) {
    setKeyword(val);
  }

  const columns = [
    {
      title: intl('rds.dialog.restore.dbName'),
      dataIndex: 'dbName',
    },
    {
      title: intl('rds.dialog.restore.tableName'),
      dataIndex: 'tableName',
    },
  ];

  return (
    <Table
      primaryKey="tableName"
      dataSource={list}
      columns={columns}
      loading={loading}
      search={{
        filter: dbList.map((item) => ({ value: item.dbName, label: item.dbName })),
        filterValue: curDB,
        onFilterChange: handleFilterChange,
        onSearch: handleSearch,
        onChange: handleChange,
        value: keyword,
      }}
      pagination={{
        current: pageNo,
        onChange: handlePageChange,
        total,
        pageSize: PAGE_SIZE,
        hideOnlyOnePage: false,
        pageSizeSelector: false,
      }}
      rowSelection={{
        onSelect: (selected, record) => {
          if (selected) {
            onSelectTable([...selectedTable, record]);
          } else {
            onSelectTable(selectedTable.filter((item) => item.tableName !== record.tableName));
          }
        },
        onSelectAll: (selected) => {
          if (selected) {
            onSelectTable(list);
          } else {
            onSelectTable([]);
          }
        },
        selectedRowKeys: [...selectedTable.map((item) => item.tableName)],
      }}
    />
  );
}
