import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { appName } from "../../constants";
import { MdDashboard, MdLogout, MdClose, MdMenu } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { userApi } from "../../services/api";
import { ProfileForm } from "./ProfileForm";
import type { User } from "../../types";
import { Modal } from "../ui";

const SiteNav = styled.nav<{ collapsed: boolean; isMobile?: boolean }>`
  background: var(--primary-dark);
  color: var(--text-light);
  display: flex;
  flex-direction: column;
  width: ${({ collapsed, isMobile }) =>
    isMobile ? (collapsed ? "0px" : "260px") : collapsed ? "80px" : "260px"};
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: ${({ isMobile }) => (isMobile ? "fixed" : "relative")};
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  overflow: hidden;
`;

const NavList = styled.ul`
  margin-bottom: auto;
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li<{ active?: boolean; collapsed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => (collapsed ? "center" : "flex-start")};
  padding: 1rem;
  position: relative;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  gap: ${({ collapsed }) => (collapsed ? "0px" : "16px")};
  font-size: 1rem;
  transition: background 0.2s, gap 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover,
  &:focus {
    color: var(--primary);
  }
  ${({ active }) =>
    active &&
    `background: linear-gradient(to right, var(--background), transparent);`}
  svg {
    font-size: 1.5rem;
    flex-shrink: 0;
    transition: color 0.2s;
  }
  span {
    display: inline-block;
    opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
    max-width: ${({ collapsed }) => (collapsed ? "0px" : "200px")};
    margin-left: ${({ collapsed }) => (collapsed ? "0px" : "4px")};
    transition: opacity 0.2s, max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      margin 0.3s;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const AppNameRow = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) =>
    collapsed ? "center" : "space-between"};
  gap: 12px;
  padding: 1rem;
`;

const AppName = styled.div<{ collapsed: boolean }>`
  font-size: 1.5rem;
  font-weight: bold;
  display: block;
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  max-width: ${({ collapsed }) => (collapsed ? "0px" : "200px")};
  transition: opacity 0.2s, max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  overflow: hidden;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;

const MobileOverlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const MobileMenuButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: var(--primary-dark);
  border: none;
  color: var(--text-light);
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary);
`;

const ProfileName = styled.div<{ collapsed: boolean }>`
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-light);
  display: block;
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  max-width: ${({ collapsed }) => (collapsed ? "0px" : "200px")};
  transition: opacity 0.2s, max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  overflow: hidden;
`;

import type { NavbarProps } from "../../types";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
  { to: "/logout", label: "Logout", icon: <MdLogout /> },
];

export function Navbar({
  collapsed,
  setCollapsed,
  isMobile = false,
}: NavbarProps) {
  const { pathname: activePath } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      userApi.getById(Number(userId)).then(setUser);
    }
  }, []);

  const handleToggle = () => setCollapsed(!collapsed);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      setCollapsed(true);
    }
  };

  // const handleUpdate = async (name: string, email: string) => {
  //   if (!user) return;
  //   await userApi.update(user.id, { name, email });
  //   const updated = await userApi.getById(user.id);
  //   setUser(updated);
  // };

  // const handleDelete = async () => {
  //   if (!user) return;
  //   if (
  //     !window.confirm(
  //       "Are you sure you want to delete your account? This action cannot be undone."
  //     )
  //   )
  //     return;
  //   setIsDeleting(true);
  //   try {
  //     await userApi.delete(user.id);
  //     logout();
  //     window.location.href = "/register";
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // };

  return (
    <>
      {isMobile && collapsed && (
        <MobileMenuButton onClick={handleToggle} aria-label="Open navigation">
          <MdMenu />
        </MobileMenuButton>
      )}
      {isMobile && (
        <MobileOverlay isVisible={!collapsed} onClick={handleOverlayClick} />
      )}
      <SiteNav collapsed={collapsed} isMobile={isMobile}>
        <AppNameRow collapsed={collapsed}>
          {collapsed ? (
            <CloseButton onClick={handleToggle} aria-label="Open nav">
              <MdMenu />
            </CloseButton>
          ) : (
            <>
              <AppName collapsed={collapsed}>{appName}</AppName>
              <CloseButton onClick={handleToggle} aria-label="Close nav">
                <MdClose />
              </CloseButton>
            </>
          )}
        </AppNameRow>
        <ProfileRow onClick={() => setShowUpdateModal(true)}>
          <ProfileImage
            src={`https://i.pravatar.cc/150?u=${user?.email || "default"}`}
            alt="Profile"
          />
          <ProfileName collapsed={collapsed}>{user?.name}</ProfileName>
        </ProfileRow>
        <Modal
          open={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          title="Update Profile"
          width="500px"
        >
          <ProfileForm onCancel={() => setShowUpdateModal(false)} />
        </Modal>
        <NavList>
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              active={activePath === item.to}
              collapsed={collapsed}
              onClick={item.to === "/logout" ? handleLogout : undefined}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavItem>
          ))}
        </NavList>
      </SiteNav>
    </>
  );
}
