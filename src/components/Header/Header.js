import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            displayName: "",
            id: "",
            img: "",
            dropDown: false
        };
    }

    getCurrentUser = () => {
        axios
            .get(`/auth/getcurrentuser`)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    displayName: response.data.displayName,
                    id: response.data.id,
                    img: response.data.img,
                    isOrg: response.data.isOrg
                });
            })

            .catch(err => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        this.getCurrentUser();
    };

    logout = () => {
        axios
            .post(`/auth/logout`)
            .then(() => {
                this.getCurrentUser();
                this.props.history.push("/");
            })

            .catch(err => console.log(err));
    };

    toggleDropDown = () => {
        this.setState({ dropDown: !this.state.dropDown });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.authReducer.id !== prevProps.authReducer.id)
            this.getCurrentUser();
    };

    render() {
        return (
            <div>
                <div className="headerContainer">
                    {!this.state.username && (
                        <Link to="/">
                            <h1 className="logo">
                                <span className="italic">foster</span>
                                <span className="bold">PET</span>
                            </h1>
                        </Link>
                    )}
                    {this.state.username && !this.state.isOrg && (
                        <Link to="/dashboard/user">
                            <h1 className="logo">
                                <span className="italic">foster</span>
                                <span className="bold">PET</span>
                            </h1>
                        </Link>
                    )}
                    {this.state.username && this.state.isOrg && (
                        <Link to="/dashboard/org">
                            <h1 className="logo">
                                <span className="italic">foster</span>
                                <span className="bold">PET</span>
                            </h1>
                        </Link>
                    )}
                    <div className="regularHeader">
                        {this.state.isOrg === false && (
                            <div className="regularHeaderLinks">
                                <Link to="/user/newsfeed">
                                    <p>Newsfeed</p>
                                </Link>
                                <Link to="/user/animals">
                                    <p>Foster Animals</p>
                                </Link>
                                <Link to="/organizations">
                                    <p>Find a Foster Group</p>
                                </Link>
                                <Link to="/adopt">
                                    <p>Adopt</p>
                                </Link>
                            </div>
                        )}
                        {this.state.isOrg === true && (
                            <div className="regularHeaderLinks">
                                <Link to="/org/blog">
                                    <p>Blog</p>
                                </Link>
                                <Link to="/org/applications">
                                    <p>Applications</p>
                                </Link>
                                <Link to="/org/animals">
                                    <p>Animals</p>
                                </Link>
                                <Link to="/org/currentfosters">
                                    <p>Fosters</p>
                                </Link>
                            </div>
                        )}

                        {this.state.id && (
                            <div className="avatar">
                                <img
                                    src={this.state.img}
                                    alt="avatar"
                                    width="50"
                                />
                                <div>
                                    {!this.state.isOrg && (
                                        <Link
                                            to={`/profile/user/${
                                                this.state.id
                                            }`}
                                        >
                                            <p>{this.state.username}</p>
                                        </Link>
                                    )}
                                    {this.state.isOrg && (
                                        <Link
                                            to={`/profile/org/${this.state.id}`}
                                        >
                                            <p>{this.state.username}</p>
                                        </Link>
                                    )}
                                    <Link to="/">
                                        <p onClick={() => this.logout()}>
                                            Logout
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="hamburgerHeader">
                    <div className="burger" onClick={this.toggleDropDown}>
                        <div className="line" />
                        <div className="line" />
                        <div className="line" />
                    </div>

                    {this.state.dropDown && (
                        <div className="dropDown">
                            {this.state.id && (
                                <>
                                    <img
                                        src={this.state.img}
                                        alt="avatar"
                                        width="50"
                                    />
                                    {!this.state.isOrg && (
                                        <Link
                                            to={`/profile/user/${
                                                this.state.id
                                            }`}
                                        >
                                            <p>{this.state.username}</p>
                                        </Link>
                                    )}
                                    {this.state.isOrg && (
                                        <Link
                                            to={`/profile/org/${this.state.id}`}
                                        >
                                            <p>{this.state.username}</p>
                                        </Link>
                                    )}
                                </>
                            )}
                            {this.state.isOrg === false && (
                                <div className="dropDownLinks">
                                    <Link to="/user/newsfeed">
                                        <p>Newsfeed</p>
                                    </Link>
                                    <Link to="/user/animals">
                                        <p>Foster Animals</p>
                                    </Link>
                                    <Link to="/organizations">
                                        <p>Find a Foster Group</p>
                                    </Link>
                                    <Link to="/adopt">
                                        <p>Adopt</p>
                                    </Link>
                                </div>
                            )}
                            {this.state.isOrg === true && (
                                <div className="dropDownLinks">
                                    <Link to="/org/blog">
                                        <p>Blog</p>
                                    </Link>
                                    <Link to="/org/applications">
                                        <p>Applications</p>
                                    </Link>
                                    <Link to="/org/animals">
                                        <p>Animals</p>
                                    </Link>
                                    <Link to="/org/currentfosters">
                                        <p>Fosters</p>
                                    </Link>
                                </div>
                            )}
                            {this.state.username && (
                                <Link to="/">
                                    <button onClick={() => this.logout()}>
                                        Logout
                                    </button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withRouter(Header));
