import { jsObj, GET_STOCK_DATA } from '../utils/constant';
import axios from 'axios'

export function getHoldingsDataParam(pageSize?: number) {
  const rt = parseInt((new Date().getTime() / 30000).toString());
  return {
    sty: 'analy',
    SortType: 'NDATE',
    SortRule: '-1',
    PageIndex: 1,
    PageSize: pageSize ? pageSize : 200,
    jsObj,
    type: 'NSHDDETAIL',
    cgbd: 1,
    filter: '(SHAREHDCODE=%2780637337%27)',
    rt,
  }
}

const shHead = ["50", "51", "60", "90", "110", "113", "132", "204", "5", "6", "9", "7"];

/**
 * 判断股票ID对应的证券市场
 * @param stockCode 股票代码
 * ['50', '51', '60', '90', '110'] 为 sh
   ['00', '13', '18', '15', '16', '18', '20', '30', '39', '115'] 为 sz
   ['5', '6', '9'] 开头的为 sh， 其余为 sz
 */
export function getStockType(stockCode: string) {
  const isSh = shHead.find(head => {
    return stockCode.startsWith(head);
  });
  if (isSh === undefined) {
    return 'sz';
  }
  return 'sh';
}


export function getStockData(code: string, start: string, end: string, count: number) {
  const stockFullCode = getStockType(code) + code;
  const param = `${stockFullCode},day,${start},${end},${count},qfq`
  return axios.get(GET_STOCK_DATA, {
    params: {
      _var: 'kline_dayqfq',
      param,
    }
  });
}

export function dateToString(date: Date) {
  return date.toLocaleDateString().replace(/\//g,'-');
}

export function getDateDiff(d1: Date, d2: Date) {
  return parseInt((Math.abs(d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24)).toString());
}