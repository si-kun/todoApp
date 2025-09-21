import AuthGuard from "@/components/auth/authGuard/AuthGuard";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default layout;
