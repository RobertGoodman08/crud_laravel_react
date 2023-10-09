<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentControllers extends Controller
{
    public function index() {
        $students = Student::all();


        if($students->count() > 0) {
            $context = [
                'status' => 200,
                'students' => $students,
            ];
            return response()->json($context, 200);
        } else {
            $context = [
                'status' => 204,
                'message' => 'No Records Found',
            ];
            return response()->json($context, 404);

        }
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:250',
            'course' => 'required|string|max:150',
            'email' => 'required|email|max:190',
            'phone' => 'required|digits:11',
        ]);

        if($validator->fails()) {


            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {
            $student = Student::create([
                'name' => $request->name,
                'course' => $request->course,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);

            if($student) {

                return response()->json([
                    'status' => 200,
                    'message' => 'Student Created Successful'
                ], 200);
            } else {

                return response()->json([
                    'status' => 500,
                    'message' => 'Something Went Wrong!'
                ], 500);
            }
        }
    }


    public function show($id) {
        $student = Student::find($id);

        if($student) {

            return response()->json([
                'status' => 200,
                'message' => $student
            ], 200);
        } else {

            return response()->json([
                'status' => 404,
                'message' => 'No Such Student Found!'
            ], 404);
        }
    }


    public function edit($id) {
        $student = Student::find($id);

        if($student) {

            return response()->json([
                'status' => 200,
                'message' => $student
            ], 200);
        } else {

            return response()->json([
                'status' => 404,
                'message' => 'No Such Student Found!'
            ], 404);
        }
    }


    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:250',
            'course' => 'required|string|max:150',
            'email' => 'required|email|max:190',
            'phone' => 'required|digits:11',
        ]);

        if($validator->fails()) {


            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        } else {
            $student = Student::find($id);
            $student->update([
                'name' => $request->name,
                'course' => $request->course,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);

            if($student) {

                return response()->json([
                    'status' => 200,
                    'message' => 'Student Updated Successfully'
                ], 200);
            } else {

                return response()->json([
                    'status' => 404,
                    'message' => 'No Such Student Found!'
                ], 404);
            }
        }
    }

    public function destroy($id) {
        $student = Student::find($id);


        if($student) {
            $student->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Student Delete Successfully'
            ], 200);

        } else {

            return response()->json([
                'status' => 404,
                'message' => 'No Such Student Found!'
            ], 404);
        }

    }

}
