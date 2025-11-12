import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award } from "lucide-react";

interface CourseGrade {
    courseCode: string;
    courseName: string;
    grade: string;
    gpa: number;
    credits: number;
}

const courseGrades: CourseGrade[] = [
    { courseCode: "CSE445", courseName: "Machine Learning", grade: "A-", gpa: 3.7, credits: 3 },
    { courseCode: "CSE323", courseName: "Operating System", grade: "B+", gpa: 3.3, credits: 3 },
    { courseCode: "EEE452", courseName: "Engineering Economics", grade: "A", gpa: 4.0, credits: 3 },
    { courseCode: "PHI104", courseName: "Introduction to Ethics", grade: "A-", gpa: 3.7, credits: 3 },
    { courseCode: "CHE101L", courseName: "Chemistry Lab", grade: "B+", gpa: 3.3, credits: 1 },
    { courseCode: "CSE327", courseName: "Software Development", grade: "A", gpa: 4.0, credits: 3 },
];

export function GradeTracker() {
    const totalCredits = courseGrades.reduce((sum, course) => sum + course.credits, 0);
    const totalGradePoints = courseGrades.reduce(
    (sum, course) => sum + course.gpa * course.credits,
    0
    );
    const cgpa = (totalGradePoints / totalCredits).toFixed(2);
  const cgpaPercentage = (parseFloat(cgpa) / 4.0) * 100;

    const getGradeColor = (gpa: number) => {
    if (gpa >= 3.7) return "text-accent";
    if (gpa >= 3.0) return "text-primary";
    if (gpa >= 2.5) return "text-yellow-600";
    return "text-destructive";
    };

    const getGradeBadgeVariant = (gpa: number): "default" | "secondary" | "destructive" | "outline" => {
    if (gpa >= 3.7) return "default";
    if (gpa >= 3.0) return "secondary";
    return "outline";
    };

    return (
    <Card className="bg-card shadow-academic-md">
        <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Grade Tracker
            </CardTitle>
            <div className="text-right">
            <p className="text-sm text-muted-foreground">Current CGPA</p>
            <p className="text-3xl font-bold text-primary">{cgpa}</p>
            </div>
        </div>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
            <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{cgpa} / 4.0</span>
            </div>
            <Progress value={cgpaPercentage} className="h-3" />
            </div>

            <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm">Course Grades</h4>
            </div>
            {courseGrades.map((course) => (
                <div
                key={course.courseCode}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50"
                >
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                        {course.courseCode}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                        {course.credits} credits
                    </span>
                    </div>
                    <p className="text-sm font-medium">{course.courseName}</p>
                </div>
                <div className="text-right">
                    <Badge variant={getGradeBadgeVariant(course.gpa)} className="mb-1">
                    {course.grade}
                    </Badge>
                    <p className={`text-xs font-semibold ${getGradeColor(course.gpa)}`}>
                    GPA: {course.gpa.toFixed(1)}
                    </p>
                </div>
                </div>
            ))}
            </div>

            <div className="pt-3 border-t">
            <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Total Credits Completed</span>
                <span className="font-bold text-primary">{totalCredits}</span>
            </div>
            </div>
        </div>
        </CardContent>
    </Card>
    );
}
