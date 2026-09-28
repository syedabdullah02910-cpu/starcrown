'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaHome, 
  FaClipboardList, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaCheck,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';

type RequestStatus = 'pending' | 'quoted' | 'booked' | 'contacted';

interface QuoteRequest {
  id: number;
  requestId: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  status: RequestStatus;
}

const initialMockData: QuoteRequest[] = [
  { id: 1, requestId: "SR-123456", name: "Ahmed Ali", phone: "03001234567", service: "Umrah Packages", date: "2026-08-10", status: "pending" },
  { id: 2, requestId: "SR-123457", name: "Fatima Khan", phone: "03009876543", service: "Air Ticketing", date: "2026-08-09", status: "quoted" },
  { id: 3, requestId: "SR-123458", name: "Hassan Ahmed", phone: "03115551234", service: "Tourism Packages", date: "2026-08-08", status: "booked" },
  { id: 4, requestId: "SR-123459", name: "Aisha Malik", phone: "03201234567", service: "Travel Insurance", date: "2026-08-07", status: "pending" },
  { id: 5, requestId: "SR-123460", name: "Ali Hassan", phone: "03021234567", service: "Umrah Packages", date: "2026-08-06", status: "quoted" },
  { id: 6, requestId: "SR-123461", name: "Zainab Khan", phone: "03311234567", service: "Air Ticketing", date: "2026-08-05", status: "booked" },
  { id: 7, requestId: "SR-123462", name: "Muhammad Ali", phone: "03041234567", service: "Tourism Packages", date: "2026-08-04", status: "contacted" },
  { id: 8, requestId: "SR-123463", name: "Sana Ahmed", phone: "03215551234", service: "Umrah Packages", date: "2026-08-03", status: "pending" },
  { id: 9, requestId: "SR-123464", name: "Karim Hassan", phone: "03051234567", service: "Travel Insurance", date: "2026-08-02", status: "quoted" },
  { id: 10, requestId: "SR-123465", name: "Hina Malik", phone: "03221234567", service: "Air Ticketing", date: "2026-08-01", status: "booked" }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [adminName, setAdminName] = useState('Admin');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requests, setRequests] = useState<QuoteRequest[]>(initialMockData);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [toastMessage, setToastMessage] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      const name = localStorage.getItem('admin_name');
      if (name) setAdminName(name);
    }
  }, [router]);

  if (!isMounted) return null;

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_name');
    localStorage.removeItem('admin_email');
    router.push('/admin/login');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleUpdateStatus = (requestId: string, newStatus: RequestStatus) => {
    setRequests(prev => prev.map(req => 
      req.requestId === requestId ? { ...req, status: newStatus } : req
    ));
    setActiveDropdown(null);
    showToast('Status updated successfully');
  };

  const filteredRequests = requests.filter(req => {
    const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus;
    const matchesSearch = req.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          req.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: RequestStatus) => {
    const styles = {
      pending: 'bg-[#F59E0B] text-white',
      quoted: 'bg-[#3B82F6] text-white',
      booked: 'bg-[#10B981] text-white',
      contacted: 'bg-[#6B7280] text-white'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs capitalize ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const renderDashboard = () => (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#2d2d2d] border border-[#444] rounded-lg p-6 hover:border-[#D4AF37] transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[48px] font-bold text-[#D4AF37] leading-none mb-2">245</p>
              <p className="text-[#A0A0A0] text-sm">Total Quote Requests</p>
            </div>
            <FaClipboardList className="text-[48px] text-[#D4AF37]" />
          </div>
          <p className="text-[#22c55e] text-sm">↑ 12% from last month</p>
        </div>
        <div className="bg-[#2d2d2d] border border-[#444] rounded-lg p-6 hover:border-[#D4AF37] transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[48px] font-bold text-[#F59E0B] leading-none mb-2">32</p>
              <p className="text-[#A0A0A0] text-sm">Pending Quotes</p>
            </div>
            <span className="text-[48px] text-[#F59E0B]">⏳</span>
          </div>
          <p className="text-[#22c55e] text-sm">↑ 5 new</p>
        </div>
        <div className="bg-[#2d2d2d] border border-[#444] rounded-lg p-6 hover:border-[#D4AF37] transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[48px] font-bold text-[#10B981] leading-none mb-2">156</p>
              <p className="text-[#A0A0A0] text-sm">Quoted to Customers</p>
            </div>
            <span className="text-[48px] text-[#10B981]">✓</span>
          </div>
          <p className="text-[#22c55e] text-sm">↑ 23 this month</p>
        </div>
        <div className="bg-[#2d2d2d] border border-[#444] rounded-lg p-6 hover:border-[#D4AF37] transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[48px] font-bold text-[#3B82F6] leading-none mb-2">63.7%</p>
              <p className="text-[#A0A0A0] text-sm">Conversion Rate</p>
            </div>
            <FaChartBar className="text-[48px] text-[#3B82F6]" />
          </div>
          <p className="text-[#22c55e] text-sm">↑ 2.3% improvement</p>
        </div>
      </div>

      <h2 className="text-[28px] font-bold mb-4">Recent Quote Requests</h2>
      {renderTable()}
    </div>
  );

  const renderTable = () => (
    <div className="bg-[#2d2d2d] rounded-lg overflow-x-auto pb-24">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#1a1a1a] border-b-2 border-[#D4AF37]">
            <th className="p-4 font-bold text-[#A0A0A0]">Request ID</th>
            <th className="p-4 font-bold text-[#A0A0A0]">Customer Name</th>
            <th className="p-4 font-bold text-[#A0A0A0]">Phone Number</th>
            <th className="p-4 font-bold text-[#A0A0A0]">Service Selected</th>
            <th className="p-4 font-bold text-[#A0A0A0]">Travel Date</th>
            <th className="p-4 font-bold text-[#A0A0A0]">Status</th>
            <th className="p-4 font-bold text-[#A0A0A0]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((req, i) => (
            <tr key={req.requestId} className={`border-b border-[#444] hover:border-l-4 hover:border-l-[#D4AF37] transition-all bg-[#2d2d2d]`}>
              <td className="p-4">{req.requestId}</td>
              <td className="p-4">{req.name}</td>
              <td className="p-4">{req.phone}</td>
              <td className="p-4">{req.service}</td>
              <td className="p-4">{req.date}</td>
              <td className="p-4">{getStatusBadge(req.status)}</td>
              <td className="p-4 relative">
                <div className="flex gap-2">
                  <button className="border border-[#D4AF37] text-[#D4AF37] px-2 py-1 flex items-center gap-1 rounded text-sm hover:bg-[#D4AF37]/10" aria-label="View">
                    View
                  </button>
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === req.requestId ? null : req.requestId)}
                    className="bg-[#D4AF37] text-[#1a1a1a] px-2 py-1 flex items-center gap-1 rounded text-sm font-semibold hover:bg-[#D4AF37]/90"
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === req.requestId}
                  >
                    Update {activeDropdown === req.requestId ? <FaSortUp className="mt-1" /> : <FaSortDown className="-mt-1"/>}
                  </button>
                </div>
                {activeDropdown === req.requestId && (
                  <div className="absolute top-12 right-4 bg-[#1a1a1a] border border-[#444] rounded shadow-lg z-50 flex flex-col min-w-[120px]">
                    <button onClick={() => handleUpdateStatus(req.requestId, 'pending')} className="p-2 text-left hover:bg-[#2d2d2d] text-sm text-[#F59E0B]">Pending</button>
                    <button onClick={() => handleUpdateStatus(req.requestId, 'quoted')} className="p-2 text-left hover:bg-[#2d2d2d] text-sm text-[#3B82F6]">Quoted</button>
                    <button onClick={() => handleUpdateStatus(req.requestId, 'booked')} className="p-2 text-left hover:bg-[#2d2d2d] text-sm text-[#10B981]">Booked</button>
                    <button onClick={() => handleUpdateStatus(req.requestId, 'contacted')} className="p-2 text-left hover:bg-[#2d2d2d] text-sm text-[#6B7280]">Contacted</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {filteredRequests.length === 0 && (
            <tr>
              <td colSpan={7} className="p-4 text-center text-[#A0A0A0]">No requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderRequestsTab = () => (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'quoted', 'booked', 'contacted'].map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded text-sm capitalize font-semibold transition-colors ${
                selectedStatus === status 
                  ? 'bg-[#D4AF37] text-[#1a1a1a]' 
                  : 'bg-[#2d2d2d] text-white hover:bg-[#444]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Search by name or phone" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-[#2d2d2d] text-white px-4 py-2 rounded border border-[#444] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>
      {renderTable()}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans flex flex-col">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 bg-[#22c55e] text-white px-6 py-3 rounded shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
          <div className="bg-[#2d2d2d] p-6 rounded-lg max-w-sm w-full border border-[#444]">
            <h3 className="text-xl font-bold mb-4">Logout</h3>
            <p className="mb-6 text-[#A0A0A0]">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 rounded border border-[#444] hover:bg-[#444]">Cancel</button>
              <button onClick={handleLogout} className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 font-semibold text-white">Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-[70px] bg-[#2d2d2d] border-b-2 border-[#D4AF37] px-4 md:px-8 flex justify-between items-center z-40">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-white text-xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          <div className="text-[#D4AF37] text-2xl font-bold hidden sm:block">✨ Star Crown Tour</div>
        </div>
        <div className="text-xl md:text-2xl font-bold hidden sm:block">Admin Dashboard</div>
        <div className="flex items-center gap-4">
          <span className="text-[#A0A0A0] text-sm md:text-base">Welcome, {adminName}</span>
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 lg:px-4 py-2 rounded font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-1 mt-[70px]">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed md:sticky top-[70px] h-[calc(100vh-70px)] bg-[#2d2d2d] border-r border-[#444] w-[250px] z-50 transition-transform duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="p-4 flex justify-end md:hidden">
            <button onClick={() => setSidebarOpen(false)} className="text-white text-xl">
              <FaTimes />
            </button>
          </div>
          <ul className="flex-1 py-4">
            <li 
              onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
              className={`px-5 py-4 cursor-pointer flex items-center gap-3 transition-colors ${activeTab === 'dashboard' ? 'border-l-4 border-[#D4AF37] font-bold bg-[#1a1a1a]' : 'hover:bg-[#1a1a1a]'}`}
            >
              <FaHome className={activeTab === 'dashboard' ? 'text-[#D4AF37]' : ''} /> Dashboard
            </li>
            <li 
              onClick={() => { setActiveTab('requests'); setSidebarOpen(false); }}
              className={`px-5 py-4 cursor-pointer flex items-center gap-3 transition-colors ${activeTab === 'requests' ? 'border-l-4 border-[#D4AF37] font-bold bg-[#1a1a1a]' : 'hover:bg-[#1a1a1a]'}`}
            >
              <FaClipboardList className={activeTab === 'requests' ? 'text-[#D4AF37]' : ''} /> Quote Requests
            </li>
            <li 
              onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }}
              className={`px-5 py-4 cursor-pointer flex items-center gap-3 transition-colors ${activeTab === 'analytics' ? 'border-l-4 border-[#D4AF37] font-bold bg-[#1a1a1a]' : 'hover:bg-[#1a1a1a]'}`}
            >
              <FaChartBar className={activeTab === 'analytics' ? 'text-[#D4AF37]' : ''} /> Analytics
            </li>
            <li 
              onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
              className={`px-5 py-4 cursor-pointer flex items-center gap-3 transition-colors ${activeTab === 'settings' ? 'border-l-4 border-[#D4AF37] font-bold bg-[#1a1a1a]' : 'hover:bg-[#1a1a1a]'}`}
            >
              <FaCog className={activeTab === 'settings' ? 'text-[#D4AF37]' : ''} /> Settings
            </li>
          </ul>
          <div className="p-4 border-t border-[#444]">
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-[#1a1a1a] transition-colors rounded"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden min-h-[calc(100vh-70px)]">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'requests' && renderRequestsTab()}
          {activeTab === 'analytics' && (
            <div className="flex items-center justify-center h-64 text-2xl text-[#A0A0A0]">Analytics coming soon</div>
          )}
          {activeTab === 'settings' && (
            <div className="flex items-center justify-center h-64 text-2xl text-[#A0A0A0]">Settings coming soon</div>
          )}
        </main>
      </div>
    </div>
  );
}
