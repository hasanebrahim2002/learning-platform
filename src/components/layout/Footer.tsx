import type { IconType } from "react-icons";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../context/useLanguage";

interface FooterLink {
  label: string;
  path: string;
}
interface FooterProps {
  title: string;
  links: Array<FooterLink>;
}
interface SocialMediaProps {
  name: string;
  path: string;
  icon: IconType;
}
const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;
  const footerSections: Array<FooterProps> = [
    {
      title: t.categories.title,
      links: [
        { label: t.categories.web, path: "/courses?category=web" },
        { label: t.categories.mobile, path: "/courses?category=mobile" },
        { label: t.categories.data, path: "/courses?category=data" },
        { label: t.categories.design, path: "/courses?category=design" },
      ],
    },
    {
      title: t.platform.title,
      links: [
        { label: t.platform.allCourses, path: "/courses" },
        { label: t.platform.aboutUs, path: "/about" },
        { label: t.platform.becomeInstructor, path: "/join-instructor" },
        { label: t.platform.pricing, path: "#" },
      ],
    },
    {
      title: t.community.title,
      links: [
        { label: t.community.blog, path: "#" },
        { label: t.community.forum, path: "#" },
        { label: t.community.docs, path: "#" },
        { label: t.community.events, path: "#" },
      ],
    },
    {
      title: t.support.title,
      links: [
        { label: t.support.helpCenter, path: "#" },
        { label: t.support.contactUs, path: "/contact" },
        { label: t.support.faqs, path: "/about#faq" },
        { label: t.support.terms, path: "#" },
      ],
    },
  ];

  const socialMedia: Array<SocialMediaProps> = [
    { name: "Facebook", path: "https://facebook.com", icon: FaFacebook },
    { name: "Facebook", path: "https://facebook.com", icon: FaLinkedin },
    { name: "Facebook", path: "https://facebook.com", icon: FaTwitter },
  ];
  return (
    <footer className="p-8 bg-gray-50 border-t border-gray-200 dark:bg-gray-950 dark:border-gray-800 text-gray-600 dark:text-gray-400">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
        <div className="col-span-1">
          <img width={100} src="/logo.svg" alt="logo" />
          <p>{t.bio}</p>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {footerSections.map((sec, index) => {
              return (
                <div key={index}>
                  <h4 className="mb-2 font-semibold text-black dark:text-white">
                    {sec.title}
                  </h4>
                  <ul>
                    {sec.links.map((link) => {
                      return (
                        <li key={link.path} className="pb-2 text-[15px] ">
                          <Link
                            to={link.path}
                            className="hover:text-primary transition-colors duration-150"
                          >
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[14px] text-gray-500 dark:text-gray-500">
        <p>
          © 2026 <span className="text-primary font-semibold">CodeCraft.</span>{" "}
          {t.rights}
        </p>
        <div className="flex gap-6">
          <Link
            to="/privacy"
            className="hover:text-primary dark:hover:text-violet-400 transition-colors duration-150"
          >
            {t.privacyPolicy}
          </Link>
          <Link
            to="/terms"
            className="hover:text-primary dark:hover:text-violet-400 transition-colors duration-150"
          >
            {t.termsOfService}
          </Link>
        </div>
        <div className="flex gap-3">
          {socialMedia.map((sociol) => {
            const Icon = sociol.icon;
            return (
              <a
                href={sociol.path}
                key={sociol.name}
                target="_blank"
                className="hover:text-primary transition-colors duration-150"
              >
                {" "}
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
