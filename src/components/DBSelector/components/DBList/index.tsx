import React, { useCallback, useEffect, useState } from 'react';
import Table from '@ali/wind-rc-table';
import { Intl } from '~/types';

interface Props {
  intl: Intl;
  fetchDBList: ({ pageSize, pageNo, keyword }) => any;
  onSelectDB: (val: any) => void;
  selectedDB: any[];
}

const PAGE_SIZE = 10;
const INIT_PAGE = 1;
export default function ({ intl, fetchDBList, onSelectDB, selectedDB }: Props) {
  const [pageNo, setPageNo] = useState(INIT_PAGE);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState('');

  const fetchList = useCallback(
    async ({ pageNo, keyword = '' }) => {
      setLoading(true);
      const { total = 0, dbList } = await fetchDBList({ pageSize: PAGE_SIZE, pageNo, keyword });
      setLoading(false);
      setList(dbList);
      setTotal(total);
    },
    [fetchDBList],
  );

  useEffect(() => {
    setKeyword('');
    setPageNo(INIT_PAGE);
    fetchList({ pageNo: INIT_PAGE, keyword: '' });
  }, [fetchList]);

  const columns = [
    {
      title: intl('rds.dialog.restore.dbName'),
      dataIndex: 'dbName',
    },
  ];

  async function handlePageChange(current) {
    await fetchList({ pageNo: current, keyword: keyword.trim() });
    setPageNo(current);
  }

  async function handleSearch() {
    await fetchList({ pageNo: INIT_PAGE, keyword: keyword.trim() });
    setPageNo(INIT_PAGE);
  }

  function handleChange(val) {
    setKeyword(val);
  }

  return (
    <Table
      primaryKey="dbName"
      dataSource={list}
      search={{
        onSearch: handleSearch,
        onChange: handleChange,
        value: keyword,
      }}
      loading={loading}
      columns={columns}
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
            onSelectDB([...selectedDB, record]);
          } else {
            onSelectDB(selectedDB.filter((item) => item.dbName !== record.dbName));
          }
        },
        onSelectAll: (selected) => {
          if (selected) {
            onSelectDB(list);
          } else {
            onSelectDB([]);
          }
        },
        selectedRowKeys: [...selectedDB.map((item) => item.dbName)],
      }}
    />
  );
}
