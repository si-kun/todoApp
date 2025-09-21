import { House, LogOut, UserRoundPen } from "lucide-react";

interface FooterMenu {
    name: string;
    href: string;
    icon: React.ReactNode;
}

export const FOOTER_MENUS = [
    { name: "Home", href: "/", icon: <House /> },
    { name: "Profile", href: "/profile", icon: <UserRoundPen /> },
    { name: "logout", href: "/login", icon: <LogOut />,  },
  ] as FooterMenu[];