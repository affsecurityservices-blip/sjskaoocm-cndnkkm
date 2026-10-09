import Badge from "../common/Badge";
import { formatCurrency } from "../../utils/calculatePrice";
import { formatDate, formatTime12h } from "../../utils/formatDate";
import { Calendar, Clock, MapPin, Phone, ShieldCheck, User, Moon, AlertTriangle } from "lucide-react";

export default function BookingCard({ booking, onCancel }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="amber">Enquiry Submitted</Badge>;
      case "confirmed":
        return <Badge variant="success">Confirmed & Dispatched</Badge>;
      case "completed":
        return <Badge variant="security">Completed</Badge>;
      case "cancelled":
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white dark:bg-[#16161F] border border-slate-200 dark:border-[#262636] rounded-2xl p-6 shadow-xl space-y-5 hover:border-amber-500/40 transition-all">
      
      {/* Top Header: ID & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-[#262636]">
        <div>
          <span className="text-xs font-mono text-slate-500 dark:text-gray-400">ENQUIRY REF:</span>
          <h4 className="text-base font-extrabold text-amber-500 font-mono tracking-wider">
            {booking.bookingId}
          </h4>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge(booking.status)}
          {booking.createdAt && (
            <span className="text-[11px] text-slate-500 dark:text-gray-500 font-mono">
              Logged on {formatDate(booking.createdAt)}
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: Guard Info & Booking Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Guard Summary Column */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-[#0A0A0F] p-4 rounded-xl border border-slate-200 dark:border-[#262636]">
          <img
            src={booking.guardImage}
            alt={booking.guardName}
            className="w-16 h-16 rounded-xl object-cover border border-amber-500/30"
          />
          <div>
            <div className="text-xs text-amber-500 font-semibold">{booking.guardType}</div>
            <h5 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1">
              {booking.guardName}
            </h5>
            <div className="text-xs text-slate-500 dark:text-gray-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Verified Operative
            </div>
          </div>
        </div>

        {/* Schedule & Venue Details */}
        <div className="space-y-2 text-xs text-slate-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Date: <strong className="text-slate-900 dark:text-white">{formatDate(booking.date)}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Time: <strong className="text-slate-900 dark:text-white">
                {booking.shiftType ? `${booking.shiftType}: ` : ""}
                {formatTime12h(booking.startTime)}
                {booking.endTime ? ` - ${formatTime12h(booking.endTime)}` : ""}
              </strong> ({booking.hours} hrs)
            </span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span className="line-clamp-2">
              Venue: <strong className="text-slate-900 dark:text-white">{booking.address}</strong>
            </span>
          </div>
          {booking.isNightSlot && (
            <div className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-medium">
              <Moon className="w-3 h-3" /> Includes Night Shift Surcharge
            </div>
          )}
        </div>

        {/* Client & Price Column */}
        <div className="flex flex-col justify-between bg-slate-50 dark:bg-[#0A0A0F] p-4 rounded-xl border border-slate-200 dark:border-[#262636] space-y-3">
          <div className="space-y-1 text-xs">
            <div className="text-slate-500 dark:text-gray-400 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-amber-500" /> Client: <span className="text-slate-900 dark:text-white font-medium">{booking.name}</span>
            </div>
            <div className="text-slate-500 dark:text-gray-400 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-500" /> Phone: <span className="text-slate-900 dark:text-white font-medium">{booking.phone}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-[#262636] flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-gray-400">Total Price:</span>
            <span className="text-lg font-extrabold text-amber-500">
              {formatCurrency(booking.totalPrice)}
            </span>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      {booking.status === "pending" && (
        <div className="pt-3 border-t border-slate-200 dark:border-[#262636] flex justify-end">
          <button
            onClick={() => onCancel(booking.bookingId)}
            className="inline-flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Cancel Enquiry
          </button>
        </div>
      )}

    </div>
  );
}
