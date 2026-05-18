const StockChart = ({ data, positive }) => {
  const W = 120;
  const H = 40;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data
    .map(
      (v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * H}`,
    )
    .join(" ");

  const col = positive ? "#00d68f" : "#ff4d6d";

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <polyline
        points={pts}
        fill="none"
        stroke={col}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle
        cx={((data.length - 1) / (data.length - 1)) * W}
        cy={H - ((data[data.length - 1] - min) / range) * H}
        r="2"
        fill={col}
      />
    </svg>
  );
};

export default StockChart;
