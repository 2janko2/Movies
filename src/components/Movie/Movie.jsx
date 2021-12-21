import { Spin, Typography, Tag, Modal, Button, Alert, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import styles from "./Movie.module.scss";

const { Title } = Typography;
const { confirm } = Modal;

const Movie = ({ isLoading, currentMovie, deleteMovie }) => {
    const navigate = useNavigate();

    const showDeleteConfirm = () => {
        confirm({
            title: "Are you sure delete this movie?",
            icon: <ExclamationCircleOutlined />,
            content: "The action is irreversible",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                deleteMovie(currentMovie.data.id).then((status) => {
                    if (status === 1) {
                        navigate("/");
                        notification.success({
                            message: "Movie has been deleted",
                            placement: "bottomRight",
                            duration: 5,
                        });
                    }
                });
            },
        });
    };

    return (
        <Spin spinning={isLoading}>
            <div className={styles.movie}>
                {currentMovie?.status === 1 && (
                    <>
                        <Title>{currentMovie.data.title}</Title>
                        <div className={styles.movie__field}>
                            <span className={styles.movie__label}>Format:</span> {currentMovie.data.format}
                        </div>
                        <div className={styles.movie__field}>
                            <span className={styles.movie__label}>Year:</span> {currentMovie.data.year}
                        </div>
                        <div className={styles.movie__actors}>
                            <Title level={5}>Actors</Title>
                            {currentMovie.data.actors.map((actor) => (
                                <Tag key={`movie-actor-${actor.id}`}>{actor.name}</Tag>
                            ))}
                        </div>
                        <Button onClick={showDeleteConfirm} type="primary" danger>
                            Delete movie
                        </Button>
                    </>
                )}

                {currentMovie?.status === 0 && <Alert message={currentMovie.error.code} type="error" />}
            </div>
        </Spin>
    );
};

export default Movie;
