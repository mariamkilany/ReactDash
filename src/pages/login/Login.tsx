import styles from "./login.module.css";
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardContent,
  Input,
  CardActions,
  InputGroup,
  ErrorMessage,
  Link,
} from "../../components";
import { appName } from "../../constants";
import { Button } from "../../components/ui/Button";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/login";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError("");
    const success = await login(data.username, data.password);

    if (success) {
      navigate("/dashboard");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCardContainer}>
        <Card>
          <CardTitle position="center">{appName}</CardTitle>
          <CardSubtitle position="center">
            View all the analytics and grow your business from anywhere!
          </CardSubtitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <InputGroup>
                <Input
                  placeholder="User name"
                  type="text"
                  {...register("username")}
                />
                <ErrorMessage>{errors.username?.message || ""}</ErrorMessage>
              </InputGroup>
              <InputGroup>
                <Input
                  placeholder="Password"
                  type="password"
                  {...register("password")}
                />
                <ErrorMessage>{errors.password?.message || ""}</ErrorMessage>
              </InputGroup>
              {loginError && (
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                  <ErrorMessage>{loginError}</ErrorMessage>
                </div>
              )}
              <Link to={"/register"}>Don't have an account? Register</Link>
            </CardContent>
            <CardActions>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
      <div className={styles.loginImage}></div>
    </div>
  );
}
