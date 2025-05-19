import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function FAQPage() {
  // Mock FAQ data
  const faqs = [
    {
      category: "Job Applications",
      questions: [
        {
          question: "How do I apply for a job?",
          answer:
            "To apply for a job, navigate to the job listing you're interested in and click the 'Apply' button. You'll be prompted to fill out an application form with your information and upload your resume.",
        },
        {
          question: "Can I apply for multiple jobs at once?",
          answer:
            "No, you need to submit separate applications for each job you're interested in. This ensures that your application is properly tailored to each position.",
        },
        {
          question: "How can I check the status of my application?",
          answer:
            "You can check the status of your applications by logging into your account and visiting the 'Applications' tab in your profile.",
        },
      ],
    },
    {
      category: "Account Management",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "To create an account, click on the 'Sign Up' button in the top right corner of the page. Fill out the required information and follow the prompts to complete your registration.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "If you've forgotten your password, click on the 'Login' button and then select 'Forgot Password'. Enter your email address, and we'll send you instructions to reset your password.",
        },
        {
          question: "Can I delete my account?",
          answer:
            "Yes, you can delete your account by going to your profile settings and selecting the 'Delete Account' option. Please note that this action is irreversible.",
        },
      ],
    },
    {
      category: "For Employers",
      questions: [
        {
          question: "How do I post a job?",
          answer:
            "To post a job, you need to create an employer account. Once logged in, click on 'Post a Job' and fill out the job details form.",
        },
        {
          question: "How much does it cost to post a job?",
          answer:
            "We offer various pricing plans for employers. Please visit our pricing page for detailed information on our current rates and packages.",
        },
        {
          question: "How long will my job posting be visible?",
          answer:
            "Standard job postings remain visible for 30 days. Premium job postings can be visible for up to 60 days, depending on your chosen plan.",
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Search FAQs</CardTitle>
            <CardDescription>Find answers to your questions quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input placeholder="Search for a question..." className="flex-1" />
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8 animate-accordion-down">
        {faqs.map((category, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                  <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          If you couldn't find the answer to your question, feel free to contact us.
        </p>
        <Button asChild>
          <a href="/contact">Contact Us</a>
        </Button>
      </div>
    </div>
  )
}
