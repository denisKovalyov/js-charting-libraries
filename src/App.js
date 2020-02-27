import React from 'react';
import { ChartingProvider } from '@chart-parts/react'
import { Renderer } from '@chart-parts/react-svg-renderer'

import './App.css';
import LineChart from './components/chart-parts-microsoft/LineChart';

const renderer = new Renderer();

function App() {
  return (
    <ChartingProvider value={renderer}>
      <div className="App">
        <section>
          <h2>chart-parts (microsoft)</h2>
          <LineChart />
        </section>
        <div className="desc">
          <h3>Pros:</h3>
          <ul>
            <li>Neat and clear data structure for rendering multiple charts</li>
            <li>Easy to set required labels</li>
            <li>Provide low level API for building graphs</li>
          </ul>
          <h3>Cons:</h3>
          <ul>
            <li>It is not responsive by default, chart have fixed dimensions</li>
            <li>There are no many info regarding lib applying and live examples in the Inet</li>
          </ul>
          <h3>Notes:</h3>
          <ul>
            <li>A lot of things (like Tooltips and animation on rerender) are not available with lib API and could be implemented by custom code</li>
          </ul>
        </div>
      </div>
    </ChartingProvider>
  );
}

export default App;
