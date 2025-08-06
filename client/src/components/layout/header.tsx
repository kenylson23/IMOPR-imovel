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
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="logo">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Home className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Palanca Real</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-green-500"
                      : "text-gray-700 hover:text-green-500"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-green-500 text-white hover:bg-green-600" data-testid="button-list-property">
              Anunciar Imóvel
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={`block py-2 px-4 rounded-lg font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-green-50 text-green-500"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                      data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </a>
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
