import React, { useState, useEffect } from "react";
import { Search, Plus, AlertCircle } from "lucide-react";
import TicketCard from "../components/TicketCard";
import TicketStats from "../components/TicketStats";
import NewTicketModal from "../components/NewTicketModal";

export default function Helpdesk({ isAdmin }) {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewTicket, setShowNewTicket] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("snu_tickets") || "[]");
    setTickets(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("snu_tickets", JSON.stringify(tickets));
  }, [tickets]);

  const [newTicket, setNewTicket] = useState({
    name: "",
    email: "",
    category: "Technical",
    priority: "Medium",
    subject: "",
    description: "",
  });

  const createTicket = () => {
    if (!newTicket.name || !newTicket.email || !newTicket.subject || !newTicket.description) {
      alert("Please fill all fields");
      return;
    }

    const ticket = {
      id: Date.now(),
      ...newTicket,
      status: "Open",
      createdAt: new Date().toISOString(),
      responses: [],
    };
    setTickets([ticket, ...tickets]);
    setShowNewTicket(false);
    setNewTicket({
      name: "",
      email: "",
      category: "Technical",
      priority: "Medium",
      subject: "",
      description: "",
    });
  };

  const updateTicketStatus = (id, status) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status } : t));
  };

  const addResponse = (id, response) => {
    if (!response.trim()) return;
    setTickets(tickets.map(t =>
      t.id === id
        ? { ...t, responses: [...t.responses, { text: response, time: new Date().toISOString(), by: "Admin" }] }
        : t
    ));
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesFilter = filter === "all" || ticket.status.toLowerCase() === filter;
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-600";
      case "Medium": return "text-yellow-600";
      case "Low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          {/* Only students see the new ticket button */}
          {!isAdmin && (
            <button
              onClick={() => setShowNewTicket(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              <span>New Ticket</span>
            </button>
          )}
        </div>
      </div>

      <TicketStats tickets={tickets} />

      {/* Ticket List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow">
            <AlertCircle className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600">No tickets found</p>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              isAdmin={isAdmin}
              onStatusUpdate={updateTicketStatus}
              onAddResponse={addResponse}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
            />
          ))
        )}
      </div>

      {/* New Ticket Modal — only for students */}
      {!isAdmin && showNewTicket && (
        <NewTicketModal
          newTicket={newTicket}
          setNewTicket={setNewTicket}
          onSubmit={createTicket}
          onClose={() => setShowNewTicket(false)}
        />
      )}
    </div>
  );
}
