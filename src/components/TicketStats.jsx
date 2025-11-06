import React from 'react';

export default function TicketStats({ tickets }) {
  const stats = [
    { label: 'Open', count: tickets.filter(t => t.status === 'Open').length, cls: 'border-blue-600' },
    { label: 'In Progress', count: tickets.filter(t => t.status === 'In Progress').length, cls: 'border-yellow-600' },
    { label: 'Resolved', count: tickets.filter(t => t.status === 'Resolved').length, cls: 'border-green-600' },
    { label: 'Total', count: tickets.length, cls: 'border-gray-600' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map(stat => (
        <div key={stat.label} className={`bg-white rounded-lg p-4 border-l-4 ${stat.cls} shadow`}>
          <div className="text-2xl font-bold text-gray-800">{stat.count}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
