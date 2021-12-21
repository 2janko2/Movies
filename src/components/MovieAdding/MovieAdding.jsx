import { Typography, Form, Input, DatePicker, Select, Button, Row, Col, Spin, Alert, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import styles from "./MovieAdding.module.scss";

const { Title } = Typography;
const { Option } = Select;

const MovieAdding = ({ isLoading, error, addMovie }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            year: "",
            format: "VHS",
            actors: [],
        },
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        data.year = moment(data.year).format("YYYY");
        const res = await addMovie(data);
        if (res?.movieId) {
            notification.success({
                message: "Movie has been added",
                placement: "bottomRight",
                duration: 5,
            });
            navigate(`/movie/${res.movieId}`);
        }
    };

    const disableFutureYears = (current) => {
        return !moment(current).isBetween(new Date(1900, 1, 1), new Date());
    };

    return (
        <Spin spinning={isLoading}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Title className={"text-center"}>Add Movie</Title>

                    <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className={styles.form}>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Title">
                                    <Input {...field} placeholder="Enter movie title" />
                                    {errors.title && <div className="error">{errors.title.message}</div>}
                                </Form.Item>
                            )}
                            rules={{
                                required: { value: true, message: "Field is required" },
                            }}
                        />

                        <Controller
                            name="year"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Year">
                                    <DatePicker
                                        {...field}
                                        picker="year"
                                        disabledDate={disableFutureYears}
                                        style={{ width: "100%" }}
                                    />
                                    {errors.year && <div className="error">{errors.year.message}</div>}
                                </Form.Item>
                            )}
                            rules={{
                                required: { value: true, message: "Field is required" },
                            }}
                        />

                        <Controller
                            name="format"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Format">
                                    <Select {...field} defaultValue="VHS">
                                        <Option value="VHS">VHS</Option>
                                        <Option value="DVD">DVD</Option>
                                        <Option value="Blu-Ray">Blu-Ray</Option>
                                    </Select>
                                    {errors.format && <div className="error">{errors.format.message}</div>}
                                </Form.Item>
                            )}
                            rules={{
                                required: { value: true, message: "Field is required" },
                            }}
                        />

                        <Controller
                            name="actors"
                            control={control}
                            render={({ field }) => (
                                <Form.Item label="Actors">
                                    <Select
                                        {...field}
                                        placeholder="Enter movie title"
                                        mode="tags"
                                        tokenSeparators={[","]}
                                    />
                                    {errors.actors && <div className="error">{errors.actors.message}</div>}
                                </Form.Item>
                            )}
                            rules={{
                                required: { value: true, message: "Field is required" },
                            }}
                        />

                        {error && <Alert message={error} type="error" className={styles.form__error} />}
                        <Button type="primary" htmlType="submit" className={styles.form__btn}>
                            Add movie
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Spin>
    );
};

export default MovieAdding;
