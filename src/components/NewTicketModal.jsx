import React from 'react';
import { X } from 'lucide-react';

export default function NewTicketModal({ newTicket, setNewTicket, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex justify-between items-center">
          <h3 className="text-2xl font-bold">Create New Ticket</h3>
          <button onClick={onClose} className="hover:bg-blue-500 p-2 rounded">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={newTicket.name}
              onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
              className="border p-2 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={newTicket.email}
              onChange={(e) => setNewTicket({ ...newTicket, email: e.target.value })}
              className="border p-2 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={newTicket.category}
              onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
              className="border p-2 rounded-lg"
            >
              <option>Technical</option>
              <option>Network</option>
              <option>Software</option>
              <option>Hardware</option>
              <option>Campus Services</option>
              <option>Other</option>
            </select>
            <select
              value={newTicket.priority}
              onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
              className="border p-2 rounded-lg"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Subject"
            value={newTicket.subject}
            onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
            className="border p-2 rounded-lg w-full"
          />

          <textarea
            placeholder="Description"
            rows={6}
            value={newTicket.description}
            onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
            className="border p-2 rounded-lg w-full"
          />

          <button
            onClick={onSubmit}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
