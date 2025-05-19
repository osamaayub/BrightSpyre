"use client";

import { useState } from "react";
import { sendEmail } from "../actions/sendEmail";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "@/types/type";



export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const response = await sendEmail(formData);

    if (response.success) {
      setStatus("✅ Email sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" }); // Reset form
    } else {
      setStatus(`❌ Error: ${response.error}`);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>

      <Card className="border border-gray-300">
        <CardHeader className="bg-gray-100 p-4 rounded-t-md">
          <CardTitle className="text-xl font-semibold text-gray-900">Send us a message</CardTitle>
          <CardDescription className="text-gray-600">Fill out the form below and we'll get back to you.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700">First name</Label>
                <Input id="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} required className="border-gray-300 focus:ring-gray-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700">Last name</Label>
                <Input id="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} required className="border-gray-300 focus:ring-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required className="border-gray-300 focus:ring-gray-500" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-gray-700">Subject</Label>
              <Input id="subject" placeholder="Enter the subject" value={formData.subject} onChange={handleChange} required className="border-gray-300 focus:ring-gray-500" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-700">Message</Label>
              <Textarea id="message" placeholder="Enter your message" rows={5} value={formData.message} onChange={handleChange} required className="border-gray-300 focus:ring-gray-500" />
            </div>

            {status && <p className="text-center text-sm font-medium text-gray-700">{status}</p>}

            <CardFooter>
              <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 transition duration-200" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
