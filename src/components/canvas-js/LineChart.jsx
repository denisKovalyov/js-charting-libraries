import React, { Component } from 'react';
import moment from 'moment';
import CanvasJSReact from '../../assets/canvasjs.react';
import { balanceData, projections } from '../../server-data';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      backgroundColor: 'transparent',
      theme: "light2", // "light1", "dark1", "dark2"
      axisY: {
        includeZero: true,
        interval: 20000,
        maximum: 80000,
        prefix: "$ ",
        suffix: "k",
        labelFormatter: (label) => label.value / 1000,
        labelFontColor: 'white',
        gridColor: 'transparent',
        tickLength: 0,
        labelFontSize: 12,
      },
      axisX: {
        valueFormatString: "MMM-YY" ,
        interval: 1,
        margin: 20,
        intervalType: "month",
        labelFontColor: 'white',
        tickLength: 10,
        tickColor: 'none',
        labelFontSize: 12,
        labelAngle: 0,
        labelMaxWidth: 100,
        labelFormatter: (label) => {
          const today = moment().format('MMM \'YY');
          if (today === moment(label.value).format('MMM \'YY')) return 'Today';
          if (moment(projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].date).format('MMM \'YY') === moment(label.value).format('MMM \'YY')) {
            return '\u{26A0}\u{0000FE0E}';
          }
          if (moment(projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 1].date).format('MMM \'YY') === moment(label.value).format('MMM \'YY')) {
            return moment(label.value).format('MMM \'YY');
          }
          if ('Jun \'29' === moment(label.value).format('MMM \'YY')) {
            return moment(label.value).format('MMM \'YY');
          }

          return '';
        },
      },
      data: [
        {
        markerType: 'none',
        type: "line",
        toolTipContent: "Run rate {x}: {y}%",
        color: 'gray',
        dataPoints: [
          ...balanceData.data.balanceData.runRateBalanceEstimate.slice(0, 8).map((item) => ({
            x: new Date(item.date),
            y: item.amount,
          })),
        ]
      },
        {
          markerType: 'none',
          type: "line",
          toolTipContent: "Run rate {x}: {y}%",
          color: 'violet',
          dataPoints: [
            ...balanceData.data.balanceData.runRateBalanceEstimate.slice(7, 120).map((item) => ({
              x: new Date(item.date),
              y: item.amount,
            })),
          ]
        },
      {
        markerType: 'none',
        type: "line",
        lineDashType: "dash",
        toolTipContent: "Run rate {x}: {y}%",
        color: 'rgba(255,255,255, 0.75)',
        lineThickness: 1,
        dataPoints: [{
          x: new Date(balanceData.data.balanceData.runRateBalanceEstimate[7].date),
          y: balanceData.data.balanceData.runRateBalanceEstimate[7].amount,
        }, {
          x: new Date(balanceData.data.balanceData.runRateBalanceEstimate[7].date),
          y: 0,
        }]
      },
        {
          markerType: 'none',
          type: "line",
          toolTipContent: "Base projection {x}: {y}%",
          color: 'dodgerblue',
          dataPoints: [
            ...projections.data.projections.projections[0].estimates.balanceEstimate.slice(0, 36).map((item) => ({
              x: new Date(item.date),
              y: item.amount,
            })),
          ]
        },
        {
          markerType: 'none',
          type: "line",
          toolTipContent: "Cash out {x}: {y}%",
          color: 'red',
          dataPoints: [
            {
              x: new Date(projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].date),
              y: projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].amount,
            },
            {
              x: new Date(projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 1].date),
              y: projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 1].amount,
            }
          ]
        },
        {
          markerType: 'none',
          type: "line",
          lineDashType: "dash",
          toolTipContent: "Base projection {x}: {y}%",
          color: 'rgba(255,255,255, 0.75)',
          lineThickness: 1,
          dataPoints: [{
            x: new Date(projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].date),
            y: projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].amount,
          }, {
            x: new Date(projections.data.projections.projections[0].estimates.balanceEstimate[projections.data.projections.projections[0].estimates.balanceEstimate.length - 7].date),
            y: 0,
          }]
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default LineChart;
