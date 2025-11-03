import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';
import LBSLogo from './LBSV_logo.png';

const MetroImpactDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedChart, setExpandedChart] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [dateRange, setDateRange] = useState('last-30-days');

  // Ultra sophisticated color palette
  const colors = {
    primary: '#111827',     // Near black
    secondary: '#4B5563',   // Charcoal gray
    accent: '#065F46',      // Deep emerald
    accentLight: '#10B981', // Bright emerald
    surface: '#FFFFFF',
    background: '#F9FAFB',
  };

  // KPI Data for each tab with trend data for sparklines
  const overviewKPIs = [
    { 
      label: 'Total Participants', 
      value: '12,450', 
      change: '+23%', 
      target: '15,000', 
      trend: 'up',
      progress: 83,
      trendData: [12000, 12200, 12350, 12410, 12450]
    },
    { 
      label: 'Completion Rate', 
      value: '94.2%', 
      change: '+5.3%', 
      target: '90%', 
      trend: 'up',
      progress: 105,
      trendData: [89, 90, 91, 92, 94.2]
    },
    { 
      label: 'Program Efficiency', 
      value: '87%', 
      change: '+3.2%', 
      target: '85%', 
      trend: 'up',
      progress: 102,
      trendData: [84, 85, 85.5, 86, 87]
    },
    { 
      label: 'Cost Per Outcome', 
      value: '$2,450', 
      change: '-12%', 
      target: '$2,800', 
      trend: 'down',
      progress: 88,
      trendData: [2800, 2700, 2600, 2550, 2450]
    },
    { 
      label: 'Satisfaction Score', 
      value: '4.7/5', 
      change: '+0.2', 
      target: '4.5', 
      trend: 'up',
      progress: 104,
      trendData: [4.5, 4.5, 4.6, 4.6, 4.7]
    },
    { 
      label: 'Capacity Utilization', 
      value: '92%', 
      change: '+8%', 
      target: '90%', 
      trend: 'up',
      progress: 102,
      trendData: [85, 87, 89, 90, 92]
    },
  ];

  const demographicKPIs = [
    { 
      label: 'Urban Participation', 
      value: '55%', 
      change: '+5%', 
      target: '50%', 
      trend: 'up',
      progress: 110,
      trendData: [50, 51, 52, 53, 55]
    },
    { 
      label: 'Rural Reach', 
      value: '15%', 
      change: '+2%', 
      target: '20%', 
      trend: 'up',
      progress: 75,
      trendData: [13, 13.5, 14, 14.5, 15]
    },
    { 
      label: 'Veterans Served', 
      value: '1,240', 
      change: '+18%', 
      target: '1,000', 
      trend: 'up',
      progress: 124,
      trendData: [1000, 1050, 1120, 1180, 1240]
    },
    { 
      label: 'Disability Access', 
      value: '89%', 
      change: '+7%', 
      target: '85%', 
      trend: 'up',
      progress: 105,
      trendData: [82, 84, 85, 87, 89]
    },
    { 
      label: 'Language Support', 
      value: '94%', 
      change: '+12%', 
      target: '90%', 
      trend: 'up',
      progress: 104,
      trendData: [82, 85, 88, 91, 94]
    },
    { 
      label: 'Digital Inclusion', 
      value: '76%', 
      change: '+15%', 
      target: '80%', 
      trend: 'up',
      progress: 95,
      trendData: [61, 65, 68, 72, 76]
    },
  ];

  const outcomeKPIs = [
    { 
      label: 'Employment Rate', 
      value: '76%', 
      change: '+8%', 
      target: '80%', 
      trend: 'up',
      progress: 95,
      trendData: [68, 70, 72, 74, 76]
    },
    { 
      label: 'Median Earnings', 
      value: '$48,200', 
      change: '+12%', 
      target: '$45,000', 
      trend: 'up',
      progress: 107,
      trendData: [43000, 44000, 45200, 46800, 48200]
    },
    { 
      label: 'Retention Rate', 
      value: '82%', 
      change: '+4%', 
      target: '80%', 
      trend: 'up',
      progress: 103,
      trendData: [78, 79, 80, 81, 82]
    },
    { 
      label: 'Skill Certification', 
      value: '88%', 
      change: '+9%', 
      target: '85%', 
      trend: 'up',
      progress: 104,
      trendData: [79, 81, 83, 85, 88]
    },
    { 
      label: 'ROI Multiplier', 
      value: '4.2x', 
      change: '+0.4x', 
      target: '4.0x', 
      trend: 'up',
      progress: 105,
      trendData: [3.8, 3.9, 4.0, 4.1, 4.2]
    },
    { 
      label: 'Economic Impact', 
      value: '$4.2M', 
      change: '+18%', 
      target: '$5M', 
      trend: 'up',
      progress: 84,
      trendData: [3.2, 3.5, 3.8, 4.0, 4.2]
    },
  ];

  // OVERVIEW TAB DATA
  const performanceTrends = [
    { month: 'Jan', enrollment: 1420, completion: 91, efficiency: 85 },
    { month: 'Feb', enrollment: 1580, completion: 92, efficiency: 86 },
    { month: 'Mar', enrollment: 1650, completion: 93, efficiency: 87 },
    { month: 'Apr', enrollment: 1520, completion: 94, efficiency: 88 },
    { month: 'May', enrollment: 1480, completion: 93, efficiency: 87 },
    { month: 'Jun', enrollment: 1610, completion: 95, efficiency: 89 },
    { month: 'Jul', enrollment: 1590, completion: 94, efficiency: 88 },
    { month: 'Aug', enrollment: 1600, completion: 94.2, efficiency: 87 },
  ];

  const programComparison = [
    { program: 'Digital Skills', enrollment: 2450, completion: 94, cost: 2200 },
    { program: 'Healthcare', enrollment: 1890, completion: 96, cost: 2850 },
    { program: 'Manufacturing', enrollment: 1670, completion: 92, cost: 3200 },
    { program: 'Green Jobs', enrollment: 1420, completion: 91, cost: 2650 },
    { program: 'Business', enrollment: 1980, completion: 95, cost: 2400 },
  ];

  const efficiencyMetrics = [
    { metric: 'Time to Complete', current: 4.2, target: 5.0, unit: 'months' },
    { metric: 'Cost per Graduate', current: 2450, target: 2800, unit: '$' },
    { metric: 'Staff Efficiency', current: 18, target: 15, unit: 'participants' },
    { metric: 'Resource Utilization', current: 88, target: 85, unit: '%' },
  ];

  const satisfactionTrends = [
    { month: 'Jan', satisfaction: 4.3, complaints: 12 },
    { month: 'Feb', satisfaction: 4.4, complaints: 8 },
    { month: 'Mar', satisfaction: 4.5, complaints: 6 },
    { month: 'Apr', satisfaction: 4.6, complaints: 5 },
    { month: 'May', satisfaction: 4.6, complaints: 7 },
    { month: 'Jun', satisfaction: 4.7, complaints: 4 },
    { month: 'Jul', satisfaction: 4.7, complaints: 3 },
    { month: 'Aug', satisfaction: 4.7, complaints: 2 },
  ];

  // DEMOGRAPHICS TAB DATA
  const geographicDistribution = [
    { region: 'North District', participants: 2850, percentage: 23, growth: 12 },
    { region: 'South District', participants: 2450, percentage: 20, growth: 8 },
    { region: 'East District', participants: 3120, percentage: 25, growth: 15 },
    { region: 'West District', participants: 2150, percentage: 17, growth: 6 },
    { region: 'Central District', participants: 1880, percentage: 15, growth: 10 },
  ];

  const accessMetrics = [
    { category: 'Digital Access', score: 76, target: 80, participants: 9450 },
    { category: 'Transportation', score: 82, target: 85, participants: 10120 },
    { category: 'Language', score: 94, target: 90, participants: 11680 },
    { category: 'Disability', score: 89, target: 85, participants: 11050 },
  ];

  const participationTrends = [
    { group: 'Urban', q1: 1200, q2: 1350, q3: 1420, q4: 1550 },
    { group: 'Suburban', q1: 800, q2: 850, q3: 920, q4: 980 },
    { group: 'Rural', q1: 450, q2: 480, q3: 520, q4: 550 },
  ];

  const demographicGrowth = [
    { category: 'Urban', growth: 12, target: 10 },
    { category: 'Suburban', growth: 8, target: 8 },
    { category: 'Rural', growth: 15, target: 12 },
    { category: 'Veterans', growth: 18, target: 15 },
  ];

  // OUTCOMES TAB DATA
  const employmentOutcomes = [
    { period: 'Completion', employment: 94, earnings: 0 },
    { period: '3 Months', employment: 82, earnings: 38500 },
    { period: '6 Months', employment: 76, earnings: 45200 },
    { period: '12 Months', employment: 82, earnings: 48200 },
    { period: '24 Months', employment: 78, earnings: 51200 },
  ];

  const economicImpact = [
    { category: 'Direct Wages', amount: 2.8, percentage: 67 },
    { category: 'Tax Revenue', amount: 0.6, percentage: 14 },
    { category: 'Business Growth', amount: 0.4, percentage: 10 },
    { category: 'Social Savings', amount: 0.4, percentage: 9 },
  ];

  const roiAnalysis = [
    { program: 'Digital Skills', investment: 5.4, return: 22.7, roi: 4.2 },
    { program: 'Healthcare', investment: 6.8, return: 28.9, roi: 4.3 },
    { program: 'Manufacturing', investment: 7.2, return: 31.0, roi: 4.3 },
    { program: 'Green Jobs', investment: 5.9, return: 24.8, roi: 4.2 },
    { program: 'Business', investment: 5.1, return: 21.4, roi: 4.2 },
  ];

  const programOutcomes = [
    { program: 'Digital Skills', employment: 78, earnings: 46200, satisfaction: 4.6 },
    { program: 'Healthcare', employment: 82, earnings: 51200, satisfaction: 4.8 },
    { program: 'Manufacturing', employment: 85, earnings: 58200, satisfaction: 4.7 },
    { program: 'Green Jobs', employment: 79, earnings: 49200, satisfaction: 4.5 },
    { program: 'Business', employment: 81, earnings: 52200, satisfaction: 4.7 },
  ];

  // TABLE DATA
  const tableData = {
    overview: [
      { program: 'Digital Skills', enrollment: 2450, completion: 94, cost: 2200, efficiency: 89, satisfaction: 4.6 },
      { program: 'Healthcare Training', enrollment: 1890, completion: 96, cost: 2850, efficiency: 92, satisfaction: 4.8 },
      { program: 'Advanced Manufacturing', enrollment: 1670, completion: 92, cost: 3200, efficiency: 88, satisfaction: 4.7 },
      { program: 'Green Jobs Initiative', enrollment: 1420, completion: 91, cost: 2650, efficiency: 85, satisfaction: 4.5 },
      { program: 'Business Services', enrollment: 1980, completion: 95, cost: 2400, efficiency: 91, satisfaction: 4.7 },
    ],
    demographics: [
      { region: 'North District', participants: 2850, growth: 12, access: 88, satisfaction: 4.6 },
      { region: 'South District', participants: 2450, growth: 8, access: 85, satisfaction: 4.5 },
      { region: 'East District', participants: 3120, growth: 15, access: 92, satisfaction: 4.8 },
      { region: 'West District', participants: 2150, growth: 6, access: 82, satisfaction: 4.4 },
      { region: 'Central District', participants: 1880, growth: 10, access: 86, satisfaction: 4.6 },
    ],
    outcomes: [
      { program: 'Digital Skills', employment: 78, earnings: 46200, roi: 4.2, satisfaction: 4.6 },
      { program: 'Healthcare', employment: 82, earnings: 51200, roi: 4.3, satisfaction: 4.8 },
      { program: 'Manufacturing', employment: 85, earnings: 58200, roi: 4.3, satisfaction: 4.7 },
      { program: 'Green Jobs', employment: 79, earnings: 49200, roi: 4.2, satisfaction: 4.5 },
      { program: 'Business', employment: 81, earnings: 52200, roi: 4.2, satisfaction: 4.7 },
    ]
  };

  // Sparkline Component
  const Sparkline = ({ data, color }: { data: number[], color: string }) => (
    <svg width="100%" height="100%" viewBox="0 0 100 20">
      <path
        d={`M 0,${20 - (data[0] / Math.max(...data)) * 20} ${data.map((point, i) => `L ${(i / (data.length - 1)) * 100},${20 - (point / Math.max(...data)) * 20}`).join(' ')}`}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-xl rounded-lg backdrop-blur-sm bg-white/95">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}{entry.dataKey?.includes('percentage') || entry.dataKey === 'completion' ? '%' : ''}
              {entry.dataKey === 'amount' ? 'M' : ''}
              {entry.dataKey === 'earnings' && entry.value > 0 ? '$' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getKPIsForTab = () => {
    switch (activeTab) {
      case 'overview': return overviewKPIs;
      case 'demographics': return demographicKPIs;
      case 'outcomes': return outcomeKPIs;
      default: return overviewKPIs;
    }
  };

  const getTableData = () => {
    return tableData[activeTab as keyof typeof tableData] || tableData.overview;
  };

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    const data = getTableData();
    if (!sortConfig.key) return data;

    return [...data].sort((a: any, b: any) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [activeTab, sortConfig]);

  const ChartContainer = ({ children, title, chartKey }: { children: React.ReactNode, title: string, chartKey: string }) => (
    <div 
      className={`bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-lg hover:bg-white/95 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
        expandedChart === chartKey ? 'fixed inset-4 z-50 bg-white p-8' : 'col-span-1'
      }`}
      onClick={() => setExpandedChart(expandedChart === chartKey ? null : chartKey)}
    >
      <h3 className="text-sm font-medium mb-3" style={{ color: colors.primary }}>{title}</h3>
      <div className={expandedChart === chartKey ? "h-[calc(100vh-200px)]" : "h-48"}>
        {children}
      </div>
      {expandedChart === chartKey && (
        <button 
          className="absolute top-4 right-4 px-3 py-1 text-sm border rounded-lg hover:bg-gray-50"
          onClick={(e) => {
            e.stopPropagation();
            setExpandedChart(null);
          }}
        >
          Close
        </button>
      )}
    </div>
  );

  const renderOverviewCharts = () => (
    <>
      {/* First Row - 4 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ChartContainer title="Performance Trends" chartKey="performance">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={performanceTrends} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="enrollment" stroke={colors.primary} fill={colors.primary + '20'} name="Enrollment" />
              <Line type="monotone" dataKey="completion" stroke={colors.accent} strokeWidth={2} name="Completion %" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Program Comparison" chartKey="programs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={programComparison} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="program" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="enrollment" fill={colors.primary} name="Enrollment" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Satisfaction Trends" chartKey="satisfaction">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={satisfactionTrends} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="satisfaction" stroke={colors.accent} strokeWidth={2} name="Satisfaction" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Efficiency Metrics" chartKey="efficiency">
          <div className="space-y-4 h-full overflow-y-auto">
            {efficiencyMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div>
                  <p className="font-medium text-sm" style={{ color: colors.primary }}>{metric.metric}</p>
                  <p className="text-xs" style={{ color: colors.secondary }}>Target: {metric.target}{metric.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-light" style={{ color: colors.accent }}>{metric.current}{metric.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Second Row - 4 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ChartContainer title="Completion Rates" chartKey="completion">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={programComparison} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="program" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="completion" fill={colors.accent} name="Completion %" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Cost Analysis" chartKey="cost">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={programComparison} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="program" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="cost" fill={colors.primary} name="Cost per Outcome" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Monthly Efficiency" chartKey="monthly-efficiency">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceTrends} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="efficiency" stroke={colors.accent} strokeWidth={2} name="Efficiency %" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Program Status" chartKey="status">
          <div className="space-y-3 h-full overflow-y-auto">
            {programComparison.map((program, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>{program.program}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  program.completion >= 94 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {program.completion}%
                </span>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </>
  );

  const renderDemographicsCharts = () => (
    <>
      {/* First Row - 4 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ChartContainer title="Geographic Distribution" chartKey="geo">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={geographicDistribution} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="region" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="percentage" fill={colors.primary} name="Percentage %" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Access & Inclusion" chartKey="access">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={accessMetrics} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="category" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" fill={colors.primary} name="Score %" radius={[2, 2, 0, 0]} />
              <Line type="monotone" dataKey="target" stroke={colors.accent} strokeWidth={2} name="Target %" strokeDasharray="3 3" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Participation Trends" chartKey="participation">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={participationTrends} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="group" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="q1" stroke={colors.primary} name="Q1" strokeWidth={2} />
              <Line type="monotone" dataKey="q2" stroke={colors.accent} name="Q2" strokeWidth={2} />
              <Line type="monotone" dataKey="q3" stroke={colors.secondary} name="Q3" strokeWidth={2} />
              <Line type="monotone" dataKey="q4" stroke={colors.accentLight} name="Q4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Growth Metrics" chartKey="growth">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demographicGrowth} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="category" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="growth" fill={colors.accent} name="Growth %" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Second Row - 4 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ChartContainer title="Regional Growth" chartKey="regional-growth">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={geographicDistribution} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="region" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="growth" fill={colors.accent} name="Growth %" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Participant Counts" chartKey="counts">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={geographicDistribution} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="region" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="participants" fill={colors.primary} name="Participants" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Access Scores" chartKey="scores">
          <div className="space-y-4 h-full overflow-y-auto">
            {accessMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div>
                  <p className="font-medium text-sm" style={{ color: colors.primary }}>{metric.category}</p>
                  <p className="text-xs" style={{ color: colors.secondary }}>{metric.participants.toLocaleString()} participants</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-light" style={{ color: colors.accent }}>{metric.score}%</p>
                  <p className={`text-xs ${metric.score >= metric.target ? 'text-green-600' : 'text-orange-600'}`}>
                    Target: {metric.target}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="Regional Analysis" chartKey="regional-analysis">
          <div className="space-y-3 h-full overflow-y-auto">
            {geographicDistribution.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>{region.region}</span>
                <div className="text-right">
                  <span className="text-sm font-light" style={{ color: colors.accent }}>{region.percentage}%</span>
                  <span className="text-xs block text-green-600">+{region.growth}%</span>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </>
  );

  const renderOutcomesCharts = () => (
    <>
      {/* First Row - 4 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ChartContainer title="Employment Outcomes" chartKey="employment">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={employmentOutcomes} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="period" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis yAxisId="left" stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <YAxis yAxisId="right" orientation="right" stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="employment" fill={colors.primary} name="Employment %" radius={[2, 2, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="earnings" stroke={colors.accent} strokeWidth={2} name="Median Earnings" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Economic Impact" chartKey="impact">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={economicImpact} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="category" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill={colors.primary} name="Impact ($M)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="ROI Analysis" chartKey="roi">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={roiAnalysis} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="program" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="roi" fill={colors.accent} name="ROI Multiplier" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Program Outcomes" chartKey="program-outcomes">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={programOutcomes} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="program" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="employment" fill={colors.primary} name="Employment %" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Second Row - 4 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ChartContainer title="Earnings by Program" chartKey="earnings">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={programOutcomes} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="program" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="earnings" fill={colors.accent} name="Median Earnings" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Investment Returns" chartKey="returns">
          <div className="space-y-4 h-full overflow-y-auto">
            {roiAnalysis.map((program, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div>
                  <p className="font-medium text-sm" style={{ color: colors.primary }}>{program.program}</p>
                  <p className="text-xs" style={{ color: colors.secondary }}>${program.investment}M investment</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-light" style={{ color: colors.accent }}>{program.roi}x</p>
                  <p className="text-sm" style={{ color: colors.secondary }}>${program.return}M return</p>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="Satisfaction Outcomes" chartKey="outcome-satisfaction">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={programOutcomes} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" />
              <XAxis dataKey="program" stroke={colors.secondary} tick={{ fontSize: 10 }} height={30} />
              <YAxis stroke={colors.secondary} tick={{ fontSize: 10 }} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="satisfaction" fill={colors.primary} name="Satisfaction" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Impact Breakdown" chartKey="impact-breakdown">
          <div className="space-y-3 h-full overflow-y-auto">
            {economicImpact.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>{item.category}</span>
                <div className="text-right">
                  <span className="text-sm font-light" style={{ color: colors.accent }}>${item.amount}M</span>
                  <span className="text-xs block" style={{ color: colors.secondary }}>{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </>
  );

  const getTableColumns = () => {
    switch (activeTab) {
      case 'overview':
        return ['program', 'enrollment', 'completion', 'cost', 'efficiency', 'satisfaction'];
      case 'demographics':
        return ['region', 'participants', 'growth', 'access', 'satisfaction'];
      case 'outcomes':
        return ['program', 'employment', 'earnings', 'roi', 'satisfaction'];
      default:
        return ['program', 'enrollment', 'completion', 'cost'];
    }
  };

  const getColumnDisplayName = (key: string) => {
    const names: { [key: string]: string } = {
      program: 'Program',
      enrollment: 'Enrollment',
      completion: 'Completion %',
      cost: 'Cost',
      efficiency: 'Efficiency %',
      satisfaction: 'Satisfaction',
      region: 'Region',
      participants: 'Participants',
      growth: 'Growth %',
      access: 'Access %',
      employment: 'Employment %',
      earnings: 'Earnings',
      roi: 'ROI'
    };
    return names[key] || key;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header with Logo */}
      <div className="bg-white border-b sticky top-0 z-40" style={{ borderColor: colors.primary + '15' }}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* LBS Ventures Logo */}
              <div className="flex items-center gap-3">
                <img 
                  src={LBSLogo} 
                  alt="LBS Ventures" 
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h1 className="text-xl font-light tracking-tight" style={{ color: colors.primary }}>
                    Metro Impact Dashboard
                  </h1>
                  <p className="text-xs mt-1" style={{ color: colors.secondary }}>
                    Program Performance & Equity Analytics
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="text-sm border rounded-lg px-3 py-1 bg-white"
                style={{ borderColor: colors.secondary + '30' }}
              >
                <option value="last-30-days">Last 30 days</option>
                <option value="last-quarter">Last quarter</option>
                <option value="year-to-date">Year to date</option>
                <option value="custom">Custom range</option>
              </select>
              <div className="text-sm px-3 py-1 rounded-full bg-gray-100" style={{ color: colors.secondary }}>
                Updated: Today, 2:30 PM
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-all duration-200" 
                  style={{ borderColor: colors.secondary + '30', color: colors.primary }}>
                  Export Data
                </button>
                <button className="px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: colors.primary, color: 'white' }}>
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b bg-white sticky top-16 z-30" style={{ borderColor: colors.primary + '15' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex">
            {['overview', 'demographics', 'outcomes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-sm font-normal border-b-2 transition-all duration-200 ${
                  activeTab === tab
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'overview' ? 'Program Overview' : 
                 tab === 'demographics' ? 'Participant Analysis' : 
                 'Impact & Outcomes'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Grid with Sparklines */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {getKPIsForTab().map((kpi, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex justify-between items-start mb-2">
                <div className="text-xs font-medium uppercase tracking-wide" style={{ color: colors.secondary }}>
                  {kpi.label}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full transition-all duration-200 ${
                  kpi.trend === 'up' ? 'bg-green-100 text-green-700 group-hover:bg-green-200' : 'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
                }`}>
                  {kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}
                </span>
              </div>
              <div className="text-xl font-light mb-1" style={{ color: colors.primary }}>{kpi.value}</div>
              
              {/* Sparkline */}
              <div className="h-6 mb-2 opacity-70">
                <Sparkline data={kpi.trendData} color={kpi.trend === 'up' ? colors.accent : '#DC2626'} />
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className={kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}>{kpi.change}</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Target</span>
                  <div className="w-12 bg-gray-200 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full ${kpi.progress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                      style={{ width: `${Math.min(kpi.progress, 100)}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Charts */}
        {activeTab === 'overview' && renderOverviewCharts()}
        {activeTab === 'demographics' && renderDemographicsCharts()}
        {activeTab === 'outcomes' && renderOutcomesCharts()}

        {/* Sortable Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mt-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-light" style={{ color: colors.primary }}>
              {activeTab === 'overview' ? 'Program Performance Details' : 
               activeTab === 'demographics' ? 'Regional Participation Details' : 
               'Program Outcome Details'}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {getTableColumns().map((column) => (
                    <th 
                      key={column}
                      className="text-left p-4 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors"
                      style={{ color: colors.secondary }}
                      onClick={() => handleSort(column)}
                    >
                      <div className="flex items-center gap-1">
                        {getColumnDisplayName(column)}
                        <span className="text-xs">
                          {sortConfig.key === column ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕'}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row: any, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    {getTableColumns().map((column) => {
                      const value = row[column];
                      let displayValue: string;
                      
                      if (column === 'earnings' && value) {
                        displayValue = `$${value.toLocaleString()}`;
                      } else if (column === 'cost') {
                        displayValue = `$${value.toLocaleString()}`;
                      } else if (typeof value === 'number' && column !== 'program' && column !== 'region') {
                        displayValue = value + (column === 'satisfaction' ? '' : '%');
                      } else {
                        displayValue = String(value);
                      }
                      
                      return (
                        <td key={column} className="p-4 text-sm" style={{ color: colors.primary }}>
                          {displayValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: colors.primary + '15' }}>
          <div className="flex flex-col items-center gap-4">
            <a href="https://www.lbs.ventures/contact" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img 
                src={LBSLogo} 
                alt="LBS Ventures" 
                className="w-10 h-10 object-contain mx-auto"
              />
            </a>
            <p className="text-xs" style={{ color: colors.secondary }}>
              Transform program data into actionable insights with LBS Ventures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetroImpactDashboard;