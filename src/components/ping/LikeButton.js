import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Icons
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
//Redux
import { connect } from "react-redux";
import { likePing, unlikePing } from "../../redux/actions/dataActions";

export class LikeButton extends Component {
  //checks if ping is liked or not
  likedPing = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.pingId === this.props.pingId)
    )
      return true;
    else return false;
  };
  likePing = () => {
    this.props.likePing(this.props.pingId);
  };
  unlikePing = () => {
    this.props.unlikePing(this.props.pingId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <ThumbUpOutlinedIcon color="primary" />
        </MyButton>
      </Link>
    ) : this.likedPing() ? (
      <MyButton tip="Unlike" onClick={this.unlikePing}>
        <ThumbUpRoundedIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likePing}>
        <ThumbUpOutlinedIcon color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  pingId: PropTypes.string.isRequired,
  likePing: PropTypes.func.isRequired,
  unlikePing: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likePing,
  unlikePing,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
