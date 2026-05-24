<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class ReportController extends Controller
{
     public function index()
    {
        $attendances = Attendance::with('user')->get();
        return inertia('Reports/Index', compact('attendances'));
    }
}
