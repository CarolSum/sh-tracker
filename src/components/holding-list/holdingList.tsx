import React from 'react';
import './holdingList.css';
import { Table, Tag, Form, Input, Row, Col, Space, Button} from 'antd';
import { isNumber } from 'util';
import { IHoldingChangesItem } from '../holdings/holdings';
import { SearchOutlined } from '@ant-design/icons';

const { ColumnGroup, Column } = Table;
const { Search } = Input;

const defaultTotalSize = 200;
const defaultPageSize = 8;

interface IHoldingListProps {
  dataSource: IHoldingChangesItem[];
  onClickStock: (stock: IHoldingChangesItem) => void;
  getHoldingsData: (pageSize?: number) => void;
}

interface IHoldingListState {
  totalSize: number;
  pageSize: number;
  searchText: string,
  searchedColumn: string,
}

export class HoldingList extends React.Component<IHoldingListProps, IHoldingListState> {

  private searchInput: Input | null = null;
  
  constructor(props: IHoldingListProps) {
    super(props);
    this.state = {
      totalSize: defaultTotalSize,
      pageSize: defaultPageSize,
      searchText: '',
      searchedColumn: '',
    };
  }

  setTotalSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    this.setState({
      totalSize: Number.parseInt(e.target.value) || 0,
    });
  }

  setPageSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    this.setState({
      pageSize: Number.parseInt(e.target.value) || 0,
    });
  }

  private renderFixedNumber(num: number | string) {
    if (isNumber(num)) {
      const cls = num > 0 ? 'profit' : num < 0 ? 'loss' : 'normal';
      return <span className={cls}>{(num * 100).toFixed(4)}</span>;
    }
    return <span>{num}</span>;
  }

  private stopPropergation(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.stopPropagation();
  }

  searchStock = (value: string) => {
    const { dataSource } = this.props;
    const idx = dataSource.findIndex(item => {
      if (item.SCODE.includes(value) || value.includes(item.SCODE))  {
        return true;
      }
      return false;
    });
    if (idx !== -1) {
      // 跳转到对应页面
    }
  }

  getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => this.searchInput?.select(), 100);
      }
    },
    render: (text: any) =>
      // this.state.searchedColumn === dataIndex ? (
      //   <Highlighter
      //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      //     searchWords={[this.state.searchText]}
      //     autoEscape
      //     textToHighlight={text ? text.toString() : ''}
      //   />
      // ) : (
      //   text
      // ),
      <a href={`https://data.eastmoney.com/stockdata/${text}.html`} target="_blank" rel="noopener noreferrer" onClickCapture={e => this.stopPropergation(e)}>{text}</a>
  });

  handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters: any) => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  render() {
    const { dataSource, onClickStock, getHoldingsData } = this.props;
    const { totalSize, pageSize } = this.state;

    return (
      <div className='holding-list-container'>
        <h1>Holdings</h1>
        <div className="header-wrapper">
          <Row>
            <Col span={8}>
              <Form.Item
                label="TotalSize"
                style={{
                  marginRight: '16px',
                }}
              >
                <Input placeholder="totalSize" value={totalSize} onChange={this.setTotalSize} onPressEnter={e => getHoldingsData(this.state.totalSize || defaultTotalSize)}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="PageSize"
                style={{
                  marginRight: '16px',
                }}
              >
                <Input placeholder="pageSIze" value={pageSize} onChange={this.setPageSize}/> 
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
              >
                <Search
                  placeholder="Search Stock"
                  enterButton="Search"
                  onSearch={this.searchStock}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Table
          dataSource={dataSource}
          tableLayout="fixed"
          bordered
          pagination={{
            pageSize: pageSize || defaultPageSize,
          }}
          scroll={{
            y: '70vh',
            x: 'max-content'
          }}
          onRow={record => {
            return {
              onClick: event => {
                onClickStock(record);
              }
            }
          }}
        >
          <Column title="股票代码" dataIndex="SCODE" key="SCODE" fixed {...this.getColumnSearchProps('SCODE')}/>
          <Column title="股票简称" dataIndex="SNAME" key="SNAME" />
          <Column title="数量(万股)" dataIndex="SHAREHDNUM" key="SHAREHDNUM" render={sum => {
            return <span>{(sum / 10000).toFixed(2)}</span>;
          }}/>
          <Column title="数量变化" dataIndex="BDSUM" key="BDSUM" />
          <Column title="数量变化比例" dataIndex="BDBL" key="BDBL" />
          <Column title="持股变动" dataIndex="BZ" key="BZ" render={bzType => {
            return (
              <Tag color="blue" key={bzType}>
                {bzType}
              </Tag>
            );
          }}/>
          <Column title="公告日" dataIndex="NDATE" key="NDATE" width={'120px'} render={ndate => {
            const date = new Date(ndate);
            return <span>{date.toLocaleDateString()}</span>;
          }}/>
          <ColumnGroup title="公告日后涨跌幅(%)">
            <Column title="10个公告日后涨跌幅" dataIndex="ZDF10" key="ZDF10" render={this.renderFixedNumber}/>
            <Column title="30个公告日后涨跌幅" dataIndex="ZDF30" key="ZDF30" render={this.renderFixedNumber}/>
            <Column title="60个公告日后涨跌幅" dataIndex="ZDF60" key="ZDF60" render={this.renderFixedNumber}/>
          </ColumnGroup>
        </Table>
      </div>
    );
  }
}