import styles from "./register.module.css";
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
import type { RegisterFormData } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/register";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Register() {
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setRegisterError("");

    const userData = {
      email: data.email,
      name: data.username,
      password: data.password,
    };

    const success = await registerUser(userData);

    if (success) {
      navigate("/dashboard");
    } else {
      setRegisterError("Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCardContainer}>
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
                  placeholder="Email"
                  type="email"
                  {...register("email")}
                />
                <ErrorMessage>{errors.email?.message || ""}</ErrorMessage>
              </InputGroup>
              <InputGroup>
                <Input
                  placeholder="Password"
                  type="password"
                  {...register("password")}
                />
                <ErrorMessage>{errors.password?.message || ""}</ErrorMessage>
              </InputGroup>
              {registerError && (
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                  <ErrorMessage>{registerError}</ErrorMessage>
                </div>
              )}
              <Link to={"/login"}>Already have an account? Login</Link>
            </CardContent>
            <CardActions>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
      <div className={styles.registerImage}></div>
    </div>
  );
}
