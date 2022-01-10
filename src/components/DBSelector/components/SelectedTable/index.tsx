import React from 'react';
import Table from '@ali/wind-rc-table';
import { Button } from '@ali/wind';
import { Intl } from '~/types';
import NameEditor from '../NameEditor';

interface Props {
  intl: Intl;
  data: any;
  dbName: string;
  deleteCurTable: (val: string) => void;
  modifyTableName: (record: any, dbName: string, tableName: string) => void;
}

export default function SelectedTable({
  intl,
  data,
  dbName,
  deleteCurTable,
  modifyTableName,
}: Props) {
  const columns = [
    {
      title: intl('rds.dialog.restore.tableName'),
      dataIndex: 'name',
    },
    {
      title: intl('rds.dialog.restore.newTableName'),
      dataIndex: 'newname',
      cell: (val, index, record) => (
        <NameEditor
          defaultName={record.newname}
          onOk={(val) => {
            modifyTableName(record, dbName, val);
          }}
        />
      ),
    },
    {
      title: intl('rds.dialog.restore.opreation'),
      cell: (val, index, record) => (
        <Button onClick={() => deleteCurTable(record.name)} text type="primary">
          {intl('rds.button.DELETE')}
        </Button>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} />;
}
