import React, {useState} from 'react'
import moment from 'moment';

import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  Hint,
  LineMarkSeries,
  LineSeriesCanvas,
} from 'react-vis';
import { balanceData, projections } from '../../server-data';

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
const LineChartReactVis = () => {
  const [ useCanvas ] = useState(false);
  const [ showHint, setHint ] = useState(false);
  const Line = useCanvas ? LineSeriesCanvas : LineMarkSeries;

  return  (
    <div style={{
      width: '100%',
      height: '300px',
    }}>
      <FlexibleXYPlot
        margin={{left: 60, right: 40}}
        // onMouseMove={(e) => console.log(e.target)}
      >
        <XAxis
          padding={30}
          tickSize={0}
          style={{
            line: {stroke: '#ADDDE1', strokeWidth: 1},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#fff', fontWeight: 400},
          }}
          tickValues={[
            +new Date('2020-02-27'),
            +new Date(projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].date),
            +new Date(projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 1].date),
            +new Date('2029-06-01')]}
          tickFormat={(value, index, scale, tickTotal) => {
            const date = `${moment(value).format('MMM')} '${moment(value).format('YY')}`;
            if (date === 'Feb \'20') return 'Today';
            if (value === +new Date(projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].date)) return '\u{26A0}\u{0000FE0E}';
            else return date;
          }}
          onSeriesMouseOut={() => console.log('x-axes hover')}
        />
        {showHint && <Hint value={{
          x: +new Date(),
          y: balanceData.data.balanceData.runRateBalanceEstimate[7].amount,
        }}>
          <div style={{background: 'black', padding: '8px'}}>
            <h3>Value of hint</h3>
            <p>text is here...</p>
          </div>
        </Hint>}
        <YAxis
          hideLine
          tickSize={0}
          style={{
            line: {stroke: '#ADDDE1'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#fff', fontWeight: 400}
          }}
          tickFormat={(t) => `$ ${Math.round(t)/1000}k`}
        />
        <Line
          size={0}
          animation
          stroke="gray"
          className="historical"
          data={balanceData.data.balanceData.runRateBalanceEstimate.slice(0, 8).map((item) => ({
            x: new Date(item.date),
            y: item.amount,
          }))}
        />
        <Line
          size={10}
          fill="none"
          stroke={0}
          onValueMouseOver={row => setHint(true)}
          onSeriesMouseOut={() => setHint(false)}
          animation
          className="runRate"
          color="violet"
          curve={'curveMonotoneX'}
          data={balanceData.data.balanceData.runRateBalanceEstimate.slice(7, 120).map((item) => ({
            x: new Date(item.date),
            y: item.amount,
          }))}
        />
        <Line
          size={0}
          className="dashed"
          style={{
            // note that this can not be translated to the canvas version
            strokeDasharray: '3 1',
            strokeWidth: '1'
          }}
          color="white"
          data={[{y: balanceData.data.balanceData.runRateBalanceEstimate[7].amount, x: +new Date()}, {y: 0, x: +new Date()}]}
        />
        <Line
          size={0}
          animation
          stroke="dodgerblue"
          className="base-projection"
          data={projections.data.projections.projections[0].estimates.balanceEstimate.map((item) => ({
            x: new Date(item.date),
            y: item.amount,
          }))}
        />
        <Line
          size={0}
          animation
          stroke="red"
          className="base-projection"
          data={projections.data.projections.projections[0].estimates.balanceEstimate.slice(35).map((item) => ({
            x: new Date(item.date),
            y: item.amount,
          }))}
        />
        <Line
          size={0}
          className="dashed"
          style={{
            // note that this can not be translated to the canvas version
            strokeDasharray: '3 1',
            strokeWidth: '1'
          }}
          color="white"
          data={[
            {
              y: projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].amount,
              x: +new Date(projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].date)
            },
            {
              y: 0,
              x: +new Date(projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].date)
            }]
          }
        />
      </FlexibleXYPlot>
    </div>
  )
};

export default LineChartReactVis;
