import React, {
  forwardRef,
  useEffect,
  useMemo,
  useState,
  useImperativeHandle,
  useCallback,
} from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import { Button, Card, Grid } from '@ali/wind';
import { Intl } from '~/types';
import Table from '@ali/wind-rc-table';
import { formatSize } from '~/utils/format';
import DBList from './components/DBList';
import TableList from './components/TableList';
import NameEditor from './components/NameEditor';
import SelectedTable from './components/SelectedTable';

const { Row, Col } = Grid;

interface Props {
  intl: Intl;
  fetchDBList: ({ pageSize, pageNo, keyword }) => any;
  fetchTableList: ({ dbName, pageSize, pageNo, keyword }) => any;
  remainStorage: number;
  isNewInstance: boolean;
}

function DBSelector(
  { intl, fetchDBList, fetchTableList, remainStorage, isNewInstance }: Props,
  ref,
) {
  const [selectedDB, setSelectedDB] = useState([]);
  const [selectedTable, setSelectedTable] = useState([]);

  const [finalTableList, setFinalTableList] = useState([]);

  const dbMap = useMemo(() => {
    const map = new Map();
    selectedTable.forEach((item) => {
      if (map.has(item.dbName)) {
        map.get(item.dbName).push(item);
      } else {
        map.set(item.dbName, [item]);
      }
    });
    return map;
  }, [selectedTable]);

  const selectedStorage = useMemo(() => {
    let size = 0;
    selectedDB.forEach((item) => {
      const key = item.dbName;
      if (dbMap.has(key) && dbMap.get(key).length !== 0) {
        dbMap.get(key).forEach((table) => {
          size += table.size;
        });
      } else {
        size += item.size;
      }
    });
    return formatSize(size);
  }, [selectedDB, dbMap]);

  useEffect(() => {
    const arr = selectedDB.map((db) => ({
      type: 'db',
      name: db.dbName,
      newname: isNewInstance ? db.dbName : `${db.dbName}_backup`, // 后端字段命名不规范
      tables:
        dbMap.get(db.dbName)?.map((table) => ({
          type: 'table',
          name: table.tableName,
          newname: table.tableName,
        })) || [],
    }));
    setFinalTableList(arr);
  }, [selectedDB, dbMap, isNewInstance]);

  useImperativeHandle(
    ref,
    () => ({
      // 对外暴露该方法，可实时拿到当前组件选中的库表信息
      getDBInfo: () => {
        return finalTableList;
      },
    }),
    [finalTableList],
  );

  useEffect(() => {
    setSelectedDB([]);
    setSelectedTable([]);
  }, [fetchDBList, fetchTableList]);

  function deleteCurDB(dbName) {
    setSelectedDB(selectedDB.filter((db) => db.dbName !== dbName));
  }

  function deleteCurTable(tableName) {
    setSelectedTable(selectedTable.filter((table) => table.tableName !== tableName));
  }

  const modifyTableName = useCallback(
    (record, dbName, tableName) => {
      const arr = _cloneDeep(finalTableList);
      const curDB = arr.find((item) => item.name === dbName);
      const curTable = curDB.tables.find((item) => item.newname === record.newname);
      curTable.newname = tableName;
      setFinalTableList(arr);
    },
    [finalTableList],
  );

  const columns = [
    {
      title: intl('rds.dialog.restore.dbName'),
      dataIndex: 'name',
    },
    {
      title: intl('rds.dialog.restore.newDbName'),
      dataIndex: 'newname',
      cell: (val, index, record) => (
        <NameEditor
          defaultName={record.newname}
          onOk={(val) => {
            const arr = _cloneDeep(finalTableList);
            arr.find((item) => item.newname === record.newname).newname = val;
            setFinalTableList(arr);
          }}
        />
      ),
    },
    {
      title: intl('rds.dialog.restore.opreation'),
      cell: (val, index, record) => (
        <Button onClick={() => deleteCurDB(record.name)} text type="primary">
          {intl('rds.button.DELETE')}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Card
        contentHeight="auto"
        title={
          <div>
            <span>{intl('rds.dialog.restore.part.need')}</span>
          </div>
        }
      >
        <Row justify="space-between">
          <Col span={10}>
            <DBList
              selectedDB={selectedDB}
              onSelectDB={(val) => setSelectedDB(val)}
              fetchDBList={fetchDBList}
              intl={intl}
            />
          </Col>
          <Col span={12}>
            <TableList
              selectedTable={selectedTable}
              onSelectTable={(val) => setSelectedTable(val)}
              fetchTableList={fetchTableList}
              dbList={selectedDB}
              intl={intl}
            />
          </Col>
        </Row>
      </Card>
      <Card contentHeight="auto" title={intl('rds.dialog.restore.part.selected')}>
        <Table
          primaryKey="name"
          expandedRowRender={(record) => (
            <SelectedTable
              modifyTableName={modifyTableName}
              deleteCurTable={deleteCurTable}
              intl={intl}
              data={record.tables}
              dbName={record.name}
            />
          )}
          rowExpandable={(record) => record.tables.length !== 0}
          dataSource={finalTableList}
          columns={columns}
        />
        <p>{`${intl('rds.dialog.restore.size')}${intl('rds.common.colon')}${selectedStorage}`}</p>
        <p>{`${intl('rds.dialog.restore.usabledDisk')}${intl('rds.common.colon')}${formatSize(
          remainStorage,
        )}`}</p>
      </Card>
    </div>
  );
}
export default forwardRef(DBSelector);
