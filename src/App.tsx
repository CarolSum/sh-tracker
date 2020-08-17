import React from 'react';
import { Layout } from 'antd';
import './App.css';
import { Holdings } from './components/holdings/holdings';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          Share Holders Monitor
        </Header>
        <Content style={{
          display: "flex",
          flex: 1,
        }}>
          <Holdings />
        </Content>
        <Footer></Footer>
      </Layout>
    </div>
  );
}

export default App;
