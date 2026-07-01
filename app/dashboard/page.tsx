"use client";

import { useState, useEffect, useCallback } from "react";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  city: string;
  timestamp: string;
}

// Animated bar chart component
function BarChart({ data, title }: { data: { label: string; value: number; color: string }[]; title: string }) {
  const [animated, setAnimated] = useState(false);
  const maxValue = Math.max(...data.map(d => d.value), 1);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#c5d9b2] p-5 shadow-sm">
      <h3 className="text-[#2d4a2d] font-bold text-sm mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-[#5a7a52] w-20 truncate font-medium">{item.label}</span>
            <div className="flex-1 h-7 bg-[#f0ebe3] rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{
                  width: animated ? `${(item.value / maxValue) * 100}%` : '0%',
                  background: item.color,
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <span className="text-white text-xs font-bold">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Donut chart component
function DonutChart({ data, title }: { data: { label: string; value: number; color: string }[]; title: string }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  let cumulativePercent = 0;
  const segments = data.map(item => {
    const percent = total > 0 ? (item.value / total) * 100 : 0;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;
    return { ...item, percent, startPercent };
  });

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * (percent / 100));
    const y = Math.sin(2 * Math.PI * (percent / 100));
    return [x, y];
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#c5d9b2] p-5 shadow-sm">
      <h3 className="text-[#2d4a2d] font-bold text-sm mb-4">{title}</h3>
      <div className="flex items-center gap-4">
        <div className={`relative transition-all duration-700 ${animated ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <svg width="120" height="120" viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
            {segments.map((seg, i) => {
              const [startX, startY] = getCoordinatesForPercent(seg.startPercent);
              const [endX, endY] = getCoordinatesForPercent(seg.startPercent + seg.percent);
              const largeArcFlag = seg.percent > 50 ? 1 : 0;
              const pathData = [
                `M ${startX} ${startY}`,
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                `L 0 0`,
              ].join(' ');
              return <path key={i} d={pathData} fill={seg.color} opacity="0.85" />;
            })}
            <circle cx="0" cy="0" r="0.55" fill="white" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-[#2d4a2d]">{total}</span>
          </div>
        </div>
        <div className="space-y-1.5 flex-1">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: seg.color }} />
              <span className="text-xs text-[#5a7a52]">{seg.label}</span>
              <span className="text-xs font-bold text-[#2d4a2d] ml-auto">{seg.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Line chart component
function LineChart({ data, title }: { data: { label: string; value: number }[]; title: string }) {
  const [animated, setAnimated] = useState(false);
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 280 + 10,
    y: 100 - ((d.value - minValue) / range) * 80 - 10,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = pathD + ` L ${points[points.length - 1].x} 100 L ${points[0].x} 100 Z`;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#c5d9b2] p-5 shadow-sm">
      <h3 className="text-[#2d4a2d] font-bold text-sm mb-4">{title}</h3>
      <div className={`transition-all duration-700 ${animated ? 'opacity-100' : 'opacity-0'}`}>
        <svg width="100%" height="120" viewBox="0 0 300 120" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 1, 2, 3].map(i => (
            <line key={i} x1="10" y1={10 + i * 26.6} x2="290" y2={10 + i * 26.6} stroke="#e8e3d9" strokeWidth="0.5" />
          ))}
          {/* Area fill */}
          <path d={areaD} fill="url(#areaGradient)" opacity="0.3" />
          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#6b8e5a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: animated ? 'none' : '1000',
              strokeDashoffset: animated ? '0' : '1000',
              transition: 'stroke-dashoffset 1.5s ease-out',
            }}
          />
          {/* Dots */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#2d4a2d" stroke="white" strokeWidth="2" />
          ))}
          {/* Labels */}
          {data.map((d, i) => (
            <text key={i} x={points[i].x} y="115" textAnchor="middle" fontSize="8" fill="#8a9e82">{d.label}</text>
          ))}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6b8e5a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6b8e5a" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// Stat card with animated counter
function StatCard({ label, value, icon, color, suffix }: { label: string; value: number; icon: React.ReactNode; color: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / end), 30);
    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#c5d9b2] p-5 shadow-sm hover:shadow-md transition-shadow duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#8a9e82] text-xs font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold text-[#2d4a2d]">
            {displayValue}{suffix || ''}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ background: color + '20' }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// Activity timeline
function ActivityTimeline({ data }: { data: FormData[] }) {
  const recentEntries = data.slice(-5).reverse();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#c5d9b2] p-5 shadow-sm">
      <h3 className="text-[#2d4a2d] font-bold text-sm mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {recentEntries.map((entry, i) => (
          <div key={i} className="flex items-start gap-3 animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8aad6e] to-[#6b8e5a] flex items-center justify-center text-white text-xs font-bold">
                {entry.name.charAt(0).toUpperCase()}
              </div>
              {i < recentEntries.length - 1 && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-[#c5d9b2]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#2d4a2d] truncate">{entry.name}</p>
              <p className="text-xs text-[#8a9e82]">{entry.city} • {formatTimestamp(entry.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTimestamp(timestamp: string) {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) return 'Just now';
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return date.toLocaleDateString();
  } catch {
    return timestamp;
  }
}

export default function DashboardPage() {
  const [data, setData] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbzWAulQnmFFBl7lVE9pKJBxGQqn0wkjiecMT-SAQWmDbtRK4F8ZICTNFO7nFj6-5ihwhQ/exec";

  const isConfigured = !GOOGLE_SHEET_URL.includes("YOUR_GOOGLE_SCRIPT_ID");

  const DEMO_DATA: FormData[] = [
    { name: "Rahul Sharma", email: "rahul@example.com", mobile: "+91 98765 43210", city: "Mumbai", timestamp: "2025-06-28T10:30:00.000Z" },
    { name: "Priya Patel", email: "priya@example.com", mobile: "+91 87654 32109", city: "Delhi", timestamp: "2025-06-28T11:45:00.000Z" },
    { name: "Amit Kumar", email: "amit@example.com", mobile: "+91 76543 21098", city: "Bangalore", timestamp: "2025-06-29T09:15:00.000Z" },
    { name: "Sneha Gupta", email: "sneha@example.com", mobile: "+91 65432 10987", city: "Mumbai", timestamp: "2025-06-27T14:20:00.000Z" },
    { name: "Vikram Singh", email: "vikram@example.com", mobile: "+91 54321 09876", city: "Pune", timestamp: "2025-06-26T16:30:00.000Z" },
    { name: "Anita Desai", email: "anita@example.com", mobile: "+91 43210 98765", city: "Delhi", timestamp: "2025-06-25T08:45:00.000Z" },
    { name: "Karan Mehta", email: "karan@example.com", mobile: "+91 32109 87654", city: "Bangalore", timestamp: "2025-06-24T12:00:00.000Z" },
    { name: "Deepa Nair", email: "deepa@example.com", mobile: "+91 21098 76543", city: "Chennai", timestamp: "2025-06-23T10:15:00.000Z" },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    if (!isConfigured) {
      setData(DEMO_DATA);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${GOOGLE_SHEET_URL}?action=read`);
      const result = await response.json();
      if (result.status === "success" && result.data) {
        setData(result.data);
      } else {
        setError("No data found or unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Make sure the Google Apps Script is deployed and accessible.");
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = data.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.mobile.toLowerCase().includes(term) ||
      item.city.toLowerCase().includes(term)
    );
  });

  // Compute chart data
  const cityCount: Record<string, number> = {};
  data.forEach(d => {
    const city = d.city.trim();
    cityCount[city] = (cityCount[city] || 0) + 1;
  });

  const cityChartData = Object.entries(cityCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((entry, i) => ({
      label: entry[0],
      value: entry[1],
      color: ['#6b8e5a', '#c8963e', '#4a7c59', '#e8c55a', '#8aad6e'][i % 5],
    }));

  const donutData = Object.entries(cityCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((entry, i) => ({
      label: entry[0],
      value: entry[1],
      color: ['#2d4a2d', '#6b8e5a', '#c8963e', '#8aad6e', '#e8c55a'][i % 5],
    }));

  // Weekly submissions (simulated from timestamps)
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyData = weekDays.map((label, i) => ({
    label,
    value: Math.max(1, data.filter(d => {
      try { return new Date(d.timestamp).getDay() === (i + 1) % 7; } catch { return false; }
    }).length),
  }));

  const uniqueCities = new Set(data.map(d => d.city.toLowerCase())).size;

  const formatDate = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return timestamp;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #fdf6ec 0%, #f0ebe3 50%, #e8f0e0 100%)" }}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20 animate-pulse" style={{ background: "radial-gradient(circle, #8aad6e 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-15 animate-pulse" style={{ background: "radial-gradient(circle, #c8963e 0%, transparent 70%)", animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-10 animate-pulse" style={{ background: "radial-gradient(circle, #6b8e5a 0%, transparent 70%)", animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative bg-gradient-to-r from-[#2d4a2d] via-[#3d5e3d] to-[#2d4a2d] text-white py-5 px-6 shadow-xl">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 80">
            <pattern id="headerPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" opacity="0.3" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#headerPattern)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
              UPLIFT Dashboard
            </h1>
            <p className="text-sm opacity-80 mt-0.5">Analytics & Insights</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium">Live</span>
            </div>
            <button
              onClick={fetchData}
              className="bg-[#c8963e] hover:bg-[#b5842f] text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              ↻ Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        {/* Setup Banner */}
        {!isConfigured && (
          <div className="bg-gradient-to-r from-[#c8963e]/10 to-[#e8c55a]/10 border border-[#c8963e]/30 rounded-2xl p-4 mb-6 flex items-start gap-3 backdrop-blur-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8963e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <div>
              <p className="text-[#c8963e] font-semibold text-sm">Demo Mode Active</p>
              <p className="text-[#8a9e82] text-xs mt-0.5">
                Showing sample data. Connect your Google Sheet to see real submissions.
              </p>
            </div>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total Leads"
            value={data.length}
            color="#6b8e5a"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b8e5a" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
          />
          <StatCard
            label="Cities Reached"
            value={uniqueCities}
            color="#c8963e"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8963e" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>}
          />
          <StatCard
            label="This Week"
            value={Math.min(data.length, 5)}
            color="#4a7c59"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>}
          />
          <StatCard
            label="Conversion"
            value={78}
            suffix="%"
            color="#e8c55a"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8c55a" strokeWidth="2"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12" /></svg>}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <LineChart data={weeklyData} title="📈 Weekly Submissions" />
          <BarChart data={cityChartData} title="🏙️ Top Cities" />
          <DonutChart data={donutData} title="🎯 City Distribution" />
        </div>

        {/* Activity + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Activity Timeline */}
          <div className="lg:col-span-1">
            <ActivityTimeline data={data} />
          </div>

          {/* Data Table */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#c5d9b2] shadow-sm overflow-hidden">
              {/* Table Header with Search */}
              <div className="p-4 border-b border-[#c5d9b2]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h3 className="text-[#2d4a2d] font-bold text-sm">All Submissions</h3>
                <div className="relative w-full sm:w-64">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a9e72]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#c5d9b2] bg-white/80 text-sm text-[#2d4a2d] placeholder-[#8a9e82] focus:outline-none focus:ring-2 focus:ring-[#7a9e72] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-16">
                  <div className="inline-block w-10 h-10 border-4 border-[#c5d9b2] border-t-[#2d4a2d] rounded-full animate-spin mb-4"></div>
                  <p className="text-[#2d4a2d] font-medium text-sm">Loading...</p>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="p-6 text-center">
                  <p className="text-red-600 text-sm">{error}</p>
                  <button onClick={fetchData} className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-xs">Try Again</button>
                </div>
              )}

              {/* Table */}
              {!loading && !error && (
                <div className="overflow-x-auto">
                  {filteredData.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-[#8a9e82] text-sm">No submissions found.</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#f5f0e6]">
                          <th className="text-left py-3 px-4 font-semibold text-xs text-[#5a7a52]">#</th>
                          <th className="text-left py-3 px-4 font-semibold text-xs text-[#5a7a52]">Name</th>
                          <th className="text-left py-3 px-4 font-semibold text-xs text-[#5a7a52]">Email</th>
                          <th className="text-left py-3 px-4 font-semibold text-xs text-[#5a7a52]">Mobile</th>
                          <th className="text-left py-3 px-4 font-semibold text-xs text-[#5a7a52]">City</th>
                          <th className="text-left py-3 px-4 font-semibold text-xs text-[#5a7a52]">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b border-[#c5d9b2]/30 hover:bg-[#f5efe4]/50 transition-colors"
                          >
                            <td className="py-3 px-4 text-[#2d4a2d] font-medium text-xs">{index + 1}</td>
                            <td className="py-3 px-4 text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8aad6e] to-[#6b8e5a] flex items-center justify-center text-white text-[10px] font-bold">
                                  {item.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-[#2d4a2d] font-medium">{item.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-[#7a9e72] text-xs">{item.email}</td>
                            <td className="py-3 px-4 text-[#2d4a2d] text-xs">{item.mobile}</td>
                            <td className="py-3 px-4 text-xs">
                              <span className="bg-[#e8f0e0] text-[#4a7c59] px-2 py-0.5 rounded-full text-[10px] font-medium">
                                {item.city}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[#8a9e82] text-xs">{formatDate(item.timestamp)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
