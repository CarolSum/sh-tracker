import React from 'react';
import './holdingList.css';
import { Table, Tag } from 'antd';
import { isNumber } from 'util';
import { IHoldingChangesItem } from '../holdings/holdings';
const { ColumnGroup, Column } = Table;

interface IHoldingListProps {
  dataSource: any[];
  onClickStock: (stock: IHoldingChangesItem) => void;
}

interface IHoldingListState {

}

export class HoldingList extends React.Component<IHoldingListProps, IHoldingListState> {
 
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

  render() {
    const { dataSource, onClickStock } = this.props;

    return (
      <div className='holding-list-container'>
        <h1>Holdings</h1>
        <Table
          dataSource={dataSource}
          tableLayout="fixed"
          bordered
          pagination={{
            pageSize: 8,
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
          <Column title="股票代码" dataIndex="SCODE" key="SCODE" fixed render={code => {
            return <a href={`https://data.eastmoney.com/stockdata/${code}.html`} target="_blank" rel="noopener noreferrer" onClickCapture={e => this.stopPropergation(e)}>{code}</a>;
          }}/>
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