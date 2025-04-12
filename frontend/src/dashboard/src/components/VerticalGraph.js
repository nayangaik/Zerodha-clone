import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Holdings',
      font: {
        size: 16 // Title font size
      }
    },
    tooltip: { // Customize tooltips on hover
        callbacks: {
            label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    // Format as currency or number
                    label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed.y);
                }
                return label;
            }
        }
    },

    scales: { // Customize axes
        y: {
          beginAtZero: true, // Start Y-axis at 0
          ticks: {
            // Optional: Format Y-axis labels as currency
            callback: function(value, index, values) {
                return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
            }
          }
        },
        x: {
            ticks: {
                maxRotation: 45, // Rotate labels if they overlap
                minRotation: 0
            }
        }
      }
    
  },


};


// Make sure the component accepts 'data' as a prop
export default function VerticalGraph({ data }) {
    // Add a check for valid data structure before rendering
    if (!data || !data.labels || !data.datasets) {
        // Optionally render a placeholder or null if data isn't ready
        return <div>Loading chart data...</div>;
    }
    // Pass the received data and options to the Bar component
    return <Bar options={options} data={data} style={{marginTop:"3em"}} />;
}

