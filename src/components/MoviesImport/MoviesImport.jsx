import { useForm, Controller } from "react-hook-form";
import { Typography, Row, Col, Form, Upload, Button, Spin, Alert, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import styles from "./MoviesImport.module.scss";

const { Title } = Typography;

const MoviesImport = ({ isLoading, error, importMovies }) => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            movies: null,
        },
    });

    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append("movies", data.movies.file.originFileObj);
        importMovies(formData).then((status) => {
            if (status === 1) {
                navigate("/");
                notification.success({
                    message: "Movies have been imported",
                    placement: "bottomRight",
                    duration: 5,
                });
            }
        });
    };

    return (
        <Spin spinning={isLoading}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Title className={"text-center"}>Import Movies</Title>

                    <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className={styles.form}>
                        <Controller
                            name="movies"
                            control={control}
                            render={({ field }) => (
                                <Upload {...field} maxCount={1} >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                    {errors.movies && <div className="error">{errors.movies.message}</div>}
                                </Upload>
                            )}
                            rules={{
                                required: { value: true, message: "Field is required" },
                            }}
                        />

                        {error && <Alert message={error} type="error" className={styles.form__error} />}
                        <Button type="primary" htmlType="submit"  className={styles.form__btn}>
                            Import Movies
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Spin>
    );
};

export default MoviesImport;
