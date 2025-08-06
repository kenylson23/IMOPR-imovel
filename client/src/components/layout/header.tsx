import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Home, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/properties", label: "Imóveis" },
    { href: "/agents", label: "Agentes" },
    { href: "/tools", label: "Ferramentas" },
    { href: "/about", label: "Sobre" },
    { href: "/contact", label: "Contacto" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="glass-strong backdrop-blur-md bg-white/80 shadow-lg sticky top-0 z-50 border-b border-white/20">
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 hover-lift" data-testid="logo">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Home className="text-white text-lg md:text-xl" />
            </div>
            <span className="text-lg md:text-xl font-semibold text-gray-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Palanca Real</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`font-medium transition-colors cursor-pointer ${
                    isActive(item.href)
                      ? "text-green-500"
                      : "text-gray-700 hover:text-green-500"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button className="palanca-green palanca-green-hover text-white hover-lift px-4 lg:px-6 py-2 lg:py-3 rounded-xl text-sm lg:text-base" data-testid="button-list-property">
              Anunciar Imóvel
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] md:w-[400px]">
              <div className="flex flex-col space-y-3 mt-6">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span
                      className={`block py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer ${
                        isActive(item.href)
                          ? "bg-green-50 text-green-500"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                      data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
                <Button className="bg-green-500 text-white hover:bg-green-600 mt-4" data-testid="mobile-button-list-property">
                  Anunciar Imóvel
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
