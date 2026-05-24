<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AttendanceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        Log::info('Attendance request received', [
            'user_id' => auth()->id(),
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        $timetable = [
            'start_time' => '08:00:00',
            'end_start_time' => '12:00:00',
            'end_time' => '16:00:00',
        ];

        $now = Carbon::now('Asia/Jakarta');
        $currentTime = $now->toTimeString();
        $userId = auth()->id();

       
        $attendances = Attendance::where('user_id', $userId)
            ->whereDate('attendance_date', $now->toDateString())
            ->get();
        $hasClockIn = $attendances->where('type', 'in')->first();
        $hasClockOut = $attendances->where('type', 'out')->first();

        if ($hasClockIn && $hasClockOut) {
            return back()->with('error', 'You have already clocked in and out today!');
        }

        if (!$hasClockIn) {
            if ($currentTime < $timetable['start_time']) {
                return back()->with('error', 'It is not time to clock in yet!');
            }
            if ($currentTime > $timetable['end_start_time']) {
                return back()->with('error', 'You are late! Clock in limit is 12:00.');
            }

            $photoPath = $request->file('photo')->store('attendance_photos', 'public');

            Attendance::create([
                'user_id' => $userId,
                'photo_path' => $photoPath,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                'type' => 'in',
                'attendance_time' => $currentTime,
                'attendance_date' => $now->toDateString(),
            ]);

            return back()->with('success', 'Clock in successful!');
        }

        if ($hasClockIn && !$hasClockOut) {
            if ($currentTime < $timetable['end_time']) {
                return back()->with('error', 'It is not time to clock out yet!');
            }

            $photoPath = $request->file('photo')->store('attendance_photos', 'public');

            Attendance::create([
                'user_id' => $userId,
                'photo_path' => $photoPath,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                'type' => 'out',
                'attendance_time' => $currentTime,
                'attendance_date' => $now->toDateString(),
            ]);

            return back()->with('success', 'Clock out successful!');
        }

        return back()->with('error', 'Something went wrong.');
    }
}