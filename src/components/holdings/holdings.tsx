import React from "react";
import './holdings.css';
import { HoldingList } from "../holding-list/holdingList";
import axios from 'axios';
import { getHoldingsDataParam } from "../../utils/helper";
import Modal from "antd/lib/modal/Modal";
import { ProfitAnalyzer } from "../profit-analyze/profit-analyzer";

export interface IHoldingChangesItem {
  COMPANYCODE: string;
  SSNAME: string;
  SHAREHDNAME: string;
  SHAREHDTYPE: string;
  SHARESTYPE: string;
  RANK: number;
  SCODE: string;
  SNAME: string;
  RDATE: string;
  SHAREHDNUM: number;
  LTAG: number;
  ZB: number;
  NDATE: string;
  BZ: string;
  BDBL: string;
  SHAREHDCODE: string;
  SHAREHDRATIO: number;
  BDSUM: string;
  ZDF10: string | number;
  ZDF30: string | number;
  ZDF60: string | number;
}

interface IHoldingsProps {

}

interface IHoldingsState {
  stockCode: string | null;
  dataPages: number;
  holdingsData: IHoldingChangesItem[];
  isProfitAnalyzerVisible: boolean;
  stockNDate: string;
}

export class Holdings extends React.Component<IHoldingsProps, IHoldingsState> {
  constructor(props: IHoldingsProps) {
    super(props);
    this.state = {
      stockCode: null,
      dataPages: 1,
      isProfitAnalyzerVisible: false,
      stockNDate: '',
      holdingsData: [
        {
          "COMPANYCODE": "80185666",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 7.0,
          "SCODE": "603686",
          "SNAME": "龙马环卫",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 8338860.0,
          "LTAG": 203218018.2,
          "ZB": 0.0200619389020968,
          "NDATE": "2020-08-15T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 2.0062,
          "BDSUM": "-",
          "ZDF10": "-",
          "ZDF30": "-",
          "ZDF60": "-"
      },
      {
          "COMPANYCODE": "10000268",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 9.0,
          "SCODE": "600329",
          "SNAME": "中新药业",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 8019493.0,
          "LTAG": 138897618.76,
          "ZB": 0.0141720187798684,
          "NDATE": "2020-08-15T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 1.0377,
          "BDSUM": "-",
          "ZDF10": "-",
          "ZDF30": "-",
          "ZDF60": "-"
      },
      {
          "COMPANYCODE": "80373845",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 4.0,
          "SCODE": "603681",
          "SNAME": "永冠新材",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 1163858.0,
          "LTAG": 21356794.3,
          "ZB": 0.0188762756339959,
          "NDATE": "2020-08-15T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 0.6986,
          "BDSUM": "-",
          "ZDF10": "-",
          "ZDF30": "-",
          "ZDF60": "-"
      },
      {
          "COMPANYCODE": "80511074",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 9.0,
          "SCODE": "300709",
          "SNAME": "精研科技",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 1790273.0,
          "LTAG": 172134748.95,
          "ZB": 0.0243177143508518,
          "NDATE": "2020-08-14T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 1.5521,
          "BDSUM": "-",
          "ZDF10": 0.0,
          "ZDF30": 0.0,
          "ZDF60": 0.0
      },
      {
          "COMPANYCODE": "80279273",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 2.0,
          "SCODE": "603056",
          "SNAME": "德邦股份",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 19819451.0,
          "LTAG": 268157172.03,
          "ZB": 0.0910574072440104,
          "NDATE": "2020-08-13T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 2.0645,
          "BDSUM": "-",
          "ZDF10": 0.0803443328771995,
          "ZDF30": 0.0803443328771995,
          "ZDF60": 0.0803443328771995
      },
      {
          "COMPANYCODE": "80909927",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 9.0,
          "SCODE": "002962",
          "SNAME": "五方光电",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 215694.0,
          "LTAG": 5269404.42,
          "ZB": 0.00356636904761905,
          "NDATE": "2020-08-12T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 0.0892,
          "BDSUM": "-",
          "ZDF10": -0.0128102482669888,
          "ZDF30": -0.0128102482669888,
          "ZDF60": -0.0128102482669888
      },
      {
          "COMPANYCODE": "80198760",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 10.0,
          "SCODE": "002726",
          "SNAME": "龙大肉食",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 6214412.0,
          "LTAG": 52449637.28,
          "ZB": 0.00633543674578881,
          "NDATE": "2020-08-11T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 0.6225,
          "BDSUM": "-",
          "ZDF10": -0.00574712629978114,
          "ZDF30": -0.00574712629978114,
          "ZDF60": -0.00574712629978114
      },
      {
          "COMPANYCODE": "80153375",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 8.0,
          "SCODE": "300401",
          "SNAME": "花园生物",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 2705668.0,
          "LTAG": 38772222.44,
          "ZB": 0.00589474197916609,
          "NDATE": "2020-08-08T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 0.5645,
          "BDSUM": "-",
          "ZDF10": 0.0051249199335545,
          "ZDF30": 0.0051249199335545,
          "ZDF60": 0.0051249199335545
      },
      {
          "COMPANYCODE": "10001090",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 10.0,
          "SCODE": "000793",
          "SNAME": "华闻集团",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 14501373.0,
          "LTAG": 59745656.76,
          "ZB": 0.00746470123871886,
          "NDATE": "2020-08-08T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 0.7261,
          "BDSUM": "-",
          "ZDF10": -0.00847457622487813,
          "ZDF30": -0.00847457622487813,
          "ZDF60": -0.00847457622487813
      },
      {
          "COMPANYCODE": "80445515",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 9.0,
          "SCODE": "300634",
          "SNAME": "彩讯股份",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 343861.0,
          "LTAG": 7644030.03,
          "ZB": 0.00170482464566588,
          "NDATE": "2020-08-07T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 0.086,
          "BDSUM": "-",
          "ZDF10": -0.0338409473643855,
          "ZDF30": -0.0338409473643855,
          "ZDF60": -0.0338409473643855
      },
      {
          "COMPANYCODE": "80101673",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 8.0,
          "SCODE": "002194",
          "SNAME": "武汉凡谷",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 8017523.0,
          "LTAG": 165962726.1,
          "ZB": 0.0162958117093393,
          "NDATE": "2020-08-07T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 1.1854,
          "BDSUM": "-",
          "ZDF10": -0.0375195413869879,
          "ZDF30": -0.0375195413869879,
          "ZDF60": -0.0375195413869879
      },
      {
          "COMPANYCODE": "80069666",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 4.0,
          "SCODE": "300034",
          "SNAME": "钢研高纳",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 4867622.0,
          "LTAG": 91316588.72,
          "ZB": 0.0115389303689836,
          "NDATE": "2020-08-06T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 1.0355,
          "BDSUM": "-",
          "ZDF10": 0.0371932515296772,
          "ZDF30": 0.0371932515296772,
          "ZDF60": 0.0371932515296772
      },
      {
          "COMPANYCODE": "80116563",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 4.0,
          "SCODE": "002258",
          "SNAME": "利尔化学",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 19642583.0,
          "LTAG": 350227254.89,
          "ZB": 0.0376354605246422,
          "NDATE": "2020-08-06T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 3.7459,
          "BDSUM": "-",
          "ZDF10": -0.0292060879574428,
          "ZDF30": -0.0292060879574428,
          "ZDF60": -0.0292060879574428
      },
      {
          "COMPANYCODE": "80173967",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 9.0,
          "SCODE": "300653",
          "SNAME": "正海生物",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 639637.0,
          "LTAG": 49392769.14,
          "ZB": 0.00533030833333333,
          "NDATE": "2020-08-05T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 0.533,
          "BDSUM": "-",
          "ZDF10": -0.0659668221924459,
          "ZDF30": -0.0659668221924459,
          "ZDF60": -0.0659668221924459
      },
      {
          "COMPANYCODE": "80357680",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 6.0,
          "SCODE": "300502",
          "SNAME": "新易盛",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 5385907.0,
          "LTAG": 339958449.84,
          "ZB": 0.0225105287753075,
          "NDATE": "2020-07-31T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 1.627,
          "BDSUM": "-",
          "ZDF10": -0.0640760644974846,
          "ZDF30": -0.0381700426983378,
          "ZDF60": -0.0381700426983378
      },
      {
          "COMPANYCODE": "10001351",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 2.0,
          "SCODE": "600988",
          "SNAME": "赤峰黄金",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 56570239.0,
          "LTAG": 673185844.1,
          "ZB": 0.0396599641530964,
          "NDATE": "2020-07-31T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 3.3998,
          "BDSUM": "-",
          "ZDF10": 0.0426229507700564,
          "ZDF30": 0.0683060108876152,
          "ZDF60": 0.0683060108876152
      },
      {
          "COMPANYCODE": "80133650",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 2.0,
          "SCODE": "300037",
          "SNAME": "新宙邦",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 10701026.0,
          "LTAG": 589198491.56,
          "ZB": 0.0418598920155104,
          "NDATE": "2020-07-31T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 2.605,
          "BDSUM": "-",
          "ZDF10": -0.0266106442387422,
          "ZDF30": -0.0127801120022705,
          "ZDF60": -0.0127801120022705
      },
      {
          "COMPANYCODE": "80134100",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 5.0,
          "SCODE": "002324",
          "SNAME": "普利特",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 10065870.0,
          "LTAG": 151088708.7,
          "ZB": 0.0204950234728264,
          "NDATE": "2020-07-31T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 1.1912,
          "BDSUM": "-",
          "ZDF10": -0.147381242364131,
          "ZDF30": -0.147381242364131,
          "ZDF60": -0.147381242364131
      },
      {
          "COMPANYCODE": "80148402",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 7.0,
          "SCODE": "603606",
          "SNAME": "东方电缆",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 10252558.0,
          "LTAG": 149072193.32,
          "ZB": 0.0160486184184546,
          "NDATE": "2020-07-28T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 1.5674,
          "BDSUM": "-",
          "ZDF10": 0.383744856079991,
          "ZDF30": 0.199588477414931,
          "ZDF60": 0.199588477414931
      },
      {
          "COMPANYCODE": "80451660",
          "SSNAME": "",
          "SHAREHDNAME": "香港中央结算有限公司",
          "SHAREHDTYPE": "其它",
          "SHARESTYPE": "A股",
          "RANK": 6.0,
          "SCODE": "603590",
          "SNAME": "康辰药业",
          "RDATE": "2020-06-30T00:00:00",
          "SHAREHDNUM": 907926.0,
          "LTAG": 35191211.76,
          "ZB": 0.0108906285460402,
          "NDATE": "2020-07-28T00:00:00",
          "BZ": "新进",
          "BDBL": "-",
          "SHAREHDCODE": "80637337",
          "SHAREHDRATIO": 0.5675,
          "BDSUM": "-",
          "ZDF10": -0.0268325881315128,
          "ZDF30": -0.0657203967764124,
          "ZDF60": -0.0657203967764124
      },
      ],
    };
  }

  componentDidMount() {
    this.getHoldingsData();
  }

  getHoldingsData = (pageSize?: number) => {
    axios.get('http://localhost:3002/getHoldingsData', {
      params: getHoldingsDataParam(pageSize),
    }).then(res => {
      const result = JSON.parse(res.data.holdings) || {};
      this.setState({
        dataPages: result.pages || 1,
        holdingsData: result.data || [],
      });
    });
  }

  setSelectedStock = (stock: IHoldingChangesItem) => {
    this.setState({
      stockCode: stock.SCODE,
      stockNDate: stock.NDATE,
      isProfitAnalyzerVisible: true,
    });
  }

  hideProfitAnalyzer = () => {
    this.setState({
      isProfitAnalyzerVisible: false,
    });
  }

  render() {
    const { isProfitAnalyzerVisible, stockCode, stockNDate } = this.state;
    return (
      <div className="main-container">
        <HoldingList
          onClickStock={this.setSelectedStock}
          dataSource={this.state.holdingsData}
          getHoldingsData={this.getHoldingsData}
        >
        </HoldingList>
        <Modal
          title={`${stockCode}自公告日后收益`}
          width={'80vw'}
          visible={isProfitAnalyzerVisible}
          onCancel={this.hideProfitAnalyzer}
          onOk={this.hideProfitAnalyzer}
        >
          {isProfitAnalyzerVisible && <ProfitAnalyzer code={stockCode || ''} nDate={stockNDate}/>}
        </Modal>
      </div>
    )
  }
}
