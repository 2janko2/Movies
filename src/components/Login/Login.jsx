import { NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Typography, Form, Input, Button, Row, Col, Spin, Alert } from "antd";

import styles from "./Login.module.scss";

const { Title } = Typography;

const Login = ({ isLoading, error, login }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        login(data);
    };

    return (
        <Spin spinning={isLoading}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Title className={"text-center"}>Login</Title>

                    <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className={styles.form}>
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
                            }}
                        />

                        {error && <Alert message={error} type="error" className={styles.form__error} />}
                        <Button type="primary" htmlType="submit" className={styles.form__btn}>
                            Login
                        </Button>
                    </Form>

                    <div className={"text-center"}>
                        <NavLink to="/registration">Create an account</NavLink>
                    </div>
                </Col>
            </Row>
        </Spin>
    );
};

export default Login;
