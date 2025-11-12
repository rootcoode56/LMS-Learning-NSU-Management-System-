import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: string;
  name: string;
  credits: string;
  grade: string;
}

const gradePoints: Record<string, number> = {
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "F": 0.0,
};

export function CGPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "", credits: "", grade: "" },
  ]);
  const [calculatedCGPA, setCalculatedCGPA] = useState<number | null>(null);

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now().toString(), name: "", credits: "", grade: "" },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    } else {
      toast.error("At least one course is required");
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    let isValid = true;

    courses.forEach(course => {
      if (!course.credits || !course.grade) {
        isValid = false;
        return;
      }
      const credits = parseFloat(course.credits);
      const gpa = gradePoints[course.grade];
      
      if (isNaN(credits) || credits <= 0) {
        isValid = false;
        return;
      }

      totalCredits += credits;
      totalGradePoints += credits * gpa;
    });

    if (!isValid) {
      toast.error("Please fill in all fields with valid data");
      return;
    }

    if (totalCredits === 0) {
      toast.error("Total credits must be greater than 0");
      return;
    }

    const cgpa = totalGradePoints / totalCredits;
    setCalculatedCGPA(cgpa);
    toast.success(`CGPA calculated: ${cgpa.toFixed(2)}`);
  };

  const resetCalculator = () => {
    setCourses([{ id: "1", name: "", credits: "", grade: "" }]);
    setCalculatedCGPA(null);
  };

  return (
    <Card className="bg-card shadow-academic-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          CGPA Calculator
        </CardTitle>
        <CardDescription>
          Calculate your cumulative GPA by entering course details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={course.id} className="p-4 border rounded-lg space-y-3 bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-semibold">Course {index + 1}</Label>
                {courses.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`name-${course.id}`} className="text-xs">
                  Course Name (Optional)
                </Label>
                <Input
                  id={`name-${course.id}`}
                  placeholder="e.g., Machine Learning"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`credits-${course.id}`} className="text-xs">
                    Credits *
                  </Label>
                  <Input
                    id={`credits-${course.id}`}
                    type="number"
                    placeholder="3"
                    min="0"
                    step="0.5"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`grade-${course.id}`} className="text-xs">
                    Grade *
                  </Label>
                  <Select
                    value={course.grade}
                    onValueChange={(value) => updateCourse(course.id, "grade", value)}
                  >
                    <SelectTrigger id={`grade-${course.id}`}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(gradePoints).map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade} ({gradePoints[grade].toFixed(1)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={addCourse}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>

          <div className="flex gap-2">
            <Button onClick={calculateCGPA} className="flex-1">
              Calculate CGPA
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>

          {calculatedCGPA !== null && (
            <div className="p-6 bg-gradient-primary rounded-lg text-center">
              <p className="text-sm text-primary-foreground/80 mb-1">Your CGPA</p>
              <p className="text-4xl font-bold text-primary-foreground">
                {calculatedCGPA.toFixed(2)}
              </p>
              <p className="text-xs text-primary-foreground/60 mt-2">
                out of 4.0
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
