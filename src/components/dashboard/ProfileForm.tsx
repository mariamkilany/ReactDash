import React from "react";
import styled from "styled-components";
import { Button, Input, InputGroup, Loader } from "../ui";
import { useForm } from "react-hook-form";
import { userApi } from "../../services/api";
import { useAuth } from "../../hooks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const DangerZone = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

type FormValues = {
  name: string;
  email: string;
};

interface ProfileFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ProfileForm({ onSuccess, onCancel }: ProfileFormProps) {
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("user_id");

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userApi.getById(Number(userId)),
    enabled: !!userId,
  });

  const updateMutation = useMutation({
    mutationFn: (data: { name: string; email: string }) => {
      if (!user) throw new Error("No user");
      return userApi.update(user.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      if (onSuccess) onSuccess();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!user) throw new Error("No user");
      return userApi.delete(user.id);
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user", userId] });
      logout();
      window.location.href = "/register";
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<FormValues>({
    defaultValues: { name: user?.name || "", email: user?.email || "" },
    values: user ? { name: user.name, email: user.email } : undefined,
  });

  React.useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email });
    }
  }, [user, reset]);

  if (isLoading) return <Loader />;

  const onSubmit = async (data: FormValues) => {
    if (!data.name.trim() || !data.email.trim()) {
      setError("name", {
        type: "manual",
        message: "Name and email are required.",
      });
      setError("email", {
        type: "manual",
        message: "Name and email are required.",
      });
      return;
    }
    clearErrors();
    await updateMutation.mutateAsync({ name: data.name, email: data.email });
  };

  const handleDelete = async () => {
    if (!user) return;
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;
    await deleteMutation.mutateAsync();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContent>
        <InputGroup>
          <Input
            label="Name"
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            error={errors.name?.message}
            disabled={updateMutation.isPending || deleteMutation.isPending}
          />
        </InputGroup>
        <InputGroup>
          <Input
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter your email"
            error={errors.email?.message}
            disabled={updateMutation.isPending || deleteMutation.isPending}
          />
        </InputGroup>
        <Actions>
          <Button
            variant="outline"
            type="button"
            onClick={onCancel}
            disabled={updateMutation.isPending || deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={updateMutation.isPending || deleteMutation.isPending}
          >
            {updateMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </Actions>
      </FormContent>
      <DangerZone>
        <Button
          variant="outline"
          type="button"
          onClick={handleDelete}
          disabled={deleteMutation.isPending || updateMutation.isPending}
          style={{ color: "var(--error)", borderColor: "var(--error)" }}
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete Account"}
        </Button>
      </DangerZone>
    </form>
  );
}
