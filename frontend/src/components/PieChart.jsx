import React, { useState } from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { PieChartIcon } from 'lucide-react';



function DeviceUsageChart({data}){
  const totalLikes = data.reduce((sum, item) => sum + item.likes, 0);
  const totalComments = data.reduce((sum, item) => sum + item.comments, 0);
  const totalShares = data.reduce((sum, item) => sum + item.shares, 0);

  const initialData = [
    { name: 'Comments', value: totalComments, color: '#4ECDC4' },
    { name: 'Shares', value: totalShares, color: '#45B7D1' },
    { name: 'Likes', value: totalLikes, color: '#FF6B6B' },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    // <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={initialData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {initialData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      filter: activeIndex === index ? 'brightness(1.1)' : 'none',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {initialData.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-lg"
              style={{ backgroundColor: `${item.color}15` }}
            >
              <h3 className="font-semibold text-gray-700">{item.name}</h3>
              <p className="text-2xl font-bold" style={{ color: item.color }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    // </div>
  );
}

export default DeviceUsageChart;
