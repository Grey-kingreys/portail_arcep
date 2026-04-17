'use client'

import { useState } from "react";
import Link from 'next/link'
import { Menu, X, Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import arcepLogo from "@/assets/arcep-logo-reference.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground text-xs py-1.5">
        <div className="container flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +227 20 73 XX XX</span>
            <span className="hidden sm:flex items-center gap-1"><Mail className="h-3 w-3" /> contact@arcep.ne</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> FR</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <img src={arcepLogo.src} alt="ARCEP Niger" className="h-10 w-auto" />
            <div className="hidden md:block">
              <p className="font-display font-bold text-sm leading-tight text-secondary">ARCEP</p>
              <p className="text-[10px] text-muted-foreground leading-tight">Autorité de Régulation des<br/>Communications Électroniques et de la Poste</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { label: "Accueil", href: "/" },
              { label: "Services en ligne", href: "#services" },
              { label: "Régimes juridiques", href: "#juridique" },
              { label: "Plaintes", href: "#plaintes" },
              { label: "Actualités", href: "#actualites" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex font-display" asChild>
              <Link href="/espace-operateur">Espace Opérateur</Link>
            </Button>
            <button
              className="lg:hidden p-2 rounded-md hover:bg-accent"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-card p-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {["Accueil", "Services en ligne", "Régimes juridiques", "Plaintes", "Actualités", "Contact"].map((label) => (
                <a key={label} href="#" className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent" onClick={() => setMobileOpen(false)}>
                  {label}
                </a>
              ))}
              <Button size="sm" className="mt-2 font-display" asChild>
                <Link href="/espace-operateur">Espace Opérateur</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
