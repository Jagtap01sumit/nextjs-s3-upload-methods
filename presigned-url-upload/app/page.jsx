import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileUploadSection from "@/components/FileUploadSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center">
        <FileUploadSection />
      </main>

      <Footer />
    </div>
  );
}
