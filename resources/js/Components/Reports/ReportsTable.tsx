import { Attendance } from "@/types"

type Props = {
  attendances: Attendance[]
}

const ReportsTable = ({ attendances }: Props) => {
  return (
    <div className="w-full bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-4 text-sm font-semibold text-gray-600">User</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Photo</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Time</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Location</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-150">
            {attendances.length > 0 ? (
              attendances.map((attendance) => (
                <tr key={attendance.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-gray-700 font-medium">
                    {attendance.user?.name || `User ID: ${attendance.user_id}`}
                  </td>
                  <td className="p-4">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                      <a 
                        href={`/storage/${attendance.photo_path}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title="Click to view full image"
                      >
                        <img 
                          src={`/storage/${attendance.photo_path}`} 
                          alt="Attendance" 
                          className="h-full w-full object-cover transform hover:scale-125 transition duration-200 cursor-zoom-in"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/150?text=No+Photo";
                            (e.target as HTMLImageElement).parentElement?.removeAttribute('href');
                          }}
                        />
                      </a>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {attendance.attendance_date}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {attendance.attendance_time}
                  </td>
                  <td className="p-4 text-sm text-gray-500 font-mono">
                    {attendance.latitude}, {attendance.longitude}
                  </td>
                  <td className="p-4 text-sm">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        attendance.type === "in"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {attendance.type === "in" ? "CLOCK IN" : "CLOCK OUT"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-sm text-gray-400">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReportsTable