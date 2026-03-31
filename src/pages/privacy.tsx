import { useEffect } from "react";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
    
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header Section */}
        <div className="mb-16 space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#0ABAB5] via-[#56DFCF] to-[#0ABAB5] bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            Last updated: March 27, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-14 space-y-5">
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
          </p>
        </section>

        {/* Interpretation and Definitions */}
        <section className="mb-14 space-y-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#56DFCF]">
            Interpretation and Definitions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-4">
                Interpretation
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-foreground">
                The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-5">
                Definitions
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-foreground mb-6">
                For the purposes of this Privacy Policy:
              </p>
              <ul className="space-y-5 pl-0">
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Account</span> means a unique account created for You to access our Service or parts of our Service.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Affiliate</span> means an entity that controls, is controlled by, or is under common control with a party.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Company</span> refers to quantiralab, 1 Market St, San Francisco, CA 94105, United States.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Cookies</span> are small files that are placed on Your computer, mobile device or any other device by a website.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Country</span> refers to: California, United States
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Device</span> means any device that can access the Service such as a computer, a cell phone or a digital tablet.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Personal Data</span> is any information that relates to an identified or identifiable individual.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Service</span> refers to the Website.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Service Provider</span> means any natural or legal person who processes the data on behalf of the Company.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Usage Data</span> refers to data collected automatically from the Service infrastructure.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Website</span> refers to quantiralab, accessible from{" "}
                  <a 
                    href="https://www.quantiralab.com" 
                    target="_blank" 
                    rel="external nofollow noopener"
                    className="text-[#56DFCF] hover:text-[#0ABAB5] transition-colors underline"
                  >
                    https://www.quantiralab.com
                  </a>
                  .
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">You</span> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Collecting and Using Data */}
        <section className="mb-14 space-y-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#56DFCF]">
            Collecting and Using Your Personal Data
          </h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">
                Types of Data Collected
              </h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#0ABAB5] mb-4">
                    Personal Data
                  </h4>
                  <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
                    While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You.Personally identifiable information may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 ml-2">
                    <li className="text-base sm:text-lg text-foreground">Email address</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#0ABAB5] mb-4">
                    Usage Data
                  </h4>
                  <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
                    Usage Data is collected automatically when using the Service. This includes information such as Your Device's Internet Protocol address, browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, and unique device identifiers.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed text-foreground">
                    When You access the Service through a mobile device, We may collect the type of mobile device You use, Your mobile device's unique ID, the IP address of Your mobile device, and Your mobile operating system.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#0ABAB5] mb-4">
                    Tracking Technologies and Cookies
                  </h4>
                  <p className="text-base sm:text-lg leading-relaxed text-foreground mb-5">
                    We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information.
                  </p>
                  <ul className="space-y-4 pl-0">
                    <li className="text-base sm:text-lg leading-relaxed">
                      <span className="font-bold text-secondary">Cookies or Browser Cookies:</span> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent.
                    </li>
                    <li className="text-base sm:text-lg leading-relaxed">
                      <span className="font-bold text-secondary">Web Beacons:</span> Certain sections of our Service may contain small electronic files known as web beacons that permit the Company to count users who have visited those pages.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-6">
                Use of Your Personal Data
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-foreground mb-6">
                The Company may use Personal Data for the following purposes:
              </p>
              <ul className="space-y-4 pl-0">
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#0ABAB5]">To provide and maintain our Service,</span> including to monitor the usage of our Service.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#0ABAB5]">To manage Your Account:</span> to manage Your registration as a user of the Service.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#0ABAB5]">For the performance of a contract:</span> the development, compliance and undertaking of the purchase contract for the products or services You have purchased.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#0ABAB5]">To contact You:</span> To contact You regarding updates or informative communications related to the functionalities, products or contracted services.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="mb-14 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#56DFCF]">
            Security of Your Personal Data
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet is 100% secure. While We strive to use commercially reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.
          </p>
        </section>

        {/* Contact Section */}
        <div className="my-12 h-px bg-gradient-to-r from-[#0ABAB5] via-[#0ABAB5]/20 to-transparent"></div>

        <section className="text-center py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-4">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg text-foreground mb-3">
            If you have any questions about this Privacy Policy, You can contact us:
          </p>
          <div className="space-y-2">
            <p className="text-base sm:text-lg">
              Email:{" "}
              <a 
                href="mailto:contact@quantiralab.com" 
                className="text-[#56DFCF] hover:text-[#0ABAB5] transition-colors font-semibold"
              >
                contact@quantiralab.com
              </a>
            </p>
            <p className="text-base sm:text-lg">
              Website:{" "}
              <a 
                href="https://www.quantiralab.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#56DFCF] hover:text-[#0ABAB5] transition-colors font-semibold"
              >
                https://www.quantiralab.com
              </a>
            </p>
          </div>
           <a href="/#hero"><button className="bg-[#0ABAB5] text-white py-2 px-4 rounded-md hover:bg-[#0ABAB5]/80 transition-colors">
            Return to Home
          </button></a>
        </section>
      </main>

      
    </div>
  );
}
