
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface SkillRadarChartProps {
  data: {
    'Grammar & Vocabulary': number;
    'Phonetics': number;
    'Reading & General Knowledge': number;
    'Listening': number;
  };
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([skill, value]) => ({
    skill,
    value,
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <PolarGrid stroke="#4A5568" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: '#A0AEC0', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar name="Performance" dataKey="value" stroke="#ff3b81" fill="#ff3b81" fillOpacity={0.6} />
        <Tooltip
            contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                borderColor: '#ff3b81',
                borderRadius: '8px'
            }}
            labelStyle={{ color: '#E2E8F0' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SkillRadarChart;
