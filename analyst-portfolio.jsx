import { useState } from "react";

const COLORS = {
  bg: "#0B0F19", card: "#131825", cardHover: "#1A2035", border: "#1E2A3F",
  accent: "#3B82F6", accentGlow: "rgba(59,130,246,0.15)", green: "#10B981",
  red: "#EF4444", amber: "#F59E0B", purple: "#8B5CF6", teal: "#14B8A6",
  text: "#E2E8F0", textMuted: "#94A3B8", textDim: "#64748B",
};

const ecommerceData = {
  monthlyRevenue: [
    { month: "Jan", revenue: 142000 }, { month: "Feb", revenue: 128500 },
    { month: "Mar", revenue: 165200 }, { month: "Apr", revenue: 158900 },
    { month: "May", revenue: 171400 }, { month: "Jun", revenue: 189600 },
    { month: "Jul", revenue: 195800 }, { month: "Aug", revenue: 178300 },
    { month: "Sep", revenue: 201500 }, { month: "Oct", revenue: 224100 },
    { month: "Nov", revenue: 268400 }, { month: "Dec", revenue: 312000 },
  ],
  categoryPerf: [
    { name: "Electronics", revenue: 687200, pct: 28.4, growth: 12.3 },
    { name: "Apparel", revenue: 531800, pct: 22.0, growth: 8.7 },
    { name: "Home & Garden", revenue: 412500, pct: 17.1, growth: 15.2 },
    { name: "Sports", revenue: 298400, pct: 12.3, growth: -2.1 },
    { name: "Beauty", revenue: 247300, pct: 10.2, growth: 22.4 },
    { name: "Books & Media", revenue: 238500, pct: 9.9, growth: -5.8 },
  ],
  customerSegments: [
    { segment: "New Customers", count: 18420, avgSpend: 62.30, retention: "N/A" },
    { segment: "Returning (2-5)", count: 8934, avgSpend: 84.50, retention: "34%" },
    { segment: "Loyal (6-15)", count: 3812, avgSpend: 112.75, retention: "67%" },
    { segment: "VIP (16+)", count: 1247, avgSpend: 168.90, retention: "89%" },
  ],
};

const fuelData = {
  marketRack: [
    { name: "Los Angeles", rack: 2.461, retail: 3.479, margin: 0.275, tax: 0.743 },
    { name: "San Diego", rack: 2.477, retail: 3.493, margin: 0.273, tax: 0.743 },
    { name: "Las Vegas", rack: 2.339, retail: 3.043, margin: 0.262, tax: 0.442 },
    { name: "Phoenix", rack: 2.284, retail: 2.987, margin: 0.309, tax: 0.394 },
    { name: "Dallas", rack: 2.318, retail: 3.010, margin: 0.288, tax: 0.404 },
  ],
  stationPerf: [
    { station: "Irving Central", market: "Dallas", gallons: 30686, margin: 0.293, flag: "OK" },
    { station: "Dallas West", market: "Dallas", gallons: 27226, margin: 0.285, flag: "OK" },
    { station: "Vegas Strip", market: "Las Vegas", gallons: 30313, margin: 0.268, flag: "Review" },
    { station: "LA Central", market: "Los Angeles", gallons: 28117, margin: 0.278, flag: "Review" },
    { station: "Scottsdale", market: "Phoenix", gallons: 29314, margin: 0.315, flag: "OK" },
    { station: "San Diego South", market: "San Diego", gallons: 27571, margin: 0.271, flag: "Review" },
    { station: "Henderson", market: "Las Vegas", gallons: 22832, margin: 0.259, flag: "Review" },
    { station: "Mesa East", market: "Phoenix", gallons: 24039, margin: 0.304, flag: "OK" },
    { station: "LA Harbor", market: "Los Angeles", gallons: 24311, margin: 0.269, flag: "Review" },
    { station: "Phoenix North", market: "Phoenix", gallons: 26920, margin: 0.311, flag: "OK" },
  ],
  weeklyTrend: [
    { day: "Apr 1", la: 2.455, lv: 2.333, phx: 2.278, dal: 2.312 },
    { day: "Apr 2", la: 2.461, lv: 2.339, phx: 2.282, dal: 2.318 },
    { day: "Apr 3", la: 2.448, lv: 2.326, phx: 2.271, dal: 2.305 },
    { day: "Apr 4", la: 2.470, lv: 2.348, phx: 2.293, dal: 2.327 },
    { day: "Apr 5", la: 2.477, lv: 2.355, phx: 2.300, dal: 2.334 },
    { day: "Apr 6", la: 2.465, lv: 2.343, phx: 2.288, dal: 2.322 },
    { day: "Apr 7", la: 2.452, lv: 2.330, phx: 2.275, dal: 2.309 },
  ],
};

const qcoData = {
  weeklyAccuracy: [
    { week: "Wk 1", accuracy: 87.2 }, { week: "Wk 2", accuracy: 87.8 },
    { week: "Wk 3", accuracy: 86.9 }, { week: "Wk 4", accuracy: 88.1 },
    { week: "Wk 5", accuracy: 85.4 }, { week: "Wk 6", accuracy: 84.7 },
    { week: "Wk 7", accuracy: 83.9 }, { week: "Wk 8", accuracy: 89.3 },
    { week: "Wk 9", accuracy: 91.7 }, { week: "Wk 10", accuracy: 93.2 },
    { week: "Wk 11", accuracy: 94.1 }, { week: "Wk 12", accuracy: 94.8 },
  ],
  errorBreakdown: [
    { category: "Cups / Beverages", errors: 342, pct: 38.2, rootCause: "Training data color bias" },
    { category: "Hot Food Items", errors: 187, pct: 20.9, rootCause: "Inconsistent packaging angles" },
    { category: "Snack Bags", errors: 156, pct: 17.4, rootCause: "Reflective packaging surface" },
    { category: "Candy / Small Items", errors: 121, pct: 13.5, rootCause: "Size similarity across SKUs" },
    { category: "Other", errors: 89, pct: 9.9, rootCause: "Various" },
  ],
};

const sqlQueries = {
  ecom_revenue: "-- Monthly revenue trend with YoY comparison\nSELECT \n  DATE_TRUNC('month', order_date) AS month,\n  SUM(order_total) AS revenue,\n  COUNT(DISTINCT order_id) AS orders,\n  AVG(order_total) AS avg_order_value,\n  LAG(SUM(order_total), 12) OVER (\n    ORDER BY DATE_TRUNC('month', order_date)\n  ) AS prev_year_revenue\nFROM orders\nWHERE order_date BETWEEN '2025-01-01' \n  AND '2025-12-31'\n  AND order_status = 'completed'\nGROUP BY DATE_TRUNC('month', order_date)\nORDER BY month;",
  ecom_category: "-- Category performance with YoY growth\nWITH current_year AS (\n  SELECT p.category,\n    SUM(oi.quantity * oi.unit_price) AS revenue\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.product_id\n  JOIN orders o ON oi.order_id = o.order_id\n  WHERE o.order_date >= '2025-01-01'\n    AND o.order_status = 'completed'\n  GROUP BY p.category\n),\nprior_year AS (\n  SELECT p.category,\n    SUM(oi.quantity * oi.unit_price) AS revenue\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.product_id\n  JOIN orders o ON oi.order_id = o.order_id\n  WHERE o.order_date\n    BETWEEN '2024-01-01' AND '2024-12-31'\n  GROUP BY p.category\n)\nSELECT cy.category, cy.revenue,\n  ROUND((cy.revenue - py.revenue)\n    / py.revenue * 100, 1) AS yoy_growth\nFROM current_year cy\nJOIN prior_year py\n  ON cy.category = py.category\nORDER BY cy.revenue DESC;",
  ecom_segments: "-- Customer segmentation by frequency\nWITH purchase_counts AS (\n  SELECT customer_id,\n    COUNT(*) AS total_orders,\n    AVG(order_total) AS avg_spend\n  FROM orders\n  WHERE order_status = 'completed'\n  GROUP BY customer_id\n)\nSELECT \n  CASE \n    WHEN total_orders = 1\n      THEN 'New Customers'\n    WHEN total_orders BETWEEN 2 AND 5\n      THEN 'Returning (2-5)'\n    WHEN total_orders BETWEEN 6 AND 15\n      THEN 'Loyal (6-15)'\n    ELSE 'VIP (16+)'\n  END AS segment,\n  COUNT(*) AS customer_count,\n  ROUND(AVG(avg_spend), 2) AS avg_order_value\nFROM purchase_counts\nGROUP BY segment\nORDER BY customer_count DESC;",
  fuel_margin: "-- Daily margin analysis by station\nWITH landed AS (\n  SELECT ft.transaction_date, ft.station_id,\n    s.station_name, s.market, ft.fuel_type,\n    ft.retail_price, fp.rack_price,\n    (fp.rack_price + tr.state_tax\n     + tr.federal_tax + tr.local_tax\n     + 0.08) AS landed_cost\n  FROM fuel_transactions ft\n  JOIN stations s\n    ON ft.station_id = s.station_id\n  JOIN fuel_prices fp\n    ON fp.market = s.market\n    AND fp.fuel_type = ft.fuel_type\n    AND fp.price_date = ft.transaction_date\n  JOIN tax_rates tr ON tr.state = s.state\n)\nSELECT station_name, market,\n  AVG(retail_price - landed_cost)\n    AS avg_margin,\n  CASE \n    WHEN AVG(retail_price - landed_cost)\n      < 0.30 THEN 'Review'\n    ELSE 'OK'\n  END AS margin_flag\nFROM landed\nWHERE fuel_type = 'Regular'\nGROUP BY station_name, market\nORDER BY avg_margin DESC;",
  fuel_comp: "-- Competitive position vs nearby stations\nWITH comp_avg AS (\n  SELECT station_id,\n    AVG(regular_price) AS avg_comp\n  FROM competitor_prices\n  GROUP BY station_id\n),\nstation_retail AS (\n  SELECT station_id,\n    AVG(retail_price) AS avg_retail\n  FROM fuel_transactions\n  WHERE fuel_type = 'Regular'\n  GROUP BY station_id\n)\nSELECT s.station_name,\n  sr.avg_retail, ca.avg_comp,\n  (sr.avg_retail - ca.avg_comp) AS gap,\n  CASE \n    WHEN sr.avg_retail - ca.avg_comp > 0.03\n      THEN 'Above Market'\n    WHEN sr.avg_retail - ca.avg_comp < -0.03\n      THEN 'Below Market'\n    ELSE 'Competitive'\n  END AS position\nFROM stations s\nJOIN station_retail sr\n  ON s.station_id = sr.station_id\nJOIN comp_avg ca\n  ON s.station_id = ca.station_id;",
  fuel_trend: "-- Week-over-week rack price volatility\nSELECT market, fuel_type,\n  rack_price,\n  LAG(rack_price) OVER (\n    PARTITION BY market, fuel_type\n    ORDER BY price_date\n  ) AS prev_day,\n  rack_price - LAG(rack_price) OVER (\n    PARTITION BY market, fuel_type\n    ORDER BY price_date\n  ) AS daily_change\nFROM fuel_prices\nWHERE fuel_type = 'Regular'\nORDER BY market, price_date;",
  qco_error: "-- Error classification by product category\nSELECT product_category,\n  COUNT(*) AS total_errors,\n  ROUND(COUNT(*) * 100.0\n    / SUM(COUNT(*)) OVER (), 1) AS pct,\n  MODE() WITHIN GROUP\n    (ORDER BY root_cause) AS top_cause\nFROM validation_errors\nWHERE error_type = 'misclassification'\n  AND review_date BETWEEN '2025-06-01'\n    AND '2025-08-31'\nGROUP BY product_category\nORDER BY total_errors DESC;",
  qco_trend: "-- Weekly accuracy trend pre/post fix\nSELECT DATE_TRUNC('week', review_date) AS wk,\n  COUNT(CASE WHEN classification_correct\n    THEN 1 END) * 100.0\n    / COUNT(*) AS accuracy_pct,\n  COUNT(*) AS total_cases\nFROM qco_validations\nWHERE review_date BETWEEN '2025-05-01'\n  AND '2025-10-31'\nGROUP BY DATE_TRUNC('week', review_date)\nORDER BY wk;",
};

const skills = [
  { name: "SQL / NRQL", level: 82 }, { name: "Excel", level: 85 },
  { name: "Databricks / Spark SQL", level: 60 }, { name: "Tableau", level: 55 },
  { name: "New Relic", level: 90 }, { name: "Angular / TypeScript", level: 70 },
  { name: "Data Visualization", level: 78 }, { name: "Python", level: 45 },
];

function KPICard({ label, value, sub, color }) {
  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "20px 24px", flex: "1 1 180px", borderTop: `3px solid ${color || COLORS.accent}` }}>
      <div style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.text, fontFamily: "'JetBrains Mono', monospace" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: color || COLORS.green, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function BarChart({ data, dataKey, label, color, maxVal, prefix = "" }) {
  const max = maxVal || Math.max(...data.map(d => d[dataKey]));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && <div style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>}
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 50, fontSize: 11, color: COLORS.textMuted, textAlign: "right", flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" }}>{d.month || d.week || d.name?.slice(0, 8) || d.day}</div>
          <div style={{ flex: 1, background: COLORS.bg, borderRadius: 4, height: 20, overflow: "hidden" }}>
            <div style={{ width: `${(d[dataKey] / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6, fontSize: 10, color: "#fff", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
              {d[dataKey] >= max * 0.2 ? `${prefix}${typeof d[dataKey] === "number" && d[dataKey] > 1000 ? `${(d[dataKey] / 1000).toFixed(0)}K` : d[dataKey]}` : ""}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ code, title }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ background: "#0D1117", border: `1px solid ${COLORS.border}`, borderRadius: 10, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", borderBottom: `1px solid ${COLORS.border}`, background: "#161B22" }}>
        <span style={{ fontSize: 13, color: COLORS.accent, fontWeight: 600 }}>{title}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          style={{ background: "none", border: `1px solid ${COLORS.border}`, color: COLORS.textMuted, fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer" }}>{copied ? "Copied" : "Copy"}</button>
      </div>
      <pre style={{ padding: 16, margin: 0, fontSize: 12, lineHeight: 1.6, overflowX: "auto", color: "#C9D1D9", fontFamily: "'JetBrains Mono', Consolas, monospace" }}>{code}</pre>
    </div>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr>{headers.map((h, i) => (
          <th key={i} style={{ padding: "10px 12px", textAlign: "left", color: COLORS.textDim, borderBottom: `2px solid ${COLORS.border}`, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
        ))}</tr></thead>
        <tbody>{rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : COLORS.bg }}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: "9px 12px", color: COLORS.text, borderBottom: `1px solid ${COLORS.border}`, fontFamily: j > 0 ? "'JetBrains Mono', monospace" : "inherit", fontSize: 12 }}>{cell}</td>
            ))}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function SectionCard({ children, style: s }) {
  return <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24, marginBottom: 24, ...s }}>{children}</div>;
}

function FindingItem({ icon, title, desc, color }) {
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: `${color || COLORS.accent}15`, border: `1px solid ${color || COLORS.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: color || COLORS.accent, fontWeight: 700, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{icon}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

function RecItem({ title, desc, est, color }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 3 }}>{title}</div>
      <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>{desc}</div>
      <div style={{ fontSize: 12, color: color || COLORS.green, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>{est}</div>
    </div>
  );
}

function EcommerceStudy() {
  const [q, setQ] = useState("ecom_revenue");
  return (<div>
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 12, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>Case Study 01</div>
      <h2 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 12px" }}>E-Commerce Sales Performance Analysis</h2>
      <p style={{ fontSize: 14, color: COLORS.textMuted, maxWidth: 700, lineHeight: 1.6 }}>Analyzed 12 months of transaction data for an online retailer to identify revenue drivers, underperforming categories, and high-value customer segments. Built actionable recommendations projecting a 14% revenue increase.</p>
      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        {["SQL", "Databricks", "Excel", "Data Visualization"].map(t => (<span key={t} style={{ background: COLORS.accentGlow, border: `1px solid ${COLORS.accent}33`, color: COLORS.accent, padding: "4px 12px", borderRadius: 6, fontSize: 11, fontWeight: 500 }}>{t}</span>))}
      </div>
    </div>
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
      <KPICard label="Annual Revenue" value="$2.42M" sub="+18.3% YoY" color={COLORS.green} />
      <KPICard label="Total Orders" value="29,573" sub="+22.1% YoY" color={COLORS.accent} />
      <KPICard label="Avg Order Value" value="$78.84" sub="+3.2% YoY" color={COLORS.purple} />
      <KPICard label="Retention" value="42.7%" sub="Target: 50%" color={COLORS.amber} />
    </div>
    <SectionCard><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 18 }}>Monthly Revenue Trend</h3><BarChart data={ecommerceData.monthlyRevenue} dataKey="revenue" color={COLORS.accent} prefix="$" /></SectionCard>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
      <SectionCard style={{ marginBottom: 0 }}><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>Category Performance</h3>
        <DataTable headers={["Category", "Revenue", "Share", "YoY"]} rows={ecommerceData.categoryPerf.map(c => [c.name, `$${(c.revenue/1000).toFixed(0)}K`, `${c.pct}%`, <span style={{ color: c.growth > 0 ? COLORS.green : COLORS.red }}>{c.growth > 0 ? "+" : ""}{c.growth}%</span>])} /></SectionCard>
      <SectionCard style={{ marginBottom: 0 }}><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>Customer Segments</h3>
        <DataTable headers={["Segment", "Count", "Avg Spend", "Retention"]} rows={ecommerceData.customerSegments.map(s => [s.segment, s.count.toLocaleString(), `$${s.avgSpend.toFixed(2)}`, s.retention])} /></SectionCard>
    </div>
    <SectionCard><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>SQL Analysis</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {[{id:"ecom_revenue",label:"Revenue Trend"},{id:"ecom_category",label:"Category Analysis"},{id:"ecom_segments",label:"Customer Segments"}].map(x => (
          <button key={x.id} onClick={() => setQ(x.id)} style={{ background: q===x.id ? COLORS.accent : "transparent", border: `1px solid ${q===x.id ? COLORS.accent : COLORS.border}`, color: q===x.id ? "#fff" : COLORS.textMuted, padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>{x.label}</button>))}
      </div>
      <CodeBlock code={sqlQueries[q]} title={`${q}.sql`} /></SectionCard>
    <SectionCard><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>Key Findings</h3>
      <FindingItem icon="1" title="Q4 drives 42% of annual growth" desc="November and December saw 38% and 51% increases over the monthly average, driven by promotional pricing and gift purchasing." />
      <FindingItem icon="2" title="Beauty is the fastest-growing category" desc="Despite being only 10.2% of revenue, Beauty grew 22.4% YoY. Home & Garden followed at 15.2%." />
      <FindingItem icon="3" title="VIP customers (3.8%) generate outsized value" desc="1,247 VIP customers average $168.90 per order with 89% retention. Each VIP is worth roughly $2,700 annually." />
      <FindingItem icon="4" title="Sports and Books are declining" desc="Sports dropped 2.1% and Books fell 5.8% YoY with high return rates and low repeat purchase rates." /></SectionCard>
    <div style={{ background: `linear-gradient(135deg, ${COLORS.accent}11, ${COLORS.purple}11)`, border: `1px solid ${COLORS.accent}33`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14, color: COLORS.accent }}>Recommendations</h3>
      <RecItem title="Invest in VIP retention programs" desc="A 10% increase in VIP retention could add $340K annually through tiered loyalty with early access and free shipping." est="Projected impact: +$340K/year" />
      <RecItem title="Scale Beauty category marketing" desc="Fastest-growing category with strong margins. 20% acquisition increase could capture additional share." est="Projected impact: +$55K/quarter" />
      <RecItem title="Re-evaluate Sports and Books" desc="Both declining with high return rates. A/B test curated bundles and exit underperforming SKUs." est="Projected savings: $42K/year" />
      <RecItem title="Extend Q4 promos into Q1" desc="The Dec-to-Jan drop ($312K to $142K) is lost momentum. A January clearance could smooth revenue." est="Projected impact: +$85K in Q1" />
    </div>
  </div>);
}

function FuelStudy() {
  const [q, setQ] = useState("fuel_margin");
  return (<div>
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 12, color: COLORS.green, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>Case Study 02</div>
      <h2 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 12px" }}>Fuel Pricing Margin Optimization</h2>
      <p style={{ fontSize: 14, color: COLORS.textMuted, maxWidth: 700, lineHeight: 1.6 }}>Analyzed 7 days of fuel pricing data across 10 stations in 5 markets to identify margin compression, competitive gaps, and rack price volatility. Flagged 5 stations for pricing review and modeled adjustment impacts.</p>
      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        {["Spark SQL", "Databricks", "Excel", "OPIS Concepts", "Elasticity Modeling"].map(t => (<span key={t} style={{ background: `${COLORS.green}15`, border: `1px solid ${COLORS.green}33`, color: COLORS.green, padding: "4px 12px", borderRadius: 6, fontSize: 11, fontWeight: 500 }}>{t}</span>))}
      </div>
    </div>
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
      <KPICard label="Stations Analyzed" value="10" color={COLORS.green} />
      <KPICard label="Avg Margin/Gal" value="$0.285" sub="Target: $0.30+" color={COLORS.amber} />
      <KPICard label="Flagged for Review" value="5" sub="Below $0.28/gal" color={COLORS.red} />
      <KPICard label="Weekly Gallons" value="265K" color={COLORS.teal} />
    </div>
    <SectionCard><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>Market Comparison</h3>
      <DataTable headers={["Market", "Avg Rack", "Avg Retail", "Total Tax", "Margin/Gal"]} rows={fuelData.marketRack.map(m => [m.name, `$${m.rack.toFixed(3)}`, `$${m.retail.toFixed(3)}`, `$${m.tax.toFixed(3)}`, <span style={{ color: m.margin >= 0.30 ? COLORS.green : m.margin >= 0.27 ? COLORS.amber : COLORS.red, fontWeight: 600 }}>${m.margin.toFixed(3)}</span>])} /></SectionCard>
    <SectionCard><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>Station Performance</h3>
      <DataTable headers={["Station", "Market", "Gallons", "Margin/Gal", "Status"]} rows={fuelData.stationPerf.map(s => [s.station, s.market, s.gallons.toLocaleString(), `$${s.margin.toFixed(3)}`, <span style={{ background: s.flag==="OK" ? `${COLORS.green}22` : `${COLORS.red}22`, color: s.flag==="OK" ? COLORS.green : COLORS.red, padding: "2px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{s.flag}</span>])} /></SectionCard>
    <SectionCard><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>Regular Rack Price: 7-Day Trend</h3>
      <DataTable headers={["Date", "Los Angeles", "Las Vegas", "Phoenix", "Dallas"]} rows={fuelData.weeklyTrend.map(d => [d.day, `$${d.la.toFixed(3)}`, `$${d.lv.toFixed(3)}`, `$${d.phx.toFixed(3)}`, `$${d.dal.toFixed(3)}`])} /></SectionCard>
    <SectionCard><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>SQL Analysis</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {[{id:"fuel_margin",label:"Margin Analysis"},{id:"fuel_comp",label:"Competitive Position"},{id:"fuel_trend",label:"Price Volatility"}].map(x => (
          <button key={x.id} onClick={() => setQ(x.id)} style={{ background: q===x.id ? COLORS.green : "transparent", border: `1px solid ${q===x.id ? COLORS.green : COLORS.border}`, color: q===x.id ? "#fff" : COLORS.textMuted, padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>{x.label}</button>))}
      </div>
      <CodeBlock code={sqlQueries[q]} title={`${q}.sql`} /></SectionCard>
    <SectionCard><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>Key Findings</h3>
      <FindingItem icon="1" title="5 of 10 stations below target margin" desc="Henderson ($0.259), LA Harbor ($0.269), San Diego South ($0.271), LA Central ($0.278), and Vegas Strip ($0.268) all under the $0.30 target. California's high tax ($0.539/gal) is the primary compressor." color={COLORS.green} />
      <FindingItem icon="2" title="Phoenix has the healthiest margins" desc="All three Phoenix stations exceed $0.30/gal despite lower retail prices because Arizona's total tax ($0.394) is 47% lower than California's ($0.743)." color={COLORS.green} />
      <FindingItem icon="3" title="Mid-week rack spike not reflected in retail" desc="All markets saw rack peak on April 4-5 before pulling back. Stations that didn't adjust retail upward absorbed the cost in margin." color={COLORS.green} />
      <FindingItem icon="4" title="Irving Central outperforms on volume and margin" desc="Highest Dallas volume (30,686 gal/week) with $0.293 margin. Could sustain a 1-2 cent increase without significant volume loss." color={COLORS.green} /></SectionCard>
    <div style={{ background: `linear-gradient(135deg, ${COLORS.green}11, ${COLORS.teal}11)`, border: `1px solid ${COLORS.green}33`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14, color: COLORS.green }}>Recommendations</h3>
      <RecItem title="Raise retail 1-2 cents at Irving Central and Scottsdale" desc="Both have strong volume indexes and margins near target. A 1-cent increase on 4,300 daily gallons adds ~$43/day with minimal volume loss." est="Projected impact: +$300/week per station" color={COLORS.green} />
      <RecItem title="Monitor California stations for competitive gap" desc="CA stations are margin-compressed by taxes. Hold during rack spikes if competitors hold. Follow within 24 hours if competitors raise first." est="Risk mitigation: prevents $0.02-0.03 margin erosion" color={COLORS.green} />
      <RecItem title="Implement daily rack price alerts" desc="Mid-week spike was not reflected in retail at 3 stations. Automated alerts when rack moves >$0.015 would trigger pricing review." est="Projected savings: $180/week across flagged stations" color={COLORS.green} />
      <RecItem title="Evaluate Henderson for promotional pricing" desc="Lowest volume and margin. A 3-cent drop with -1.2 elasticity could increase volume 4.3%, generating more c-store foot traffic." est="Potential: +140 gallons/day, +$420/week c-store revenue" color={COLORS.green} />
    </div>
  </div>);
}

function QCOStudy() {
  const [q, setQ] = useState("qco_error");
  return (<div>
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 12, color: COLORS.purple, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>Case Study 03</div>
      <h2 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 12px" }}>Retail Data Quality: CV Classification Accuracy</h2>
      <p style={{ fontSize: 14, color: COLORS.textMuted, maxWidth: 700, lineHeight: 1.6 }}>As sole operator of a computer vision validation system processing 1,000+ cases/week, I identified systematic misclassification caused by training data bias. Remediation reduced the error rate by 64.9% across multiple product categories.</p>
      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        {["Data Validation", "Root Cause Analysis", "S3 / Image Data", "Cross-Team Coordination", "Store Operations"].map(t => (<span key={t} style={{ background: `${COLORS.purple}15`, border: `1px solid ${COLORS.purple}33`, color: COLORS.purple, padding: "4px 12px", borderRadius: 6, fontSize: 11, fontWeight: 500 }}>{t}</span>))}
      </div>
    </div>
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
      <KPICard label="Weekly Cases" value="1,000+" color={COLORS.purple} />
      <KPICard label="Error Rate (Before)" value="14.8%" sub="148 errors/week" color={COLORS.red} />
      <KPICard label="Error Rate (After)" value="5.2%" sub="52 errors/week" color={COLORS.green} />
      <KPICard label="Reduction" value="64.9%" sub="96 fewer errors/week" color={COLORS.purple} />
    </div>
    <SectionCard><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 18 }}>Weekly Classification Accuracy (12-Week Window)</h3>
      <BarChart data={qcoData.weeklyAccuracy} dataKey="accuracy" color={COLORS.purple} maxVal={100} />
      <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
        <div style={{ fontSize: 11, color: COLORS.textDim }}>Weeks 1-4: Baseline</div>
        <div style={{ fontSize: 11, color: COLORS.amber }}>Weeks 5-7: Degradation detected</div>
        <div style={{ fontSize: 11, color: COLORS.green }}>Weeks 8-12: Post-remediation</div>
      </div></SectionCard>
    <SectionCard><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>Error Distribution by Category</h3>
      <DataTable headers={["Category", "Errors", "% of Total", "Root Cause"]} rows={qcoData.errorBreakdown.map(e => [e.category, e.errors.toString(), `${e.pct}%`, e.rootCause])} /></SectionCard>
    <SectionCard><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>SQL Analysis</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[{id:"qco_error",label:"Error Classification"},{id:"qco_trend",label:"Accuracy Trend"}].map(x => (
          <button key={x.id} onClick={() => setQ(x.id)} style={{ background: q===x.id ? COLORS.purple : "transparent", border: `1px solid ${q===x.id ? COLORS.purple : COLORS.border}`, color: q===x.id ? "#fff" : COLORS.textMuted, padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>{x.label}</button>))}
      </div>
      <CodeBlock code={sqlQueries[q]} title={`${q}.sql`} /></SectionCard>
    <SectionCard><h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>Investigation Process</h3>
      <FindingItem icon="1" title="Pattern detected: cup sizes consistently misclassified" desc="Extra large cups reading as mediums across multiple stores. Systematic pattern indicated a model-level issue, not store-level." color={COLORS.purple} />
      <FindingItem icon="2" title="Root cause: training data color bias" desc="S3 image database revealed extra large training photos predominantly featured Mountain Dew (green liquid in clear cups). Model associated green color with extra large, causing misreads with other drinks." color={COLORS.purple} />
      <FindingItem icon="3" title="Remediation: diversified training images" desc="Deleted biased images from S3. Visited partner stores to photograph all cup sizes with multiple drink colors at various fill levels. Submitted 200+ new training images." color={COLORS.purple} />
      <FindingItem icon="4" title="Methodology scaled to other categories" desc="Applied the same training data audit to Hot Food and Snack Bag categories. Identified similar single-variable bias patterns and remediated each with diversified image sets." color={COLORS.purple} /></SectionCard>
    <div style={{ background: `linear-gradient(135deg, ${COLORS.purple}11, ${COLORS.accent}11)`, border: `1px solid ${COLORS.purple}33`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14, color: COLORS.purple }}>Impact</h3>
      <RecItem title="Customer experience improvement" desc="96 fewer misclassified items per week means fewer checkout friction points for store employees and customers." est="Impact: ~5,000 fewer errors annually" color={COLORS.purple} />
      <RecItem title="Scalable methodology established" desc="Training data audit framework applied to 4 additional categories. Systematic input diversification became standard practice." est="Process improvement across 5+ categories" color={COLORS.purple} />
      <RecItem title="Cross-functional collaboration model" desc="Fix required data validation, back-end engineering, and in-store operations. This workflow became the template for future accuracy improvements." est="Reduced future remediation time by ~40%" color={COLORS.purple} />
    </div>
  </div>);
}

export default function Portfolio() {
  const [section, setSection] = useState("about");
  const [caseStudy, setCaseStudy] = useState(0);
  const navItems = [{id:"about",label:"About"},{id:"case-studies",label:"Case Studies"},{id:"skills",label:"Skills"},{id:"contact",label:"Contact"}];
  const caseStudies = [{title:"E-Commerce Sales",color:COLORS.accent,component:<EcommerceStudy />},{title:"Fuel Pricing",color:COLORS.green,component:<FuelStudy />},{title:"Retail Data Quality",color:COLORS.purple,component:<QCOStudy />}];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'Outfit', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: `${COLORS.bg}ee`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${COLORS.border}`, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.accent, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer" }} onClick={() => setSection("about")}>MM<span style={{ color: COLORS.textDim }}>.</span>analytics</div>
        <div style={{ display: "flex", gap: 4 }}>
          {navItems.map(item => (<button key={item.id} onClick={() => setSection(item.id)} style={{ background: section===item.id ? COLORS.accentGlow : "transparent", border: section===item.id ? `1px solid ${COLORS.accent}44` : "1px solid transparent", color: section===item.id ? COLORS.accent : COLORS.textMuted, padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>{item.label}</button>))}
        </div>
      </nav>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        {section === "about" && (<div>
          <div style={{ padding: "56px 0 36px", borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 12, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>Data Analyst</div>
            <h1 style={{ fontSize: 44, fontWeight: 700, margin: "0 0 14px", lineHeight: 1.1 }}>Marquis<br />Muse-Amiel</h1>
            <p style={{ fontSize: 17, color: COLORS.textMuted, maxWidth: 640, lineHeight: 1.6, margin: 0 }}>Data analyst with 17 months embedded in 7-Eleven's R&D and SRE organization. I turn operational data into business decisions, build dashboards that drive action, and bridge the gap between technical teams and store-level operations.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
              {["Irving, TX", "B.A. Economics", "Google Data Analytics Cert", "Databricks Spark SQL Cert"].map(tag => (<span key={tag} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, padding: "5px 14px", borderRadius: 20, fontSize: 12, color: COLORS.textMuted }}>{tag}</span>))}
            </div>
          </div>
          <div style={{ padding: "36px 0" }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Experience</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {role:"Data Analyst / Frontend Developer",company:"7-Eleven (via The Intersect Group)",period:"Oct 2024 - Mar 2026",location:"Irving, TX",bullets:["Sole operator of QCO computer vision data validation system: 1,000+ cases/week across DFW stores","Built NRQL-powered dashboards in New Relic for device health, product accuracy, and transaction monitoring","Resolved ServiceNow tickets through cross-team coordination with engineering, field ops, and store personnel","Contributed to Angular frontend projects (7GG, Slurpee UI) in NX monorepo with full Agile workflow"]},
                {role:"Partnership & Fundraising Manager",company:"Bay Valley Tech",period:"2022 - 2024",location:"Modesto, CA",bullets:["Secured $20K+ in strategic funding through data-driven partnership proposals","Standardized financial reporting with Excel and Salesforce for executive presentations","Transitioned from student to managerial role based on performance and initiative"]},
                {role:"Operations Manager",company:"Veterans R Moving Us",period:"2017 - 2023",location:"Modesto, CA",bullets:["Managed payroll, contracts, logistics, and pricing strategy for 6+ years","Set service pricing based on demand, distance, and competitive analysis","Coordinated team operations across multiple concurrent service contracts"]},
              ].map((exp, i) => (
                <SectionCard key={i} style={{ marginBottom: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                    <div><div style={{ fontSize: 15, fontWeight: 600 }}>{exp.role}</div><div style={{ fontSize: 13, color: COLORS.accent }}>{exp.company}</div></div>
                    <div style={{ textAlign: "right" }}><div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "'JetBrains Mono', monospace" }}>{exp.period}</div><div style={{ fontSize: 11, color: COLORS.textDim }}>{exp.location}</div></div>
                  </div>
                  {exp.bullets.map((b, j) => (<div key={j} style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6, paddingLeft: 14, position: "relative", marginBottom: 5 }}><span style={{ position: "absolute", left: 0, color: COLORS.accent }}>›</span> {b}</div>))}
                </SectionCard>))}
            </div>
          </div>
          <div style={{ paddingBottom: 36 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Case Studies</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {[{num:"01",title:"E-Commerce Sales Performance",desc:"Revenue drivers, customer segmentation, and category growth analysis",color:COLORS.accent,idx:0},{num:"02",title:"Fuel Pricing Margin Optimization",desc:"Multi-market margin analysis, competitive positioning, and pricing strategy",color:COLORS.green,idx:1},{num:"03",title:"Retail CV Data Quality",desc:"Misclassification root cause analysis and training data remediation",color:COLORS.purple,idx:2}].map(cs => (
                <div key={cs.num} onClick={() => {setSection("case-studies");setCaseStudy(cs.idx);}} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20, cursor: "pointer", borderTop: `3px solid ${cs.color}` }}>
                  <div style={{ fontSize: 11, color: cs.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>Case Study {cs.num}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{cs.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>{cs.desc}</div>
                  <div style={{ fontSize: 12, color: cs.color, marginTop: 12, fontWeight: 500 }}>View analysis →</div>
                </div>))}
            </div>
          </div>
        </div>)}

        {section === "case-studies" && (<div style={{ padding: "36px 0" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
            {caseStudies.map((cs, i) => (<button key={i} onClick={() => setCaseStudy(i)} style={{ background: caseStudy===i ? `${cs.color}15` : "transparent", border: `1px solid ${caseStudy===i ? cs.color+"44" : COLORS.border}`, color: caseStudy===i ? cs.color : COLORS.textMuted, padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>{cs.title}</button>))}
          </div>
          {caseStudies[caseStudy].component}
        </div>)}

        {section === "skills" && (<div style={{ padding: "36px 0" }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 28 }}>Skills & Tools</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <SectionCard style={{ marginBottom: 0 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 18 }}>Technical Proficiency</h3>
              {skills.map((s, i) => (<div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ fontSize: 13 }}>{s.name}</span><span style={{ fontSize: 11, color: COLORS.textDim, fontFamily: "'JetBrains Mono', monospace" }}>{s.level}%</span></div>
                <div style={{ background: COLORS.bg, borderRadius: 4, height: 7, overflow: "hidden" }}><div style={{ width: `${s.level}%`, height: "100%", borderRadius: 4, background: s.level >= 80 ? COLORS.green : s.level >= 60 ? COLORS.accent : COLORS.amber }} /></div>
              </div>))}
            </SectionCard>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <SectionCard style={{ marginBottom: 0 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>Certifications</h3>
                {[{name:"Google Data Analytics Professional Certificate",date:"Jul 2024",org:"Coursera"},{name:"Apache Spark SQL for Data Analysts",date:"Sep 2024",org:"Databricks / Coursera"}].map((c, i) => (
                  <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < 1 ? `1px solid ${COLORS.border}` : "none" }}><div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div><div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{c.org} — {c.date}</div></div>))}
              </SectionCard>
              <SectionCard style={{ marginBottom: 0 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>Domain Knowledge</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Fuel Pricing","Retail Analytics","Data Validation","Price Elasticity","Competitive Analysis","Supply Chain","Computer Vision QA","Agile / Scrum","SRE / Monitoring","Financial Reporting"].map(d => (<span key={d} style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, padding: "5px 12px", borderRadius: 6, fontSize: 11, color: COLORS.textMuted }}>{d}</span>))}
                </div>
              </SectionCard>
              <SectionCard style={{ marginBottom: 0 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginTop: 0, marginBottom: 14 }}>Education</h3>
                <div style={{ fontSize: 14, fontWeight: 500 }}>B.A. Economics</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 2 }}>California State University, Stanislaus</div>
              </SectionCard>
            </div>
          </div>
        </div>)}

        {section === "contact" && (<div style={{ padding: "72px 0", textAlign: "center" }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 10 }}>Get In Touch</h2>
          <p style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 36 }}>Open to data analyst, business analyst, and analytics engineer opportunities.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {[{label:"Email",value:"museamiel.marquis@gmail.com",href:"mailto:museamiel.marquis@gmail.com"},{label:"LinkedIn",value:"linkedin.com/in/marquis-muse-amiel",href:"https://linkedin.com/in/marquis-muse-amiel"},{label:"GitHub",value:"github.com/MarquisMuse",href:"https://github.com/MarquisMuse"}].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "18px 28px", textDecoration: "none", minWidth: 220 }}>
                <div style={{ fontSize: 11, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>{c.label}</div>
                <div style={{ fontSize: 13, color: COLORS.accent }}>{c.value}</div>
              </a>))}
          </div>
        </div>)}

        <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "20px 0", marginTop: 32, textAlign: "center" }}>
          <span style={{ fontSize: 11, color: COLORS.textDim }}>Marquis Muse-Amiel — Data Analyst Portfolio — 2026</span>
        </div>
      </div>
    </div>
  );
}
