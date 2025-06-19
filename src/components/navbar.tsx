"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import MobileMenu from "./mobile-menu";
import NavbarItem from "./navbar-item";
import AccountMenu from "./account-menu";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

const TOP_OFFSET = 66;

export default function Navbar() {
  const { data } = useSession();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const scrollContainerRef = useRef<HTMLElement | Window | null>(null);

  useEffect(() => {
    // 1. Detectar automáticamente el contenedor de scroll
    const detectScrollContainer = () => {
      // Busca un elemento con overflow scroll (común en aplicaciones modernas)
      const scrollElements = document.querySelectorAll("*");
      for (const element of scrollElements) {
        const style = getComputedStyle(element);
        if (style.overflowY === "auto" || style.overflowY === "scroll") {
          if (element.scrollHeight > element.clientHeight) {
            return element as HTMLElement;
          }
        }
      }

      // Usar el elemento raíz por defecto
      return document.scrollingElement || document.documentElement;
    };

    scrollContainerRef.current =
      (detectScrollContainer() as HTMLElement | Window) || window;

    // 2. Manejar el scroll con throttling
    let lastScrollPosition = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      let currentScroll = 0;

      if (scrollContainerRef.current === window) {
        currentScroll = window.scrollY || window.pageYOffset;
      } else {
        currentScroll = (scrollContainerRef.current as HTMLElement).scrollTop;
      }

      lastScrollPosition = currentScroll;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowBackground(lastScrollPosition >= TOP_OFFSET);
          ticking = false;
        });
        ticking = true;
      }
    };

    // 3. Agregar event listener
    const container = scrollContainerRef.current;

    if (container === window) {
      window.addEventListener("scroll", handleScroll);
    } else if (container instanceof HTMLElement) {
      container.addEventListener("scroll", handleScroll);
    }

    // 4. Estado inicial
    handleScroll();

    // 5. Limpieza
    return () => {
      if (container === window) {
        window.removeEventListener("scroll", handleScroll);
      } else if (container instanceof HTMLElement) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900/90" : ""
        }`}
      >
        <div className="relative h-4 lg:h-7 w-[120px]">
          <Image
            fill
            src="/images/logo.webp"
            alt="Logo"
            className="object-contain"
            sizes="(max-width: 1024px) 120px, 200px"
          />
        </div>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem>Home</NavbarItem>
          <NavbarItem>Series</NavbarItem>
          <NavbarItem>Films</NavbarItem>
          <NavbarItem>New & Popular</NavbarItem>
          <NavbarItem>My List</NavbarItem>
          <NavbarItem>Browse by languages</NavbarItem>
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-sm">Browse</p>
          <ChevronDown
            className={`transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition-colors">
            <Search />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition-colors">
            <Bell />
          </div>

          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="size-6 lg:size-10 rounded-md overflow-hidden relative">
              <Image
                fill
                className="object-cover"
                src="/images/default-blue.webp"
                alt="Profile"
                sizes="(max-width: 1024px) 1.5rem, 2.5rem"
              />
            </div>
            <ChevronDown
              className={`transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu username={data?.user.name} visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
