import { Download, FileText, Server, Zap, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Resume() {
  const { toast } = useToast();

  const handleDownloadResume = () => {
    const url =
      "https://drive.google.com/file/d/1UQUyuMG_RP9zEl3h-XiYTDaRqM5M7KQ-/view?usp=drive_link";

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank"; // opens in new tab
    a.download = "mohammed_sharooque_resume.pdf";
    a.click();

    toast({
      title: "Opening Resume Download",
      description: "If it doesn't download automatically, check the new tab.",
    });
  };

  // const handleDownloadResume = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://drive.google.com/uc?export=download&id=1IiM0WDbiksJ6wAqW69JvMul2RGtGbf1L"
  //     );
  //     if (response.ok) {
  //       const blob = await response.blob();
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.style.display = "none";
  //       a.href = url;
  //       a.download = "mohammed_sharooque_resume.pdf";
  //       document.body.appendChild(a);
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //       document.body.removeChild(a);

  //       toast({
  //         title: "Resume Downloaded",
  //         description: "Thank you for your interest!",
  //       });
  //     } else {
  //       throw new Error("Download failed");
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Download Error",
  //       description: "Unable to download resume. Please try again later.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  const experience = [
    {
      title: "Software Engineer",
      company: "Petrus Technologies",
      period: "2023 - Present",
    },
    {
      title: "Product Engineer",
      company: "Gox.ai",
      period: "2022 - 2023",
    },
    {
      title: "Associate Software Engineer",
      company: "Accenture",
      period: "2020 - 2022",
    },
    {
      title: "Intern",
      company: "Athena Health",
      period: "2020 - 2020",
    },
  ];

  const skills = [
    {
      icon: Server,
      title: "Backend Architecture",
      description: "Microservices, APIs, Database Design",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimization, Caching, Scalability",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Cloud,
      title: "DevOps",
      description: "Docker, CI/CD, Cloud Platforms",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section id="resume" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Resume
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Check out my resume to learn more about my experience and skills
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 rounded-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-secondary mb-4">
                  Professional Experience
                </h3>
                <p className="text-slate-600 mb-6">
                  Backend developer with 4+ years of experience in IoT, data
                  platforms, and e-commerce, passionate about designing scalable
                  architectures, optimizing databases, and creating
                  high-performance systems for modern applications.
                </p>

                <div className="space-y-4 mb-8">
                  {experience.map((exp, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-secondary">
                        {exp.title}
                      </h4>
                      <p className="text-slate-600">
                        {exp.company} • {exp.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="text-center lg:text-right">
                <div className="mb-6">
                  <FileText className="w-20 h-20 text-primary mx-auto lg:mx-0" />
                  <Button
                    onClick={handleDownloadResume}
                    className="inline-flex items-center px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Download className="mr-3 w-5 h-5" />
                    View Resume PDF
                  </Button>
                  <p className="text-sm text-slate-500 mt-3">
                    Last updated: December 2024
                  </p>
                </div>
              </div> */}

              <div className="text-center lg:text-right">
                <div className="mb-6 flex flex-col items-center lg:items-middle">
                  <FileText className="w-20 h-20 text-primary mb-4" />

                  <Button
                    onClick={handleDownloadResume}
                    className="inline-flex items-center px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Download className="mr-3 w-5 h-5" />
                    View Resume PDF
                  </Button>

                  <p className="text-sm text-slate-500 mt-3">
                    Last updated: December 2024
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Summary */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div key={index} className="text-center">
                  <div
                    className={`${skill.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-secondary mb-2">
                    {skill.title}
                  </h4>
                  <p className="text-slate-600 text-sm">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
