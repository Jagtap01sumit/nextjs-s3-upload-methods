export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      &copy; {new Date().getFullYear()} S3 File Uploader. All rights reserved.
    </footer>
  );
}
