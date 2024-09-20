import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
const icons = [
  { IconComponent: FaFacebook, link: "https://facebook.com" },
  { IconComponent: FaInstagram, link: "https://instagram.com" },
  { IconComponent: FaTwitter, link: "https://twitter.com" },
  { IconComponent: FaYoutube, link: "https://youtube.com" },
];
const Footer = () => {
  return (
    <footer className=" bg-[#030317]  fixed bottom-0 left-0 right-0">
      <div className="container mx-auto flex h-[60px] items-center justify-between">
        <Link
          to="/"
          className="font-roboto text-2xl uppercase tracking-widest "
        >
          React <span className="text-yellow-400">Blogify</span>
        </Link>
        <ul className="flex items-center space-x-5">
          {icons.map(({ IconComponent, link }, i) => (
            <li className="text-center" key={i}>
              <Link
                className="text-white/50 hover:text-white transition-all duration-200"
                to={link}
              >
                <IconComponent size={30} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
