import React from 'react'
import ClusteredBarGraph from '../Components/ClusteredBarGraph';
import LineChart from '../Components/LineChart';
import NeedleGuage from '../Components/NeedleGauge';
import StackedClusteredWaterfallChart from '../Components/StackedClusteredWaterfallChart';
import './Dashboard.css';

const data = [
    { X: 0.1, y1: 2.42, y2: 1.34 },
    { X: 0.3, y1: 2.0, y2: 0.81 },
    { X: 1, y1: 1, y2: 0.86 },
    { X: 1.5, y1: 0.8, y2: 0.7945 },
    { X: 2, y1: 0.60, y2: 0.40 },
  ];


const Dashboard = () => {
  return (
  <div className='upper'>
    <div>
        <h3 className='header'>Dashboard</h3>
    </div>
    <div className='Container'>
        <div className='guage-box'>
            <div className='read-card'>
                <p>Total Account Payable</p>
                <p>$1,630,270</p>
            </div>
            <div className='dial'>
                <NeedleGuage targetValue={1.86} minValue={0} maxValue={3} label={'Current Ratio'} unit={'%'} sublabel={''}/>
            </div>
        </div>
        <div className='guage-box'>
            <div className='read-card'>
                <p>Equity ratio</p>
                <p>$75.38%</p>
            </div>
            <div className='dial'>
                <NeedleGuage targetValue={10} minValue={0} maxValue={31} label={'DSI'} unit={'days'} sublabel={'Days Sales Inventory'}/>
            </div>
        </div>
        <div className='guage-box'>
            <div className='read-card'>
                <p>Debt Equity</p>
                <p>1.10%</p>
            </div>
            <div className='dial'>
            <NeedleGuage targetValue={7} minValue={0} maxValue={31} label={'DSO'} unit={'days'} sublabel={'Days Sales Inventory'}/>
            </div>
        </div>
        <div className='guage-box'>
            <div className='read-card'>
                <p>Total Account Recievable</p>
                <p>$66,21,280</p>
            </div>
            <div className='dial'>
                <NeedleGuage targetValue={28} minValue={0} maxValue={28} label={'DPO'} unit={'days'} sublabel={'Days Payable Outstanding'}/>
            </div>
        </div>
        <div className='bar-graph'>
            <ClusteredBarGraph data={data} />
        </div>
    </div>
    <div className='lower'>
        <div className='line-graph'>
                <LineChart />
        </div>
        <div className="water-fall">
            <StackedClusteredWaterfallChart/>
        </div>
    </div>
  </div>
  )
}

export default Dashboard
