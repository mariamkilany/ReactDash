import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { MdHome, MdArrowBack } from "react-icons/md";
import styles from "./notFound.module.css";

export function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.errorTitle}>Page Not Found</h2>
      <p className={styles.errorMessage}>
        The page you're looking for doesn't exist. It might have been moved,
        deleted, or you entered the wrong URL.
      </p>
      <div className={styles.buttonGroup}>
        <Button
          className={styles.styledButton}
          onClick={() => window.history.back()}
        >
          <MdArrowBack />
          Go Back
        </Button>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Button className={styles.styledButton}>
            <MdHome />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
