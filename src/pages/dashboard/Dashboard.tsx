import {
  Navbar,
  DashboardStats,
  ProductsTable,
  UsersTable,
} from "../../components/dashboard";
import styles from "./dashboard.module.css";
import { useState } from "react";
import { useMobile } from "../../hooks";

export function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMobile();

  return (
    <div
      className={`${styles.container} ${collapsed ? styles.collapsed : ""} ${
        isMobile ? styles.mobile : ""
      }`}
    >
      <Navbar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobile={isMobile}
      />
      <div className={`${styles.dashboardContent} scrollable-container`}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Dashboard Overview</h1>

          <DashboardStats />

          <div className={styles.tablesGrid}>
            <ProductsTable />
            <UsersTable />
          </div>
        </div>
      </div>
    </div>
  );
}
