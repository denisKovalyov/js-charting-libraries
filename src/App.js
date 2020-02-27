import React from 'react';
import { ChartingProvider } from '@chart-parts/react'
import { Renderer } from '@chart-parts/react-svg-renderer'

import './App.css';
import LineChart from './components/chart-parts-microsoft/LineChart';
import LineChartReactVis from './components/react-vis/LineChart';

const renderer = new Renderer();

function App() {
  return (
    <ChartingProvider value={renderer}>
      <div className="App">
        <section>
          <h2>chart-parts (microsoft)</h2>
          <LineChart />
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
              <li>It uses SVG-objects instead of canvas</li>
              <li>A lot of things (like Tooltips and animation on rerender) are not available with lib API and could be implemented by custom code</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>react-vis (uber)</h2>
          <LineChartReactVis />
          <div className="desc">
            <h3>Pros:</h3>
            <ul>
              <li>Clear and useful documentation (live examples, storybook)</li>
              <li>Neat and clear data structure for rendering multiple charts</li>
              <li>Easy to set animations (transitions) or rerender</li>
              <li>Has responsive and static chart versions</li>
              <li>Allow to render charts using SVG as well as canvas html-element</li>
            </ul>
            <h3>Cons:</h3>
            <ul>
              <li>Not very easy to set particular tick labels (but anyway it's better than we have in "chart.js" now)</li>
              <li>Quite huge size - 1.81 Mb ("chart-parts" size is 619 Kb; atm we use combination of "react-chartjs-2" - 502 Kb and "chart.js" - 1.41 Mb, which is even larger than "react-vis")</li>
            </ul>
          </div>
        </section>
      </div>
    </ChartingProvider>
  );
}

export default App;
