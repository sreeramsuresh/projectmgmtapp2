// src/Components/PieChart.jsx
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const RADIAN = Math.PI / 180;

// Custom Pie chart component
const PieChart = ({
  data,
  width = 300,
  height = 300,
  title,
  innerRadius = 60,
  outerRadius = 110,
}) => {
  const theme = useTheme();
  const cx = width / 2;
  const cy = height / 2;

  // Calculate total value
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  // Function to calculate the coordinates on the circle
  const getCoordinatesForPercent = (percent) => {
    const x = cx + outerRadius * Math.cos(2 * Math.PI * percent);
    const y = cy + outerRadius * Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  // Render pie chart segments
  let cumulativePercent = 0;
  const segments = data.map((entry, index) => {
    const percent = entry.value / total;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;

    const [startX, startY] = getCoordinatesForPercent(startPercent);
    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

    // Determine if the arc should take the long path around
    const largeArcFlag = percent > 0.5 ? 1 : 0;

    // Create an SVG path
    const pathData = [
      `M ${cx} ${cy}`,
      `L ${startX} ${startY}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      "Z",
    ].join(" ");

    return {
      color: entry.color || theme.palette.primary.main,
      path: pathData,
      label: entry.name,
      value: entry.value,
      percent,
    };
  });

  // Create labels
  const labels = data.map((entry, index) => {
    const percent = entry.value / total;
    const middlePercent = cumulativePercent - percent / 2;
    const [labelX, labelY] = getCoordinatesForPercent(
      cumulativePercent - percent / 2
    );

    // Calculate label position
    const labelRadius = outerRadius + 20;
    const labelAngle = 2 * Math.PI * middlePercent - Math.PI / 2;
    const labelX2 = cx + labelRadius * Math.cos(labelAngle);
    const labelY2 = cy + labelRadius * Math.sin(labelAngle);

    return {
      x: labelX2,
      y: labelY2,
      text: entry.name,
      value: entry.value,
      percent,
      anchor: labelX2 > cx ? "start" : "end",
    };
  });

  return (
    <Box sx={{ width, height, position: "relative" }}>
      {title && (
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
      )}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g>
          {/* Draw pie segments */}
          {segments.map((segment, index) => (
            <path
              key={`segment-${index}`}
              d={segment.path}
              fill={segment.color}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}

          {/* Add inner white circle if innerRadius > 0 */}
          {innerRadius > 0 && (
            <circle cx={cx} cy={cy} r={innerRadius} fill="white" />
          )}

          {/* Add total in the center */}
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="18"
            fontWeight="bold"
          >
            {total}
          </text>
          <text
            x={cx}
            y={cy + 20}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
          >
            Total
          </text>

          {/* Add percentage labels */}
          {data.map((entry, index) => {
            const percent = Math.round((entry.value / total) * 100);
            const angle =
              2 * Math.PI * (cumulativePercent - entry.value / total / 2) -
              Math.PI / 2;
            const radius = (innerRadius + outerRadius) / 2;

            // Only show label if segment is large enough
            if (percent < 5) return null;

            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);

            return (
              <text
                key={`percent-${index}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill="white"
                fontWeight="bold"
              >
                {percent}%
              </text>
            );
          })}
        </g>

        {/* Legend */}
        <g transform={`translate(${width - 80}, 20)`}>
          {data.map((entry, index) => (
            <g
              key={`legend-${index}`}
              transform={`translate(0, ${index * 20})`}
            >
              <rect
                width={12}
                height={12}
                fill={entry.color || segments[index].color}
              />
              <text x={20} y={10} fontSize="12" textAnchor="start">
                {entry.name}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </Box>
  );
};

export default PieChart;
