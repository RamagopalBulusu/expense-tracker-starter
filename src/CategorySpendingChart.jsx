import { PieChart, Pie, Sector, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CATEGORY_COLORS = {
  food: "#eb6834",
  housing: "#2a78d6",
  utilities: "#1baf7a",
  transport: "#eda100",
  entertainment: "#e87ba4",
  salary: "#008300",
  other: "#4a3aa7",
}

const formatCurrency = (value) =>
  `$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1)

// Reads the per-slice color off the datum so it stays in sync with the legend/tooltip.
function CategorySlice({ payload, ...props }) {
  return <Sector {...props} fill={payload.fill} />
}

function CategoryTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null

  const { category, amount, percent, fill } = payload[0].payload
  return (
    <div className="category-tooltip">
      <span className="category-tooltip-key" style={{ borderColor: fill }} />
      <span className="category-tooltip-value">{formatCurrency(amount)}</span>
      <span className="category-tooltip-label">
        {capitalize(category)} · {Math.round(percent * 100)}%
      </span>
    </div>
  )
}

function CategoryLegend({ payload }) {
  return (
    <ul className="category-legend">
      {payload.map((entry) => (
        <li key={entry.value} className="category-legend-item">
          <span className="category-legend-key" style={{ background: entry.color }} />
          <span className="category-legend-label">{capitalize(entry.value)}</span>
          <span className="category-legend-value">{formatCurrency(entry.payload.amount)}</span>
        </li>
      ))}
    </ul>
  )
}

function CategorySpendingChart({ transactions, categories }) {
  const rawData = categories
    .map((category) => ({
      category,
      amount: transactions
        .filter((t) => t.type === "expense" && t.category === category)
        .reduce((sum, t) => sum + Number(t.amount), 0),
      fill: CATEGORY_COLORS[category] ?? CATEGORY_COLORS.other,
    }))
    .filter((entry) => entry.amount > 0)
    .sort((a, b) => b.amount - a.amount)

  const total = rawData.reduce((sum, entry) => sum + entry.amount, 0)
  const data = rawData.map((entry) => ({ ...entry, percent: total > 0 ? entry.amount / total : 0 }))

  if (data.length === 0) {
    return (
      <div className="category-chart">
        <h2>Spending by Category</h2>
        <p className="category-chart-empty">No expenses yet.</p>
      </div>
    )
  }

  return (
    <div className="category-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={110}
            paddingAngle={2}
            shape={<CategorySlice />}
            isAnimationActive={false}
          />
          <Tooltip content={<CategoryTooltip />} />
          <Legend content={<CategoryLegend />} layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CategorySpendingChart
