import Container from "./Container";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { logo } from "../assets/images";
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import SearchInput from "./SearchInput";
import Title from "./ui/title";
import SocialLinks from "./SocialLinks";
import { IoMdCart } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";

export const headerNavigation = [
  { title: "Accueil", link: "/" },
  { title: "Shop", link: "/shop" },
  { title: "About", link: "/about" },
  { title: "Commandes", link: "/orders" },
];

const Header = () => {
  const location = useLocation();
  const { products, userInfo, orderCount } = useSelector(
    (state) => state.orebiReducer
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <Container className="py-3 md:py-4 lg:py-6">
        {/* ===== TOP BAR ===== */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="logo" className="h-14 md:h-24 w-auto" />
          </Link>

          {/* Desktop Search (unchanged) */}
          <div className="hidden md:block flex-1 mx-6">
            <SearchInput />
          </div>

          {/* Desktop Navigation (UNCHANGED) */}
          <div className="hidden md:inline-flex items-center gap-4 lg:gap-x-6 text-sm uppercase font-medium text-gray-700">
            {headerNavigation.map((item) => (
              <NavLink
                key={item.title}
                to={item.link}
                className={`hover:text-black duration-300 relative group px-1 py-2 ${
                  location.pathname === item.link
                    ? "text-black font-semibold"
                    : ""
                }`}
              >
                <div className="relative">
                  {item.title}
                  {item.title === "Orders" && userInfo && orderCount > 0 && (
                    <span className="absolute -right-2 -top-2 w-4 h-4 rounded-full text-xs bg-red-500 text-white flex items-center justify-center animate-pulse">
                      {orderCount}
                    </span>
                  )}
                </div>
              </NavLink>
            ))}

            <Link to="/cart" className="relative text-2xl p-2">
              <IoMdCart />
              {products?.length > 0 && (
                <span className="absolute -right-1 -top-1 w-5 h-5 rounded-full text-xs bg-black text-white flex items-center justify-center animate-pulse">
                  {products.length}
                </span>
              )}
            </Link>

            {userInfo ? (
              <Link to="/profile" className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUserAlt className="text-xs text-gray-600" />
                </div>
                <span className="hidden lg:inline">{userInfo.name}</span>
              </Link>
            ) : (
              <Link to="/signin" className="text-xl p-2">
                <FaUserAlt />
              </Link>
            )}
          </div>

          {/* ===== MOBILE ACTIONS ===== */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="relative text-2xl p-2 rounded-md hover:bg-gray-50"
            >
              <IoMdCart />
              {products?.length > 0 && (
                <span className="absolute -right-1 -top-1 w-5 h-5 rounded-full text-xs bg-black text-white flex items-center justify-center animate-pulse">
                  {products.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsOpen(true)}
              className="text-2xl p-2 rounded-md hover:bg-gray-50"
            >
              <HiOutlineMenu />
            </button>
          </div>
        </div>

        {/* ===== MOBILE SEARCH ===== */}

        {/* ===== MOBILE MENU ===== */}
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="md:hidden"
        >
          <div className="fixed inset-0 bg-black/50" />
          <div className="fixed inset-0 flex justify-center items-start pt-16 px-4">
            <DialogPanel className="w-full max-w-md bg-white rounded-2xl shadow-xl">
              <div className="p-6">
                <div className="flex justify-between mb-6">
                  <Title className="text-xl">Menu</Title>
                  <button onClick={() => setIsOpen(false)}>
                    <IoCloseOutline className="text-2xl" />
                  </button>
                </div>

                <div className="space-y-1">
                  {headerNavigation.map((item) => (
                    <NavLink
                      key={item.title}
                      to={item.link}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-lg hover:bg-gray-50"
                    >
                      {item.title}
                    </NavLink>
                  ))}

                  <Link to="/profile" className="block px-4 py-3">
                    {userInfo ? `Profile (${userInfo.name})` : "Sign In"}
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <SocialLinks />
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Container>
    </div>
  );
};

export default Header;
