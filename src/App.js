import React from 'react';
import { ChartingProvider } from '@chart-parts/react'
import { Renderer } from '@chart-parts/react-svg-renderer'

import './App.css';
import BarChart from './components/chart-parts-microsoft/BarChart';
import LineChart from './components/chart-parts-microsoft/LineChart';

const dataset = {
  data: [
    { category: 'A', amount: 28 },
    { category: 'B', amount: 55 },
    { category: 'C', amount: 43 },
    { category: 'D', amount: 91 },
    { category: 'E', amount: 81 },
    { category: 'F', amount: 53 },
    { category: 'G', amount: 19 },
    { category: 'H', amount: 87 },
  ],
};

const renderer = new Renderer();

function App() {
  return (
    <ChartingProvider value={renderer}>
      <div className="App">
        <section>
          <h2>chart-parts (microsoft)</h2>
          <LineChart />
          <br/>
          <br/>
          <BarChart data={dataset} width={400} height={200} />
        </section>

      </div>
    </ChartingProvider>
  );
}

export default App;
