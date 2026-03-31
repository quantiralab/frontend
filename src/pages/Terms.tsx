import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
    
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header Section */}
        <div className="mb-16 space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#0ABAB5] via-[#56DFCF] to-[#0ABAB5] bg-clip-text text-transparent">
            Terms and Conditions
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            Last updated: March 27, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-14">
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            Please read these terms and conditions carefully before using Our Service.
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
                For the purposes of these Terms and Conditions:
              </p>
              <ul className="space-y-5 pl-0">
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Affiliate</span> means an entity that controls, is controlled by, or is under common control with a party.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Country</span> refers to: California, United States
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Company</span> refers to quantiralab, 1 Market St, San Francisco, CA 94105, United States.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Device</span> means any device that can access the Service such as a computer, a cell phone or a digital tablet.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Service</span> refers to the Website.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Terms and Conditions</span> means these Terms and Conditions, which govern Your access to and use of the Service and form the entire agreement between You and the Company.
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">Third-Party Social Media Service</span> means any services or content provided by a third party that is displayed or linked to through the Service.
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
                </li>
                <li className="text-base sm:text-lg leading-relaxed">
                  <span className="font-bold text-[#56DFCF]">You</span> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Acknowledgment */}
        <section className="mb-14 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#56DFCF]">
            Acknowledgment
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            Your access to and use of the Service is also subject to Our Privacy Policy. Please read Our Privacy Policy carefully before using Our Service.
          </p>
        </section>

        {/* Links to Other Websites */}
        <section className="mb-14 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#56DFCF]">
            Links to Other Websites
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.
          </p>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-4">
              Links from a Third-Party Social Media Service
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
              The Service may display, include, make available, or link to content or services provided by a Third-Party Social Media Service. A Third-Party Social Media Service is not owned or controlled by the Company, and the Company does not endorse or assume responsibility for any Third-Party Social Media Service.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-foreground">
              You acknowledge and agree that the Company shall not be responsible or liable for any damage or loss caused or alleged to be caused by or in connection with Your access to or use of any Third-Party Social Media Service. Your use of any Third-Party Social Media Service is governed by that Third-Party Social Media Service's terms and privacy policies.
            </p>
          </div>
        </section>

        {/* Termination */}
        <section className="mb-14 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#56DFCF]">
            Termination
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            Upon termination, Your right to use the Service will cease immediately.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-14 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#56DFCF]">
            Limitation of Liability
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy), even if the Company or any supplier has been advised of the possibility of such damages.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.
          </p>
        </section>

        {/* AS IS and AS AVAILABLE Disclaimer */}
        <section className="mb-14 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#56DFCF]">
            "AS IS" and "AS AVAILABLE" Disclaimer
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            Without limiting the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-14 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#56DFCF]">
            Governing Law
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
          </p>
        </section>

        {/* Disputes Resolution */}
        <section className="mb-14 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#56DFCF]">
            Disputes Resolution
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
          </p>
        </section>

        {/* Changes to These Terms */}
        <section className="mb-14 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#56DFCF]">
            Changes to These Terms and Conditions
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Service.
          </p>
        </section>

        {/* Contact Section */}
        <div className="my-12 h-px bg-gradient-to-r from-[#0ABAB5] via-[#0ABAB5]/20 to-transparent"></div>

        <section className="text-center py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-4">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg text-foreground mb-5">
            If you have any questions about these Terms and Conditions, You can contact us:
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
