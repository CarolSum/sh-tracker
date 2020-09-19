const express = require('express');
const axios = require('axios');
const iconv = require('iconv-lite');

const app = express();

// eslint-disable-next-line no-extend-native
String.prototype.splice = function(start, newStr) {
  return this.slice(0, start) + newStr + this.slice(start);
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/getHoldingsData', (req, res) => {
  axios.get("https://data.eastmoney.com/DataCenter_V3/gdfx/data.ashx", {
    params: req.query,
    responseType: 'arraybuffer',
    reponseEncoding: 'binary'
  }).then(data => {
    // 由于接口后端返回的编码格式为 gb2312, 这里需要将 axios 的结果用 arrayBuffer 表示，然后通过 iconv 进行转化
    const evalData = iconv.decode(Buffer.from(data.data), "gb2312");
    let idx = evalData.indexOf('var asjkdlals = ');
    if (idx !== -1) {
      idx += 16;
    }
    let resString = evalData.substring(idx, evalData.length - 1);
    const pagesIdx = resString.indexOf('pages');
    resString = resString.splice(pagesIdx, '"');
    resString = resString.splice(pagesIdx + 6, '"');

    const dataIdx = resString.indexOf('data');
    resString = resString.splice(dataIdx, '"');
    resString = resString.splice(dataIdx + 5, '"');

    if (resString) {
      res.send({
        holdings: resString,
      });
    } else {
      res.send({
        code: 0
      });
    }
  })
});

app.get('/api/getStockData', (req, res) => {
  console.log('param: ', req.query);
  axios.get("http://web.ifzq.gtimg.cn/appstock/app/fqkline/get", {
    params: {
      ...req.query,
      _var: '', // 不取变量名, 从而 res 直接可以拿到 json
    }
  }).then(data => {
    console.log(data.data)
    res.send({
      data: data.data,
    });
  }).catch(e => {
    res.send({
      code: -1,
    });
  })
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`listening on ${PORT}`));