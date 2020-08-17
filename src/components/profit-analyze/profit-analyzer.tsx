import React from 'react';
import { Line } from '@ant-design/charts';
import './profit-analyzer.css';
import { getStockType, getStockData, dateToString, getDateDiff } from '../../utils/helper';
import moment from 'moment';

const threshold = 14;

interface IProfitAnalyzerProps {
  code: string;
  nDate: string;
}

interface IProfitAnalyzerState {
  loading: boolean;
  data: IStockRecord[];
  priceAtNDate: string;
}

interface IStockRecord {
  code: string;
  date: string;
  price: string;
}

type IChartItem = {
  date: string;
  closeValue: string;
  profit: number;
}

export class ProfitAnalyzer extends React.Component<IProfitAnalyzerProps, IProfitAnalyzerState> {
  constructor(props: IProfitAnalyzerProps) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      priceAtNDate: '',
    };
  }

  
  public get profitRate() : IChartItem[] {
    const { code, nDate } = this.props;
    const { data, priceAtNDate } = this.state;
    if (!code || !nDate || !priceAtNDate) return [];
    const basePrice = Number(priceAtNDate);
    const arr = data.map(item => {
      if (item.code.includes(code)) {
        return {
          date: item.date,
          closeValue: item.price,
          profit: (Number(item.price) - basePrice) / basePrice,
        }
      } else {
        return undefined;
      }
    }).filter(item => item !== undefined);
    return arr as IChartItem[];
  }
  

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.initStockData(this.props.code, this.props.nDate);
  }

  componentWillReceiveProps(nextProps: IProfitAnalyzerProps) {
    console.log(nextProps);
    if (this.props.code !== nextProps.code && nextProps.code && nextProps.nDate) {
      this.setState({
        loading: true,
      });
      this.initStockData(nextProps.code, nextProps.nDate);
    }
  }

  private initStockData(code: string, date: string) {
    const fullCode = getStockType(code) + code;
    Promise.all([this.getStockDateByDate(code, date), this.getStockHistoryData(code, date)]).then(res => {
      console.log(res);
      debugger;
      const { data: { data : stockData }  } = res[0].data;
      const { data: { data: historyData }} = res[1].data;
      const baseData = (stockData[fullCode] || {});
      const baseListData = (historyData[fullCode] || {});

      const basePrice = baseData.qfqday || baseData.day || [];
      const list = baseListData.qfqday || baseListData.day || [];
      
      const priceAtNDate = (basePrice[0] || [])[2];
      const stockHistoryData = list.map((item: string[6]) => {
        return {
          code: fullCode,
          date: item[0], // 日期
          price: item[2], // 今收
        }
      });
      console.log(priceAtNDate, stockHistoryData);
      this.setState({
        priceAtNDate,
        data: stockHistoryData,
      })
    }).catch(e => {
      console.log(e);
    }).finally(() => {
      this.setState({
        loading: false,
      });
    })
  }

  private getStockDateByDate(code: string, date: string) {
    if (!code) return Promise.reject();
    const day = moment(dateToString(new Date(date)));
    const dayStart = day.format('YYYY-MM-DD');
    day.add(threshold, 'd');
    const dayEnd = day.format('YYYY-MM-DD');
    return getStockData(code, dayStart, dayEnd, threshold);
  }

  private getStockHistoryData(code: string, date: string) {
    const startDate = new Date(date);
    const endDate = new Date();
    let dayDiff = getDateDiff(startDate, endDate);
    if (dayDiff > 120) dayDiff = 120;
    if (dayDiff <= 0) dayDiff = 1;
    return getStockData(code, dateToString(startDate), dateToString(endDate), 120);
  }
  
  componentWillUnmount() {

  }

  render() {
    const config = {
      forceFit: true,
      padding: 'auto',
      data: this.profitRate,
      meta: {
        profit: {
          alias: '收益率',
          formatter: (v: number)=>{ return `${(v * 100).toFixed(2)}%` }
        }
      },
      xField: 'date',
      yField: 'profit',
      point: { visible: true },
      label: {
        visible: true,
        type: 'point',
      },
    };
    return <Line {...config} />;
  }
}

