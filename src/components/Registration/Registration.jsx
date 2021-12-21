import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Typography, Form, Input, Button, Row, Col, Spin, Alert } from "antd";

import styles from "./Registration.module.scss";

const { Title } = Typography;

const Registration = ({ isLoading, error, createUser }) => {
    const {
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = (data) => {
        createUser(data);
    };

    return (
        <Spin spinning={isLoading}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Title className={"text-center"}>Registration</Title>

                    <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className={styles.form}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Name">
                                    <Input {...field} placeholder="Enter your name" />
                                    {errors.name && <div className="error">{errors.name.message}</div>}
                                </Form.Item>
                            )}
                            rules={{
                                required: { value: true, message: "Field is required" },
                            }}
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Email">
                                    <Input {...field} placeholder="Enter your email" />
                                    {errors.email && <div className="error">{errors.email.message}</div>}
                                </Form.Item>
                            )}
                            rules={{
                                required: { value: true, message: "Field is required" },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Entered value does not match email format",
                                },
                            }}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Password">
                                    <Input.Password {...field} placeholder="Enter your password" />
                                    {errors.password && <div className="error">{errors.password.message}</div>}
                                </Form.Item>
                            )}
                            rules={{
                                required: { value: true, message: "Field is required" },
                                minLength: { value: 8, message: "Password must be at least 8 characters" },
                            }}
                        />
                        <Controller
                            name="confirmPassword"
                            dependencies={["password"]}
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Confirm password">
                                    <Input.Password {...field} placeholder="Confirm your password" />
                                    {errors.confirmPassword && (
                                        <div className="error">{errors.confirmPassword.message}</div>
                                    )}
                                </Form.Item>
                            )}
                            rules={{
                                required: { value: true, message: "Field is required" },
                                validate: (value) => value === password.current || "The passwords do not match",
                            }}
                        />

                        {error && <Alert message={error} type="error" className={styles.form__error} />}
                        <Button type="primary" htmlType="submit" className={styles.form__btn}>
                            Create an account
                        </Button>
                    </Form>

                    <div className={"text-center"}>
                        <NavLink to="/login">Login</NavLink>
                    </div>
                </Col>
            </Row>
        </Spin>
    );
};

export default Registration;
