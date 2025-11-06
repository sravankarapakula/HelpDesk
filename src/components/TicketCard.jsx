import React, { useState } from "react";
import { Clock, Check, X } from "lucide-react";

export default function TicketCard({
  ticket,
  isAdmin,
  onStatusUpdate,
  onAddResponse,
  getStatusColor,
  getPriorityColor,
}) {
  const [expanded, setExpanded] = useState(false);
  const [response, setResponse] = useState("");

  const handleAddResponse = () => {
    onAddResponse(ticket.id, response);
    setResponse("");
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-mono text-gray-500">#{ticket.id}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
              <span className={`text-sm font-semibold ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority} Priority
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{ticket.subject}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>📧 {ticket.email}</span>
              <span>👤 {ticket.name}</span>
              <span>🏷️ {ticket.category}</span>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>

        {expanded && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <p className="text-gray-600 whitespace-pre-wrap">{ticket.description}</p>

            {ticket.responses.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Responses:</h4>
                {ticket.responses.map((resp, idx) => (
                  <div key={idx} className="bg-blue-50 rounded-lg p-3 mb-2">
                    <div className="flex justify-between text-sm text-gray-700">
                      <strong>{resp.by}</strong>
                      <span>{new Date(resp.time).toLocaleString()}</span>
                    </div>
                    <p>{resp.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Admin-only Controls */}
            {isAdmin && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onStatusUpdate(ticket.id, "In Progress")}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                  >
                    <Clock className="inline mr-2" size={16} /> In Progress
                  </button>
                  <button
                    onClick={() => onStatusUpdate(ticket.id, "Resolved")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    <Check className="inline mr-2" size={16} /> Resolve
                  </button>
                  <button
                    onClick={() => onStatusUpdate(ticket.id, "Closed")}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                  >
                    <X className="inline mr-2" size={16} /> Close
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Add a response..."
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <button
                    onClick={handleAddResponse}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
