import React from "react";

const Certificates = () => {
  const links = [
    {
      name: "Core Coordinators",
      url: "https://drive.google.com/drive/folders/1oNdRfNXSquZ9-uE8IoH6BzsIVB6vkC1M?usp=drive_link",
    },
    {
      name: "Sub Coordinators",
      url: "https://drive.google.com/drive/folders/1Qw6UM9LPAtvdhooJPy6QyyZcHRd3lLc0?usp=drive_link",
    },
    {
      name: "Volunteers",
      url: "https://drive.google.com/drive/folders/1kQbJ0_bsOj35xi7QvH9Ui9VjJTnKPebt?usp=drive_link",
    },
    {
      name: "TECHLIFT 24 Hour National Level Hackathon",
      url: "https://drive.google.com/drive/folders/1DNhJAGowjdyNM9ut9Cxvc8LorEgK9WP_?usp=drive_link",
    },
    {
      name: "Performance Engineering",
      url: "https://drive.google.com/drive/folders/1DGynTVKIyqlEtB0NQIHgmZZQoAaj39tA?usp=drive_link",
    },
    {
      name: "NLP using AI",
      url: "https://drive.google.com/drive/folders/1_SRVgL4iJ3ljONcGhYZBobOObIAydHRz?usp=drive_link",
    },
    {
      name: "Get Started with Machine Learning",
      url: "https://drive.google.com/drive/folders/1gY7ZQ2vpUbkDswaDRAVFS4AZ20t0ZnWr?usp=drive_link",
    },
    {
      name: "Bot Development using Node JS",
      url: "https://drive.google.com/drive/folders/1UWmk39z3gisg84G8g7Me_gF63P8ZNCqW?usp=drive_link",
    },
    {
      name: "Benefits of working on Open Source",
      url: "https://drive.google.com/drive/u/3/folders/1eJdiSFq1yftufuriJrpnM7EkCgXKDYyl?usp=sharing",
    },
    {
      name: "Current Leaps of Computer Science",
      url: "https://drive.google.com/drive/u/0/mobile/folders/1eJdiSFq1yftufuriJrpnM7EkCgXKDYyl?usp=sharing",
    },
    {
      name: "Certificate of Merit",
      url: "https://drive.google.com/drive/folders/1icnbDaBoOfOcIYx6E0EweipzrV-shCL-?usp=drive_link",
    },
    {
      name: "Debugging in Python - Participation",
      url: "https://drive.google.com/drive/folders/1htEzziHd3Mk3TZ_TvTj99oeGYA-gN7sE?usp=sharing",
    },
    {
      name: "Fast Coding in C - Participation",
      url: "https://drive.google.com/drive/folders/1qrUwHyruKSpu61_WJCTpNfP0VlynE8Ky?usp=sharing",
    },
    {
      name: "Code with ChatGPT - Participation",
      url: "https://drive.google.com/drive/folders/1m4Ty8ogSCOqZlJvp3XB4x3SjgWPOKL3K?usp=drive_link",
    },
    {
      name: "Shuffle Code - Participation",
      url: "https://drive.google.com/drive/folders/19RgwEUmd9C6OIbncLWgtxq9Oia9uZxxL?usp=sharing",
    },
    {
      name: "Swap Code - Participation",
      url: "https://drive.google.com/drive/folders/15qshtWXhs2xYMDErQghP5KOdEFRpZcZ0?usp=sharing",
    },
    {
      name: "Schrodinger's Program in Python - Participation",
      url: "https://drive.google.com/drive/folders/1FOcVYTnRJfZ4Xt2leNvLH9Q8hUaZK-XO?usp=drive_link",
    },
  ];

  return (
    <div className="min-h-screen w-full mt-20 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] p-8">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 drop-shadow-md">
        TERANIS'25 Certificates
      </h1>
      <p className="text-center text-gray-400 mb-10 text-lg">
        Explore and download your certificates
      </p>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-[#1e293b] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center font-semibold text-gray-200 text-lg border border-gray-700 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-blue-600 hover:to-purple-600 hover:text-white"
            >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
