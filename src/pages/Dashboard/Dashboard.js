import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { axiosPrivate } from "../../api/useAxiosPrivate";
import { useSelector } from "react-redux";

/* ---------------- CONSTANTS ---------------- */

const COLORS = ["#8884d8", "#ffc658"];

const SERVICE_MAP = {
  RC: "PARIVAAN_RC",
  DL: "DIGI_LOCKER_RC",
};

const initialDailyData = [
  { day: "Thu", value: 0 },
  { day: "Fri", value: 0 },
  { day: "Sat", value: 0 },
  { day: "Sun", value: 0 },
  { day: "Mon", value: 0 },
  { day: "Tue", value: 0 },
  { day: "Wed", value: 0 },
];

/* ---------------- DASHBOARD ---------------- */

export default function Dashboard() {
  const auth = useSelector((state) => state.auth);
  const userId = auth?.dashboard?.walletDetails?.userId;

  const [rcCount, setRcCount] = useState(0);
  const [dlCount, setDlCount] = useState(0);
  const [dailyData, setDailyData] = useState(initialDailyData);

  /* ---------------- FETCH STATS ---------------- */
  useEffect(() => {
    if (!userId) return;

    const fetchStats = async () => {
      try {
        /* ✅ RC TOTAL (SERVICE-WISE) */
        const rcRes = await axiosPrivate.get(
          `/downloads/count/service/${SERVICE_MAP.RC}`
        );

        /* ✅ DL TOTAL (SERVICE-WISE) */
        const dlRes = await axiosPrivate.get(
          `/downloads/count/service/${SERVICE_MAP.DL}`
        );

        setRcCount(rcRes.data || 0);
        setDlCount(dlRes.data || 0);

        /* TEMP DAILY DATA (until backend daily API exists) */
        setDailyData([
          { day: "Thu", value: 0 },
          { day: "Fri", value: 0 },
          { day: "Sat", value: 0 },
          { day: "Sun", value: 0 },
          { day: "Mon", value: 0 },
          { day: "Tue", value: rcRes.data || 0 },
          { day: "Wed", value: 0 },
        ]);
      } catch (error) {
        console.error("Dashboard API error", error);
      }
    };

    fetchStats();
  }, [userId]);

  /* ---------------- DONUT DATA ---------------- */
  const donutData = [
    { name: "RC", value: rcCount },
    { name: "DL", value: dlCount },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* TOP CARDS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <Card title="Total RC Download" value={rcCount} color="#c7b0ff" />
        <Card title="Total DL Download" value={dlCount} color="#ffe8a3" />
      </div>

      {/* CHARTS */}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* LINE CHART */}
        <div
          style={{
            width: "50%",
            height: "350px",
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h3>Daily Downloads</h3>
          <p style={{ marginTop: "-5px", color: "#777" }}>
            RC downloads per day
          </p>

          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={dailyData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* DONUT CHART */}
        <div
          style={{
            width: "50%",
            height: "350px",
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h3>Download Distribution</h3>
          <p style={{ marginTop: "-5px", color: "#777" }}>
            RC vs DL downloads
          </p>

          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
              >
                {donutData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* LEGEND */}
          <div style={{ textAlign: "center", marginTop: "-10px" }}>
            <span style={{ color: COLORS[0], marginRight: 15 }}>● RC</span>
            <span style={{ color: COLORS[1] }}>● DL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- CARD ---------------- */

const Card = ({ title, value, color }) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          background: color,
          marginBottom: "10px",
        }}
      />
      <h2 style={{ margin: 0 }}>{value}</h2>
      <p style={{ margin: 0, color: "gray" }}>{title}</p>
    </div>
  );
};
