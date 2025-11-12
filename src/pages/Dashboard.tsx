import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CourseCard } from "@/components/CourseCard";
import { TaskList } from "@/components/TaskList";
import { AssignmentUpload } from "@/components/AssignmentUpload";
import { GradeTracker } from "@/components/GradeTracker";
import { CGPACalculator } from "@/components/CGPACalculator";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const courses = [
  { courseCode: "CSE445", courseName: "Machine Learning", instructor: "HSM" },
  { courseCode: "CSE323", courseName: "Operating System", instructor: "SMSL" },
  { courseCode: "EEE452", courseName: "Engineering Economics", instructor: "Rkz" },
  { courseCode: "PHI104", courseName: "Introduction to Ethics", instructor: "MnT" },
  { courseCode: "CHE101L", courseName: "Introduction to Chemistry Lab", instructor: "SFRH" },
  { courseCode: "CSE327", courseName: "Software Development", instructor: "IQN" },
];

export default function Dashboard() {
  const [studentName, setStudentName] = useState("QM Asif Tanjim");
  const [studentId, setStudentId] = useState("2211402042");

  const handleUpdateProfile = (name: string, id: string) => {
    setStudentName(name);
    setStudentId(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        studentName={studentName}
        studentId={studentId}
        onUpdateProfile={handleUpdateProfile}
      />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">My Courses</h2>
            <p className="text-muted-foreground">Spring 2025 Semester</p>
          </div>
          <Link to="/academic-calendar">
            <Button className="gap-2">
              <Calendar className="h-4 w-4" />
              Academic Calendar
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {courses.map((course) => (
            <CourseCard key={course.courseCode} {...course} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <GradeTracker />
          <CGPACalculator />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskList />
          <AssignmentUpload />
        </div>
      </main>
    </div>
  );
}
