import { Result } from "antd";
import { Link } from "react-router-dom";

const PageNotFound = (props) => {
    return (
        <Result
            status="404"
            title="404. Page not found"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Link className="ant-btn ant-btn-primary" to="/">
                    Back Home
                </Link>
            }
        />
    );
};

export default PageNotFound;
