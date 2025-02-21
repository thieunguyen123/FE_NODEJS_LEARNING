import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postVerifyBookAppointment } from '../../services/userService';
import './VerifyEmail.scss';
import HomeHeader from '../../containers/HomePage/Header/HomeHeader';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <div className="email-container">
                    <HomeHeader isShowBanner={false} />
                    {statusVerify === false ? (
                        <div className="content-email">Loading data...</div>
                    ) : (
                        <div>
                            {+errCode === 0 ? (
                                <div className="content-email">Xác nhận lịch hẹn thành công!</div>
                            ) : (
                                <div className="content-email">Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                            )}
                        </div>
                    )}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
