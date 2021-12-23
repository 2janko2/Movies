import { Spin, Typography, Row, Col, Form, Input, Select, Button, Pagination } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";

import { MOVIES_PER_PAGE } from "constants/constants";
import styles from "./MovieList.module.scss";

const { Title } = Typography;
const { Option } = Select;

const MovieList = ({ isLoading, movieList, getMovieList }) => {
    const { control, handleSubmit, getValues } = useForm({
        defaultValues: {
            sort: "id",
            order: "ASC",
            title: "",
            actor: "",
        },
    });

    const onSubmit = (data) => {
        getMovieList(
            data.pageNumber ? (data.pageNumber - 1) * MOVIES_PER_PAGE : 0,
            MOVIES_PER_PAGE,
            data.sort,
            data.order,
            data.title,
            data.actor
        );
    };

    const onPageChange = (pageNumber) => {
        onSubmit({
            pageNumber,
            sort: getValues("sort"),
            order: getValues("order"),
            title: getValues("title"),
            actor: getValues("actor"),
        });
    };

    return (
        <Spin spinning={isLoading}>
            <Title className={"text-center"}>Movie List</Title>

            <Form onFinish={handleSubmit(onSubmit)} layout="inline" className={styles.form}>
                <Controller
                    name="sort"
                    control={control}
                    render={({ field }) => (
                        <Form.Item label="Sort by">
                            <Select {...field} defaultValue={"id"}>
                                <Option value="id">ID</Option>
                                <Option value="title">Title</Option>
                                <Option value="year">Year</Option>
                            </Select>
                        </Form.Item>
                    )}
                />
                <Controller
                    name="order"
                    control={control}
                    render={({ field }) => (
                        <Form.Item label="Order">
                            <Select {...field} defaultValue={"ASC"}>
                                <Option value="ASC">ASC</Option>
                                <Option value="DESC">DESC</Option>
                            </Select>
                        </Form.Item>
                    )}
                />
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <Form.Item label="Title">
                            <Input {...field} placeholder="Enter movie title" />
                        </Form.Item>
                    )}
                />
                <Controller
                    name="actor"
                    control={control}
                    render={({ field }) => (
                        <Form.Item label="Actor">
                            <Input {...field} placeholder="Enter actor name" />
                        </Form.Item>
                    )}
                />
                <Button type="primary" htmlType="submit">
                    Search
                </Button>
            </Form>

            <Row gutter={16}>
                {movieList?.data?.map((movie) => (
                    <Col key={`movieList-item-${movie.id}`} xs={24} sm={12} md={8}>
                        <div className={styles.preview}>
                            <Title level={3}>
                                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                            </Title>
                            <div className={styles.preview__field}>
                                <span className={styles.preview__label}>Format:</span> {movie.format}
                            </div>
                            <div className={styles.preview__field}>
                                <span className={styles.preview__label}>Year:</span> {movie.year}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {!!movieList?.meta?.total && (
                <Pagination total={movieList?.meta?.total} onChange={onPageChange} className={styles.pagination} />
            )}
        </Spin>
    );
};

export default MovieList;
