import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Mail, FileText, Calendar, Upload } from "lucide-react";
import { CourseAssignmentUpload } from "@/components/CourseAssignmentUpload";

const courseData: Record<string, {
  courseName: string;
  instructor: string;
  instructorEmail: string;
  description: string;
  assignments: Array<{
    title: string;
    description: string;
    dueDate: string;
    status: "pending" | "submitted" | "graded";
    grade?: string;
  }>;
}> = {
  CSE445: {
    courseName: "Machine Learning",
    instructor: "HSM",
    instructorEmail: "hsm@northsouth.edu",
    description: "This course covers fundamental concepts and algorithms in machine learning, including supervised and unsupervised learning, neural networks, and deep learning.",
    assignments: [
      {
        title: "Assignment 1: Linear Regression",
        description: "Implement linear regression from scratch using Python and NumPy",
        dueDate: "2025-11-15",
        status: "graded",
        grade: "A-",
      },
      {
        title: "Assignment 2: Neural Networks",
        description: "Build a neural network to classify handwritten digits using TensorFlow",
        dueDate: "2025-11-20",
        status: "pending",
      },
      {
        title: "Mid-term Project",
        description: "Develop a complete ML pipeline for a real-world dataset",
        dueDate: "2025-12-01",
        status: "pending",
      },
    ],
  },
  CSE323: {
    courseName: "Operating System",
    instructor: "SMSL",
    instructorEmail: "smsl@northsouth.edu",
    description: "Study of operating system concepts including process management, memory management, file systems, and concurrent programming.",
    assignments: [
      {
        title: "Project Proposal",
        description: "Submit a proposal for your OS project including scope and timeline",
        dueDate: "2025-11-18",
        status: "pending",
      },
      {
        title: "Lab 3: Process Scheduling",
        description: "Implement various CPU scheduling algorithms",
        dueDate: "2025-11-22",
        status: "pending",
      },
    ],
  },
  EEE452: {
    courseName: "Engineering Economics",
    instructor: "Rkz",
    instructorEmail: "rkz@northsouth.edu",
    description: "Principles of engineering economics including cost analysis, financial planning, and project evaluation methods.",
    assignments: [
      {
        title: "Assignment 1: Cost Analysis",
        description: "Analyze the cost structure of a civil engineering project",
        dueDate: "2025-11-25",
        status: "pending",
      },
    ],
  },
  PHI104: {
    courseName: "Introduction to Ethics",
    instructor: "MnT",
    instructorEmail: "mnt@northsouth.edu",
    description: "Exploration of fundamental ethical theories and their application to contemporary moral issues.",
    assignments: [
      {
        title: "Ethics Essay",
        description: "Write a 2000-word essay on applied ethics in technology",
        dueDate: "2025-11-22",
        status: "submitted",
      },
    ],
  },
  CHE101L: {
    courseName: "Introduction to Chemistry Lab",
    instructor: "SFRH",
    instructorEmail: "sfrh@northsouth.edu",
    description: "Hands-on laboratory experience with fundamental chemistry concepts and experimental techniques.",
    assignments: [
      {
        title: "Lab Report 3",
        description: "Submit detailed lab report on titration experiment",
        dueDate: "2025-11-19",
        status: "pending",
      },
    ],
  },
  CSE327: {
    courseName: "Software Development",
    instructor: "IQN",
    instructorEmail: "iqn@northsouth.edu",
    description: "Software engineering principles, methodologies, and practices for developing large-scale software systems.",
    assignments: [
      {
        title: "Phase 1: Requirements Analysis",
        description: "Document software requirements for your team project",
        dueDate: "2025-11-28",
        status: "pending",
      },
    ],
  },
};

export default function CoursePage() {
  const { courseCode } = useParams<{ courseCode: string }>();
  const course = courseCode ? courseData[courseCode] : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link to="/">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "graded":
        return "bg-accent/20 text-accent-foreground border-accent";
      case "submitted":
        return "bg-primary/20 text-primary border-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-primary border-b border-border/50 shadow-academic-md">
        <div className="container mx-auto px-6 py-6">
          <Link to="/">
            <Button variant="secondary" size="sm" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground mb-2">
                {courseCode}
              </Badge>
              <h1 className="text-4xl font-bold text-primary-foreground mb-2">
                {course.courseName}
              </h1>
              <p className="text-primary-foreground/80">{course.description}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-card shadow-academic-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Instructor Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${course.instructorEmail}`}
                      className="text-primary hover:underline"
                    >
                      {course.instructorEmail}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <CourseAssignmentUpload 
              courseCode={courseCode || ""}
              courseName={course.courseName}
            />
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-card shadow-academic-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Assignments & Submissions
                </CardTitle>
                <CardDescription>
                  View and manage your course assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.assignments.map((assignment, index) => (
                    <Card key={index} className="border-border/50">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">
                              {assignment.title}
                            </CardTitle>
                            <CardDescription>{assignment.description}</CardDescription>
                          </div>
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          </div>
                          {assignment.grade && (
                            <div className="text-sm font-semibold text-accent">
                              Grade: {assignment.grade}
                            </div>
                          )}
                          {assignment.status === "pending" && (
                            <Button size="sm" className="gap-2">
                              <Upload className="h-4 w-4" />
                              Submit
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
