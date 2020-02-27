/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import {
  Axis,
  Chart,
  Line,
  LinearScale,
  PointScale,
  Group,
  Dimension,
  } from '@chart-parts/react'
import { AxisOrientation } from '@chart-parts/interfaces';
import { balanceData, projections } from '../../server-data';

const runRateData = [
  ...balanceData.data.balanceData.runRateBalanceEstimate.slice(0, 8).map((item) => ({
      x: item.date,
      y: item.amount,
      c: 'historical',
  })),
  ...balanceData.data.balanceData.runRateBalanceEstimate.slice(7, 120).map((item) => ({
    x: item.date,
    y: item.amount,
    c: 'runRate',
  })),
  {
    x: balanceData.data.balanceData.runRateBalanceEstimate[7].date,
    y: balanceData.data.balanceData.runRateBalanceEstimate[7].amount,
    c: 'dashed',
  },
  {
    x: balanceData.data.balanceData.runRateBalanceEstimate[7].date,
    y: 0,
    c: 'dashed',
  },
  ...projections.data.projections.projections[0].estimates.balanceEstimate.map((item) => ({
    x: item.date,
    y: item.amount,
    c: 'Base projection',
  })),
  {
    x: projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].date,
    y: projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].amount,
    c: 'cash-out',
  },
  {
    x: projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 1].date,
    y: projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 1].amount,
    c: 'cash-out',
  },
  {
    x: projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].date,
    y: projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].amount,
    c: 'base-projection-dashed',
  },
  {
    x: projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].date,
    y: 0,
    c: 'base-projection-dashed',
  },
];

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
const LineChart = () => {
  return  (
    <Chart width={500} height={300} padding={15} data={{ data: runRateData }}>
      <PointScale
        name="x"
        stepName="xStep"
        domain="data.x"
        range={Dimension.Width}
        padding={1}
      />
      <LinearScale name="y" domain="data.y" range={Dimension.Height} nice />
      <Axis
        orient={AxisOrientation.Bottom}
        scale="x"
        labels={true}
        ticks={false}
        labelPadding={10}
        labelColor="rgba(255, 255, 255, 1)"
        values={[
          {value: '2020-02-26', label: 'Today' },
          {value: '2023-01-01', label: '\u{26A0}\u{0000FE0E}'},
          {value: '2023-07-01', label: 'Jul \'23'},
          {value: '2029-06-01', label: 'Jun \'29'},
        ]}
        onClick={() => alert('Click is not working here!')}
      />
      <Axis
        orient={AxisOrientation.Left}
        domainColor="transparent"
        labelColor="rgba(255, 255, 255, 1)"
        scale="y"
        ticks={false}
        labelPadding={10}
        values={[
          { value: '0', label: '$ 0' },
          { value: '23000', label: '$ 23k' },
          { value: '46000', label: '$ 46k' },
          { value: '69000', label: '$ 69k' },
          { value: '92000', label: '$ 92k' }
        ]}
      />

      <Group table="data" facet={{ groupBy: 'c', name: 'facetedData' }}>
        <Line
          onClick={(e) => console.log(e, 'Click!')}
          table="facetedData"
          x={({ d, x }) => x(d.x)}
          y={({ d, y }) => y(d.y)}
          stroke={({ d, color }) => {
            switch(d.c) {
              case 'historical':
                return 'gray';
              case 'runRate':
                return 'violet';
              case 'dashed':
                return 'rgba(255, 255, 255, 0.75)';
              case 'Base projection':
                return 'dodgerblue';
              case 'cash-out':
                return 'red';
              default:
                return 'rgba(255, 255, 255, 0.75)';
            }
          }}
          strokeWidth={2}
          strokeDash={({ d }) => d.c.includes('dashed') ? [3, 1] : []}
        />
      </Group>
    </Chart>
  )
};

export default LineChart;
