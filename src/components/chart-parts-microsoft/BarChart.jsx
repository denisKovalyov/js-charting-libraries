import React, { memo } from 'react'
import { Chart, LinearScale, BandScale, Axis, Rect } from '@chart-parts/react'

const BarChart = memo(({ data, height, width }) => {
  return (
    <Chart height={height} width={width} data={data}>
      <LinearScale name="y" domain="data.amount" range="height" zero />
      <BandScale name="x" domain="data.category" range="width" padding={0.1}/>
      <Axis orient="left" scale="y" />
      <Axis orient="bottom" scale="x" />
      <Rect
        table="data"
        width={({ xWidth }) => xWidth()}
        x={({ d, x }) => x(d.category)}
        y={({ d, y }) => y(d.amount)}
        y2={({ y }) => y(0)}
        fill="rgb(114, 242, 166)"
      />
    </Chart>
  )
});

export default BarChart;
